import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const questions = [
  { question: 'Como recebo o acesso?', answer: 'Depois que o pagamento for confirmado, você recebe as orientações de ativação e instalação. Se precisar, a equipe acompanha o processo pelo WhatsApp.' },
  { question: 'Em quais dispositivos funciona?', answer: 'A compatibilidade depende do dispositivo, do sistema e da versão disponível. Antes da compra, fale com o suporte informando o modelo da sua TV, celular ou aparelho para confirmar.' },
  { question: 'Posso assistir em 4K?', answer: 'A reprodução em 4K depende do conteúdo, do aparelho, da televisão e da velocidade da conexão. Quando algum desses itens não for compatível, outra qualidade poderá ser utilizada.' },
  { question: 'Quantos dispositivos posso usar?', answer: 'Os limites podem variar conforme o plano e a configuração do serviço. Confirme essa informação com a equipe antes de finalizar a compra.' },
  { question: 'O que significa plano vitalício?', answer: 'É uma opção de pagamento único sujeita às condições apresentadas na oferta e nos Termos de Uso. Leia as condições antes da contratação e tire qualquer dúvida pelo WhatsApp.' },
  { question: 'Como funciona cancelamento ou reembolso?', answer: 'As solicitações são analisadas conforme a legislação aplicável, a data da contratação, a ativação e as condições do checkout. Consulte a Política de Reembolso para saber como solicitar.' },
  { question: 'Tenho suporte depois da compra?', answer: 'Sim. O atendimento pelo WhatsApp auxilia com dúvidas de acesso, instalação e compatibilidade.' },
];

const Faq = () => (
  <section className="border-y border-white/5 bg-white/[0.015] py-16 md:py-24" id="faq" aria-labelledby="faq-title">
    <div className="container mx-auto max-w-4xl px-4 md:px-6">
      <header className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-300">Tire suas dúvidas</p>
        <h2 id="faq-title" className="text-3xl font-bold md:text-5xl">Perguntas frequentes</h2>
      </header>
      <div className="space-y-3">
        {questions.map((item) => (
          <details key={item.question} className="group rounded-xl border border-white/10 bg-card/40 p-5 open:border-purple-400/30">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {item.question}
              <ChevronDown className="h-5 w-5 shrink-0 text-purple-300 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="mt-4 border-t border-white/5 pt-4 text-sm leading-7 text-foreground/65">{item.answer}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-foreground/55">
        Consulte também nossos <Link to="/termos" className="text-purple-300 underline underline-offset-4">Termos de Uso</Link> e a <Link to="/reembolso" className="text-purple-300 underline underline-offset-4">Política de Reembolso</Link>.
      </p>
    </div>
  </section>
);

export default Faq;
