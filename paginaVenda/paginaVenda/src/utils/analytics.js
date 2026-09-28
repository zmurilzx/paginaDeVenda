import { track } from '@vercel/analytics';

const ATTRIBUTION_STORAGE_KEY = 'cinestream_attribution';
const CONSENT_STORAGE_KEY = 'cinestream_analytics_consent';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'sck'];

const cleanObject = (value = {}) =>
  Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined && entryValue !== null && entryValue !== ''),
  );

export const persistAttribution = () => {
  if (typeof window === 'undefined' || window.localStorage.getItem(CONSENT_STORAGE_KEY) !== 'granted') return {};

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
  if (typeof window === 'undefined' || window.localStorage.getItem(CONSENT_STORAGE_KEY) !== 'granted') return;

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

export const trackPageView = (page) => sendEvent('page_view', { page });

export const trackButtonClick = (buttonName, location) =>
  sendEvent('button_click', { button_name: buttonName, location });

export const trackPlanSelect = (planName, price) =>
  sendEvent('plan_select', { plan_name: planName, price });

export const trackVideoPlay = () => sendEvent('video_play');
