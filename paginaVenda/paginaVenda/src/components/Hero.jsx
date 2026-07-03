import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, MessageCircle, PlayCircle } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

const benefits = [
  'Planos para diferentes períodos',
  'Ativação após a confirmação do pagamento',
  'Suporte direto pelo WhatsApp',
];

const Hero = () => (
  <main className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(126,34,206,0.22),transparent_48%)]" />
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl text-center">
        <span className="mb-6 inline-flex rounded-full border border-purple-400/25 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-200">
          Planos a partir de R$28,40
        </span>
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Filmes, séries e canais em um só lugar
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/65 sm:text-lg md:text-xl">
          Escolha o plano ideal, conclua o pagamento em ambiente seguro e receba as orientações para começar.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#pricing" onClick={() => trackButtonClick('Ver planos', 'hero')} className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-purple-500 px-8 text-base font-bold text-white shadow-lg shadow-purple-950/30 transition hover:bg-purple-400 sm:w-auto">
            Ver planos e assinar <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <a href="#demonstracao" onClick={() => trackButtonClick('Ver demonstração', 'hero')} className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 text-base font-semibold transition hover:bg-white/10 sm:w-auto">
            <PlayCircle className="h-5 w-5" aria-hidden="true" /> Ver demonstração
          </a>
        </div>

        <ul className="mx-auto mt-8 grid max-w-3xl gap-3 text-left text-sm text-foreground/70 sm:grid-cols-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 rounded-lg bg-white/[0.03] p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" aria-hidden="true" />
              {benefit}
            </li>
          ))}
        </ul>

        <a href="https://wa.me/5543999748808?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20os%20planos%20CineStream." target="_blank" rel="noopener noreferrer" onClick={() => trackButtonClick('Tirar dúvida', 'hero')} className="mt-6 inline-flex items-center gap-2 text-sm text-foreground/60 underline-offset-4 hover:text-white hover:underline">
          <MessageCircle className="h-4 w-4 text-green-400" aria-hidden="true" /> Tem alguma dúvida? Fale com a equipe
        </a>
      </motion.div>
    </div>
  </main>
);

export default Hero;
