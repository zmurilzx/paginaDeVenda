'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const Hero = () => {
  useEffect(() => {
    // --- Scripts do vídeo Wistia ---
    const script1 = document.createElement('script');
    script1.src = 'https://fast.wistia.com/player.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://fast.wistia.com/embed/5gt55026re.js';
    script2.async = true;
    script2.type = 'module';
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const scrollToPlans = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-20 pb-0 md:pt-24 md:pb-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/15 via-pink-950/10 to-background z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg px-4 py-2 mb-4">
            <p className="text-xs md:text-sm font-semibold text-purple-400 tracking-wide">OFERTA LIMITADA - APENAS HOJE</p>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight tracking-tight">
            Economize <span className="gradient-text">+R$2.000/ano</span> em Streaming
          </h1>

          <p className="text-base md:text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            <span className="text-purple-400 font-semibold">15.847 clientes</span> já cancelaram Netflix, Prime e Disney+ e estão assistindo tudo por apenas <span className="text-purple-400 font-semibold">R$0,65/dia</span>
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={scrollToPlans}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 md:px-12 py-6 md:py-8 text-base md:text-lg font-bold rounded-lg shadow-2xl mb-8"
            >
              Ver Planos e Preços
            </Button>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {[
              { text: '+100.000 Títulos', icon: '🎬' },
              { text: 'Qualidade 4K', icon: '📺' },
              { text: 'Sem Anúncios', icon: '🚫' },
              { text: 'Suporte 24/7', icon: '💬' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/60 border border-purple-500/30 rounded-lg p-4 text-center"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-xs md:text-sm font-medium text-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
