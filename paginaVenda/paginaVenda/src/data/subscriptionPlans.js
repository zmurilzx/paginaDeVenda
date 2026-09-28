export const subscriptionPlans = [
  {
    slug: 'mensal',
    name: 'Mensal',
    price: 'R$28,40',
    amountCents: 2840,
    checkoutProvider: 'external',
    checkoutUrl: 'https://invoice.infinitepay.io/plans/cinestreamoficial/KLeTjEhkoJ',
    period: 'por mês',
    valuePresentation: {
      monthlyEquivalent: 'R$28,40',
      eyebrow: 'Menos de R$1 por dia',
      detail: 'Cobrança mensal de R$28,40',
    },
    description: 'Para começar com menor compromisso',
    features: ['Qualidade de SD a 4K*', 'Acesso ao catálogo disponível', 'Suporte pelo WhatsApp', 'Atualizações de conteúdo', 'Sem contrato de permanência'],
  },
  {
    slug: 'semestral',
    name: 'Semestral',
    price: 'R$117,00',
    amountCents: 11700,
    checkoutProvider: 'external',
    checkoutUrl: 'https://invoice.infinitepay.io/plans/cinestreamoficial/VZp3rWIrpN',
    period: 'ou 6x de R$19,50',
    valuePresentation: {
      monthlyEquivalent: 'R$19,50',
      eyebrow: 'Melhor custo por mês',
      detail: 'Total do período: R$117,00',
      comparison: 'No mensal por 6 meses: R$170,40',
      savings: 'Economize 31%',
    },
    description: 'Menor custo ao longo de seis meses',
    badge: 'Mais economia',
    highlighted: true,
    features: ['Seis meses de acesso', 'Qualidade de SD a 4K*', 'Acesso ao catálogo disponível', 'Suporte prioritário', 'Atualizações de conteúdo', 'Sem contrato de permanência'],
  },
  {
    slug: 'anual',
    name: 'Anual',
    price: 'R$217,00',
    amountCents: 21700,
    checkoutProvider: 'external',
    checkoutUrl: 'https://invoice.infinitepay.io/plans/cinestreamoficial/IpM114tEeU',
    period: 'ou 12x de R$18,08',
    valuePresentation: {
      monthlyEquivalent: 'R$18,08',
      eyebrow: 'Um ano de acesso',
      detail: 'Total do período: R$217,00',
      comparison: 'No mensal por 12 meses: R$340,80',
      savings: 'Economize 36%',
    },
    description: 'Doze meses de acesso',
    features: ['Doze meses de acesso', 'Qualidade de SD a 4K*', 'Acesso ao catálogo disponível', 'Suporte prioritário', 'Atualizações de conteúdo', 'Sem contrato de permanência'],
  },
];

export const getSubscriptionPlan = (slug) =>
  subscriptionPlans.find((plan) => plan.slug === slug);
