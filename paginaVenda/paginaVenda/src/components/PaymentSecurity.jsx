import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const PaymentSecurity = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background via-purple-950/5 to-background border-y border-white/5">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
              <Shield className="w-8 h-8 text-green-500" strokeWidth={2} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Pagamento Seguro
            </h3>
            <p className="text-foreground/60 text-sm md:text-base mb-2">
              Seus dados estão protegidos com a mais alta tecnologia de segurança
            </p>
            <p className="text-xs text-foreground/50">
              🔒 Processamento seguro via plataforma Cakto
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentSecurity;
