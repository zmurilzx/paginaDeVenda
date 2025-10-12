'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react'; // ✅ Ícone de concluído

const Hero = () => {
  useEffect(() => {
    // --- Meta Pixel Code ---
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', '1786682021966649');
    window.fbq('track', 'PageView');

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

    // --- Adiciona o noscript fallback ---
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=1786682021966649&ev=PageView&noscript=1"
      />
    `;
    document.body.appendChild(noscript);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      document.body.removeChild(noscript);
    };
  }, []);

  // --- Evento do clique no botão WhatsApp (Lead) ---
  const handleWhatsAppClick = () => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-purple-900/20 z-0"></div>

      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-pink-600/10 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">

          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left mb-2 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-3xl font-bold mb-10 leading-tight">
              Assista ao vídeo abaixo e garanta já seu acesso!
              <span className="gradient-text"></span>
            </h1>
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
              <h4 className="text-3xl md:text-3xl font-bold mb-10 leading-tight">
                Pague uma única vez e tenha acesso
                <span className="gradient-text"> VITALÍCIO!</span>
              </h4>

              <ul className="text-1xl md:text-1xl text-left px-3 mb-10 leading-tight space-y-1">
                {[
                  '100 MIL EM CANAIS, FILMES E SÉRIES',
                  'FUNCIONA EM QUALQUER DISPOSITIVO',
                  '4K, FHD, UHD, SD',
                  'ACESSO A FILMES QUE ESTÃO NO CINEMA',
                  'SUPORTE 24H',
                  'ACESSO VITALÍCIO',
                  'DIVERSOS CANAIS ADULTOS 🔥',
                  'ATUALIZAÇÕES TODA SEMANA',
                  'SEM CONTRATOS, SEM MENSALIDADES',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item.replace(
                          /(100 MIL|QUALQUER DISPOSITIVO|4K, FHD, UHD, SD|NO CINEMA|24H|VITALÍCIO|CANAIS ADULTOS|TODA SEMANA|CONTRATOS|MENSALIDADES)/g,
                          '<span class="gradient-text">$1</span>'
                        ),
                      }}
                    />
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/5543999748808"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Button className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-900 hover:to-green-900 text-white px-8 py-7 text-lg rounded-full shadow-lg">
                    Enviar mensagem no WhatsApp
                  </Button>
                </motion.div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
