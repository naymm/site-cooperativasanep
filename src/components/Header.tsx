import { useState, useEffect } from 'react';
import { Menu, X, Home, Users, Building2, UserPlus, LogIn, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import logowhite from '@/logowhite.png';
import logodark from '@/logodark.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: 'Início', icon: Home },
    { href: '#sobre', label: 'Sobre Nós', icon: Users },
    { href: '#servicos', label: 'Serviços', icon: Briefcase },
    { href: '#projetos', label: 'Projectos', icon: Building2 },
    { href: '#adesao', label: 'Como Aderir', icon: UserPlus },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#inicio');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative h-12 flex items-center group-hover:scale-105 transition-transform duration-300">
              {/* Logo branco - visível quando header transparente */}
              <motion.img
                src={logodark}
                alt="Logo CHCGS"
                className="h-full object-contain relative z-10 logo"
                initial={false}
                animate={{
                  opacity: isScrolled ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              {/* Logo escuro - visível quando header fixo */}
              <motion.img
                src={logodark}
                alt="Logo CHCGS"
                className="h-full object-contain absolute z-20 logo"
                initial={false}
                animate={{
                  opacity: isScrolled ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`font-medium transition-all duration-300 hover:text-primary relative group ${
                  isScrolled ? 'text-foreground' : 'text-primary-foreground'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant={isScrolled ? 'outline' : 'heroOutline'}
              size="sm"
              onClick={() => scrollToSection('#portal')}
            >
              <LogIn className="w-4 h-4" />
              Portal do Cooperado
            </Button>
            <Button
              variant={isScrolled ? 'default' : 'hero'}
              size="sm"
              onClick={() => scrollToSection('#adesao')}
            >
              Torne-se Cooperado
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${
              isScrolled ? 'text-foreground hover:bg-muted' : 'text-primary-foreground hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`flex items-center gap-3 py-2 font-medium transition-colors ${
                      isScrolled ? 'text-foreground hover:text-primary' : 'text-primary-foreground hover:text-secondary'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 space-y-3">
                  <Button
                    variant={isScrolled ? 'outline' : 'heroOutline'}
                    className="w-full"
                    onClick={() => scrollToSection('#portal')}
                  >
                    <LogIn className="w-4 h-4" />
                    Portal do Cooperado
                  </Button>
                  <Button
                    variant={isScrolled ? 'default' : 'hero'}
                    className="w-full"
                    onClick={() => scrollToSection('#adesao')}
                  >
                    Torne-se Cooperado
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
