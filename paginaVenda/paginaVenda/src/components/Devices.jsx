
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

      </div>
    </section>
  );
};

export default Devices;
