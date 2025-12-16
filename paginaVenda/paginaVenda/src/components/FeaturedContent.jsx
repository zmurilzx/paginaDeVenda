import { motion } from 'framer-motion';
import { Tv, DollarSign, Clock, Users } from 'lucide-react';

const FeaturedContent = () => {
  const stats = [
    { icon: <Tv size={28} />, value: '100.000+', label: 'Títulos' },
    { icon: <Users size={28} />, value: '15.847', label: 'Clientes' },
    { icon: <Clock size={28} />, value: '24/7', label: 'Disponibilidade' },
    { icon: <DollarSign size={28} />, value: 'R$0,65', label: 'Por dia' },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-pink-50/30 to-background z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 tracking-tight">
            Filmes <span className="gradient-text">Ainda em Cartaz</span>
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-3xl mx-auto mb-6 md:mb-8 font-light">
            Assista aos maiores lançamentos sem sair de casa. Enquanto outros pagam R$40+ por ingresso, você assiste ilimitadamente.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/70 border border-purple-200 rounded-lg p-3 md:p-6 text-center hover:border-purple-400 transition-all hover:scale-102 shadow-sm"
            >
              <div className="text-purple-400/80 mb-2 md:mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-xs text-foreground/50 uppercase tracking-wider font-light">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 border border-purple-200 rounded-xl p-4 md:p-8 text-center shadow-sm"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 tracking-tight">
            Compare e <span className="gradient-text">Economize</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <p className="text-foreground/50 font-medium text-xs md:text-sm mb-3 md:mb-4 uppercase tracking-wide">Plataformas Tradicionais</p>
              <div className="space-y-1.5 md:space-y-2 text-left text-foreground/60 text-xs md:text-sm font-light">
                <p>Netflix Premium: <span className="font-medium">R$55,90/mês</span></p>
                <p>Disney+: <span className="font-medium">R$43,90/mês</span></p>
                <p>Prime Video: <span className="font-medium">R$14,90/mês</span></p>
                <p>HBO Max: <span className="font-medium">R$34,90/mês</span></p>
              </div>
              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200">
                <p className="text-sm md:text-base font-bold text-foreground">R$149,60/mês</p>
                <p className="text-xs text-foreground/50 font-light">R$1.795,20/ano</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100/80 to-pink-100/80 rounded-lg p-4 md:p-6 border border-purple-300">
              <p className="text-purple-400/80 font-medium text-xs md:text-sm mb-3 md:mb-4 uppercase tracking-wide">CineStream2K</p>
              <div className="space-y-1.5 md:space-y-2 text-left text-foreground/70 text-xs md:text-sm font-light">
                <p><span className="font-medium gradient-text">+100.000 títulos</span></p>
                <p><span className="font-medium gradient-text">Todos os lançamentos</span></p>
                <p><span className="font-medium gradient-text">Qualidade 4K/FHD</span></p>
                <p><span className="font-medium gradient-text">Acesso vitalício</span></p>
              </div>
              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-purple-300">
                <p className="text-sm md:text-base font-bold gradient-text">R$235,90</p>
                <p className="text-xs text-purple-400/70 font-light">Pagamento único</p>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-8 bg-purple-100/50 border border-purple-300 rounded-lg p-4 md:p-5">
            <p className="text-base md:text-lg font-bold text-foreground mb-1 tracking-tight">
              Economia de <span className="text-lg md:text-xl gradient-text">R$1.559,30</span> no primeiro ano
            </p>
            <p className="text-xs text-foreground/50 font-light">Sem mensalidades futuras</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedContent;
