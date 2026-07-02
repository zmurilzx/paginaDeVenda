import { motion } from 'framer-motion';
import { CalendarRange, Headphones, MonitorPlay, Zap } from 'lucide-react';

const benefits = [
  { icon: MonitorPlay, title: 'Qualidade ajustável', description: 'Opções de reprodução de SD a 4K, conforme o conteúdo, o dispositivo e sua conexão.' },
  { icon: CalendarRange, title: 'Você escolhe o período', description: 'Compare planos mensal, semestral e de pagamento único.' },
  { icon: Zap, title: 'Ativação simplificada', description: 'Após a confirmação do pagamento, você recebe as orientações para começar.' },
  { icon: Headphones, title: 'Suporte pelo WhatsApp', description: 'Canal direto para tirar dúvidas sobre acesso, instalação e compatibilidade.' },
];

const SubscriptionBenefits = () => (
  <section className="border-y border-white/5 bg-white/[0.015] py-16" aria-labelledby="benefits-title">
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-300">O que você recebe</p>
        <h2 id="benefits-title" className="text-3xl font-bold md:text-4xl">Mais simples para escolher e começar</h2>
      </div>
      <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <motion.article key={benefit.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-2xl border border-white/10 bg-card/50 p-6">
            <benefit.icon className="mb-4 h-8 w-8 text-purple-400" aria-hidden="true" />
            <h3 className="mb-2 font-semibold">{benefit.title}</h3>
            <p className="text-sm leading-relaxed text-foreground/60">{benefit.description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default SubscriptionBenefits;
