import { motion } from 'framer-motion';

const Commitment = () => {
  return (
    <section className="py-12 md:py-16 border-y border-white/5">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            Junte-se a mais de 15 mil pessoas que já economizam com o CineStream
          </h3>
          <p className="text-sm md:text-base text-foreground/60 mb-6">
            Milhares de famílias brasileiras já cancelaram suas assinaturas caras e escolheram a solução mais inteligente
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs md:text-sm text-foreground/50">
            <span>Sem compromisso</span>
            <span className="text-foreground/20">•</span>
            <span>Cancele quando quiser</span>
            <span className="text-foreground/20">•</span>
            <span>Sem taxas ocultas</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Commitment;
