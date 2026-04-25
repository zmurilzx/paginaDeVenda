import { motion } from 'framer-motion';
import { ShieldCheck, Crown, Globe, RefreshCw, MonitorSmartphone, MessageCircle } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "O app mais estável do mercado",
      description: "Sem travamentos, sem quedas. O aplicativo mais estável que você vai encontrar, com performance de verdade."
    },
    {
      icon: Crown,
      title: "Único com plano vitalício",
      description: "Pague uma vez só e tenha acesso para sempre. Somos o único serviço do mercado com plano vitalício."
    },
    {
      icon: Globe,
      title: "Funciona fora do Brasil",
      description: "Mora no exterior? Sem problema. Acesse todo o conteúdo brasileiro de qualquer lugar do mundo."
    },
    {
      icon: RefreshCw,
      title: "Atualização semanal",
      description: "Assista de casa filmes que ainda estão no cinema! Sempre conteúdo novo, toda semana."
    },
    {
      icon: MonitorSmartphone,
      title: "Qualquer dispositivo",
      description: "Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, celular e muito mais."
    },
    {
      icon: MessageCircle,
      title: "Suporte direto",
      description: "Suporte direto com proprietário por WhatsApp, 24h!"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/5 to-background z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Confira os benefícios
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all overflow-hidden"
            >
              
              <div className="relative z-10">
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold mb-4 min-h-[60px]">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-foreground/70 mb-8 leading-relaxed min-h-[80px]">
                  {benefit.description}
                </p>

                {/* Icon at bottom */}
                <div className="flex justify-center mt-auto">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl border border-white/10">
                    <benefit.icon className="w-10 h-10 text-white/70" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
