const PLAN_ENV_KEYS = {
  mensal: ['CAKTO_MONTHLY_PRODUCT_ID', 'CAKTO_MONTHLY_OFFER_ID'],
  semestral: ['CAKTO_SEMESTRAL_PRODUCT_ID', 'CAKTO_SEMESTRAL_OFFER_ID'],
  anual: ['CAKTO_ANNUAL_PRODUCT_ID', 'CAKTO_ANNUAL_OFFER_ID'],
  vitalicio: ['CAKTO_LIFETIME_PRODUCT_ID', 'CAKTO_LIFETIME_OFFER_ID'],
};

export const PLAN_SLUGS = Object.freeze(Object.keys(PLAN_ENV_KEYS));

export const getPlanConfig = (slug, environment = process.env) => {
  const keys = PLAN_ENV_KEYS[slug];
  if (!keys) return null;

  const [productKey, offerKey] = keys;
  const productId = environment[productKey];
  const offerId = environment[offerKey];

  if (!productId || !offerId) {
    throw new Error(`Configuração incompleta para o plano ${slug}.`);
  }

  return { slug, productId, offerId };
};
