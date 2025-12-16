import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FAQ = () => {
  const faqs = [
    {
      question: "O CineStream2K é legal e seguro?",
      answer: "Sim, absolutamente. Somos uma plataforma consolidada com mais de 15.847 clientes ativos e satisfeitos. Oferecemos suporte 24h via WhatsApp com resposta em menos de 5 minutos e garantia incondicional de 7 dias. Seu pagamento é 100% seguro e criptografado."
    },
    {
      question: "Quanto vou economizar comparado a Netflix, Prime e Disney+?",
      answer: "Netflix Premium (R$55,90) + Disney+ (R$43,90) + Prime Video (R$14,90) + HBO Max (R$34,90) = R$149,60/mês ou R$1.795,20/ano. Com nosso plano vitalício de R$235,90 (pagamento único), você economiza R$1.559,30 no primeiro ano. Em 5 anos = R$8.740,10 economizados. Em 10 anos = R$17.716,10."
    },
    {
      question: "Funciona em quais dispositivos?",
      answer: "Em todos os dispositivos: Smart TVs (Samsung, LG, Sony, Philips, TCL), celulares e tablets (Android e iOS), computadores (Windows, Mac, Linux), consoles (PlayStation, Xbox, Nintendo Switch), Fire TV Stick, Chromecast, Apple TV, Roku e mais. Você pode assistir em até 3 dispositivos simultaneamente."
    },
    {
      question: "O conteúdo é atualizado? Tem lançamentos?",
      answer: "Sim. Atualizamos nosso catálogo toda semana com centenas de novos títulos. Temos filmes que ainda estão no cinema, séries antes de lançar em outras plataformas, e mais de 100.000 títulos disponíveis. Filmes, séries, documentários, animes, canais ao vivo, esportes, infantil e adulto."
    },
    {
      question: "Como recebo meu acesso após o pagamento?",
      answer: "Após confirmar o pagamento, você recebe seu login e senha em até 5 minutos via WhatsApp ou e-mail. Nossa equipe de suporte VIP te ajuda na instalação e configuração em todos os seus dispositivos. Você também recebe um guia completo em vídeo passo a passo."
    },
    {
      question: "E se eu não gostar? Posso cancelar?",
      answer: "Sim. Temos garantia incondicional de 7 dias. Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu dinheiro sem perguntas ou burocracia. Basta enviar uma mensagem no WhatsApp."
    },
    {
      question: "Tem conteúdo para crianças?",
      answer: "Sim. Temos uma seção Kids completa com milhares de desenhos, filmes infantis e conteúdo educativo. Disney, Pixar, DreamWorks, Nickelodeon, Cartoon Network e mais. Você pode configurar controle parental para garantir que as crianças assistam apenas conteúdo apropriado."
    },
    {
      question: "Por que o preço é tão baixo?",
      answer: "Não gastamos milhões em marketing, propaganda na TV, patrocínios caros e escritórios luxuosos como as grandes plataformas. Nosso crescimento é orgânico, baseado em indicações de clientes satisfeitos. Repassamos essa economia diretamente para você."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="faq">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 via-pink-50/20 to-background z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 tracking-tight">
            <span className="gradient-text">Perguntas Frequentes</span>
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto font-light">
            Respondemos as principais dúvidas. Não encontrou sua resposta? Fale conosco no WhatsApp.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full text-left p-4 md:p-5 rounded-xl flex justify-between items-center transition-all ${
                  openIndex === index 
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-foreground shadow-md border border-purple-300' 
                    : 'bg-white/70 hover:bg-white/90 text-foreground/80 hover:shadow-sm border border-purple-200'
                }`}
              >
                <span className="font-medium text-xs md:text-sm">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/50 p-4 md:p-5 rounded-b-xl text-foreground/70 text-xs md:text-sm leading-relaxed font-light border-x border-b border-purple-200"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 border border-purple-300 rounded-xl p-4 md:p-8 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-bl-lg shadow-sm">
              23 VAGAS
            </div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 tracking-tight">
              Pronto para <span className="gradient-text">Economizar</span>?
            </h3>
            <p className="text-foreground/60 mb-4 md:mb-6 text-xs md:text-sm font-light">
              Junte-se a <strong className="text-purple-400 font-medium">15.847 clientes</strong> que já economizaram milhares de reais
            </p>
            <a href="https://wa.me/5543999748808" target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 md:px-10 py-4 md:py-6 text-sm md:text-base font-medium rounded-lg shadow-lg w-full md:w-auto relative overflow-hidden group tracking-tight">
                  <span className="relative z-10">Garantir Acesso Vitalício</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </motion.div>
            </a>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-foreground/50 font-light">
              <span>Pagamento seguro</span>
              <span>•</span>
              <span>Garantia 7 dias</span>
              <span>•</span>
              <span>Acesso em 5 minutos</span>
            </div>
            <p className="text-center text-foreground/50 mt-3 text-xs font-light">
              Bônus: Guia completo + Suporte VIP + Instalação assistida
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;