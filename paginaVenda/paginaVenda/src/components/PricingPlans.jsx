import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingPlans = () => {
  const plans = [
    {
      name: "Mensal",
      price: "R$28,90",
      period: "/mês",
      oldPrice: "R$49,90",
      description: "Ideal para testar o serviço",
      link: "https://pay.cakto.com.br/32sawv8",
      features: [
        "Streaming SD, HD, FHD, 4K",
        "Acesso ilimitado",
        "Zero anúncios e interrupções",
        "Cancele quando quiser",
        "Ganha um mês em uma das plataformas Disney+, Netflix ou Amazon Prime etc ",
        "Sem contratos"
      ],
      popular: false,
      savings: "Economia de R$20/mês"
    },
    {
      name: "Semestral",
      price: "R$89,90",
      period: "ou 6x de R$14,98", 
      oldPrice: "R$149,90",
      description: "Boa opção para quem quer economizar",
      link: "https://pay.cakto.com.br/3dhz8j2_745136",
      features: [
        "Streaming SD, HD, FHD, 4K",
        "Dispositivos ilimitados",
        "Conteúdo adulto +18 completo",
        "Suporte VIP 24/7",
        "Atualização toda semana",
        "Ganha um mês na plataforma Disney+ ou Netflix ou Amazon Prime",
        "Economia de 50% vs mensal",
        "Sem contratos"
      ],
      popular: false,
      savings: "Economia de R$70,00 (50%)"
    },
    {
      name: "Anual",
      price: "R$159,90",
      period: "ou 12x de R$13,32",
      oldPrice: "R$299,90",
      description: "Melhor custo-benefício",
      link: "https://pay.cakto.com.br/3dhz8j2_745136",
      features: [
        "Streaming SD, HD, FHD, 4K",
        "Dispositivos ilimitados",
        "Conteúdo adulto +18 completo",
        "Suporte VIP 24/7",
        "Atualização toda semana",
        "Ganha um mês na plataforma Disney+ ou Netflix ou Amazon Prime",
        "Economia de 68% vs mensal",
        "Sem contratos"
      ],
      popular: false,
      savings: "Economia de R$408,90 (68%)"
    },
    {
      name: "Vitalício",
      price: "R$189,90",
      period: "Pagamento único",
      oldPrice: "R$299,90",
      description: "🏆 Único no mercado",
      link: "https://pay.cakto.com.br/tsfayhk_744174",
      features: [
        "✨ EXCLUSIVO: Único plano vitalício do Brasil",
        "Acesso vitalício para sempre",
        "Streaming SD, HD, FHD, 4K",
        "Todo conteúdo +18 incluído",
        "Zero mensalidades futuras",
        "Suporte vitalício prioritário",
        "Todos os lançamentos incluídos",
        "Bonûs exclusivo",
        "Sem contratos"
      ],
      popular: true,
      savings: "Economia de R$3.352,10 (93%)"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="pricing">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/15 via-pink-950/10 to-background z-0"></div>
      
      <motion.div 
        className="absolute top-40 left-10 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight leading-tight">
            Pare de Desperdiçar Dinheiro!
          </h2>
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto px-4">
            15.847 pessoas já cancelaram Netflix, Prime e Disney+ e economizaram milhares
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative pricing-card rounded-xl p-5 md:p-7 backdrop-blur-sm transition-all ${
                plan.popular ? 'pricing-popular border border-white/20' : 'border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-foreground text-background px-4 py-1 rounded-full text-xs font-semibold">
                    Mais Vendido
                  </div>
                </div>
              )}
              
              <div className="text-center mb-5">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-foreground/50 text-xs">{plan.description}</p>
              </div>

              <div className="mb-5 text-center">
                {plan.oldPrice && (
                  <div className="text-xs text-foreground/40 line-through mb-1">{plan.oldPrice}</div>
                )}
                <div className="mb-1">
                  <span className="text-4xl md:text-5xl font-bold">{plan.price}</span>
                </div>
                <span className="text-foreground/60 text-sm">{plan.period}</span>
              </div>

              {plan.savings && (
                <div className="bg-white/5 border border-white/10 text-foreground/70 px-3 py-1.5 rounded-lg text-xs font-medium mb-5 text-center">
                  {plan.savings}
                </div>
              )}

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

      </div>
    </section>
  );
};

export default PricingPlans;
