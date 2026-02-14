import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const VerifiedBadge = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4"
            >
              <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={2.5} />
            </motion.div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Plataforma Mais Estável do Mercado
            </h3>
            
            <p className="text-foreground/60 text-sm md:text-base mb-6 max-w-lg mx-auto">
              99,9% de uptime garantido. Mais de 15 mil clientes assistindo sem interrupções.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-foreground/70">Servidores robustos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-foreground/70">Zero quedas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-foreground/70">Streaming contínuo</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VerifiedBadge;
