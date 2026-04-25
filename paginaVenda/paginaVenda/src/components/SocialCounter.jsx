import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Users, Star, TrendingUp } from 'lucide-react';

const SocialCounter = () => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const targetCount = 15000;
  const duration = 2000; // 2 seconds
  const stepTime = 50; // Update every 50ms
  const steps = duration / stepTime;
  const increment = targetCount / steps;

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let currentCount = 0;
      
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
          currentCount = targetCount;
          clearInterval(timer);
        }
        setCount(Math.floor(currentCount));
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, hasAnimated]);

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/3 to-background z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-purple-400" strokeWidth={2} />
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {count.toLocaleString('pt-BR')}+
              </span>
              <span className="text-foreground ml-2">clientes satisfeitos</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 mb-3">
                <Star className="w-6 h-6 text-purple-400" strokeWidth={2} />
              </div>
              <div className="text-2xl font-bold mb-1">4.9★</div>
              <div className="text-sm text-foreground/60">Avaliação média</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-3">
                <TrendingUp className="w-6 h-6 text-green-400" strokeWidth={2} />
              </div>
              <div className="text-2xl font-bold mb-1">98%</div>
              <div className="text-sm text-foreground/60">Taxa de satisfação</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 mb-3">
                <Users className="w-6 h-6 text-blue-400" strokeWidth={2} />
              </div>
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-sm text-foreground/60">Suporte disponível</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialCounter;
