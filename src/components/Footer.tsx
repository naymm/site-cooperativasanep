import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  ArrowUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import logowhite from '@/logowhite.png';
import logodark from '@/logodark.png';

const Footer = () => {
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscrito com Sucesso!",
      description: "Obrigado por subscrever a nossa newsletter.",
    });
  };

  const quickLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Projectos', href: '#projetos' },
    { label: 'Como Aderir', href: '#adesao' },
    { label: 'Portal do Cooperado', href: '#portal' },
  ];

  const legalLinks = [
    { label: 'Política de Privacidade', href: '#' },
    { label: 'Termos de Uso', href: '#' },
    { label: 'Estatutos', href: '#' },
    { label: 'Relatórios Anuais', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-charcoal text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display font-bold text-2xl mb-3">
              Fique Actualizado
            </h3>
            <p className="text-white/70 mb-6">
              Subscreva a nossa newsletter e receba novidades sobre projectos e eventos.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-3">
              <Input
                type="email"
                placeholder="Seu email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-secondary"
                required
              />
              <Button type="submit" variant="gold">
                Subscrever
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <img src={logowhite} alt="Logo CHCGS" className="w-35 h-12" />
            <div className="flex items-center gap-3 mb-6">
            </div>
            <p className="text-white/70 text-sm mb-6">
              Construindo o futuro da habitação em Angola através do modelo cooperativo. 
              Unidos pelo sonho da casa própria.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-secondary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Informações Legais</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-secondary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contactos</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                Av. Cmte. Valódia, Bairro <br />
                Combatentes, Luanda, Angola
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <a href="tel:+244975673731" className="text-white/70 text-sm hover:text-white">
                  +244 975 673 731
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a href="mailto:info@chcgs.ao" className="text-white/70 text-sm hover:text-white">
                  info@cooperativasanep.co.ao
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-white/70 text-sm">
                  Seg - Sex: 08h00 - 17h00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {currentYear} Cooperativa de Habitação do Grupo Sanep. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Button
                variant="whatsapp"
                size="sm"
                onClick={() => window.open('https://wa.me/244975673731', '_blank')}
                className="gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Voltar ao topo"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
