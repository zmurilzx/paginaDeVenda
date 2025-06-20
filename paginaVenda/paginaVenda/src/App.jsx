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
import PricingPlans from '@/components/PricingPlans';
import Devices from '@/components/Devices';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

function App() {
  const { toast } = useToast();
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
      <Navbar />
      <Hero />
      <FeaturedContent />
      <ContentCategories />
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
