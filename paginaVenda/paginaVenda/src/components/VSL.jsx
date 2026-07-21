import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessagesSquare } from 'lucide-react';
import { trackButtonClick, trackVideoPlay } from '@/utils/analytics';

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
            Tenha acesso a todo esse conteúdo POR APENAS 28$
          </h2>
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

          <div className="mt-8 grid gap-3">
            <a
              href="#pricing"
              onClick={() => trackButtonClick('Ver planos', 'vsl')}
              className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 text-base font-semibold text-white transition-colors hover:bg-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Ver planos e assinar
              <ArrowUpRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/5543999748808?text=Como%20funciona%20o%20app%3F"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('Falar no WhatsApp', 'vsl')}
              className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 text-base font-semibold text-white transition-colors hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <MessagesSquare className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VSL;
