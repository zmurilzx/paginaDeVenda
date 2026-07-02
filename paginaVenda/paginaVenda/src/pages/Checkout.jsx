import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Copy, CreditCard, Loader2, LockKeyhole, QrCode, ShieldCheck } from 'lucide-react';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { getSubscriptionPlan } from '@/data/subscriptionPlans';
import { cleanupCaktoAntifraud, completeCaktoAntifraud, initCaktoAntifraud } from '@/lib/caktoSdk';
import { trackPurchase } from '@/utils/analytics';

const inputClass = 'mt-2 h-12 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-foreground outline-none transition placeholder:text-foreground/30 focus:border-purple-400';

const initialForm = {
  name: '', email: '', phone: '', docNumber: '',
  holderName: '', cardNumber: '', expMonth: '', expYear: '', cvv: '',
  zipcode: '', street: '', number: '', complement: '', city: '', state: '',
};

const getDeviceId = () => {
  const storageKey = 'cinestream_checkout_device';
  let value = window.localStorage.getItem(storageKey);
  if (!value) {
    value = `fp_${window.crypto.randomUUID()}`;
    window.localStorage.setItem(storageKey, value);
  }
  return value;
};

const getTrackingMetadata = () => {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'sck']
      .filter((key) => params.get(key))
      .map((key) => [key, params.get(key)]),
  );
};

const Checkout = () => {
  const { plan: planSlug } = useParams();
  const plan = getSubscriptionPlan(planSlug);
  const [method, setMethod] = useState('pix');
  const [form, setForm] = useState(initialForm);
  const [accepted, setAccepted] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const paid = useMemo(() => ['paid', 'approved', 'purchase_approved'].includes(result?.status), [result?.status]);

  useEffect(() => {
    let active = true;
    initCaktoAntifraud()
      .then(() => active && setSdkReady(true))
      .catch((sdkError) => active && setError(sdkError.message));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!result?.id || paid || ['declined', 'refused', 'canceled', 'cancelled'].includes(result.status)) return undefined;

    const poll = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/cakto/status?id=${encodeURIComponent(result.id)}`);
        if (!response.ok) return;
        const status = await response.json();
        setResult((current) => ({ ...current, status: status.status }));
        if (['paid', 'approved', 'purchase_approved'].includes(status.status)) {
          trackPurchase(plan.name, plan.price, status.refId || result.refId);
        }
      } catch {
        // A próxima tentativa de consulta atualizará o estado.
      }
    }, 5000);

    return () => window.clearInterval(poll);
  }, [paid, plan?.name, plan?.price, result?.id, result?.refId, result?.status]);

  if (!plan) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-foreground">
        <h1 className="mb-4 text-3xl font-bold">Plano não encontrado</h1>
        <Link to="/#pricing"><Button>Voltar aos planos</Button></Link>
      </main>
    );
  }

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitPayment = async (event) => {
    event.preventDefault();
    setError('');
    if (!accepted) return setError('Aceite os Termos de Uso e a Política de Privacidade para continuar.');

    setLoading(true);
    try {
      const sdk = await initCaktoAntifraud();
      let cardToken;
      let threeDSecure;

      if (method === 'threeDs') {
        const card = {
          holderName: form.holderName,
          cardNumber: form.cardNumber.replace(/\D/g, ''),
          cvv: form.cvv.replace(/\D/g, ''),
          expMonth: form.expMonth.replace(/\D/g, ''),
          expYear: form.expYear.replace(/\D/g, ''),
        };
        ({ cardToken } = await sdk.createToken(card));
        const authResult = await sdk.authenticate3DS({
          card,
          customer: {
            amount: plan.amountCents,
            currency: 'BRL',
            email: form.email,
            name: form.name,
            phone: form.phone.replace(/\D/g, ''),
            paymentMethod: 'credit',
            address: {
              street: form.street, number: form.number, complement: form.complement,
              city: form.city, state: form.state.toUpperCase(), zipcode: form.zipcode,
            },
          },
        });
        if (!authResult.success) throw new Error(authResult.error || 'Não foi possível autenticar o cartão.');
        threeDSecure = {
          cavv: authResult.cavv, eci: authResult.eci, xid: authResult.xid,
          referenceId: authResult.referenceId, version: authResult.version,
        };
      }

      const { reference } = await completeCaktoAntifraud();
      const payload = {
        plan: plan.slug,
        paymentMethod: method,
        customer: { name: form.name, email: form.email, phone: form.phone, docNumber: form.docNumber },
        deviceId: getDeviceId(),
        antifraudReference: reference,
        idempotencyKey: window.crypto.randomUUID(),
        metadata: getTrackingMetadata(),
        ...(cardToken ? { cardToken, threeDSecure } : {}),
      };

      const response = await fetch('/api/cakto/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Não foi possível processar o pagamento.');

      setResult(data);
      if (['paid', 'approved'].includes(data.status)) trackPurchase(plan.name, plan.price, data.refId);
      await cleanupCaktoAntifraud();
    } catch (submitError) {
      setError(submitError.message || 'Não foi possível processar o pagamento.');
      await cleanupCaktoAntifraud().catch(() => {});
      initCaktoAntifraud().catch(() => {});
    } finally {
      setLoading(false);
    }
  };

  const copyPix = async () => {
    await navigator.clipboard.writeText(result.pix.qrCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo title={`Checkout — Plano ${plan.name}`} description={`Finalize com segurança a assinatura do plano ${plan.name} CineStream.`} path={`/checkout/${plan.slug}`} noIndex />
      <header className="border-b border-white/10 bg-background/95">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" aria-label="Voltar à página inicial"><Logo /></Link>
          <span className="inline-flex items-center gap-2 text-xs text-foreground/60"><LockKeyhole className="h-4 w-4 text-green-400" /> Checkout seguro</span>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
        <Link to="/#pricing" className="mb-8 inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-white"><ArrowLeft className="h-4 w-4" /> Alterar plano</Link>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="order-2 rounded-2xl border border-white/10 bg-card/40 p-5 sm:p-8 lg:order-1">
            {paid ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto mb-5 h-16 w-16 text-green-400" />
                <h1 className="text-3xl font-bold">Pagamento aprovado!</h1>
                <p className="mx-auto mt-4 max-w-lg text-foreground/65">Seu pedido <strong>{result.refId}</strong> foi confirmado. As orientações de acesso serão enviadas pelos canais cadastrados na compra.</p>
                <Link to="/" className="mt-8 inline-block"><Button>Voltar ao início</Button></Link>
              </div>
            ) : result?.pix ? (
              <div className="text-center">
                <QrCode className="mx-auto mb-3 h-10 w-10 text-purple-300" />
                <h1 className="text-2xl font-bold">Pague com Pix</h1>
                <p className="mt-2 text-sm text-foreground/60">Escaneie o QR Code ou copie o código. Esta página atualizará após a confirmação.</p>
                <img src={result.pix.qrCodeBase64} alt="QR Code Pix" className="mx-auto my-6 w-64 rounded-xl bg-white p-3" />
                <Button type="button" onClick={copyPix} className="w-full sm:w-auto"><Copy className="mr-2 h-4 w-4" />{copied ? 'Código copiado' : 'Copiar código Pix'}</Button>
                <p className="mt-5 text-sm text-foreground/50">Pedido: {result.refId} • Status: aguardando pagamento</p>
              </div>
            ) : (
              <form onSubmit={submitPayment}>
                <h1 className="text-2xl font-bold md:text-3xl">Finalize sua assinatura</h1>
                <p className="mt-2 text-sm text-foreground/60">Seus dados são usados somente para processar a compra e liberar o acesso.</p>

                <fieldset className="mt-8">
                  <legend className="mb-3 text-sm font-semibold">Forma de pagamento</legend>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setMethod('pix')} className={`flex min-h-14 items-center justify-center gap-2 rounded-xl border text-sm font-semibold ${method === 'pix' ? 'border-purple-400 bg-purple-500/15 text-white' : 'border-white/10 bg-white/[0.03] text-foreground/60'}`}><QrCode className="h-5 w-5" /> Pix</button>
                    <button type="button" onClick={() => setMethod('threeDs')} className={`flex min-h-14 items-center justify-center gap-2 rounded-xl border text-sm font-semibold ${method === 'threeDs' ? 'border-purple-400 bg-purple-500/15 text-white' : 'border-white/10 bg-white/[0.03] text-foreground/60'}`}><CreditCard className="h-5 w-5" /> Cartão</button>
                  </div>
                </fieldset>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <label className="sm:col-span-2 text-sm">Nome completo<input className={inputClass} name="name" value={form.name} onChange={updateField} autoComplete="name" required /></label>
                  <label className="text-sm">E-mail<input className={inputClass} type="email" name="email" value={form.email} onChange={updateField} autoComplete="email" required /></label>
                  <label className="text-sm">Telefone com DDD<input className={inputClass} name="phone" value={form.phone} onChange={updateField} inputMode="tel" autoComplete="tel" required /></label>
                  <label className="sm:col-span-2 text-sm">CPF ou CNPJ<input className={inputClass} name="docNumber" value={form.docNumber} onChange={updateField} inputMode="numeric" required /></label>
                </div>

                {method === 'threeDs' && (
                  <div className="mt-8 border-t border-white/10 pt-8">
                    <h2 className="mb-5 font-semibold">Dados do cartão</h2>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="sm:col-span-2 text-sm">Nome impresso no cartão<input className={inputClass} name="holderName" value={form.holderName} onChange={updateField} autoComplete="cc-name" required /></label>
                      <label className="sm:col-span-2 text-sm">Número do cartão<input className={inputClass} name="cardNumber" value={form.cardNumber} onChange={updateField} inputMode="numeric" autoComplete="cc-number" required /></label>
                      <label className="text-sm">Mês<input className={inputClass} name="expMonth" value={form.expMonth} onChange={updateField} inputMode="numeric" autoComplete="cc-exp-month" placeholder="MM" maxLength="2" required /></label>
                      <label className="text-sm">Ano<input className={inputClass} name="expYear" value={form.expYear} onChange={updateField} inputMode="numeric" autoComplete="cc-exp-year" placeholder="AAAA" maxLength="4" required /></label>
                      <label className="text-sm">CVV<input className={inputClass} name="cvv" value={form.cvv} onChange={updateField} inputMode="numeric" autoComplete="cc-csc" maxLength="4" required /></label>
                    </div>
                    <h2 className="mb-5 mt-8 font-semibold">Endereço de cobrança</h2>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="text-sm">CEP<input className={inputClass} name="zipcode" value={form.zipcode} onChange={updateField} inputMode="numeric" autoComplete="postal-code" required /></label>
                      <label className="text-sm">Estado<input className={inputClass} name="state" value={form.state} onChange={updateField} maxLength="2" autoComplete="address-level1" required /></label>
                      <label className="sm:col-span-2 text-sm">Rua<input className={inputClass} name="street" value={form.street} onChange={updateField} autoComplete="address-line1" required /></label>
                      <label className="text-sm">Número<input className={inputClass} name="number" value={form.number} onChange={updateField} required /></label>
                      <label className="text-sm">Complemento<input className={inputClass} name="complement" value={form.complement} onChange={updateField} autoComplete="address-line2" /></label>
                      <label className="sm:col-span-2 text-sm">Cidade<input className={inputClass} name="city" value={form.city} onChange={updateField} autoComplete="address-level2" required /></label>
                    </div>
                  </div>
                )}

                <label className="mt-7 flex items-start gap-3 text-xs leading-relaxed text-foreground/60">
                  <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="mt-1 h-4 w-4 accent-purple-500" />
                  <span>Li e concordo com os <Link to="/termos" target="_blank" className="text-purple-300 underline">Termos de Uso</Link>, a <Link to="/privacidade" target="_blank" className="text-purple-300 underline">Política de Privacidade</Link> e as condições do plano.</span>
                </label>

                {error && <div role="alert" className="mt-5 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}
                <Button type="submit" disabled={loading || !sdkReady} className="mt-6 w-full bg-purple-500 py-6 text-base font-bold text-white hover:bg-purple-400">
                  {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processando…</> : method === 'pix' ? 'Gerar Pix' : `Pagar ${plan.price}`}
                </Button>
                <p className="mt-3 text-center text-xs text-foreground/45">Não feche esta página durante o processamento.</p>
              </form>
            )}
          </section>

          <aside className="order-1 h-fit rounded-2xl border border-purple-400/20 bg-purple-950/20 p-6 lg:order-2 lg:sticky lg:top-8">
            <p className="text-sm text-foreground/55">Resumo do pedido</p>
            <h2 className="mt-2 text-2xl font-bold">Plano {plan.name}</h2>
            <p className="mt-1 text-sm text-foreground/60">{plan.description}</p>
            <div className="my-6 border-y border-white/10 py-5">
              <div className="flex items-end justify-between gap-4"><span className="text-sm text-foreground/60">Total</span><strong className="text-3xl">{plan.price}</strong></div>
              <p className="mt-2 text-right text-xs text-foreground/45">{plan.period}</p>
            </div>
            <ul className="space-y-3 text-sm text-foreground/65">
              <li className="flex gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-green-400" /> Pagamento processado pela Cakto</li>
              <li className="flex gap-2"><LockKeyhole className="h-4 w-4 shrink-0 text-green-400" /> Cartão tokenizado; os dados não passam pelo nosso servidor</li>
            </ul>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
