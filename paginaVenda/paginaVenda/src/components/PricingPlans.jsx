import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingPlans = () => {
  const plans = [
    {
      name: "Mensal",
      price: "R$29,90",
      period: "/mês",
      oldPrice: "R$49,90",
      description: "Ideal para testar o serviço",
      link: "https://pay.cakto.com.br/33pbxy7_610779",
      features: [
        "Streaming SD, HD, FHD, 4K",
        "+100.000 títulos disponíveis",
        "Zero anúncios e interrupções",
        "Cancele quando quiser"
      ],
      popular: false,
      savings: "Economia de R$20/mês"
    },
    {
      name: "Trimestral",
      price: "R$65,90",
      period: "ou 12x de R$5,50",
      oldPrice: "R$149,70",
      description: "Ideal para toda família",
      link: "https://pay.cakto.com.br/38db6w6_608242",
      features: [
        "Streaming SD, HD, FHD, 4K",
        "Múltiplos dispositivos simultâneos",
        "Conteúdo +18 liberado",
        "Zero anúncios",
        "Economia de 56% vs mensal"
      ],
      popular: false,
      savings: "Economia de R$83,80 (56%)"
    },
    {
      name: "Semestral",
      price: "R$89,90",
      period: "ou 12x de R$7,50",
      oldPrice: "R$299,40",
      description: "Mais escolhido pelos clientes",
      link: "https://pay.cakto.com.br/xkehep2_608252",
      features: [
        "Streaming SD, HD, FHD, 4K",
        "Acesso ilimitado em todos dispositivos",
        "Todo conteúdo +18 incluído",
        "Suporte VIP prioritário",
        "Bônus: Guia de configuração",
        "Economia de 70% vs mensal"
      ],
      popular: true,
      savings: "Economia de R$209,50 (70%)"
    },
    {
      name: "Anual",
      price: "R$189,90",
      period: "ou 12x de R$15,80",
      oldPrice: "R$598,80",
      description: "Melhor custo-benefício",
      link: "https://pay.cakto.com.br/3b87s8g_608254",
      features: [
        "Streaming SD, HD, FHD, 4K",
        "Dispositivos ilimitados",
        "Conteúdo adulto +18 completo",
        "Suporte VIP 24/7",
        "Lançamentos exclusivos",
        "3 bônus inclusos",
        "Economia de 68% vs mensal"
      ],
      popular: false,
      savings: "Economia de R$408,90 (68%)"
    },
    {
      name: "Vitalício",
      price: "R$235,90",
      period: "Pagamento único",
      oldPrice: "R$3.588,00",
      description: "Acesso vitalício garantido",
      link: "https://pay.cakto.com.br/39ink3t_605690",
      features: [
        "Acesso vitalício (nunca mais pague)",
        "Streaming SD, HD, FHD, 4K",
        "Dispositivos ilimitados",
        "Todo conteúdo +18 incluído",
        "Zero mensalidades futuras",
        "Suporte vitalício prioritário",
        "Todos os lançamentos incluídos",
        "5 bônus exclusivos",
        "Economia de +R$3.000 em 10 anos"
      ],
      popular: true,
      savings: "Economia de R$3.352,10 (93%)"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="pricing">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/40 via-purple-50/30 to-background z-0"></div>
      
      <motion.div 
        className="absolute top-40 left-10 w-72 h-72 rounded-full bg-purple-200/20 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-block bg-purple-500/10 border border-purple-500/30 rounded-lg px-6 py-2 mb-4">
            <p className="text-sm font-semibold text-purple-400 tracking-wide">PROMOÇÃO LIMITADA</p>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 tracking-tight">
            Escolha Seu <span className="gradient-text">Plano</span>
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto mb-2 md:mb-3 font-light">
            <strong className="text-purple-400 font-medium">15.847 clientes</strong> já economizaram milhares de reais
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-foreground/50 max-w-2xl mx-auto font-light">
            <span>Acesso completo</span>
            <span>•</span>
            <span>Pagamento seguro</span>
            <span>•</span>
            <span>Garantia 7 dias</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`pricing-card rounded-xl p-4 md:p-6 backdrop-blur-sm shadow-sm ${
                plan.popular ? 'pricing-popular' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg text-xs font-semibold shadow-lg uppercase tracking-wide"
                  >
                    Mais Vendido
                  </motion.div>
                </div>
              )}
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{plan.name}</h3>
              <div className="mb-2">
                {plan.oldPrice && (
                  <div className="text-xs md:text-sm text-foreground/50 line-through">{plan.oldPrice}</div>
                )}
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl md:text-4xl font-bold gradient-text">{plan.price}</span>
                </div>
                <span className="text-foreground/60 text-xs md:text-sm">{plan.period}</span>
              </div>
              {plan.savings && (
                <div className="bg-purple-500/10 text-purple-400/80 px-3 py-1 rounded-full text-xs font-medium mb-4">
                  {plan.savings}
                </div>
              )}
              <p className="text-foreground/70 font-medium mb-4 md:mb-6 text-xs md:text-sm">{plan.description}</p>

              <a href={plan.link} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className={`w-full mb-4 md:mb-6 font-medium text-xs md:text-sm py-4 md:py-6 relative overflow-hidden group tracking-tight ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg'
                        : 'bg-gradient-to-r from-purple-500/80 to-pink-500/80 hover:from-purple-600 hover:to-pink-600'
                    }`}
                  >
                    <span className="relative z-10">Garantir Plano {plan.name}</span>
                    {plan.popular && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    )}
                  </Button>
                </motion.div>
              </a>

              <ul className="space-y-2 md:space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400 mr-2 shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-foreground/70 font-light">{feature}</span>
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
          <div className="bg-gradient-to-r from-purple-100/60 to-pink-100/60 border border-purple-300 rounded-xl p-4 md:p-6 max-w-2xl mx-auto shadow-sm">
            <p className="text-xs md:text-sm font-medium mb-1">
              <span className="gradient-text">Garantia de 7 Dias</span>
            </p>
            <p className="text-foreground/50 text-xs font-light">
              Devolução integral sem burocracia
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPlans;
