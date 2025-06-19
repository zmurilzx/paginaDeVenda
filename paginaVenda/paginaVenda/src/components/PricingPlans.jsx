import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingPlans = () => {
  const plans = [
    {
      name: "Mensal",
      price: "R$29,90",
      period: "por mês",
      description: "Perfeito para indivíduos",
      features: [
        "Streaming SD, HD",
        "Acesso a todo o conteúdo",
        "Experiência sem anúncios",
        "Cancele a qualquer momento"
      ],
      popular: false
    },
    {
      name: "Trimestral",
      price: "R$65,90 ou 12x de R$5,50",
      period: "por mês",
      description: "Melhor para famílias",
      features: [
        "Streaming 4K Ultra HD",
        "Acesso simultâneo",
        "Acesso a todo o conteúdo, incluindo +18",
        "Experiência sem anúncios",
        "Cancele a qualquer momento"
      ],
      popular: false
    },
    {
      name: "Semestral",
      price: "R$89,90 ou 12x de R$7,50",
      period: "por mês",
      description: "Para o fã definitivo",
      features: [
        "Streaming 4K Ultra HD + HDR",
        "Acesso simultâneo",
        "Acesso a todo o conteúdo, incluindo +18",
        "Acesso antecipado a estreias",
        "Experiência sem anúncios",
        "Cancele a qualquer momento"
      ],
      popular: true
    },
    {
      name: "Anual",
      price: "R$189,90 ou 12x de R$15,80",
      period: "por mês",
      description: "Para o maratoneiro",
      features: [
        "Streaming 4K Ultra HD + HDR",
        "Acesso simultâneo",
        "Acesso a todo o conteúdo, incluindo adultos",
        "Experiência sem anúncios",
        "Cancele a qualquer momento"
      ],
      popular: false
    },
    {
      name: "Vitalício",
      price: "R$235,90 ou 12x de R$12,75",
      period: "por mês",
      description: "Amante do streaming",
      features: [
        "Streaming 4K Ultra HD + HDR",
        "Acesso simultâneo",
        "Acesso a todo o conteúdo, incluindo exclusivos",
        "Experiência sem anúncios",
        "Cancele a qualquer momento",
        "Sem pagamentos recorrentes",
        "Suporte vitalício"
      ],
      popular: true
    },
    {
      name: "Vitalício P2P",
      price: "R$449,90 ou 12x de R$37,50",
      period: "por mês",
      description: "Amante do streaming",
      features: [
        "Streaming 4K Ultra HD + HDR",
        "Acesso simultâneo",
        "Acesso a todo o conteúdo, incluindo exclusivos",
        "Experiência sem anúncios",
        "Cancele a qualquer momento",
        "Sem pagamentos recorrentes",
        "Suporte vitalício"
      ],
      popular: true
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="pricing">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-900/5 to-background z-0"></div>
      
      <motion.div 
        className="absolute top-40 left-10 w-72 h-72 rounded-full bg-purple-600/5 blur-3xl"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Escolha Seu <span className="gradient-text">Plano</span></h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Selecione o plano perfeito para suas necessidades de entretenimento. Todos os planos incluem nossa biblioteca de conteúdo completa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`pricing-card rounded-xl p-6 bg-secondary/10 backdrop-blur-sm ${plan.popular ? 'pricing-popular' : ''}`}
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-foreground/60 ml-1">{plan.period}</span>
              </div>
              <p className="text-foreground/70 mb-6">{plan.description}</p>
              
              <a href="https://wa.me/5543999748808" target="_blank" rel="noopener noreferrer">
              <Button className={`w-full mb-6 ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : ''}`}>
                Conheça o Plano {plan.name}
              </Button>
              </a>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-purple-500 mr-2 shrink-0" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-foreground/60 text-sm">
          Sem contratos, cancele a qualquer momento.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPlans;
