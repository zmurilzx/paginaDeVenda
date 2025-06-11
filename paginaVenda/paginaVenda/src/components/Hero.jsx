'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Hero = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://fast.wistia.com/player.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://fast.wistia.com/embed/ws7xaa44sm.js';
    script2.async = true;
    script2.type = 'module';
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-purple-900/20 z-0"></div>

      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-pink-600/10 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Texto lateral */}
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Ganhe acesso<span className="gradient-text"> VITALÍCIO</span> a <span className="gradient-text"> Canais Nacionais, Séries e Filmes agora mesmo </span>
            </h1>
            <ul className="text-lg font-bold mb-8 leading-relaxed">
              <li>&bull; Mais de <span className='gradient-text'>100 mil Canais, Séries e Filmes</span></li>
              <li>&bull; Multi-plataforma, <span className='gradient-text'>assista de qualquer dispositivo</span></li>
              <li>&bull; Qualidades <span className='gradient-text'>4K, FHD, UHD, SD</span></li>
              <li>&bull; Assista filmes <span className='gradient-text'>que ainda estão no Cinema</span></li>
              <li>&bull; Suporte <span className='gradient-text'>Vitalício</span></li>
              <li>&bull; Acesso <span className='gradient-text'>Imediato</span></li>
            </ul>
            <a href="https://wa.me/5543999748808" target="_blank" rel="noopener noreferrer">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Button className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-900 hover:to-green-900 text-white px-8 py-7 text-lg rounded-full shadow-lg">
                 Enviar mensagem no WhatsApp
                </Button>
              </motion.div>
            </a>
            <p className="text-sm text-foreground/60 mt-4">
              Não é necessário cartão de crédito. Cancele a qualquer momento.
            </p>
          </motion.div>

          {/* Novo vídeo Wistia */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-background rounded-2xl overflow-hidden shadow-2xl">
                <style>
                  {`
                    wistia-player[media-id='ws7xaa44sm']:not(:defined) {
                      background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/ws7xaa44sm/swatch');
                      display: block;
                      filter: blur(5px);
                      padding-top: 56.25%;
                    }
                  `}
                </style>
                <wistia-player media-id="ws7xaa44sm" aspect="1.7777777777777777" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
