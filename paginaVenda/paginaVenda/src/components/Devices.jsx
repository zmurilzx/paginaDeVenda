
import React from 'react';
import { motion } from 'framer-motion';
import { Tv, Smartphone, Tablet, Laptop, Monitor } from 'lucide-react';

const Devices = () => {
  const devices = [
    {
      icon: <Tv size={40} />,
      name: "Smart TVs",
      description: "Samsung, LG, Sony, Fire TV, Android TV"
    },
    {
      icon: <Smartphone size={40} />,
      name: "Celulares e Tablets",
      description: "iOS, Android, iPad"
    },
    {
      icon: <Laptop size={40} />,
      name: "Computadores",
      description: "Chrome, Safari, Firefox, Edge"
    },
    {
      icon: <Monitor size={40} />,
      name: "Consoles de Jogo",
      description: "PlayStation, Xbox, Nintendo Switch"
    },
    {
      icon: <Tablet size={40} />,
      name: "Dispositivos de Streaming",
      description: "Roku, Chromecast, Apple TV"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 tracking-tight">
            Assista em <span className="gradient-text">Qualquer Lugar</span>
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto font-light">
            Comece na TV, continue no celular, termine no tablet. Seu entretenimento te acompanha onde você estiver.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {devices.map((device, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="device-icon mx-auto mb-3 md:mb-4 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-purple-500/10 rounded-full text-purple-400">
                {device.icon}
              </div>
              <h3 className="text-sm md:text-base font-semibold mb-1 md:mb-2">{device.name}</h3>
              <p className="text-xs text-foreground/50 font-light hidden md:block">{device.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 md:mt-16 relative rounded-xl md:rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-background z-10"></div>
          
          <img  className="w-full h-[300px] object-cover" alt="Múltiplos dispositivos exibindo o serviço de streaming" src="https://i0.wp.com/assets.b9.com.br/wp-content/uploads/2016/10/netflix-catalogo.jpg?fit=1060%2C596&ssl=1" />
          
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4">
              <div className="max-w-lg">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 tracking-tight">
                  <span className="gradient-text">Sincronização Perfeita</span>
                </h3>
                <p className="text-foreground/70 mb-2 md:mb-3 text-sm md:text-base font-light">
                  Comece a assistir na sua TV, pause e continue no celular ou tablet. Tudo sincronizado automaticamente.
                </p>
                <ul className="text-foreground/60 text-xs md:text-sm space-y-1 font-light hidden md:block">
                  <li>• Sua lista de favoritos sempre atualizada</li>
                  <li>• Continue de onde parou em qualquer tela</li>
                  <li>• Até 3 dispositivos simultâneos</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Devices;
