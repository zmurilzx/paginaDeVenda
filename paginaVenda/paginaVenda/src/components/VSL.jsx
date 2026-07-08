import { useRef } from 'react';
import { motion } from 'framer-motion';
import { trackVideoPlay } from '@/utils/analytics';

const VSL = () => {
  const videoTracked = useRef(false);

  const handleVideoInteraction = () => {
    if (!videoTracked.current) {
      videoTracked.current = true;
      trackVideoPlay();
    }
  };

  return (
    <section className="relative scroll-mt-16 overflow-hidden py-16 md:py-24" id="demonstracao">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-900/5 to-background z-0"></div>

      <motion.div
        className="absolute top-20 right-10 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight leading-tight">
            Tenha acesso a tudo isso por 28$
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/60">Assista à demonstração antes de escolher seu plano.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-sm"
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <div className="aspect-[9/16] bg-black" onPointerDown={handleVideoInteraction}>
              <wistia-player media-id="5gt55026re" aria-label="Apresentação em vídeo da CineStream" style={{ display: 'block', width: '100%', height: '100%' }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VSL;
