import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Analytics } from '@vercel/analytics/react';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedContent from '@/components/FeaturedContent';
import ContentCategories from '@/components/ContentCategories';
import Testimonials from '@/components/Testimonials';
import PricingPlans from '@/components/PricingPlans';
import Devices from '@/components/Devices';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

function App() {
  const { toast } = useToast();
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // 🔒 Domínio permitido (exceto localhost)
    const allowedDomain = "cinestream2k.site";
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    
    if (!isLocalhost && window.location.hostname !== allowedDomain) {
      window.location.href = `https://${allowedDomain}`;
      return;
    }

    // 📱 Detecta dispositivo móvel (desabilitado em localhost)
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isLocalhost && !isMobile) {
      document.body.innerHTML = `
        <div style="text-align:center;margin-top:25vh;padding:20px;font-family:sans-serif">
          <h2>📱 Este site está disponível apenas para dispositivos móveis.</h2>
          <p style="margin-top:20px;font-size:18px;color:#555">
            Acesse pelo seu celular para continuar navegando no <strong>CineStream2K</strong>.
          </p>
        </div>
      `;
      return;
    }

    // 🚫 Bloqueia ações de cópia e inspeção
    const preventAction = (e) => e.preventDefault();
    document.addEventListener("contextmenu", preventAction);
    document.addEventListener("copy", preventAction);
    document.addEventListener("cut", preventAction);
    document.addEventListener("selectstart", preventAction);

    // 🔐 Bloqueia teclas comuns de inspeção
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && ["u", "s", "c", "x", "p"].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
      }
    });

    setAllowed(true);

    // 🧹 Limpa eventos ao desmontar
    return () => {
      document.removeEventListener("contextmenu", preventAction);
      document.removeEventListener("copy", preventAction);
      document.removeEventListener("cut", preventAction);
      document.removeEventListener("selectstart", preventAction);
    };
  }, []);

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

  if (!allowed) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <FeaturedContent />
      <ContentCategories />
      <Testimonials />
      <PricingPlans />
      <Devices />
      <FAQ />
      <Footer />

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-up"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </Button>
        </motion.div>
      )}

      <Toaster />
      <Analytics />
    </div>
  );
}

export default App;
