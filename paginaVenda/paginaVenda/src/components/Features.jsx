import { motion } from 'framer-motion';
import { Tv, Smartphone, Download, Clock, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Tv,
      title: "Qualidade 4K",
      description: "Assista em resolução SD, HD, FHD e 4K"
    },
    {
      icon: Zap,
      title: "Sem Travamentos",
      description: "Streaming fluido e sem interrupções"
    },
    {
      icon: Download,
      title: "Catálogo Completo",
      description: "Milhares de filmes e séries disponíveis"
    },
    {
      icon: Clock,
      title: "Atualizações Semanais",
      description: "Novos conteúdos toda semana"
    },
    {
      icon: Smartphone,
      title: "Disponível em Todos Dispositivos",
      description: "Assista em celular, tablet, TV e computador"
    },
    {
      icon: Zap,
      title: "Acesso Instantâneo",
      description: "Comece a assistir imediatamente"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
            Por Que Escolher o CineStream?
          </h2>
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto px-4">
            Tudo o que você precisa para uma experiência completa de streaming
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6 hover:bg-card/60 transition-all"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 mb-4">
                <feature.icon className="w-6 h-6 text-foreground/80" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
