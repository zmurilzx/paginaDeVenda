import { motion } from 'framer-motion';
import { Shield, Lock, CheckCircle2, CreditCard } from 'lucide-react';

const PaymentSecurity = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "SSL Certificado",
      description: "Criptografia de ponta a ponta"
    },
    {
      icon: Lock,
      title: "Dados Protegidos",
      description: "Seus dados nunca são armazenados"
    },
    {
      icon: CheckCircle2,
      title: "Plataforma Verificada",
      description: "Ambiente 100% seguro"
    },
    {
      icon: CreditCard,
      title: "Pagamento Rápido",
      description: "Aprovação instantânea"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-green-950/5 to-background z-0"></div>
      
      <motion.div 
        className="absolute top-20 right-10 w-72 h-72 rounded-full bg-green-500/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6 shadow-2xl"
            >
              <Shield className="w-10 h-10 text-white" strokeWidth={2.5} />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Pagamento{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                100% Seguro
              </span>
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Seus dados estão protegidos com a mais alta tecnologia de segurança do mercado
            </p>
          </div>

          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500/20 mb-4">
                  <feature.icon className="w-7 h-7 text-green-400" strokeWidth={2} />
                </div>
                <h3 className="font-bold text-sm mb-2">{feature.title}</h3>
                <p className="text-xs text-foreground/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>

                  </motion.div>
      </div>
    </section>
  );
};

export default PaymentSecurity;
