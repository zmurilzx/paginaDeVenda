import { motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle, PlayCircle } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

const benefits = [
  'Planos flexíveis',
  'Ativação após o pagamento',
  'Suporte pelo WhatsApp',
];

const Hero = () => (
  <main className="relative overflow-hidden border-b border-white/[0.06] pb-16 pt-28 md:pb-24 md:pt-36">
    <div className="absolute left-1/2 top-0 -z-10 h-px w-[70%] -translate-x-1/2 bg-purple-400/40 shadow-[0_0_100px_35px_rgba(168,85,247,0.10)]" />
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mx-auto max-w-5xl text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-purple-300">Assinaturas a partir de R$28,40</p>
        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
          Filmes, séries e canais.<br className="hidden sm:block" /> Uma experiência simples.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/60 sm:text-lg md:text-xl">
          Escolha o período, finalize em um ambiente protegido e receba as orientações para começar.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#pricing" onClick={() => trackButtonClick('Ver planos', 'hero')} className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-lg bg-purple-500 px-8 text-sm font-semibold text-white transition hover:bg-purple-400 sm:w-auto">
            Ver planos <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </a>
          <a href="#demonstracao" onClick={() => trackButtonClick('Ver demonstração', 'hero')} className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-lg border border-white/15 px-8 text-sm font-semibold text-white/85 transition hover:border-white/30 hover:bg-white/[0.03] sm:w-auto">
            <PlayCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" /> Assistir demonstração
          </a>
        </div>

        <ul className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-x-7 gap-y-3 text-sm text-foreground/55 sm:flex-row">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" aria-hidden="true" />
              {benefit}
            </li>
          ))}
        </ul>

        <a href="https://wa.me/5543999748808?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20os%20planos%20CineStream." target="_blank" rel="noopener noreferrer" onClick={() => trackButtonClick('Tirar dúvida', 'hero')} className="mt-7 inline-flex items-center gap-2 text-sm text-foreground/45 transition hover:text-white">
          <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" /> Falar com a equipe
        </a>
      </motion.div>
    </div>
  </main>
);

export default Hero;
