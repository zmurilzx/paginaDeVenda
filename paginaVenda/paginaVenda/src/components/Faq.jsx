import { Link } from 'react-router-dom';

const questions = [
  {
    question: 'Como escolho um plano?',
    answer: 'Todos dão acesso ao serviço. Compare o período contratado, o valor total e o equivalente mensal antes de escolher.',
  },
  {
    question: 'Quando o acesso é liberado?',
    answer: 'As orientações são enviadas após a confirmação do pagamento. Se precisar de ajuda, fale com o atendimento pelo WhatsApp.',
  },
  {
    question: 'A qualidade é sempre 4K?',
    answer: 'Não necessariamente. A qualidade depende do conteúdo, do dispositivo, da televisão e da conexão de internet.',
  },
  {
    question: 'Como confirmo a compatibilidade?',
    answer: 'Antes de contratar, informe seu dispositivo ao atendimento pelo WhatsApp para confirmar compatibilidade e disponibilidade.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer: 'O pagamento é concluído no checkout externo do parceiro. Revise valor, condições e forma de pagamento antes de finalizar.',
  },
  {
    question: 'Como solicito cancelamento ou análise de reembolso?',
    answer: (
      <>Consulte a <Link to="/reembolso" className="text-purple-300 underline underline-offset-4">Política de Reembolso</Link> e envie os dados do pedido pelo canal de atendimento indicado.</>
    ),
  },
];

const Faq = () => (
  <section id="faq" className="defer-render scroll-mt-16 border-t border-white/10 py-16 md:py-24" aria-labelledby="faq-title">
    <div className="container mx-auto max-w-3xl px-4 md:px-6">
      <header className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">Dúvidas frequentes</p>
        <h2 id="faq-title" className="mt-2 text-3xl font-bold md:text-4xl">Antes de assinar</h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/60">Confira os pontos mais importantes da contratação.</p>
      </header>
      <div className="mx-auto w-full space-y-3">
        {questions.map(({ question, answer }) => (
          <details key={question} className="rounded-xl border border-white/10 bg-card/40 px-5 py-4">
            <summary className="cursor-pointer list-none text-left font-semibold">{question}</summary>
            <p className="mt-3 text-left leading-relaxed text-foreground/65">{answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
