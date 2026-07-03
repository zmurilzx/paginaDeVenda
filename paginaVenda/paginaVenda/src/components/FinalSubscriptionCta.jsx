import { ArrowUpRight, MessagesSquare } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

const FinalSubscriptionCta = () => (
  <section className="py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-950/80 to-card p-8 text-center md:p-14">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_45%)]" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold md:text-5xl">Pronto para escolher seu plano?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/65">Compare as opções, confira todas as condições e finalize pelo checkout seguro.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#pricing" onClick={() => trackButtonClick('Escolher plano', 'final-cta')} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-purple-500 px-8 font-bold text-white hover:bg-purple-400">
              Escolher meu plano <ArrowUpRight className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
            </a>
            <a href="https://wa.me/5543999748808?text=Olá!%20Preciso%20de%20ajuda%20para%20escolher%20um%20plano." target="_blank" rel="noopener noreferrer" onClick={() => trackButtonClick('Ajuda para escolher', 'final-cta')} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 font-semibold hover:bg-white/10">
              <MessagesSquare className="h-5 w-5 text-green-400" strokeWidth={1.7} aria-hidden="true" /> Falar com a equipe
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FinalSubscriptionCta;
