
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Assista em Qualquer <span className="gradient-text">Dispositivo</span></h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Assista em seus dispositivos favoritos em casa ou em qualquer lugar. Disponível em praticamente qualquer tela.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {devices.map((device, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="device-icon mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-purple-500/10 rounded-full text-purple-400">
                {device.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{device.name}</h3>
              <p className="text-sm text-foreground/60">{device.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-background z-10"></div>
          
          <img  className="w-full h-[300px] object-cover" alt="Múltiplos dispositivos exibindo o serviço de streaming" src="https://i0.wp.com/assets.b9.com.br/wp-content/uploads/2016/10/netflix-catalogo.jpg?fit=1060%2C596&ssl=1" />
          
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4">
              <div className="max-w-lg">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Assista de qualquer dispositivo e de onde estiver</h3>
                <p className="text-foreground/80 mb-2">
                  Comece a assistir na sua TV, pause e continue no seu celular ou tablet. Sua lista e progresso são sincronizados em todos os seus dispositivos.
                </p>
                <p className="text-sm text-foreground/60">
                Assista até mesmo quando estiver em trânsito.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Devices;
