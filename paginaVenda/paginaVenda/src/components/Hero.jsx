'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

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

  return (
    <section className="relative pt-20 pb-12 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-background z-0"></div>

      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-200/30 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-pink-200/30 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">

          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left mb-6 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg px-3 py-1.5 mb-3 md:mb-4">
              <p className="text-xs md:text-sm font-semibold text-purple-400 tracking-wide">OFERTA LIMITADA</p>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[1.1] tracking-tight">
              Economize <span className="gradient-text">+R$2.000/ano</span> em Streaming
            </h1>
            
            {/* Contador Regressivo */}
            <div className="mb-4 md:mb-6">
              <CountdownTimer variant="compact" />
            </div>

            <div className="bg-white/60 border-l-2 border-purple-500 p-4 md:p-6 mb-4 md:mb-6 rounded-lg shadow-sm">
              <p className="text-sm md:text-base lg:text-lg text-foreground/90 font-medium mb-2">
                <span className="text-purple-400">15.847 clientes</span> já cancelaram Netflix, Prime e Disney+
              </p>
              <p className="text-xs md:text-sm text-foreground/60 font-light">
                Assistindo tudo por apenas <span className="text-purple-400 font-medium">R$0,65/dia</span>
              </p>
            </div>
          </motion.div>

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
                    wistia-player[media-id='5gt55026re']:not(:defined) {
                      background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/5gt55026re/swatch');
                      display: block;
                      filter: blur(5px);
                      padding-top: 56.25%;
                    }
                  `}
                </style>
                <wistia-player media-id="5gt55026re" aspect="1.7777777777777777" />
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="w-full lg:w-1/2 text-center px-4 lg:text-left mb-10 lg:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className='text--3xl md:text-3xl font-bold mb-10 leading-tight'></h1>
              <motion.div 
                className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 rounded-2xl p-6 mb-8 relative overflow-hidden"
                animate={{ boxShadow: ['0 0 20px rgba(168, 85, 247, 0.3)', '0 0 40px rgba(168, 85, 247, 0.6)', '0 0 20px rgba(168, 85, 247, 0.3)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded">
                  LIMITADO
                </div>
                <h4 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 leading-tight tracking-tight">
                  Pagamento Único = Acesso
                  <span className="gradient-text"> Vitalício</span>
                </h4>
                <p className="text-xs md:text-sm text-foreground/60 mb-2 font-light">
                  Sem mensalidades • Sem surpresas
                </p>
                <div className="flex items-center gap-2 mt-2 md:mt-3 text-xs text-purple-400/80">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="font-light">23 vagas restantes</span>
                </div>
              </motion.div>

              <ul className="text-base md:text-lg text-left px-2 md:px-3 mb-6 md:mb-10 leading-relaxed space-y-3 md:space-y-4">
                {[
                  { text: '+100.000 Títulos', sub: 'Maior catálogo do Brasil' },
                  { text: 'Multiplataforma', sub: 'TV, Celular, Tablet, PC, Console' },
                  { text: 'Qualidade Premium', sub: '4K, FHD, UHD e SD disponíveis' },
                  { text: 'Lançamentos Exclusivos', sub: 'Filmes ainda em cartaz nos cinemas' },
                  { text: 'Suporte 24/7', sub: 'Atendimento via WhatsApp' },
                  { text: 'Acesso Vitalício', sub: 'Pagamento único, uso ilimitado' },
                  { text: 'Conteúdo Adulto', sub: 'Canais +18 inclusos' },
                  { text: 'Atualizações Semanais', sub: 'Novos títulos constantemente' },
                  { text: 'Sem Contratos', sub: 'Zero mensalidades e burocracia' },
                ].map((item, index) => (
                    <motion.li 
                    key={index} 
                    className="flex items-start gap-3 bg-secondary/5 p-3 rounded-lg hover:bg-secondary/10 transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="text-purple-400 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-foreground text-xs md:text-sm">{item.text}</p>
                      <p className="text-xs text-foreground/50 mt-0.5 font-light hidden md:block">{item.sub}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="space-y-4">
                <a
                  href="https://wa.me/5543999748808"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.03, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(34, 197, 94, 0)',
                        '0 0 0 10px rgba(34, 197, 94, 0.3)',
                        '0 0 0 20px rgba(34, 197, 94, 0)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 md:px-8 py-4 md:py-6 text-sm md:text-base font-medium rounded-lg shadow-lg relative overflow-hidden group tracking-tight">
                      <span className="relative z-10">Garantir Acesso Vitalício</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Button>
                  </motion.div>
                </a>
                <div className="bg-secondary/10 border border-purple-500/20 rounded-lg p-3 md:p-4 text-center space-y-2 md:space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                    <p className="text-xs text-foreground/70 font-light">
                      Apenas 23 vagas disponíveis
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs text-foreground/50 font-light">
                    <span>Pagamento seguro</span>
                    <span>•</span>
                    <span>Garantia 7 dias</span>
                    <span className="hidden md:inline">•</span>
                    <span className="hidden md:inline">Acesso imediato</span>
                  </div>
                  <p className="text-xs text-purple-400/70 font-light hidden md:block">
                    Bônus: Guia de instalação + Suporte VIP
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
