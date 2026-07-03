import { track } from '@vercel/analytics';

const sendEvent = (eventName, properties = {}) => {
  if (typeof window === 'undefined') return;

  try {
    track(eventName, properties);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Falha ao registrar evento de analytics.', error);
    }
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, properties);
  }
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

export const trackVideoPlay = () => sendEvent('video_play');

export const trackPurchase = (planName, price, reference) =>
  sendEvent('purchase', { plan_name: planName, price, reference });
