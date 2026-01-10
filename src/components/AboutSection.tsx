import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Heart, Users, Home, Shield, Lightbulb } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      icon: Users,
      title: 'Modelo Cooperativo',
      description: 'Decisões tomadas em conjunto, onde cada cooperado tem voz ativa e igual participação.',
    },
    {
      icon: Home,
      title: 'Habitação Digna',
      description: 'Compromisso com moradias de qualidade que respeitam a dignidade humana.',
    },
    {
      icon: Shield,
      title: 'Acessibilidade',
      description: 'Condições financeiras justas e planos adaptados à realidade angolana.',
    },
    {
      icon: Lightbulb,
      title: 'Inovação',
      description: 'Soluções modernas e sustentáveis para os desafios habitacionais.',
    },
  ];

  return (
    <section id="sobre" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-muted/50 -skew-x-12 origin-top-right" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
                Sobre a Cooperativa
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Unidos pelo Sonho da{' '}
                <span className="text-gradient-primary">Casa Própria</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                A Cooperativa de Habitação do Grupo Sanep (CHCGS) nasceu em 2024 com uma missão clara: 
                transformar o sonho da habitação própria em realidade para famílias angolanas. Através 
                do modelo cooperativo, unimos recursos e esforços para construir não apenas casas, 
                mas comunidades integradas e prósperas.
              </p>
            </motion.div>

            {/* Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid sm:grid-cols-2 gap-6"
            >
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">Nossa Missão</h3>
                <p className="text-muted-foreground text-sm">
                  Proporcionar habitação digna e acessível, fortalecendo o tecido social através 
                  da participação cooperativa.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">Nossa Visão</h3>
                <p className="text-muted-foreground text-sm">
                  Ser a principal referência em habitação cooperativa em Angola, 
                  inspirando um novo modelo de desenvolvimento urbano.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="font-display font-semibold text-2xl text-foreground mb-8">
              Nossos Valores
            </h3>
            <div className="grid gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{value.title}</h4>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 bg-gradient-primary rounded-2xl p-8 sm:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2024', label: 'Ano de Fundação' },
              { value: '+100', label: 'Cooperados Activos' },
              { value: '3', label: 'Projectos em Curso' },
              { value: '200+', label: 'Unidades Planeadas' },
            ].map((stat, index) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
