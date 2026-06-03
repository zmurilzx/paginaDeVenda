import { motion } from 'framer-motion';
import { Shield, Lock, Zap, CheckCircle } from 'lucide-react';

const PaymentSecurity = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Criptografia SSL",
      description: "Proteção de dados de ponta a ponta"
    },
    {
      icon: Lock,
      title: "Dados Privados",
      description: "Nunca armazenamos informações de pagamento"
    },
    {
      icon: Zap,
      title: "Acesso Imediato",
      description: "Liberação instantânea após pagamento"
    },
    {
      icon: CheckCircle,
      title: "Plataforma Verificada",
      description: "100% segura e confiável"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white/2">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              Pagamento Seguro
            </h2>
            <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
              Seus dados estão protegidos com a mais alta tecnologia de segurança do mercado. Acesso imediato após confirmação do pagamento.
            </p>
          </div>

          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <feature.icon className="w-6 h-6 text-white/80 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-foreground/60">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSecurity;
