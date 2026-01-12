import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  FileText, 
  UserCheck, 
  CreditCard, 
  Home, 
  CheckCircle2, 
  ArrowRight,
  ChevronDown,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const JoinSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const steps = [
    {
      icon: FileText,
      step: '01',
      title: 'Manifestação de Interesse',
      description: 'Preencha o formulário de pré-cadastro com os seus dados básicos.',
    },
    {
      icon: UserCheck,
      step: '02',
      title: 'Análise e Aprovação',
      description: 'Nossa equipa analisa o seu perfil e entra em contacto.',
    },
    {
      icon: CreditCard,
      step: '03',
      title: 'Adesão e Quotização',
      description: 'Formalize a adesão e inicie as suas contribuições mensais.',
    },
    {
      icon: Home,
      step: '04',
      title: 'Sua Casa Própria',
      description: 'Acompanhe o projecto e prepare-se para receber as chaves.',
    },
  ];

  const benefits = [
    'Acesso a habitação de qualidade abaixo do preço de mercado',
    'Participação activa nas decisões da cooperativa',
    'Condições de pagamento flexíveis e acessíveis',
    'Comunidades integradas com áreas comuns e serviços',
    'Apoio jurídico e administrativo incluído',
    'Transparência total na gestão dos recursos',
  ];

  const faqs = [
    {
      question: 'Quem pode ser cooperado da CHCGS?',
      answer: 'Qualquer cidadão angolano maior de 18 anos, com rendimento comprovado e que não possua imóvel próprio pode candidatar-se a cooperado.',
    },
    {
      question: 'Qual é o valor da quota mensal?',
      answer: 'O valor da quota é definido de começando a partir de 5.000 Kz mensais. Oferecemos planos personalizados.',
    },
    {
      question: 'Posso perder o meu investimento?',
      answer: 'Não. Em caso de desistência, o cooperado tem direito à restituição dos valores pagos, conforme os estatutos da cooperativa.',
    },
    {
      question: 'Quanto tempo leva para receber a habitação?',
      answer: 'O prazo varia conforme o projecto escolhido, geralmente entre 24 a 48 meses após a adesão e regularização das quotas.',
    },
  ];

  const requirements = [
    'Bilhete de Identidade válido',
    'Comprovativo de rendimento',
    'Comprovativo de residência',
    'NIF (Número de Identificação Fiscal)',
    'Duas fotografias tipo passe',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Formulário Enviado!",
      description: "Entraremos em contacto em breve. Obrigado pelo interesse!",
    });
  };

  return (
    <section id="adesao" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
            Torne-se Cooperado
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Como <span className="text-gradient-gold">Fazer Parte</span> da Cooperativa
          </h2>
          <p className="text-muted-foreground text-lg">
            O processo de adesão é simples e transparente. Conheça os passos para 
            realizar o sonho da casa própria.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative bg-card p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <span className="text-4xl font-display font-bold text-muted/50 text-secondary">{step.step}</span>
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Benefits, Requirements, FAQ */}
          <div className="space-y-10">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-display font-semibold text-2xl text-foreground mb-6">
                Benefícios de Ser Cooperado
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-muted/50 p-6 rounded-2xl"
            >
              <h3 className="font-display font-semibold text-xl text-foreground mb-4">
                Documentação Necessária
              </h3>
              <ul className="space-y-2">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {req}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-display font-semibold text-2xl text-foreground mb-6">
                Perguntas Frequentes
              </h3>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium text-foreground pr-4">{faq.question}</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                          expandedFaq === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: expandedFaq === index ? 'auto' : 0,
                        opacity: expandedFaq === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-muted-foreground text-sm">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card p-8 rounded-2xl border border-border shadow-lg"
          >
            <h3 className="font-display font-semibold text-2xl text-foreground mb-2">
              Manifeste o Seu Interesse
            </h3>
            <p className="text-muted-foreground mb-8">
              Preencha o formulário abaixo e entraremos em contacto.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome Completo *
                  </label>
                  <Input placeholder="Seu nome" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Telefone *
                  </label>
                  <Input placeholder="+244 9XX XXX XXX" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <Input type="email" placeholder="seu@email.com" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Província de Residência *
                </label>
                <Input placeholder="Ex: Luanda" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipo de Habitação Pretendida
                </label>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Seleccione uma opção</option>
                  <option value="t1">Apartamento T1</option>
                  <option value="t2">Apartamento T2</option>
                  <option value="t3">Apartamento T3</option>
                  <option value="t4">Apartamento T4</option>
                  <option value="moradia">Moradia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mensagem (Opcional)
                </label>
                <Textarea placeholder="Conte-nos um pouco sobre as suas expectativas..." rows={4} />
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms" className="mt-1" required />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  Li e aceito os <a href="#" className="text-primary hover:underline">Termos de Uso</a> e a{' '}
                  <a href="#" className="text-primary hover:underline">Política de Privacidade</a>.
                </label>
              </div>

              <Button type="submit" variant="gold" size="xl" className="w-full group">
                <Send className="w-5 h-5" />
                Enviar Manifestação de Interesse
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
