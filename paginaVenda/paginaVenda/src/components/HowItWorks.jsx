import { ListChecks, PackageCheck, WalletCards } from 'lucide-react';

const steps = [
  { icon: ListChecks, title: '1. Escolha o plano', description: 'Compare duração, condições e recursos de cada opção.' },
  { icon: WalletCards, title: '2. Finalize o pagamento', description: 'Conclua a compra pelo checkout seguro dentro do próprio site.' },
  { icon: PackageCheck, title: '3. Receba o acesso', description: 'Após a confirmação, siga as orientações de ativação e instalação.' },
];

const HowItWorks = () => (
  <section className="py-16 md:py-24" aria-labelledby="how-title">
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-300">Sem complicação</p>
        <h2 id="how-title" className="text-3xl font-bold md:text-5xl">Como funciona</h2>
      </header>
      <ol className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <li key={step.title} className="rounded-2xl border border-white/10 bg-card/35 p-7 text-center">
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-300"><step.icon strokeWidth={1.7} aria-hidden="true" /></span>
            <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
            <p className="text-sm leading-relaxed text-foreground/60">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
