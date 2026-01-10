import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lock, FileText, BarChart3, Bell, MessageSquare, Calendar, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PortalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: FileText,
      title: 'Documentos',
      description: 'Acesse contratos, recibos e documentação oficial.',
    },
    {
      icon: BarChart3,
      title: 'Acompanhamento',
      description: 'Veja o progresso do seu projecto em tempo real.',
    },
    {
      icon: Bell,
      title: 'Notificações',
      description: 'Receba actualizações importantes directamente.',
    },
    {
      icon: MessageSquare,
      title: 'Comunicação',
      description: 'Canal directo com a equipa da cooperativa.',
    },
    {
      icon: Calendar,
      title: 'Assembleias',
      description: 'Calendário de reuniões e votações online.',
    },
  ];

  return (
    <section id="portal" className="py-24 bg-gradient-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Lock className="w-4 h-4 text-secondary" />
              <span className="text-primary-foreground text-sm font-medium">Área Exclusiva</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
              Portal do <span className="text-gradient-gold">Cooperado</span>
            </h2>

            <p className="text-primary-foreground/80 text-lg mb-8">
              Acesse a área exclusiva para cooperados e acompanhe todos os detalhes 
              do seu investimento, documentos e comunicações com a cooperativa.
            </p>

            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl"
                >
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-foreground">{feature.title}</h4>
                    <p className="text-primary-foreground/70 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              variant="gold"
              size="xl"
              className="group"
              onClick={() => {
                // Login logic would go here
                alert('Funcionalidade de login será implementada em breve!');
              }}
            >
              <LogIn className="w-5 h-5" />
              Aceder ao Portal
            </Button>
          </motion.div>

          {/* Right Column - Login Card Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card rounded-2xl p-8 shadow-2xl max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-display font-bold text-2xl">CH</span>
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">Portal do Cooperado</h3>
                <p className="text-muted-foreground text-sm">Acesse com os seus dados</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Número de Cooperado ou Email
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: CO-2024-001"
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Palavra-passe
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input type="checkbox" className="rounded" />
                    Lembrar-me
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    Esqueci a palavra-passe
                  </a>
                </div>
                <Button variant="default" size="lg" className="w-full">
                  <LogIn className="w-4 h-4" />
                  Entrar
                </Button>
              </div>

              <p className="text-center text-muted-foreground text-sm mt-6">
                Ainda não é cooperado?{' '}
                <a href="#adesao" className="text-secondary font-medium hover:underline">
                  Junte-se a nós
                </a>
              </p>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PortalSection;
