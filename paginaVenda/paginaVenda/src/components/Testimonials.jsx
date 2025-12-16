import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      location: "São Paulo, SP",
      rating: 5,
      text: "Cancelei Netflix, Prime e Disney+ e economizei mais de R$1.500 no ano! O catálogo é GIGANTE e a qualidade é perfeita. Melhor investimento que já fiz!",
      date: "Há 3 meses"
    },
    {
      name: "Mariana Costa",
      location: "Rio de Janeiro, RJ",
      rating: 5,
      text: "No início fiquei com medo, mas o suporte é INCRÍVEL! Me ajudaram a instalar em todos os dispositivos. Minha família inteira está viciada, tem conteúdo pra todo mundo!",
      date: "Há 1 mês"
    },
    {
      name: "Roberto Oliveira",
      location: "Belo Horizonte, MG",
      rating: 5,
      text: "Assisti Oppenheimer que ainda tava no cinema! A qualidade 4K é surreal. Paguei uma vez e já uso há 6 meses sem problemas. Vale MUITO a pena!",
      date: "Há 6 meses"
    },
    {
      name: "Juliana Santos",
      location: "Curitiba, PR",
      rating: 5,
      text: "Meu marido era cético, mas depois que viu a quantidade de filmes e séries, ficou impressionado. Temos 3 TVs em casa e funciona perfeitamente em todas!",
      date: "Há 2 meses"
    },
    {
      name: "Pedro Almeida",
      location: "Porto Alegre, RS",
      rating: 5,
      text: "O melhor é não ter que ficar procurando em várias plataformas. TUDO tá aqui! Séries, filmes, canais ao vivo, documentários... É streaming de verdade!",
      date: "Há 4 meses"
    },
    {
      name: "Amanda Ferreira",
      location: "Brasília, DF",
      rating: 5,
      text: "Estava pagando R$150/mês em streamings. Agora pago ZERO e tenho muito mais conteúdo! O acesso vitalício foi a melhor decisão. Recomendo demais!",
      date: "Há 5 meses"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-purple-50/20 to-background z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 tracking-tight">
            Depoimentos de <span className="gradient-text">Clientes</span>
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto font-light">
            Mais de 15.000 clientes satisfeitos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/70 border border-purple-200 rounded-lg p-4 md:p-6 hover:border-purple-400 transition-all hover:scale-[1.01] shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote size={24} className="text-purple-400/30" />
              </div>
              
              <p className="text-foreground/90 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-purple-500/20 pt-4">
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-foreground/60">{testimonial.location}</p>
                <p className="text-xs text-foreground/40 mt-1">{testimonial.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 border border-purple-200 rounded-xl p-4 md:p-8 text-center shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">15.847</div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider font-light">Clientes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">4.9/5.0</div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider font-light">Avaliação</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">98%</div>
              <p className="text-xs text-foreground/50 uppercase tracking-wider font-light">Recomendam</p>
            </div>
          </div>
          <p className="text-sm text-foreground/60 mt-6 font-light">
            Junte-se a milhares de clientes satisfeitos
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
