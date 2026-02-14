import { motion } from 'framer-motion';
import { Award, Infinity, Shield } from 'lucide-react';

const UniqueValue = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-6 md:p-12">
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/10 mb-4"
              >
                <Award className="w-8 h-8 text-foreground" />
              </motion.div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                EXCLUSIVO: Único Plano Vitalício do Brasil!
              </h2>
              <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto px-4">
                Pare de pagar R$100+ todo mês. Pague UMA VEZ e tenha acesso PARA SEMPRE!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                      <Infinity className="w-6 h-6 text-foreground/80" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Plano Vitalício Exclusivo</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Pague uma única vez e tenha acesso para sempre. Nenhum outro serviço de streaming oferece essa opção no Brasil.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-foreground/80" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Plataforma Mais Estável</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      99,9% de uptime. Servidores robustos que garantem streaming sem interrupções, diferente da concorrência.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-foreground/10 border border-foreground/20 rounded-full px-6 py-3">
                <span className="text-sm font-semibold">
                  Mais de 15 mil clientes confiam na nossa estabilidade
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UniqueValue;
