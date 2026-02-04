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
      </div>
    </section>
  );
};

export default Hero;
