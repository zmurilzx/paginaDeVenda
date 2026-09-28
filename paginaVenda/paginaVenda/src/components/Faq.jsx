const questions = [
  ['Como escolho um plano?', 'Compare o período de acesso e selecione o plano que melhor atende à sua necessidade. O pagamento é concluído no checkout seguro do parceiro.'],
  ['Quando o acesso é liberado?', 'As orientações são enviadas após a confirmação do pagamento. Se precisar, fale com o atendimento pelo WhatsApp.'],
  ['A qualidade é sempre 4K?', 'A qualidade depende do conteúdo, do dispositivo, da televisão e da conexão de internet.'],
  ['Posso tirar dúvidas antes de contratar?', 'Sim. Use o botão de WhatsApp para confirmar compatibilidade, condições e disponibilidade.'],
];

const Faq = () => (
  <section id="faq" className="defer-render scroll-mt-16 border-t border-white/10 py-16 md:py-24" aria-labelledby="faq-title">
    <div className="container mx-auto max-w-2xl px-4 md:px-6">
      <header className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">Dúvidas frequentes</p>
        <h2 id="faq-title" className="mt-2 text-3xl font-bold md:text-4xl">Antes de assinar</h2>
      </header>
      <div className="mx-auto w-full space-y-3">
        {questions.map(([question, answer]) => (
          <details key={question} className="rounded-xl border border-white/10 bg-card/40 px-5 py-4">
            <summary className="cursor-pointer list-none text-center font-semibold">{question}</summary>
            <p className="mt-3 text-center leading-relaxed text-foreground/65">{answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
