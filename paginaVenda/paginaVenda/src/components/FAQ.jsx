import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FAQ = () => {
  const faqs = [
    {
      question: "O que é o CineStream?",
      answer: "O CineStream é um serviço de streaming premium que oferece uma ampla variedade de séries de TV, filmes, animes, documentários e muito mais premiados em milhares de dispositivos conectados à internet. Você pode assistir o quanto quiser, quando quiser, sem um único comercial - tudo por um preço mensal baixo."
    },
    {
      question: "Quanto custa?",
      answer: "O CineStream oferece três planos: Básico (R$19,90/mês), Premium (R$29,90/mês) e Ultimate (R$39,90/mês). O plano Básico oferece streaming em HD em um dispositivo, o Premium oferece streaming em 4K em até 4 dispositivos, e o Ultimate oferece streaming em 4K HDR em até 6 dispositivos com vantagens adicionais."
    },
    {
      question: "Onde posso assistir?",
      answer: "Assista em qualquer lugar, a qualquer hora. Com do seu computador pessoal ou em qualquer dispositivo conectado à internet que ofereça o aplicativo CineStream, incluindo smart TVs, smartphones, tablets, reprodutores de mídia de streaming e consoles de jogos."
    },
    {
      question: "Como cancelo?",
      answer: "O CineStream é flexível. Não há contratos irritantes nem compromissos. Você pode cancelar facilmente sua conta online em dois cliques. Não há taxas de cancelamento - comece ou pare sua conta a qualquer momento."
    },
    {
      question: "O que posso assistir no CineStream?",
      answer: "O CineStream tem uma extensa biblioteca de canais, filmes, séries, animes, lançamentos e muito mais. Assista o quanto quiser, quando quiser."
    },
    {
      question: "O CineStream é bom para crianças?",
      answer: "A experiência Kids está incluída na sua assinatura para dar aos pais o controle enquanto as crianças desfrutam de séries e filmes para toda a família em seu próprio espaço. Os perfis Kids vêm com controles parentais protegidos por PIN que permitem restringir a classificação etária do conteúdo que as crianças podem assistir e bloquear títulos específicos que você não quer que as crianças vejam."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="faq">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-900/5 to-background z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas <span className="gradient-text">Frequentes</span></h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Tem perguntas? Nós temos respostas. Se não encontrar o que procura, entre em contato com nossa equipe de suporte.
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
                className={`w-full text-left p-4 rounded-lg flex justify-between items-center transition-colors ${
                  openIndex === index 
                    ? 'bg-purple-500/20 text-foreground' 
                    : 'bg-secondary/20 hover:bg-secondary/30 text-foreground/80'
                }`}
              >
                <span className="font-medium">{faq.question}</span>
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
                  className="bg-secondary/10 p-4 rounded-b-lg text-foreground/70 text-sm"
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
          <h3 className="text-xl font-bold mb-4">Pronto para começar a assistir?</h3>
          {/* Modified Button with Link */}
          <a href="https://wa.me/5543999748808" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full">
              Enviar uma mensagem
            </Button>
          </a>
          <p className="text-sm text-foreground/60 mt-4">
            Não é necessário cartão de crédito. Cancele a qualquer momento.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;