import { BadgeCheck, MessagesSquare, ShieldCheck } from 'lucide-react';

const highlights = [
  {
    icon: BadgeCheck,
    title: 'Escolha com clareza',
    description: 'Planos com período, valor total e equivalente mensal apresentados antes da compra.',
  },
  {
    icon: ShieldCheck,
    title: 'Checkout seguro',
    description: 'O pagamento é concluído no ambiente externo do parceiro.',
  },
  {
    icon: MessagesSquare,
    title: 'Atendimento disponível',
    description: 'Confirme dúvidas, condições e compatibilidade pelo WhatsApp antes de contratar.',
  },
];

const ConversionHighlights = () => (
  <section className="border-y border-white/10 bg-white/[0.02] py-8" aria-label="Informações da contratação">
    <div className="container mx-auto grid gap-4 px-4 sm:grid-cols-3 md:px-6 lg:px-8">
      {highlights.map(({ icon: Icon, title, description }) => (
        <article key={title} className="rounded-xl border border-white/10 bg-card/40 p-5 text-center sm:text-left">
          <Icon className="mx-auto h-6 w-6 text-purple-300 sm:mx-0" strokeWidth={1.7} aria-hidden="true" />
          <h2 className="mt-3 font-semibold">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/60">{description}</p>
        </article>
      ))}
    </div>
  </section>
);

export default ConversionHighlights;
