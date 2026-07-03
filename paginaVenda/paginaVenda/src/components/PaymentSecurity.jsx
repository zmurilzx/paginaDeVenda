import { CreditCard, Headphones, LockKeyhole, ShieldCheck } from 'lucide-react';

const securityFeatures = [
  { icon: LockKeyhole, title: 'Conexão protegida', description: 'Criptografia SSL' },
  { icon: CreditCard, title: 'Dados tokenizados', description: 'Cartão não armazenado' },
  { icon: ShieldCheck, title: 'Processado pela Cakto', description: 'Checkout autenticado' },
  { icon: Headphones, title: 'Suporte disponível', description: 'Atendimento pelo WhatsApp' },
];

const PaymentSecurity = () => (
  <section className="border-y border-white/[0.06] py-14 md:py-18" aria-labelledby="security-title">
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">Segurança</p>
          <h2 id="security-title" className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">Pagamento protegido do início ao fim</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-foreground/50">A Cakto processa a transação. A liberação ocorre após a confirmação.</p>
      </div>
      <div className="grid border-y border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
        {securityFeatures.map((feature) => (
          <div key={feature.title} className="flex items-center gap-4 border-b border-white/[0.08] py-5 sm:px-5 lg:border-b-0 lg:border-r lg:last:border-r-0">
            <feature.icon className="h-5 w-5 shrink-0 text-purple-300" strokeWidth={1.6} aria-hidden="true" />
            <div><h3 className="text-sm font-semibold">{feature.title}</h3><p className="mt-1 text-xs text-foreground/45">{feature.description}</p></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PaymentSecurity;
