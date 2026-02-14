import { motion } from 'framer-motion';

const VSL = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="vsl">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-pink-950/5 to-background z-0"></div>
      
      <motion.div 
        className="absolute top-20 right-10 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight leading-tight">
            Veja o Aplicativo na Prática
          </h2>
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto px-4">
            Assista ao vídeo e descubra como ter TUDO por apenas R$189,90 - para sempre
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <style>{`wistia-player[media-id='5gt55026re']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/5gt55026re/swatch'); display: block; filter: blur(5px); padding-top:56.56%; }`}</style>
            <wistia-player media-id="5gt55026re" aspect="1.7679558011049723"></wistia-player>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <motion.button
              onClick={() => {
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-base md:text-lg font-bold rounded-xl w-full sm:w-auto transition-all shadow-lg"
            >
              Quero Economizar Agora
            </motion.button>
            
            <motion.a
              href="https://wa.me/5543999748808?text=Quero%20garantir%20meu%20acesso%20vitalício%20ao%20CineStream!"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-base md:text-lg font-bold rounded-xl flex items-center gap-2 w-full sm:w-auto justify-center transition-all shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Falar no WhatsApp
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-sm md:text-base text-foreground/50 mb-4">
              ⚡ Oferta por tempo limitado - Não perca essa oportunidade
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-foreground/40">
              <span>✓ Sem compromisso</span>
              <span>•</span>
              <span>✓ Cancele quando quiser</span>
              <span>•</span>
              <span>✓ Acesso imediato</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VSL;
