// Analytics tracking utility
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Track with Vercel Analytics if available
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va.track(eventName, properties);
  }
  
  // Track with Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
  
  // Console log for debugging
  console.log('📊 Analytics Event:', eventName, properties);
};

export const trackPageView = (page: string) => {
  trackEvent('page_view', { page });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
    timestamp: new Date().toISOString()
  });
};

export const trackPlanSelect = (planName: string, price: string) => {
  trackEvent('plan_select', {
    plan_name: planName,
    price: price,
    timestamp: new Date().toISOString()
  });
};

export const trackVideoPlay = () => {
  trackEvent('video_play', {
    timestamp: new Date().toISOString()
  });
};

export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', {
    form_name: formName,
    timestamp: new Date().toISOString()
  });
};
