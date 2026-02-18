import { motion } from 'framer-motion';
import { Zap, Tv, Film, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Área de esportes",
      description: "Futebol, SporTV, ESPN, Combate, Premiere etc"
    },
    {
      icon: Tv,
      title: "Área de streamings",
      description: "Netflix, Prime, Disney+, Max, HBO, Star+"
    },
    {
      icon: Film,
      title: "Filmes por gênero",
      description: "Ação, Comédia, Terror, Drama, Romance, Suspense etc"
    },
    {
      icon: Users,
      title: "Conteúdo para todas as idades",
      description: "Conteúdo seguro para crianças"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-5 hover:border-purple-500/40 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-all">
                  <feature.icon className="w-5 h-5 text-purple-400" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-1.5 text-white">{feature.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
