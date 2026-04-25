
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/utils/analytics';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="text-xl font-bold tracking-tight">
          CineStream<span className="text-white/50"></span>
        </a>

        <a 
          href="#pricing"
          onClick={() => trackButtonClick('Assinar agora', 'navbar')}
        >
          <Button className="bg-white text-black hover:bg-white/90 text-xs md:text-sm px-4 py-2 font-medium">
            Assinar agora
          </Button>
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
