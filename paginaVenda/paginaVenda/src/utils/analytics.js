import { track } from '@vercel/analytics';

const ATTRIBUTION_STORAGE_KEY = 'cinestream_attribution';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'sck'];

const cleanObject = (value = {}) =>
  Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined && entryValue !== null && entryValue !== ''),
  );

export const persistAttribution = () => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const current = Object.fromEntries(
    UTM_KEYS
      .filter((key) => params.get(key))
      .map((key) => [key, params.get(key)]),
  );

  if (!Object.keys(current).length) return getStoredAttribution();

  const attribution = cleanObject({
    ...getStoredAttribution(),
    ...current,
    landing_page: window.location.pathname,
    captured_at: new Date().toISOString(),
  });

  window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  return attribution;
};

export const getStoredAttribution = () => {
  if (typeof window === 'undefined') return {};

  try {
    return JSON.parse(window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
};

export const getTrackingMetadata = () => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  return cleanObject({
    ...getStoredAttribution(),
    ...Object.fromEntries(
      UTM_KEYS
        .filter((key) => params.get(key))
        .map((key) => [key, params.get(key)]),
    ),
  });
};

const sendEvent = (eventName, properties = {}) => {
  if (typeof window === 'undefined') return;

  const eventProperties = cleanObject({ ...getTrackingMetadata(), ...properties });

  try {
    track(eventName, eventProperties);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Falha ao registrar evento de analytics.', error);
    }
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventProperties);
  }

  if (typeof window.fbq === 'function') {
    const metaEventMap = {
      page_view: 'PageView',
      plan_select: 'ViewContent',
      checkout_start: 'InitiateCheckout',
      payment_attempt: 'AddPaymentInfo',
      pix_generated: 'AddPaymentInfo',
      purchase: 'Purchase',
    };
    const metaEvent = metaEventMap[eventName];
    if (metaEvent) window.fbq('track', metaEvent, eventProperties);
  }
};

export const sendMarketingEvent = (eventName, properties = {}) => {
  if (typeof window === 'undefined') return Promise.resolve();

  return fetch('/api/marketing/checkout-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: eventName,
      properties: cleanObject({ ...getTrackingMetadata(), ...properties }),
      page: window.location.pathname,
      occurredAt: new Date().toISOString(),
    }),
    keepalive: true,
  }).catch((error) => {
    if (import.meta.env.DEV) {
      console.warn('Falha ao enviar evento de marketing.', error);
    }
  });
};

export const trackPageView = (page) => sendEvent('page_view', { page });

export const trackButtonClick = (buttonName, location) =>
  sendEvent('button_click', { button_name: buttonName, location });

export const trackPlanSelect = (planName, price) =>
  sendEvent('plan_select', { plan_name: planName, price });

export const trackCheckoutStart = (planName, price) =>
  sendEvent('checkout_start', { plan_name: planName, price });

export const trackPaymentAttempt = (planName, paymentMethod) =>
  sendEvent('payment_attempt', { plan_name: planName, payment_method: paymentMethod });

export const trackCheckoutLead = (planName, price, customer) =>
  sendEvent('checkout_lead', {
    plan_name: planName,
    price,
    customer_name: customer.name,
    customer_email: customer.email,
    customer_phone: customer.phone,
  });

export const trackPixGenerated = (planName, price, reference) =>
  sendEvent('pix_generated', { plan_name: planName, price, reference });

export const trackPaymentError = (planName, paymentMethod, message) =>
  sendEvent('payment_error', { plan_name: planName, payment_method: paymentMethod, message });

export const trackVideoPlay = () => sendEvent('video_play');

export const trackPurchase = (planName, price, reference) =>
  sendEvent('purchase', { plan_name: planName, price, reference });
