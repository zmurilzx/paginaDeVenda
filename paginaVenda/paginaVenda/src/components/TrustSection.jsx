import { motion } from 'framer-motion';
import { Shield, Lock, Award, CheckCircle, Zap, Users } from 'lucide-react';

const TrustSection = () => {
  const trustBadges = [
    {
      icon: Shield,
      title: "Conexão Segura",
      description: "Certificado SSL e proteção de dados"
    },
    {
      icon: Lock,
      title: "Pagamento Protegido",
      description: "Transações 100% seguras"
    },
    {
      icon: Zap,
      title: "Acesso Instantâneo",
      description: "Ative sua conta em segundos"
    },
    {
      icon: Users,
      title: "Suporte Dedicado",
      description: "Atendimento prioritário 24/7"
    }
  ];

  const paymentMethods = [
    { name: "Visa", icon: "💳" },
    { name: "Mastercard", icon: "💳" },
    { name: "Pix", icon: "📱" },
    { name: "Boleto", icon: "🏦" }
  ];

  const platforms = [
    { name: "Netflix", color: "from-red-600 to-red-700" },
    { name: "Disney+", color: "from-blue-600 to-blue-700" },
    { name: "Amazon Prime", color: "from-cyan-600 to-cyan-700" },
    { name: "HBO Max", color: "from-purple-600 to-purple-700" },
    { name: "Paramount+", color: "from-blue-500 to-blue-600" },
    { name: "Apple TV+", color: "from-gray-700 to-gray-800" }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-background via-purple-950/5 to-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Sua Segurança é Nossa Prioridade
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-card/60 transition-all"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-white/5 mb-4">
                  <badge.icon className="w-7 h-7 text-foreground/80" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-base mb-2">{badge.title}</h3>
                <p className="text-xs text-foreground/60 leading-relaxed">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
