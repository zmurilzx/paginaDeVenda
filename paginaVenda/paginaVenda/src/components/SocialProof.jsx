import { motion } from 'framer-motion';

const SocialProof = () => {
  const stats = [
    {
      number: "15.247+",
      label: "Assinantes ativos"
    },
    {
      number: "4.9/5",
      label: "Avaliação média"
    },
    {
      number: "50.000+",
      label: "Horas assistidas hoje"
    },
    {
      number: "3.000+",
      label: "Avaliações verificadas"
    }
  ];

  return (
    <section className="py-12 md:py-16 border-y border-white/5">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold mb-1">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-foreground/60">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
