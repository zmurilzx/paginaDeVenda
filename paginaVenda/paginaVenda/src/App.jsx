import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Analytics } from '@vercel/analytics/react';
import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import RouteEffects from '@/components/RouteEffects';

const Loja = lazy(() => import('@/pages/Loja'));
const ProdutoDetail = lazy(() => import('@/pages/ProdutoDetail'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const RefundPolicy = lazy(() => import('@/pages/RefundPolicy'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const ThankYou = lazy(() => import('@/pages/ThankYou'));

function App() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RouteEffects />
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center" role="status">Carregando…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/produto/:id" element={<ProdutoDetail />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/termos" element={<Terms />} />
          <Route path="/reembolso" element={<RefundPolicy />} />
          <Route path="/obrigado" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {showScrollToTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 right-8 z-50"
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

      <Analytics />
    </div>
  );
}

export default App;
