import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Copy,
  LifeBuoy,
  Loader2,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  WalletCards,
} from 'lucide-react';
import Logo from '@/components/Logo';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { getSubscriptionPlan } from '@/data/subscriptionPlans';
import { cleanupCaktoAntifraud, completeCaktoAntifraud, initCaktoAntifraud } from '@/lib/caktoSdk';
import { trackCheckoutStart, trackPaymentAttempt, trackPurchase } from '@/utils/analytics';

const inputClass = 'mt-2 h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-100';
const paidStatuses = ['paid', 'approved', 'purchase_approved'];
const failedStatuses = ['declined', 'refused', 'canceled', 'cancelled'];

const digitsOnly = (value, limit) => String(value || '').replace(/\D/g, '').slice(0, limit);
const formatPhone = (value) => {
  const digits = digitsOnly(value, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};
const formatDocument = (value) => {
  const digits = digitsOnly(value, 14);
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
};
const formatCardNumber = (value) => digitsOnly(value, 19).replace(/(.{4})/g, '$1 ').trim();
const formatZipcode = (value) => digitsOnly(value, 8).replace(/(\d{5})(\d)/, '$1-$2');
const fieldFormatters = {
  phone: formatPhone,
  docNumber: formatDocument,
  cardNumber: formatCardNumber,
  zipcode: formatZipcode,
  expMonth: (value) => digitsOnly(value, 2),
  expYear: (value) => digitsOnly(value, 4),
  cvv: (value) => digitsOnly(value, 4),
  state: (value) => String(value || '').replace(/[^a-z]/gi, '').slice(0, 2).toUpperCase(),
};

const initialForm = {
  name: '', email: '', phone: '', docNumber: '',
  holderName: '', cardNumber: '', expMonth: '', expYear: '', cvv: '',
  zipcode: '', street: '', number: '', complement: '', city: '', state: '',
};

const Field = ({ label, className = '', ...inputProps }) => (
  <label className={`block text-sm font-medium text-zinc-700 ${className}`}>
    {label}
    <input className={inputClass} {...inputProps} />
  </label>
);

const Progress = ({ pixPending = false }) => {
  const items = [
    { number: 1, label: 'Seus dados', active: !pixPending, complete: pixPending },
    { number: 2, label: 'Pagamento', active: pixPending, complete: false },
    { number: 3, label: 'Confirmação', active: false, complete: false },
  ];

  return (
    <ol className="mx-auto flex max-w-xl items-center justify-between" aria-label="Etapas da compra">
      {items.map((item, index) => (
        <li key={item.label} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-2">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${item.active ? 'border-purple-600 bg-purple-600 text-white' : item.complete ? 'border-purple-600 bg-purple-600 text-white' : 'border-zinc-300 bg-white text-zinc-400'}`}>
              {item.complete ? <Check className="h-4 w-4" aria-hidden="true" /> : item.number}
            </span>
            <span className={`hidden whitespace-nowrap text-xs sm:block ${item.active || item.complete ? 'text-zinc-800' : 'text-zinc-400'}`}>{item.label}</span>
          </div>
          {index < items.length - 1 && <span className={`mx-3 h-px flex-1 sm:mx-5 ${item.complete ? 'bg-purple-600' : 'bg-zinc-300'}`} />}
        </li>
      ))}
    </ol>
  );
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
  const navigate = useNavigate();
  const plan = getSubscriptionPlan(planSlug);
  const checkoutTracked = useRef(false);
  const purchaseHandled = useRef(false);
  const [method, setMethod] = useState('pix');
  const [form, setForm] = useState(initialForm);
  const [accepted, setAccepted] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const paid = useMemo(() => paidStatuses.includes(result?.status), [result?.status]);
  const pixExpiration = (() => {
    if (!result?.pix?.expiresAt) return '';
    const expiresAt = new Date(result.pix.expiresAt);
    if (Number.isNaN(expiresAt.getTime())) return '';
    return expiresAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  })();

  useEffect(() => {
    if (!plan || checkoutTracked.current) return;
    checkoutTracked.current = true;
    trackCheckoutStart(plan.name, plan.price);
  }, [plan]);

  useEffect(() => {
    let active = true;
    initCaktoAntifraud()
      .then(() => active && setSdkReady(true))
      .catch((sdkError) => active && setError(sdkError.message));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!result?.id || paid || failedStatuses.includes(result.status)) return undefined;

    const poll = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/cakto/status?id=${encodeURIComponent(result.id)}`);
        if (!response.ok) return;
        const status = await response.json();
        setResult((current) => ({ ...current, status: status.status, refId: status.refId || current.refId }));
      } catch {
        // Uma nova consulta será feita enquanto esta página permanecer aberta.
      }
    }, 5000);

    return () => window.clearInterval(poll);
  }, [paid, result?.id, result?.status]);

  useEffect(() => {
    if (!paid || !plan || purchaseHandled.current) return;
    purchaseHandled.current = true;
    const purchase = {
      planSlug: plan.slug,
      planName: plan.name,
      price: plan.price,
      refId: result?.refId || '',
      paymentMethod: result?.paymentMethod || method,
      approvedAt: new Date().toISOString(),
    };
    window.sessionStorage.setItem('cinestream_last_purchase', JSON.stringify(purchase));
    trackPurchase(plan.name, plan.price, purchase.refId);
    navigate(`/obrigado?plano=${encodeURIComponent(plan.slug)}`, { replace: true, state: purchase });
  }, [method, navigate, paid, plan, result?.paymentMethod, result?.refId]);

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
    const formattedValue = fieldFormatters[name] ? fieldFormatters[name](value) : value;
    setForm((current) => ({ ...current, [name]: formattedValue }));
  };

  const selectMethod = (nextMethod) => {
    setMethod(nextMethod);
    setError('');
  };

  const submitPayment = async (event) => {
    event.preventDefault();
    setError('');
    if (!accepted) return setError('Aceite os Termos de Uso e a Política de Privacidade para continuar.');

    if (method === 'threeDs') {
      const cardDigits = digitsOnly(form.cardNumber, 19);
      const month = Number(form.expMonth);
      if (cardDigits.length < 13) return setError('Confira o número do cartão informado.');
      if (month < 1 || month > 12) return setError('Informe um mês de validade entre 01 e 12.');
      if (!/^\d{4}$/.test(form.expYear)) return setError('Informe o ano de validade com quatro dígitos.');
      if (!/^\d{3,4}$/.test(form.cvv)) return setError('Confira o código de segurança do cartão.');
    }

    trackPaymentAttempt(plan.name, method);
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
    <div className="min-h-screen overflow-hidden bg-zinc-100 pb-24 text-zinc-900 sm:pb-0">
      <Seo title={`Checkout — Plano ${plan.name}`} description={`Finalize com segurança a assinatura do plano ${plan.name} CineStream.`} path={`/checkout/${plan.slug}`} noIndex />
      <header className="relative z-10 border-b border-white/[0.07] bg-[#111116]">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" aria-label="Voltar à página inicial"><Logo /></Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/15 bg-green-400/[0.07] px-3 py-2 text-xs font-medium text-green-300">
            <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" /> Ambiente protegido
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-7 md:px-6 md:py-10">
        <div className="mb-7 flex items-center justify-between gap-4">
          <Link to="/#pricing" className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Alterar plano
          </Link>
          <span className="hidden items-center gap-2 text-xs text-zinc-500 sm:inline-flex"><LifeBuoy className="h-4 w-4" strokeWidth={1.7} /> Suporte disponível após a compra</span>
        </div>

        <div className="mb-8 px-2 sm:px-8">
          <Progress pixPending={Boolean(result?.pix)} />
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_20px_55px_rgba(24,24,27,0.10)] lg:grid-cols-[360px_minmax(0,1fr)]">
          <section className="order-2 border-t border-zinc-200 bg-white p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            {result?.pix ? (
              <div className="mx-auto max-w-xl py-3 text-center sm:py-6">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-purple-200 bg-purple-50 text-purple-700">
                  <QrCode className="h-7 w-7" aria-hidden="true" />
                </span>
                <h1 className="mt-5 text-2xl font-bold sm:text-3xl">Seu Pix está pronto</h1>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500">Escaneie o QR Code pelo aplicativo do seu banco ou copie o código abaixo. A confirmação acontece automaticamente.</p>

                <div className="mx-auto my-6 w-fit rounded-xl border border-white/10 bg-white p-3 shadow-lg shadow-black/20">
                  <img src={result.pix.qrCodeBase64} alt="QR Code Pix" className="h-56 w-56 sm:h-64 sm:w-64" />
                </div>

                <Button type="button" onClick={copyPix} className="min-h-12 w-full bg-purple-500 font-bold text-white hover:bg-purple-400 sm:w-auto sm:px-8">
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? 'Código copiado' : 'Copiar código Pix'}
                </Button>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs text-amber-700">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Aguardando confirmação do pagamento
                </div>
                {pixExpiration && <p className="mt-3 text-xs text-zinc-500">Pix válido até {pixExpiration}</p>}
                <p className="mt-4 text-xs text-zinc-400">Pedido {result.refId}</p>
              </div>
            ) : (
              <form id="checkout-payment-form" onSubmit={submitPayment}>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-700">Finalização segura</div>
                  <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Complete sua assinatura</h1>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">Preencha seus dados e escolha a forma de pagamento.</p>
                </div>

                <fieldset className="mt-8">
                  <legend className="mb-3 text-sm font-semibold text-zinc-800">Como deseja pagar?</legend>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => selectMethod('pix')} className={`relative flex min-h-20 flex-col items-start justify-center rounded-xl border px-4 text-left transition ${method === 'pix' ? 'border-purple-600 bg-purple-50' : 'border-zinc-200 bg-white hover:border-zinc-300'}`}>
                      {method === 'pix' && <BadgeCheck className="absolute right-3 top-3 h-4 w-4 text-purple-700" />}
                      <QrCode className={`mb-2 h-5 w-5 ${method === 'pix' ? 'text-purple-700' : 'text-zinc-400'}`} />
                      <strong className="text-sm">Pix</strong>
                      <span className="mt-1 text-[11px] text-zinc-500">Confirmação rápida</span>
                    </button>
                    <button type="button" onClick={() => selectMethod('threeDs')} className={`relative flex min-h-20 flex-col items-start justify-center rounded-xl border px-4 text-left transition ${method === 'threeDs' ? 'border-purple-600 bg-purple-50' : 'border-zinc-200 bg-white hover:border-zinc-300'}`}>
                      {method === 'threeDs' && <BadgeCheck className="absolute right-3 top-3 h-4 w-4 text-purple-700" />}
                      <WalletCards className={`mb-2 h-5 w-5 ${method === 'threeDs' ? 'text-purple-700' : 'text-zinc-400'}`} strokeWidth={1.7} />
                      <strong className="text-sm">Cartão</strong>
                      <span className="mt-1 text-[11px] text-zinc-500">Compra autenticada</span>
                    </button>
                  </div>
                </fieldset>

                <div className="mt-8 border-t border-zinc-200 pt-7">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500 text-xs font-bold">1</span>
                    <h2 className="font-semibold">Dados do comprador</h2>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field className="sm:col-span-2" label="Nome completo" name="name" value={form.name} onChange={updateField} autoComplete="name" placeholder="Digite seu nome" minLength="3" required />
                    <Field label="E-mail" type="email" name="email" value={form.email} onChange={updateField} autoComplete="email" placeholder="voce@email.com" required />
                    <Field label="Telefone com DDD" name="phone" value={form.phone} onChange={updateField} inputMode="tel" autoComplete="tel" placeholder="(11) 99999-9999" maxLength="15" required />
                    <Field className="sm:col-span-2" label="CPF ou CNPJ" name="docNumber" value={form.docNumber} onChange={updateField} inputMode="numeric" placeholder="000.000.000-00" maxLength="18" required />
                  </div>
                </div>

                {method === 'threeDs' && (
                  <div className="mt-8 border-t border-zinc-200 pt-7">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500 text-xs font-bold">2</span>
                      <h2 className="font-semibold">Cartão e endereço de cobrança</h2>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-6">
                      <Field className="sm:col-span-3" label="Nome no cartão" name="holderName" value={form.holderName} onChange={updateField} autoComplete="cc-name" placeholder="Como está no cartão" required />
                      <Field className="sm:col-span-3" label="Número do cartão" name="cardNumber" value={form.cardNumber} onChange={updateField} inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" maxLength="23" required />
                      <Field className="sm:col-span-2" label="Mês" name="expMonth" value={form.expMonth} onChange={updateField} inputMode="numeric" autoComplete="cc-exp-month" placeholder="MM" maxLength="2" required />
                      <Field className="sm:col-span-2" label="Ano" name="expYear" value={form.expYear} onChange={updateField} inputMode="numeric" autoComplete="cc-exp-year" placeholder="AAAA" maxLength="4" required />
                      <Field className="sm:col-span-2" label="CVV" name="cvv" value={form.cvv} onChange={updateField} inputMode="numeric" autoComplete="cc-csc" placeholder="123" maxLength="4" required />
                      <Field className="sm:col-span-2" label="CEP" name="zipcode" value={form.zipcode} onChange={updateField} inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" maxLength="9" required />
                      <Field className="sm:col-span-4" label="Rua" name="street" value={form.street} onChange={updateField} autoComplete="address-line1" placeholder="Nome da rua" required />
                      <Field className="sm:col-span-2" label="Número" name="number" value={form.number} onChange={updateField} placeholder="123" required />
                      <Field className="sm:col-span-4" label="Complemento" name="complement" value={form.complement} onChange={updateField} autoComplete="address-line2" placeholder="Opcional" />
                      <Field className="sm:col-span-4" label="Cidade" name="city" value={form.city} onChange={updateField} autoComplete="address-level2" placeholder="Sua cidade" required />
                      <Field className="sm:col-span-2" label="Estado" name="state" value={form.state} onChange={updateField} maxLength="2" autoComplete="address-level1" placeholder="UF" required />
                    </div>
                  </div>
                )}

                <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-600">
                  <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-purple-500" />
                  <span>Li e concordo com os <Link to="/termos" target="_blank" className="text-purple-700 underline underline-offset-2">Termos de Uso</Link>, a <Link to="/privacidade" target="_blank" className="text-purple-700 underline underline-offset-2">Política de Privacidade</Link> e as condições do plano.</span>
                </label>

                {error && <div role="alert" aria-live="polite" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
                <Button type="submit" disabled={loading || !sdkReady} className="mt-6 hidden min-h-14 w-full rounded-lg bg-purple-500 text-base font-bold text-white shadow-lg shadow-purple-950/20 transition hover:bg-purple-400 disabled:opacity-50 sm:inline-flex">
                  {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processando com segurança…</> : method === 'pix' ? <><QrCode className="mr-2 h-5 w-5" /> Gerar Pix de {plan.price}</> : <><LockKeyhole className="mr-2 h-5 w-5" /> Pagar {plan.price}</>}
                </Button>
                <p className="mt-3 hidden text-center text-[11px] text-zinc-400 sm:block">Seus dados de pagamento são protegidos e processados pela Cakto.</p>
              </form>
            )}
          </section>

          <aside className="order-1 bg-[#101016] text-white">
            <div>
              <div className="border-b border-white/[0.08] p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-300">Seu pedido</p>
                  {plan.badge && <span className="rounded-full bg-purple-500/15 px-3 py-1 text-[10px] font-bold text-purple-200">{plan.badge}</span>}
                </div>
                <h2 className="mt-3 text-2xl font-bold">Plano {plan.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{plan.description}</p>
              </div>

              <div className="p-6">
                <div className="mb-6 rounded-xl border border-purple-400/15 bg-purple-400/[0.05] p-5 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-purple-200">{plan.valuePresentation.eyebrow}</p>
                  {plan.valuePresentation.monthlyEquivalent ? (
                    <>
                      <div className="mt-2 flex items-end justify-center gap-2">
                        <strong className="text-4xl font-bold tracking-tight text-white">{plan.valuePresentation.monthlyEquivalent}</strong>
                        <span className="pb-1 text-sm text-white/50">por mês</span>
                      </div>
                      <p className="mt-2 text-xs text-white/45">{plan.valuePresentation.equivalentCaption || 'valor equivalente no período contratado'}</p>
                    </>
                  ) : (
                    <>
                      <strong className="mt-2 block text-3xl font-bold tracking-tight text-white">{plan.valuePresentation.installmentEquivalent}</strong>
                      <p className="mt-2 text-xs text-white/45">ou {plan.price} em pagamento único</p>
                    </>
                  )}
                  {plan.valuePresentation.savings && <span className="mt-4 inline-flex rounded-full bg-green-400/10 px-3 py-1.5 text-xs font-bold text-green-300">{plan.valuePresentation.savings}</span>}
                </div>

                <ul className="hidden space-y-3 text-sm text-white/60 lg:block">
                  {plan.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" /> {feature}</li>
                  ))}
                </ul>

                <div className="my-6 border-y border-white/[0.08] py-5">
                  {plan.valuePresentation.comparison && <p className="mb-3 text-right text-xs text-white/35 line-through">{plan.valuePresentation.comparison}</p>}
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-sm text-white/45">Total cobrado</span>
                    <strong className="text-3xl tracking-tight">{plan.price}</strong>
                  </div>
                  <p className="mt-2 text-right text-xs text-white/35">{plan.valuePresentation.detail}</p>
                </div>

                <div className="hidden space-y-3 rounded-xl border border-white/[0.06] bg-black/10 p-4 text-xs leading-relaxed text-white/45 lg:block">
                  <p className="flex gap-2.5"><ShieldCheck className="h-4 w-4 shrink-0 text-green-400" /> Pagamento processado pela Cakto</p>
                  <p className="flex gap-2.5"><LockKeyhole className="h-4 w-4 shrink-0 text-green-400" /> Cartão tokenizado e autenticação 3D Secure</p>
                </div>

                <div className="mt-6 hidden lg:block">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/35">Meios de pagamento</p>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] text-xs font-bold text-white/70"><QrCode className="h-4 w-4 text-green-400" /> Pix</span>
                    <span className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] text-xs font-bold text-white/70"><WalletCards className="h-4 w-4 text-purple-300" strokeWidth={1.7} /> Cartão</span>
                  </div>
                </div>

                <div className="mt-5 hidden grid-cols-3 gap-2 lg:grid" aria-label="Selos de segurança">
                  <span className="flex min-h-12 flex-col items-center justify-center rounded-xl border border-green-400/10 bg-green-400/[0.04] text-[9px] font-bold uppercase tracking-wide text-green-300"><ShieldCheck className="mb-1 h-4 w-4" /> Cakto</span>
                  <span className="flex min-h-12 flex-col items-center justify-center rounded-xl border border-green-400/10 bg-green-400/[0.04] text-[9px] font-bold uppercase tracking-wide text-green-300"><LockKeyhole className="mb-1 h-4 w-4" /> SSL seguro</span>
                  <span className="flex min-h-12 flex-col items-center justify-center rounded-xl border border-green-400/10 bg-green-400/[0.04] text-[9px] font-bold uppercase tracking-wide text-green-300"><BadgeCheck className="mb-1 h-4 w-4" /> 3D Secure</span>
                </div>
              </div>
            </div>

          </aside>
        </div>

        <p className="mt-5 text-center text-xs leading-relaxed text-zinc-500">Pagamento processado pela Cakto em ambiente protegido.</p>
      </main>

      {!result?.pix && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 p-3 shadow-[0_-12px_35px_rgba(24,24,27,0.12)] backdrop-blur-xl sm:hidden">
          <Button form="checkout-payment-form" type="submit" disabled={loading || !sdkReady} className="min-h-14 w-full rounded-lg bg-purple-500 text-sm font-bold text-white hover:bg-purple-400 disabled:opacity-50">
            {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processando…</> : method === 'pix' ? <><QrCode className="mr-2 h-5 w-5" /> Gerar Pix de {plan.price}</> : <><LockKeyhole className="mr-2 h-5 w-5" /> Pagar {plan.price}</>}
          </Button>
          <p className="mt-1.5 text-center text-[10px] text-zinc-500"><LockKeyhole className="mr-1 inline h-3 w-3 text-green-600" /> Pagamento protegido pela Cakto</p>
        </div>
      )}

      <footer className="relative z-10 border-t border-zinc-200 py-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} CineStream · Compra protegida
      </footer>
    </div>
  );
};

export default Checkout;
