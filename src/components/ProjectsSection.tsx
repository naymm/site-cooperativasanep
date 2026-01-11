import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Home, ArrowRight, Check, Clock, Hammer, Calendar, Ruler, Users, Building2, Phone, Mail, Images, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import kk1 from '@/assets/projectos/kk1.webp';
import kk2 from '@/assets/projectos/kk2.webp';
import kk3 from '@/assets/projectos/kk3.webp';
import kk4 from '@/assets/projectos/kk4.webp';
import kk5 from '@/assets/projectos/kk5.webp';
import videokk from '@/assets/projectos/video-kk.mp4';

import explorand1 from '@/assets/projectos/explendor-1.webp';
import explorand2 from '@/assets/projectos/explendor-2.webp';
import explorand3 from '@/assets/projectos/explendor-3.webp';
import explorand4 from '@/assets/projectos/explendor-4.webp';
import explorand5 from '@/assets/projectos/explendor-5.webp';

import sanep1 from '@/assets/projectos/sanep-1.webp';
import sanep2 from '@/assets/projectos/sanep-2.webp';
import sanep3 from '@/assets/projectos/sanep-3.webp';
import sanep4 from '@/assets/projectos/sanep-4.webp';
import sanep5 from '@/assets/projectos/sanep-5.webp';
import sanep6 from '@/assets/projectos/sanep-6.webp';


type ProjectStatus = 'all' | 'concluido' | 'construcao' | 'planejamento';

type Project = {
  id: number;
  name: string;
  location: string;
  status: 'concluido' | 'construcao' | 'planejamento';
  statusLabel: string;
  units: number;
  types: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery?: string[];
  video?: string;
  features: string[];
  startDate?: string;
  completionDate?: string;
  expectedCompletion?: string;
  totalArea?: string;
  investment?: string;
  contact?: {
    phone?: string;
    email?: string;
  };
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState<ProjectStatus>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      name: 'Vila Sanep',
      location: 'Luanda Sul',
      status: 'planejamento' as const,
      statusLabel: 'Em Planeamento',
      units: 80,
      types: 'V3, V4 e V5',
      description: 'O primeiro empreendimento da cooperativa, oferecendo apartamentos modernos com áreas de lazer e segurança 24h.',
      fullDescription: 'Vila Sanep será o primeiro empreendimento da cooperativa, marcando o início da nossa missão de proporcionar habitação de qualidade para as famílias angolanas. Localizado em Luanda Sul, este projecto oferece 80 unidades habitacionais, distribuídas em vivendas V3, V4 e V5, todos cuidadosamente planeados para maximizar o conforto e a funcionalidade. O empreendimento conta com infraestruturas completas de lazer, incluindo piscina, parque infantil, ginásio equipado e áreas verdes bem cuidadas. A segurança é uma prioridade, com sistema de vigilância 24 horas e controlo de acesso.',
      image: sanep1,
      gallery: [sanep1, sanep2, sanep3, sanep4, sanep5, sanep6],
      video: '', // Substitua pela URL real do vídeo
      features: ['Piscina', 'Parque Infantil', 'Ginásio', 'Segurança 24h', 'Áreas Verdes', 'Estacionamento Coberto'],
      startDate: 'Janeiro 2020',
      completionDate: 'Dezembro 2022',
      totalArea: '15.000 m²',
      investment: 'USD 12.5 milhões',
      contact: {
        phone: '+244 923 456 789',
        email: 'info@cooperativasanep.co.ao',
      },
    },
    {
      id: 2,
      name: 'Urbanização KK5800',
      location: 'Kilamba, Luanda',
      status: 'construcao' as const,
      statusLabel: 'Em Construção',
      units: 2.546,
      types: 'T3',
      description: 'Moradias geminadas em localização privilegiada, com fácil acesso a transportes e serviços.',
      fullDescription: 'A Urbanização KK5800 representa um dos maiores projectos habitacionais da cooperativa, com 2.546 unidades habitacionais do tipo T3. Situada em Kilamba, uma das zonas mais desenvolvidas de Luanda, este empreendimento oferece moradias dignas para as famílias angolanas. A localização privilegiada garante fácil acesso a transportes públicos, escolas, hospitais e centros comerciais. O projecto inclui uma área comercial integrada, proporcionando conveniência aos residentes. Com previsão de conclusão em 2025, este projecto está a transformar a paisagem urbana de Kilamba.',
      image: kk1,
      gallery: [kk1, kk2, kk3, kk4, kk5],
      video: videokk, // Substitua pela URL real do vídeo
      features: ['Zonas Verdes', 'Garagem', 'Área Comercial', 'Escola Próxima', 'Acesso a Transportes', 'Centro de Saúde'],
      startDate: 'Novembro 2025',
      expectedCompletion: 'Dezembro 2026',
      totalArea: '450.000 m²',
      investment: 'USD 180 milhões',
      contact: {
        phone: '+244 923 456 790',
        email: 'info@cooperativasanep.co.ao',
      },
    },
    {
      id: 3,
      name: 'Urbanização Explendor',
      location: 'Benfica',
      status: 'planejamento' as const,
      statusLabel: 'Em Planeamento',
      units: 200,
      types: 'V4 a V6',
      description: 'Nosso projecto mais ambicioso, com foco em sustentabilidade e comunidade integrada.',
      fullDescription: 'O Urbanização Explendor é o nosso projecto mais ambicioso e inovador, com foco em sustentabilidade ambiental e integração comunitária. Localizado em Benfica, este empreendimento de 200 unidades habitacionais (V4 a V6) será pioneiro em Angola na implementação de soluções ecológicas. O projecto inclui sistema de energia solar para todas as unidades, hortas comunitárias para produção de alimentos, centro comunitário para actividades culturais e sociais, e uma rede completa de ciclovias. O Urbanização Explendor não é apenas um projecto habitacional, mas uma comunidade sustentável que promove o bem-estar social e ambiental. Com início previsto para 2024, este projecto estabelecerá novos padrões de desenvolvimento urbano sustentável em Angola.',
      image: explorand1,
      gallery: [explorand1, explorand2, explorand3, explorand4, explorand5],
      video: '', // Substitua pela URL real do vídeo
      features: ['Energia Solar', 'Hortas Comunitárias', 'Centro Comunitário', 'Ciclovias', 'Sistema de Reutilização de Água', 'Espaços Culturais'],
      expectedCompletion: '2027',
      totalArea: '85.000 m²',
      investment: 'USD 45 milhões',
      contact: {
        phone: '+244 923 456 791',
        email: 'info@cooperativasanep.co.ao',
      },
    },
  ];

  const filters = [
    { value: 'all' as const, label: 'Todos' },
    { value: 'concluido' as const, label: 'Concluídos' },
    { value: 'construcao' as const, label: 'Em Construção' },
    { value: 'planejamento' as const, label: 'Em Planeamento' },
  ];

  const statusConfig = {
    concluido: { icon: Check, color: 'bg-green-500' },
    construcao: { icon: Hammer, color: 'bg-secondary' },
    planejamento: { icon: Clock, color: 'bg-blue-500' },
  };

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.status === activeFilter);

  return (
    <section id="projetos" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
            Nossos Projectos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Conheça os nossos <span className="text-gradient-primary">projectos</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Projectos habitacionais cuidadosamente planeados para oferecer qualidade de vida
            e integração comunitária.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeFilter === filter.value
                  ? 'bg-primary text-primary-foreground shadow-primary'
                  : 'bg-card text-muted-foreground hover:bg-muted border border-border'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const StatusIcon = statusConfig[project.status].icon;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig[project.status].color}`}>
                    <StatusIcon className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-medium">{project.statusLabel}</span>
                  </div>

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{project.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Home className="w-4 h-4 text-secondary" />
                      <span>{project.units} Unidades</span>
                    </div>
                    <div className="text-muted-foreground">
                      {project.types}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2.5 py-1 bg-muted rounded-full text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                    {project.features.length > 3 && (
                      <span className="text-xs px-2.5 py-1 bg-secondary/10 rounded-full text-secondary font-medium">
                        +{project.features.length - 3}
                      </span>
                    )}
                  </div>

                  <Button 
                    variant="goldOutline" 
                    className="w-full group/btn"
                    onClick={() => setSelectedProject(project)}
                  >
                    Ver Detalhes
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig[selectedProject.status].color}`}>
                    {(() => {
                      const StatusIcon = statusConfig[selectedProject.status].icon;
                      return <StatusIcon className="w-4 h-4 text-white" />;
                    })()}
                    <span className="text-white text-sm font-medium">{selectedProject.statusLabel}</span>
                  </div>

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5" />
                    <span className="text-base font-semibold">{selectedProject.location}</span>
                  </div>
                </div>
                
                <DialogTitle className="text-3xl font-display font-bold text-foreground">
                  {selectedProject.name}
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  {selectedProject.fullDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Video Section */}
                {selectedProject.video && (
                  <div>
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Video className="w-5 h-5 text-secondary" />
                      Vídeo do Projecto
                    </h4>
                    <div className="relative w-full rounded-lg overflow-hidden bg-muted/30 shadow-lg border border-border" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full border-0"
                        src={selectedProject.video}
                        title={`Vídeo do ${selectedProject.name}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}

                {/* Gallery Section */}
                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Images className="w-5 h-5 text-secondary" />
                      Galeria de Fotografias
                      <span className="text-sm text-muted-foreground font-normal ml-2">
                        ({selectedProject.gallery.length} {selectedProject.gallery.length === 1 ? 'fotografia' : 'fotografias'})
                      </span>
                    </h4>
                    <div className="relative">
                      <Carousel className="w-full">
                        <CarouselContent className="-ml-2 md:-ml-4">
                          {selectedProject.gallery.map((img, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4">
                              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted/30 group">
                                <img
                                  src={img}
                                  alt={`${selectedProject.name} - Imagem ${index + 1}`}
                                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        {selectedProject.gallery.length > 1 && (
                          <>
                            <CarouselPrevious className="left-2 md:left-4" />
                            <CarouselNext className="right-2 md:right-4" />
                          </>
                        )}
                      </Carousel>
                    </div>
                  </div>
                )}

                {/* Project Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="w-5 h-5 text-secondary" />
                      <span className="text-sm text-muted-foreground">Unidades</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{selectedProject.units.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-secondary" />
                      <span className="text-sm text-muted-foreground">Tipologias</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{selectedProject.types}</p>
                  </div>

                  {selectedProject.totalArea && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Ruler className="w-5 h-5 text-secondary" />
                        <span className="text-sm text-muted-foreground">Área Total</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{selectedProject.totalArea}</p>
                    </div>
                  )}

                  {selectedProject.investment && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-secondary" />
                        <span className="text-sm text-muted-foreground">Investimento</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">{selectedProject.investment}</p>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                {(selectedProject.startDate || selectedProject.completionDate || selectedProject.expectedCompletion) && (
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-secondary" />
                      Cronograma
                    </h4>
                    <div className="space-y-2">
                      {selectedProject.startDate && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Data de Início:</span>
                          <span className="font-medium">{selectedProject.startDate}</span>
                        </div>
                      )}
                      {selectedProject.completionDate && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Data de Conclusão:</span>
                          <span className="font-medium text-green-600">{selectedProject.completionDate}</span>
                        </div>
                      )}
                      {selectedProject.expectedCompletion && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Previsão de Conclusão:</span>
                          <span className="font-medium text-secondary">{selectedProject.expectedCompletion}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-lg mb-4">Características e Amenidades</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedProject.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-3"
                      >
                        <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                {selectedProject.contact && (selectedProject.contact.phone || selectedProject.contact.email) && (
                  <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                    <h4 className="font-semibold text-lg mb-4">Informações de Contacto</h4>
                    <div className="space-y-3">
                      {selectedProject.contact.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-secondary" />
                          <a 
                            href={`tel:${selectedProject.contact.phone}`}
                            className="text-foreground hover:text-primary transition-colors"
                          >
                            {selectedProject.contact.phone}
                          </a>
                        </div>
                      )}
                      {selectedProject.contact.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-secondary" />
                          <a 
                            href={`mailto:${selectedProject.contact.email}`}
                            className="text-foreground hover:text-primary transition-colors"
                          >
                            {selectedProject.contact.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
