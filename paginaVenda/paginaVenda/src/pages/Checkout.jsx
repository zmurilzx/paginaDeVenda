import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Copy,
  Loader2,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  WalletCards,
} from 'lucide-react';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { getSubscriptionPlan } from '@/data/subscriptionPlans';
import { cleanupCaktoAntifraud, completeCaktoAntifraud, initCaktoAntifraud } from '@/lib/caktoSdk';
import {
  getTrackingMetadata,
  sendMarketingEvent,
  trackCheckoutLead,
  trackCheckoutStart,
  trackPaymentAttempt,
  trackPaymentError,
  trackPixGenerated,
  trackPurchase,
} from '@/utils/analytics';

const inputClass = 'mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 sm:px-4 sm:text-sm';
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
  <label className={`block text-sm font-medium text-slate-700 ${className}`}>
    {label}
    <input className={inputClass} {...inputProps} />
  </label>
);

const OrderSummary = ({ plan, mobile = false }) => {
  const monthly = plan.valuePresentation.monthlyEquivalent;

  if (mobile) {
    return (
      <details className="group mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 marker:content-none">
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">Resumo do pedido</p>
            <p className="mt-0.5 truncate text-sm font-semibold text-slate-900">Plano {plan.name}</p>
          </div>
          <div className="shrink-0 text-right">
            <strong className="block text-base text-slate-900">{plan.price}</strong>
            <span className="text-[11px] font-medium text-purple-700 group-open:hidden">Ver detalhes</span>
            <span className="hidden text-[11px] font-medium text-purple-700 group-open:inline">Ocultar</span>
          </div>
        </summary>
        <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-4">
          {monthly && <p className="text-sm text-slate-600">Equivale a <strong className="text-slate-900">{monthly} por mês</strong></p>}
          <ul className="mt-3 space-y-2 text-xs text-slate-600">
            {plan.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex gap-2"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" /> {feature}</li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-sm">
            <span className="text-slate-600">Total</span>
            <strong className="text-lg text-slate-900">{plan.price}</strong>
          </div>
        </div>
      </details>
    );
  }

  return (
    <aside className="hidden bg-slate-50 text-slate-900 lg:block">
      <div className="sticky top-0 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Resumo do pedido</p>
        <div className="mt-5 border-b border-slate-200 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Plano {plan.name}</h2>
              <p className="mt-1 text-sm text-slate-500">Assinatura CineStream</p>
            </div>
            {plan.badge && <span className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[10px] font-semibold text-purple-700">{plan.badge}</span>}
          </div>
        </div>

        <div className="border-b border-slate-200 py-6">
          {monthly ? (
            <>
              <p className="text-sm text-slate-500">Valor equivalente</p>
              <div className="mt-1 flex items-baseline gap-2">
                <strong className="text-3xl tracking-tight">{monthly}</strong>
                <span className="text-sm text-slate-500">por mês</span>
              </div>
            </>
          ) : (
            <strong className="text-2xl">{plan.valuePresentation.installmentEquivalent}</strong>
          )}
          {plan.valuePresentation.savings && <p className="mt-3 text-xs font-semibold text-emerald-700">{plan.valuePresentation.savings}</p>}
        </div>

        <ul className="space-y-3 border-b border-slate-200 py-6 text-sm leading-relaxed text-slate-600">
          {plan.features.slice(0, 4).map((feature) => (
            <li key={feature} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {feature}</li>
          ))}
        </ul>

        <div className="py-6">
          {plan.valuePresentation.comparison && <p className="mb-2 text-right text-xs text-slate-400 line-through">{plan.valuePresentation.comparison}</p>}
          <div className="flex items-end justify-between gap-4">
            <span className="text-sm text-slate-600">Total</span>
            <strong className="text-3xl tracking-tight">{plan.price}</strong>
          </div>
          <p className="mt-2 text-right text-xs text-slate-500">{plan.valuePresentation.detail}</p>
        </div>

        <div className="mt-2 space-y-3 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <p className="flex items-center gap-2.5"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Pagamento processado pela Cakto</p>
          <p className="flex items-center gap-2.5"><LockKeyhole className="h-4 w-4 text-emerald-600" /> Conexão segura e dados criptografados</p>
          <p className="flex items-center gap-2.5"><WalletCards className="h-4 w-4 text-slate-500" /> Pix e cartão de crédito</p>
        </div>
      </div>
    </aside>
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
  const [generatedQrImage, setGeneratedQrImage] = useState('');
  const [copied, setCopied] = useState(false);

  const paid = useMemo(() => paidStatuses.includes(result?.status), [result?.status]);
  const qrImage = result?.pix?.qrCodeBase64 || generatedQrImage;
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
    sendMarketingEvent('checkout_started', {
      plan_slug: plan.slug,
      plan_name: plan.name,
      price: plan.price,
    });
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
    sendMarketingEvent('purchase', {
      plan_slug: plan.slug,
      plan_name: plan.name,
      price: plan.price,
      reference: purchase.refId,
      payment_method: purchase.paymentMethod,
    });
    navigate(`/obrigado?plano=${encodeURIComponent(plan.slug)}`, { replace: true, state: purchase });
  }, [method, navigate, paid, plan, result?.paymentMethod, result?.refId]);

  useEffect(() => {
    if (!result?.pix?.qrCode || result.pix.qrCodeBase64) {
      return;
    }

    let active = true;
    QRCode.toDataURL(result.pix.qrCode, { margin: 1, width: 256 })
      .then((dataUrl) => active && setGeneratedQrImage(dataUrl))
      .catch(() => active && setGeneratedQrImage(''));

    return () => { active = false; };
  }, [result?.pix?.qrCode, result?.pix?.qrCodeBase64]);

  if (!plan) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center text-slate-900">
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
    sendMarketingEvent('payment_attempt', {
      plan_slug: plan.slug,
      plan_name: plan.name,
      price: plan.price,
      payment_method: method,
    });
    trackCheckoutLead(plan.name, plan.price, form);
    sendMarketingEvent('checkout_lead', {
      plan_slug: plan.slug,
      plan_name: plan.name,
      price: plan.price,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      payment_method: method,
    });
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
      if (data.pix) {
        trackPixGenerated(plan.name, plan.price, data.refId);
        sendMarketingEvent('pix_generated', {
          plan_slug: plan.slug,
          plan_name: plan.name,
          price: plan.price,
          reference: data.refId,
          payment_id: data.id,
          amount: data.amount,
        });
      }
      await cleanupCaktoAntifraud();
    } catch (submitError) {
      trackPaymentError(plan.name, method, submitError.message);
      sendMarketingEvent('payment_error', {
        plan_slug: plan.slug,
        plan_name: plan.name,
        price: plan.price,
        payment_method: method,
        message: submitError.message,
      });
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
    <div className="min-h-screen overflow-hidden bg-slate-50 pb-24 text-slate-900 sm:pb-0">
      <Seo title={`Checkout — Plano ${plan.name}`} description={`Finalize com segurança a assinatura do plano ${plan.name} CineStream.`} path={`/checkout/${plan.slug}`} noIndex />
      <header className="relative z-10 border-b border-slate-200 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" aria-label="Voltar à página inicial" className="inline-flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="h-8 w-8" aria-hidden="true" />
            <span className="text-lg font-bold tracking-tight text-slate-900">CineStream</span>
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" /> Compra segura
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1120px] px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-9">
        <div className="mb-5 flex items-center justify-between gap-4">
          <Link to="/#pricing" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Alterar plano
          </Link>
          <span className="hidden text-xs text-slate-500 sm:block">Ambiente de pagamento CineStream</span>
        </div>

        {!result?.pix && <div className="lg:hidden"><OrderSummary plan={plan} mobile /></div>}

        <div className="grid overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm lg:grid-cols-[350px_minmax(0,1fr)]">
          <OrderSummary plan={plan} />
          <section className="bg-white p-4 sm:p-8 lg:border-l lg:border-slate-200 lg:p-10 xl:p-12">
            {result?.pix ? (
              <div className="mx-auto max-w-xl py-3 text-center sm:py-6">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-purple-200 bg-purple-50 text-purple-700">
                  <QrCode className="h-7 w-7" aria-hidden="true" />
                </span>
                <h1 className="mt-5 text-2xl font-bold sm:text-3xl">Seu Pix está pronto</h1>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">Escaneie o QR Code pelo aplicativo do seu banco ou copie o código abaixo. A confirmação acontece automaticamente.</p>

                <div className="mx-auto my-6 w-fit rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                  {qrImage ? (
                    <img src={qrImage} alt="QR Code Pix" className="h-56 w-56 sm:h-64 sm:w-64" />
                  ) : (
                    <div className="flex h-56 w-56 items-center justify-center text-sm text-zinc-500 sm:h-64 sm:w-64">Gerando QR Code...</div>
                  )}
                </div>

                <Button type="button" onClick={copyPix} className="min-h-12 w-full bg-purple-500 font-bold text-white hover:bg-purple-400 sm:w-auto sm:px-8">
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? 'Código copiado' : 'Copiar código Pix'}
                </Button>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-medium text-amber-800">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Aguardando confirmação do pagamento
                </div>
                {pixExpiration && <p className="mt-3 text-xs text-slate-500">Pix válido até {pixExpiration}</p>}
                <p className="mt-4 text-xs text-slate-400">Pedido {result.refId}</p>
              </div>
            ) : (
              <form id="checkout-payment-form" onSubmit={submitPayment}>
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Finalize sua assinatura</h1>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">Informe seus dados para concluir o pedido com segurança.</p>
                </div>

                <fieldset className="mt-7 sm:mt-8">
                  <legend className="mb-3 text-sm font-semibold text-slate-900">Forma de pagamento</legend>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button type="button" aria-pressed={method === 'pix'} onClick={() => selectMethod('pix')} className={`relative flex min-h-[82px] items-center gap-2.5 rounded-lg border px-3 text-left transition sm:gap-3 sm:px-4 ${method === 'pix' ? 'border-purple-600 bg-purple-50 ring-1 ring-purple-600' : 'border-slate-200 bg-white hover:border-slate-400'}`}>
                      {method === 'pix' && <BadgeCheck className="absolute right-2.5 top-2.5 h-4 w-4 text-purple-700 sm:right-3 sm:top-3" />}
                      <QrCode className={`h-5 w-5 shrink-0 ${method === 'pix' ? 'text-purple-700' : 'text-slate-400'}`} />
                      <span><strong className="block text-sm text-slate-900">Pix</strong><span className="mt-1 block text-[10px] text-slate-500 sm:text-[11px]">Confirmação rápida</span></span>
                    </button>
                    <button type="button" aria-pressed={method === 'threeDs'} onClick={() => selectMethod('threeDs')} className={`relative flex min-h-[82px] items-center gap-2.5 rounded-lg border px-3 text-left transition sm:gap-3 sm:px-4 ${method === 'threeDs' ? 'border-purple-600 bg-purple-50 ring-1 ring-purple-600' : 'border-slate-200 bg-white hover:border-slate-400'}`}>
                      {method === 'threeDs' && <BadgeCheck className="absolute right-2.5 top-2.5 h-4 w-4 text-purple-700 sm:right-3 sm:top-3" />}
                      <WalletCards className={`h-5 w-5 shrink-0 ${method === 'threeDs' ? 'text-purple-700' : 'text-slate-400'}`} strokeWidth={1.7} />
                      <span><strong className="block text-sm text-slate-900">Cartão</strong><span className="mt-1 block text-[10px] text-slate-500 sm:text-[11px]">Compra autenticada</span></span>
                    </button>
                  </div>
                </fieldset>

                <div className="mt-7 border-t border-slate-200 pt-6 sm:mt-8 sm:pt-7">
                  <h2 className="mb-4 font-semibold text-slate-900 sm:mb-5">Dados do comprador</h2>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    <Field className="sm:col-span-2" label="Nome completo" name="name" value={form.name} onChange={updateField} autoComplete="name" placeholder="Digite seu nome" minLength="3" required />
                    <Field label="E-mail" type="email" name="email" value={form.email} onChange={updateField} autoComplete="email" placeholder="voce@email.com" required />
                    <Field label="Telefone com DDD" name="phone" value={form.phone} onChange={updateField} inputMode="tel" autoComplete="tel" placeholder="(11) 99999-9999" maxLength="15" required />
                    <Field className="sm:col-span-2" label="CPF ou CNPJ" name="docNumber" value={form.docNumber} onChange={updateField} inputMode="numeric" placeholder="000.000.000-00" maxLength="18" required />
                  </div>
                </div>

                {method === 'threeDs' && (
                  <div className="mt-7 border-t border-slate-200 pt-6 sm:mt-8 sm:pt-7">
                    <h2 className="mb-4 font-semibold text-slate-900 sm:mb-5">Cartão e endereço de cobrança</h2>
                    <div className="grid gap-4 sm:grid-cols-6 sm:gap-5">
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

                <label className="mt-7 flex cursor-pointer items-start gap-3 border-t border-slate-200 pt-5 text-xs leading-relaxed text-slate-600">
                  <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-purple-500" />
                  <span>Li e concordo com os <Link to="/termos" target="_blank" className="font-medium text-purple-700 underline underline-offset-2">Termos de Uso</Link>, a <Link to="/privacidade" target="_blank" className="font-medium text-purple-700 underline underline-offset-2">Política de Privacidade</Link> e as condições do plano.</span>
                </label>

                {error && <div role="alert" aria-live="polite" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
                <Button type="submit" disabled={loading || !sdkReady} className="mt-6 hidden min-h-14 w-full rounded-lg bg-purple-700 text-base font-semibold text-white shadow-sm transition hover:bg-purple-800 disabled:opacity-50 sm:inline-flex">
                  {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processando com segurança…</> : method === 'pix' ? <><QrCode className="mr-2 h-5 w-5" /> Gerar Pix de {plan.price}</> : <><LockKeyhole className="mr-2 h-5 w-5" /> Pagar {plan.price}</>}
                </Button>
                <p className="mt-3 hidden text-center text-[11px] text-slate-500 sm:block">Seus dados de pagamento são protegidos e processados pela Cakto.</p>
              </form>
            )}
          </section>

        </div>

        <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">Pagamento processado pela Cakto em ambiente protegido.</p>
      </main>

      {!result?.pix && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:hidden">
          <Button form="checkout-payment-form" type="submit" disabled={loading || !sdkReady} className="min-h-14 w-full rounded-lg bg-purple-700 text-sm font-semibold text-white hover:bg-purple-800 disabled:opacity-50">
            {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processando…</> : method === 'pix' ? <><QrCode className="mr-2 h-5 w-5" /> Gerar Pix de {plan.price}</> : <><LockKeyhole className="mr-2 h-5 w-5" /> Pagar {plan.price}</>}
          </Button>
          <p className="mt-1.5 text-center text-[10px] text-slate-500"><LockKeyhole className="mr-1 inline h-3 w-3 text-emerald-600" /> Pagamento protegido pela Cakto</p>
        </div>
      )}

      <footer className="relative z-10 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} CineStream · Compra protegida
      </footer>
    </div>
  );
};

export default Checkout;
