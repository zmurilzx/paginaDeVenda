import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Analytics } from '@vercel/analytics/react';
import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import RouteEffects from '@/components/RouteEffects';
import ConsentBanner from '@/components/ConsentBanner';

const Loja = lazy(() => import('@/pages/Loja'));
const ProdutoDetail = lazy(() => import('@/pages/ProdutoDetail'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const RefundPolicy = lazy(() => import('@/pages/RefundPolicy'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const CONSENT_STORAGE_KEY = 'cinestream_analytics_consent';

const readConsent = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'granted';
};

function App() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(readConsent);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setConsent = (granted) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, granted ? 'granted' : 'denied');
    setAnalyticsConsent(granted);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RouteEffects analyticsEnabled={analyticsConsent} />
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center" role="status">Carregando…</div>}>
        <Routes>
          <Route path="/" element={<Home analyticsEnabled={analyticsConsent} />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/produto/:id" element={<ProdutoDetail />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/termos" element={<Terms />} />
          <Route path="/reembolso" element={<RefundPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {showScrollToTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-24 right-4 z-50 sm:bottom-8 sm:right-8"
        >
          <Button
            onClick={scrollToTop}
            className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 shadow-lg"
            aria-label="Voltar ao topo"
          >
            <ChevronUp aria-hidden="true" />
          </Button>
        </motion.div>
      )}

      {analyticsConsent && <Analytics />}
      <ConsentBanner onDecision={setConsent} />
    </div>
  );
}

export default App;
