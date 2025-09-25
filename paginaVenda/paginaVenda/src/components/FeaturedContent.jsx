import { motion } from 'framer-motion';

const FeaturedContent = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb- text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Pare de pagar por várias plataformas e <span className="gradient-text">assista tudo em uma só!</span></h2>
          <p className="text-foreground/70 max-w-3xl mx-auto">
            Conteúdo exclusivo que ainda estão no cinema você assiste de casa!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedContent;
