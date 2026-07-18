import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { persistAttribution, trackPageView } from '@/utils/analytics';

const RouteEffects = () => {
  const location = useLocation();

  useEffect(() => {
    persistAttribution();
    trackPageView(`${location.pathname}${location.hash}`);

    if (location.hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.hash, location.pathname, location.search]);

  return null;
};

export default RouteEffects;
