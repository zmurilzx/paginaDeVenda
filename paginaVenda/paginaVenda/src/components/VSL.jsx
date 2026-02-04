import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VSL = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="vsl">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/10 to-background z-0"></div>
      
      <motion.div 
        className="absolute top-20 right-10 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Veja o <span className="gradient-text">Aplicativo na Prática</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20">
            <style>{`wistia-player[media-id='5gt55026re']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/5gt55026re/swatch'); display: block; filter: blur(5px); padding-top:56.56%; }`}</style>
            <wistia-player media-id="5gt55026re" aspect="1.7679558011049723"></wistia-player>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-sm md:text-base text-foreground/50 mb-4">
              ⚡ Oferta por tempo limitado - Não perca essa oportunidade
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-foreground/40">
              <span>✓ Sem compromisso</span>
              <span>•</span>
              <span>✓ Cancele quando quiser</span>
              <span>•</span>
              <span>✓ Acesso imediato</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VSL;
