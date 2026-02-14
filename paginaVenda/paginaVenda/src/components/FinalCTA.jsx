import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => {
  const scrollToPlans = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-10 md:p-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Não Perca Esta Oportunidade Única!
            </h2>
            <p className="text-base md:text-lg text-foreground/70 mb-6 max-w-2xl mx-auto px-4">
              Mais de 15.847 clientes já garantiram acesso vitalício. Seja o próximo a economizar milhares de reais!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={scrollToPlans}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-base md:text-lg font-bold rounded-xl w-full sm:w-auto transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Garantir Meu Acesso Agora
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.a
                href="https://wa.me/5543999748808?text=Quero%20garantir%20meu%20acesso%20vitalício%20ao%20CineStream!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-base md:text-lg font-bold rounded-xl w-full sm:w-auto transition-all shadow-lg"
              >
                Tirar Dúvidas no WhatsApp
              </motion.a>
            </div>

            <p className="text-xs text-foreground/50 mt-8">
              ⚡ Ativação imediata • 🔒 Pagamento 100% seguro • 🎯 Único plano vitalício do Brasil
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
