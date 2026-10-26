import { useState } from 'react';
import { BadgeCheck, Loader2, MessagesSquare, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { subscriptionPlans } from '@/data/subscriptionPlans';
import { trackButtonClick, trackPlanSelect } from '@/utils/analytics';

const PricingPlans = () => {
  const [redirectingPlan, setRedirectingPlan] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  const startCheckout = async (plan) => {
    setCheckoutError('');
    setRedirectingPlan(plan.slug);
    trackButtonClick(`Assinar ${plan.name}`, 'pricing');
    trackPlanSelect(plan.name, plan.price);

    try {
      if (!plan.checkoutUrl) throw new Error(`O checkout do plano ${plan.name} ainda não foi configurado.`);
      window.location.assign(plan.checkoutUrl);
    } catch (error) {
      setCheckoutError(error.message || 'Não foi possível abrir o checkout. Tente novamente.');
      setRedirectingPlan('');
    }
  };

  return (
    <section className="relative scroll-mt-16 overflow-hidden py-16 md:py-24" id="pricing" aria-labelledby="pricing-title">
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-900/15 via-black/10 to-background" />
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-300">Escolha sem pressa</p>
        <h2 id="pricing-title" className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Encontre o plano ideal</h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/60">Todos os planos dão acesso ao serviço. A principal diferença é o período contratado.</p>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <article
            key={plan.slug}
            className={`relative flex flex-col rounded-2xl border p-6 ${plan.highlighted ? 'border-purple-400/60 bg-purple-950/35 shadow-xl shadow-purple-950/20 xl:-translate-y-2' : 'border-white/10 bg-card/55'}`}
          >
            {plan.badge && <span className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-xs font-semibold ${plan.highlighted ? 'bg-purple-500 text-white' : 'border border-white/15 bg-background text-foreground/80'}`}>{plan.badge}</span>}

            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="mt-2 min-h-10 text-sm text-foreground/55">{plan.description}</p>
              <div className="mt-5 text-4xl font-bold">{plan.price}</div>
              <p className="mt-2 text-sm text-foreground/60">{plan.period}</p>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm">
                <p className="font-semibold text-purple-200">{plan.valuePresentation.eyebrow}</p>
                <p className="mt-1 text-foreground/75">Equivale a {plan.valuePresentation.monthlyEquivalent} por mês</p>
                <p className="mt-1 text-xs text-foreground/50">{plan.valuePresentation.detail}</p>
                {plan.valuePresentation.comparison && <p className="mt-2 text-xs text-foreground/50">{plan.valuePresentation.comparison}</p>}
                {plan.valuePresentation.savings && <p className="mt-1 text-sm font-semibold text-green-300">{plan.valuePresentation.savings}</p>}
              </div>
            </div>

            <Button
              type="button"
              disabled={Boolean(redirectingPlan)}
              onClick={() => startCheckout(plan)}
              className={`mb-6 w-full py-6 text-sm font-bold ${plan.highlighted ? 'bg-purple-500 text-white hover:bg-purple-400' : 'bg-white text-black hover:bg-white/90'}`}
            >
              {redirectingPlan === plan.slug && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              {redirectingPlan === plan.slug ? 'Abrindo checkout…' : `Assinar plano ${plan.name}`}
            </Button>

            <ul className="flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-foreground/70">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-400" strokeWidth={1.7} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {checkoutError && <p role="alert" className="mx-auto mt-6 max-w-xl rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200">{checkoutError}</p>}

      <div className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-foreground/50">
        <p className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" /> Pagamento processado em ambiente seguro.</p>
        <p className="mt-2">*A qualidade depende do conteúdo, dispositivo, televisão e conexão. Catálogo e disponibilidade podem variar. Ao contratar, você concorda com os <Link to="/termos" className="text-purple-300 underline underline-offset-4">Termos de Uso</Link>.</p>
      </div>

      <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-green-400/20 bg-green-600/10 p-5 text-center">
        <h3 className="font-semibold">Ainda não sabe qual plano escolher?</h3>
        <p className="mt-2 text-sm text-foreground/65">Confirme compatibilidade e condições com o atendimento antes de contratar.</p>
        <a
          href="https://wa.me/5543999748808?text=Olá!%20Quero%20ajuda%20para%20escolher%20um%20plano%20CineStream."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackButtonClick('Ajuda para escolher plano', 'pricing')}
          className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-green-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-green-500"
        >
          <MessagesSquare className="h-4 w-4" aria-hidden="true" /> Falar no WhatsApp
        </a>
      </div>
    </div>
    </section>
  );
};

export default PricingPlans;
