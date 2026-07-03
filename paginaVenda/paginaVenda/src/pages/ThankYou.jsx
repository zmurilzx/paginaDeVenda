import { useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ArrowRight, Check, CheckCircle2, Headphones, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import Logo from '@/components/Logo';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { getSubscriptionPlan } from '@/data/subscriptionPlans';
import { trackButtonClick } from '@/utils/analytics';

const readStoredPurchase = () => {
  try {
    return JSON.parse(window.sessionStorage.getItem('cinestream_last_purchase')) || {};
  } catch {
    return {};
  }
};

const ThankYou = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const purchase = useMemo(() => ({ ...readStoredPurchase(), ...(location.state || {}) }), [location.state]);
  const plan = getSubscriptionPlan(purchase.planSlug || searchParams.get('plano'));
  const whatsappText = encodeURIComponent(`Olá! Acabei de comprar o plano ${plan?.name || 'CineStream'}${purchase.refId ? `, pedido ${purchase.refId}` : ''}, e preciso de ajuda.`);

  return (
    <div className="min-h-screen overflow-hidden bg-[#0b0b10] text-white">
      <Seo title="Obrigado pela compra" description="Compra confirmada com sucesso na CineStream." path="/obrigado" noIndex />
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/[0.07] bg-[#0b0b10]/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" aria-label="CineStream — página inicial"><Logo /></Link>
          <span className="inline-flex items-center gap-2 text-xs text-white/45"><ShieldCheck className="h-4 w-4 text-green-400" /> Pagamento confirmado</span>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-20">
        <section className="overflow-hidden rounded-[2rem] border border-green-400/15 bg-[#111118]/90 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="border-b border-white/[0.07] px-6 py-10 text-center sm:px-10 md:py-14">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-400/10 text-green-400">
              <span className="absolute inset-0 animate-ping rounded-full bg-green-400/10" />
              <CheckCircle2 className="relative h-11 w-11" aria-hidden="true" />
            </div>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-green-300">Compra aprovada</p>
            <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Obrigado pela sua compra!</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
              {plan ? <>O pagamento do <strong className="text-white">Plano {plan.name}</strong> foi confirmado.</> : 'Seu pagamento foi confirmado.'} Agora nossa equipe seguirá com as orientações para você começar.
            </p>
            {purchase.refId && <p className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/45">Pedido: {purchase.refId}</p>}
          </div>

          <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-10">
              <h2 className="text-xl font-bold">O que acontece agora?</h2>
              <ol className="mt-7 space-y-6">
                <li className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-400/10 text-green-400"><Check className="h-4 w-4" /></span>
                  <div><h3 className="font-semibold">Pagamento confirmado</h3><p className="mt-1 text-sm leading-relaxed text-white/45">Seu pedido já foi registrado com segurança.</p></div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-300"><Mail className="h-4 w-4" /></span>
                  <div><h3 className="font-semibold">Confira seus canais de contato</h3><p className="mt-1 text-sm leading-relaxed text-white/45">As orientações serão enviadas pelos dados informados durante a compra.</p></div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-300"><Headphones className="h-4 w-4" /></span>
                  <div><h3 className="font-semibold">Conte com nosso suporte</h3><p className="mt-1 text-sm leading-relaxed text-white/45">Se precisar, fale com a equipe pelo WhatsApp para receber ajuda.</p></div>
                </li>
              </ol>
            </div>

            <aside className="border-t border-white/[0.07] bg-purple-950/15 p-6 sm:p-10 md:border-l md:border-t-0">
              <MessageCircle className="h-8 w-8 text-green-400" aria-hidden="true" />
              <h2 className="mt-5 text-xl font-bold">Precisa de ajuda?</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/50">Nossa equipe pode auxiliar com ativação, instalação e compatibilidade.</p>
              <a
                href={`https://wa.me/5543999748808?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick('Suporte pós-compra', 'thank-you')}
              >
                <Button className="mt-6 min-h-12 w-full bg-green-600 font-bold text-white hover:bg-green-500">
                  Falar no WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link to="/" className="mt-3 block text-center text-sm text-white/45 transition hover:text-white">Voltar para o site</Link>
            </aside>
          </div>
        </section>

        <p className="mt-7 text-center text-xs leading-relaxed text-white/30">Guarde a identificação do pedido caso precise entrar em contato com o suporte.</p>
      </main>
    </div>
  );
};

export default ThankYou;
