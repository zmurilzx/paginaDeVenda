import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

const FinalSubscriptionCta = () => (
  <section className="py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 border-y border-white/[0.08] py-12 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Escolha seu plano com segurança</h2>
          <p className="mt-4 max-w-2xl text-foreground/55">Compare as opções, revise as condições e finalize no checkout protegido.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <a href="#pricing" onClick={() => trackButtonClick('Escolher plano', 'final-cta')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-purple-500 px-7 text-sm font-semibold text-white transition hover:bg-purple-400">Escolher plano <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} /></a>
          <a href="https://wa.me/5543999748808?text=Olá!%20Preciso%20de%20ajuda%20para%20escolher%20um%20plano." target="_blank" rel="noopener noreferrer" onClick={() => trackButtonClick('Ajuda para escolher', 'final-cta')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/15 px-7 text-sm font-semibold transition hover:border-white/30"><MessageCircle className="h-4 w-4" strokeWidth={1.7} /> Falar com a equipe</a>
        </div>
      </div>
    </div>
  </section>
);

export default FinalSubscriptionCta;
