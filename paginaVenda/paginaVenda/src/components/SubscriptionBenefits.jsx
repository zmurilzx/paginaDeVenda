import { motion } from 'framer-motion';
import { CalendarDays, Gauge, LifeBuoy, Rocket } from 'lucide-react';

const benefits = [
  { icon: Gauge, title: 'Qualidade ajustável', description: 'Reprodução de SD a 4K conforme conteúdo, aparelho e conexão.' },
  { icon: CalendarDays, title: 'Período flexível', description: 'Opções para diferentes necessidades e tempos de acesso.' },
  { icon: Rocket, title: 'Ativação orientada', description: 'Instruções claras após a confirmação do pagamento.' },
  { icon: LifeBuoy, title: 'Suporte humano', description: 'Atendimento direto para instalação e compatibilidade.' },
];

const SubscriptionBenefits = () => (
  <section className="border-b border-white/[0.06] py-16 md:py-20" aria-labelledby="benefits-title">
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">O serviço</p>
        <h2 id="benefits-title" className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">Tudo o que você precisa, sem complicação</h2>
      </div>
      <div className="mx-auto grid max-w-7xl border-y border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <motion.article key={benefit.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="border-b border-white/[0.08] px-1 py-7 sm:px-6 lg:border-b-0 lg:border-r lg:last:border-r-0">
            <benefit.icon className="mb-5 h-5 w-5 text-purple-300" strokeWidth={1.6} aria-hidden="true" />
            <h3 className="mb-2 text-sm font-semibold">{benefit.title}</h3>
            <p className="text-sm leading-6 text-foreground/50">{benefit.description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default SubscriptionBenefits;
