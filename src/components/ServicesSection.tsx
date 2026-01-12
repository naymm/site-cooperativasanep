import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Handshake, 
  Key, 
  Building2, 
  Hammer, 
  Briefcase, 
  CreditCard 
} from 'lucide-react';

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Handshake,
      title: 'Compra e venda de imóveis',
      description: 'Acompanhamento completo no processo de compra e venda de imóveis, com toda a assessoria necessária.',
    },
    {
      icon: Key,
      title: 'Aluguer de imóveis',
      description: 'Gestão profissional de alugueres, desde a seleção de inquilinos até à manutenção dos imóveis.',
    },
    {
      icon: Building2,
      title: 'Gestão de condomínios',
      description: 'Administração eficiente de condomínios, garantindo o bom funcionamento e manutenção das áreas comuns.',
    },
    {
      icon: Hammer,
      title: 'Desenvolvimento de Projectos habitacionais',
      description: 'Desenvolvimento completo de projectos habitacionais, desde o planeamento até à entrega das unidades.',
    },
    {
      icon: Briefcase,
      title: 'Gestão e consultoria imobiliária',
      description: 'Consultoria especializada e gestão profissional para todas as suas necessidades imobiliárias.',
    },
    {
      icon: CreditCard,
      title: 'Intermediação de crédito habitação',
      description: 'Apoio na obtenção de crédito habitação junto às instituições financeiras parceiras.',
    },
  ];

  return (
    <section id="servicos" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
            Os Nossos Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Soluções <span className="text-gradient-gold">Completas</span> em Imobiliária
          </h2>
          <p className="text-muted-foreground text-lg">
            Oferecemos uma gama completa de serviços imobiliários para atender todas as suas necessidades,
            desde a compra até à gestão do seu imóvel.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

