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
    <section className="scroll-mt-16 py-16 md:py-24" id="demonstracao">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">Demonstração</p>
          <h2 className="mb-3 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            Veja a experiência por dentro
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
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black">
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
