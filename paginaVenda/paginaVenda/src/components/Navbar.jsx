
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/utils/analytics';
import Logo from '@/components/Logo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', to: '/' },
    { name: 'Planos', to: '/#pricing' },
    { name: 'Dúvidas', to: '/#faq' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-lg border-b border-white/10 shadow-lg'
          : 'bg-background/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center" aria-label="CineStream — página inicial">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-foreground/70 hover:text-purple-500 transition-colors text-sm font-medium"
              onClick={() => trackButtonClick(link.name, 'navbar')}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link
          to="/#pricing"
          onClick={() => trackButtonClick('Assinar agora', 'navbar')}
          className="hidden md:block"
        >
          <Button className="bg-purple-500 text-black hover:bg-purple-600 text-xs md:text-sm px-4 py-2 font-medium">
            Assinar agora
          </Button>
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-foreground md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-white/5 hover:text-white"
                  onClick={() => {
                    setMenuOpen(false);
                    trackButtonClick(link.name, 'navbar-mobile');
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/#pricing" className="mt-2" onClick={() => setMenuOpen(false)}>
                <Button className="w-full bg-purple-500 text-black hover:bg-purple-600">
                  Ver planos
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
