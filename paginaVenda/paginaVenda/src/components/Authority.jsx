import { motion } from 'framer-motion';
import { Shield, Clock, Users, Award } from 'lucide-react';

const Authority = () => {
  const badges = [
    {
      icon: Shield,
      text: "Pagamento 100% Seguro"
    },
    {
      icon: Clock,
      text: "Suporte 24/7"
    },
    {
      icon: Users,
      text: "Ativação Instantânea"
    },
    {
      icon: Award,
      text: "Melhor Custo-Benefício 2026"
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.02]"
            >
              <badge.icon className="w-6 h-6 text-foreground/60" strokeWidth={1.5} />
              <p className="text-xs md:text-sm text-foreground/70 leading-tight">
                {badge.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Authority;
