export const subscriptionPlans = [
  {
    slug: 'mensal',
    name: 'Mensal',
    price: 'R$28,40',
    amountCents: 2840,
    period: 'por mês',
    description: 'Para começar com menor compromisso',
    features: ['Qualidade de SD a 4K*', 'Acesso ao catálogo disponível', 'Suporte pelo WhatsApp', 'Atualizações de conteúdo', 'Sem contrato de permanência'],
  },
  {
    slug: 'semestral',
    name: 'Semestral',
    price: 'R$89,90',
    amountCents: 8990,
    period: 'ou 6x de R$14,98',
    description: 'Menor custo ao longo de seis meses',
    badge: 'Mais economia',
    highlighted: true,
    features: ['Seis meses de acesso', 'Qualidade de SD a 4K*', 'Acesso ao catálogo disponível', 'Suporte prioritário', 'Atualizações de conteúdo', 'Sem contrato de permanência'],
  },
  {
    slug: 'anual',
    name: 'Anual',
    price: 'R$189,90',
    amountCents: 18990,
    period: 'ou 12x de R$15,82',
    description: 'Doze meses de acesso',
    features: ['Doze meses de acesso', 'Qualidade de SD a 4K*', 'Acesso ao catálogo disponível', 'Suporte prioritário', 'Atualizações de conteúdo', 'Sem contrato de permanência'],
  },
  {
    slug: 'vitalicio',
    name: 'Vitalício',
    price: 'R$209,90',
    amountCents: 20990,
    period: 'ou 12x de R$17,49',
    description: 'Pagamento único conforme a oferta',
    badge: 'Pagamento único',
    features: ['Acesso vitalício conforme os termos', 'Sem mensalidades futuras', 'Qualidade de SD a 4K*', 'Acesso ao catálogo disponível', 'Suporte prioritário', 'Atualizações de conteúdo'],
  },
];

export const getSubscriptionPlan = (slug) =>
  subscriptionPlans.find((plan) => plan.slug === slug);
