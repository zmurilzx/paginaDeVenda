const steps = [
  { number: '01', title: 'Escolha o plano', description: 'Compare duração, condições e valor equivalente por mês.' },
  { number: '02', title: 'Finalize o pagamento', description: 'Use Pix ou cartão no checkout protegido dentro do site.' },
  { number: '03', title: 'Receba o acesso', description: 'Após a confirmação, siga as orientações de ativação.' },
];

const HowItWorks = () => (
  <section className="border-y border-white/[0.06] py-16 md:py-24" aria-labelledby="how-title">
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">Processo</p>
        <h2 id="how-title" className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Do plano ao acesso em três etapas</h2>
      </header>
      <ol className="mx-auto grid max-w-7xl border-t border-white/[0.08] md:grid-cols-3">
        {steps.map((step) => (
          <li key={step.number} className="border-b border-white/[0.08] py-7 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
            <span className="text-xs font-semibold tracking-[0.18em] text-purple-300">{step.number}</span>
            <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-foreground/50">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
