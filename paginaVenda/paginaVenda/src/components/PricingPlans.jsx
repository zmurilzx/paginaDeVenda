import { CheckCircle2, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import { subscriptionPlans } from '@/data/subscriptionPlans';
import { trackButtonClick, trackPlanSelect } from '@/utils/analytics';

const PricingPlans = () => (
  <section className="scroll-mt-16 py-16 md:py-24" id="pricing" aria-labelledby="pricing-title">
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">Planos</p>
        <h2 id="pricing-title" className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">Escolha o período ideal</h2>
        <p className="mt-4 text-foreground/55">O acesso é o mesmo. O que muda é a duração e o valor equivalente por mês.</p>
      </header>

      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        {subscriptionPlans.map((plan) => (
          <article key={plan.slug} className={`relative flex flex-col rounded-xl border p-6 ${plan.highlighted ? 'border-purple-400 bg-purple-500/[0.06]' : 'border-white/[0.09] bg-white/[0.015]'}`}>
            <div className="flex min-h-7 items-start justify-between gap-3">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              {plan.badge && <span className="rounded-md border border-purple-400/20 bg-purple-400/[0.08] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-purple-200">{plan.badge}</span>}
            </div>
            <p className="mt-3 min-h-10 text-sm leading-5 text-foreground/45">{plan.description}</p>

            <div className="my-6 border-y border-white/[0.08] py-5">
              <p className="text-xs text-foreground/40">Valor total</p>
              <div className="mt-1 text-3xl font-semibold tracking-[-0.03em]">{plan.price}</div>
              <p className="mt-2 text-xs text-purple-200">Equivale a {plan.valuePresentation.monthlyEquivalent}/mês</p>
            </div>

            <ul className="flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/60">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-purple-300" strokeWidth={1.6} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link to={`/checkout/${plan.slug}`} onClick={() => { trackButtonClick(`Assinar ${plan.name}`, 'pricing'); trackPlanSelect(plan.name, plan.price); }} className={`mt-7 inline-flex min-h-12 items-center justify-center rounded-lg border px-4 text-sm font-semibold transition ${plan.highlighted ? 'border-purple-500 bg-purple-500 text-white hover:bg-purple-400' : 'border-white/15 text-white hover:border-white/30 hover:bg-white/[0.03]'}`}>
              Escolher {plan.name.toLowerCase()}
            </Link>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-3xl text-xs leading-relaxed text-foreground/40">
        <p className="inline-flex items-center gap-2"><LockKeyhole className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" /> Pagamento processado pela Cakto.</p>
        <p className="mt-2">*Qualidade, catálogo e disponibilidade dependem do conteúdo, dispositivo e conexão. Consulte os <Link to="/termos" className="text-purple-300 underline underline-offset-4">Termos de Uso</Link>.</p>
      </div>
    </div>
  </section>
);

export default PricingPlans;
