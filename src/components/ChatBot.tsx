import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o assistente virtual da Cooperativa de Habitação do Grupo Sanep. Como posso ajudá-lo hoje?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Base de conhecimento estruturada com informações reais do site
  const knowledgeBase = {
    sobre: {
      nome: 'Cooperativa de Habitação do Grupo Sanep (CHCGS)',
      fundacao: '2024',
      descricao: 'A Cooperativa de Habitação do Grupo Sanep (CHCGS) nasceu em 2024 com uma missão clara: transformar o sonho da habitação própria em realidade para famílias angolanas. Através do modelo cooperativo, unimos recursos e esforços para construir não apenas casas, mas comunidades integradas e prósperas.',
      missao: 'Proporcionar habitação digna e acessível, fortalecendo o tecido social através da participação cooperativa.',
      visao: 'Ser a principal referência em habitação cooperativa em Angola, inspirando um novo modelo de desenvolvimento urbano.',
      valores: [
        { titulo: 'Modelo Cooperativo', descricao: 'Decisões tomadas em conjunto, onde cada cooperado tem voz ativa e igual participação.' },
        { titulo: 'Habitação Digna', descricao: 'Compromisso com moradias de qualidade que respeitam a dignidade humana.' },
        { titulo: 'Acessibilidade', descricao: 'Condições financeiras justas e planos adaptados à realidade angolana.' },
        { titulo: 'Inovação', descricao: 'Soluções modernas e sustentáveis para os desafios habitacionais.' },
      ],
      estatisticas: {
        fundacao: '2024',
        cooperados: '+100',
        projectos: '3',
        unidades: '200+',
      },
    },
    projectos: [
      {
        nome: 'Vila Sanep',
        localizacao: 'Luanda Sul',
        status: 'Em Planeamento',
        unidades: 80,
        tipologias: 'V3, V4 e V5',
        descricao: 'Vila Sanep será o primeiro empreendimento da cooperativa, marcando o início da nossa missão de proporcionar habitação de qualidade para as famílias angolanas. Localizado em Luanda Sul, este projecto oferece 80 unidades habitacionais, distribuídas em vivendas V3, V4 e V5, todos cuidadosamente planeados para maximizar o conforto e a funcionalidade.',
        caracteristicas: ['Piscina', 'Parque Infantil', 'Ginásio', 'Segurança 24h', 'Áreas Verdes', 'Estacionamento Coberto'],
        area: '15.000 m²',
        investimento: 'USD 12.5 milhões',
        previsao: 'Em Planeamento',
      },
      {
        nome: 'Urbanização KK5800',
        localizacao: 'Kilamba, Luanda',
        status: 'Em Construção',
        unidades: 2546,
        tipologias: 'T3',
        descricao: 'A Urbanização KK5800 representa um dos maiores projectos habitacionais da cooperativa, com 2.546 unidades habitacionais do tipo T3. Situada em Kilamba, uma das zonas mais desenvolvidas de Luanda, este empreendimento oferece moradias dignas para as famílias angolanas.',
        caracteristicas: ['Zonas Verdes', 'Garagem', 'Área Comercial', 'Escola Próxima', 'Acesso a Transportes', 'Centro de Saúde'],
        area: '450.000 m²',
        investimento: 'USD 180 milhões',
        inicio: 'Novembro 2025',
        previsao: 'Dezembro 2026',
      },
      {
        nome: 'Urbanização Explendor',
        localizacao: 'Benfica',
        status: 'Em Planeamento',
        unidades: 200,
        tipologias: 'V4 a V6',
        descricao: 'O Urbanização Explendor é o nosso projecto mais ambicioso e inovador, com foco em sustentabilidade ambiental e integração comunitária. Localizado em Benfica, este empreendimento de 200 unidades habitacionais (V4 a V6) será pioneiro em Angola na implementação de soluções ecológicas.',
        caracteristicas: ['Energia Solar', 'Hortas Comunitárias', 'Centro Comunitário', 'Ciclovias', 'Sistema de Reutilização de Água', 'Espaços Culturais'],
        area: '85.000 m²',
        investimento: 'USD 45 milhões',
        previsao: '2027',
      },
    ],
    adesao: {
      passos: [
        { numero: '01', titulo: 'Manifestação de Interesse', descricao: 'Preencha o formulário de pré-cadastro com os seus dados básicos.' },
        { numero: '02', titulo: 'Análise e Aprovação', descricao: 'Nossa equipa analisa o seu perfil e entra em contacto.' },
        { numero: '03', titulo: 'Adesão e Quotização', descricao: 'Formalize a adesão e inicie as suas contribuições mensais.' },
        { numero: '04', titulo: 'Sua Casa Própria', descricao: 'Acompanhe o projecto e prepare-se para receber as chaves.' },
      ],
      beneficios: [
        'Acesso a habitação de qualidade abaixo do preço de mercado',
        'Participação activa nas decisões da cooperativa',
        'Condições de pagamento flexíveis e acessíveis',
        'Comunidades integradas com áreas comuns e serviços',
        'Apoio jurídico e administrativo incluído',
        'Transparência total na gestão dos recursos',
      ],
      requisitos: [
        'Bilhete de Identidade válido',
        'Comprovativo de rendimento',
        'Comprovativo de residência',
        'NIF (Número de Identificação Fiscal)',
        'Duas fotografias tipo passe',
      ],
      faqs: [
        {
          pergunta: 'Quem pode ser cooperado da CHCGS?',
          resposta: 'Qualquer cidadão angolano maior de 18 anos, com rendimento comprovado e que não possua imóvel próprio pode candidatar-se a cooperado.',
        },
        {
          pergunta: 'Qual é o valor da quota mensal?',
          resposta: 'O valor da quota é definido de acordo com o tipo de habitação pretendida, começando a partir de 50.000 Kz mensais. Oferecemos planos personalizados.',
        },
        {
          pergunta: 'Posso perder o meu investimento?',
          resposta: 'Não. Em caso de desistência, o cooperado tem direito à restituição dos valores pagos, conforme os estatutos da cooperativa.',
        },
        {
          pergunta: 'Quanto tempo leva para receber a habitação?',
          resposta: 'O prazo varia conforme o projecto escolhido, geralmente entre 24 a 48 meses após a adesão e regularização das quotas.',
        },
      ],
    },
    contacto: {
      endereco: 'Av. Cmte. Valódia, Bairro Combatentes, Luanda, Angola',
      telefone: '+244 923 456 789',
      email: 'info@cooperativasanep.co.ao',
      whatsapp: '+244 923 456 789',
      horario: 'Seg - Sex: 08h00 - 17h00',
    },
  };

  // Função de busca semântica melhorada
  const findBestMatch = (userMessage: string): string | null => {
    const message = userMessage.toLowerCase().trim();
    const words = message.split(/\s+/);

    // Saudações
    if (message.match(/^(olá|ola|oi|hey|bom dia|boa tarde|boa noite|hello|hi|olá|bom dia|boa tarde|boa noite)/)) {
      return `Olá! Fico feliz em ajudá-lo. Sou o assistente virtual da ${knowledgeBase.sobre.nome}. Sobre o que gostaria de saber? Posso ajudar com informações sobre:\n\n• A cooperativa e nossos valores\n• Nossos projectos habitacionais\n• Como aderir e tornar-se cooperado\n• Requisitos e documentação\n• Contactos e localização`;
    }

    // Informações gerais sobre a cooperativa
    if (message.match(/(o que é|quem são|sobre|cooperativa|chcgs|quem é)/)) {
      return `${knowledgeBase.sobre.descricao}\n\n📊 Estatísticas:\n• Fundada em: ${knowledgeBase.sobre.estatisticas.fundacao}\n• Cooperados Activos: ${knowledgeBase.sobre.estatisticas.cooperados}\n• Projectos em Curso: ${knowledgeBase.sobre.estatisticas.projectos}\n• Unidades Planeadas: ${knowledgeBase.sobre.estatisticas.unidades}`;
    }

    // Missão
    if (message.match(/(missão|missao|propósito|objetivo principal)/)) {
      return `Nossa Missão:\n\n${knowledgeBase.sobre.missao}`;
    }

    // Visão
    if (message.match(/(visão|visao|futuro|aspiração)/)) {
      return `Nossa Visão:\n\n${knowledgeBase.sobre.visao}`;
    }

    // Valores
    if (message.match(/(valores|princípios|principios|crenças|crencas)/)) {
      const valoresText = knowledgeBase.sobre.valores.map(v => `• ${v.titulo}: ${v.descricao}`).join('\n');
      return `Nossos Valores:\n\n${valoresText}`;
    }

    // Projectos - busca geral
    if (message.match(/(projectos|projetos|empreendimentos|unidades|casas|vivendas|habitação|habitacao)/)) {
      const projectosText = knowledgeBase.projectos.map(p => 
        `🏠 ${p.nome} (${p.localizacao})\n   • ${p.unidades} unidades - ${p.tipologias}\n   • Status: ${p.status}`
      ).join('\n\n');
      return `Temos ${knowledgeBase.projectos.length} projectos:\n\n${projectosText}\n\nGostaria de saber mais detalhes sobre algum projecto específico?`;
    }

    // Projectos específicos
    const projectoMatch = knowledgeBase.projectos.find(p => 
      message.includes(p.nome.toLowerCase()) || 
      message.includes(p.localizacao.toLowerCase()) ||
      (p.nome === 'Vila Sanep' && message.match(/(vila|sanep)/)) ||
      (p.nome === 'Urbanização KK5800' && message.match(/(kk5800|kk|kilamba)/)) ||
      (p.nome === 'Urbanização Explendor' && message.match(/(explendor|explendor|benfica)/))
    );
    if (projectoMatch) {
      const p = projectoMatch;
      let resposta = `🏠 ${p.nome}\n\n📍 Localização: ${p.localizacao}\n📊 Status: ${p.status}\n🏘️ Unidades: ${p.unidades}\n🏡 Tipologias: ${p.tipologias}\n\n${p.descricao}\n\n`;
      if (p.area) resposta += `📐 Área Total: ${p.area}\n`;
      if (p.investimento) resposta += `💰 Investimento: ${p.investimento}\n`;
      if (p.previsao) resposta += `📅 Previsão: ${p.previsao}\n`;
      if (p.inicio) resposta += `🚀 Início: ${p.inicio}\n`;
      resposta += `\n✨ Características:\n${p.caracteristicas.map(c => `• ${c}`).join('\n')}`;
      return resposta;
    }

    // Como aderir
    if (message.match(/(como aderir|como me tornar|tornar cooperado|aderir|inscrição|inscrever|processo|passos)/)) {
      const passosText = knowledgeBase.adesao.passos.map(p => 
        `${p.numero}. ${p.titulo}: ${p.descricao}`
      ).join('\n');
      return `Processo de Adesão:\n\n${passosText}\n\nPara iniciar, preencha o formulário na seção "Como Aderir" do nosso site ou contacte-nos através de:\n📧 ${knowledgeBase.contacto.email}\n📞 ${knowledgeBase.contacto.telefone}`;
    }

    // Benefícios
    if (message.match(/(benefícios|beneficios|vantagens|vantagem|vantajoso|por que|porque|motivos)/)) {
      const beneficiosText = knowledgeBase.adesao.beneficios.map(b => `✓ ${b}`).join('\n');
      return `Benefícios de Ser Cooperado:\n\n${beneficiosText}`;
    }

    // Requisitos e documentação
    if (message.match(/(requisitos|documentos|necessário|preciso|exigências|documentação|documentacao|papéis|papeis)/)) {
      const requisitosText = knowledgeBase.adesao.requisitos.map(r => `• ${r}`).join('\n');
      return `Documentação Necessária:\n\n${requisitosText}\n\nAlém disso, é necessário:\n• Ser maior de 18 anos\n• Ter rendimento comprovado\n• Não possuir imóvel próprio`;
    }

    // FAQ específico
    const faqMatch = knowledgeBase.adesao.faqs.find(faq => 
      words.some(word => faq.pergunta.toLowerCase().includes(word)) ||
      message.includes('quota') || message.includes('quota mensal') ||
      message.includes('perder investimento') || message.includes('desistência') ||
      message.includes('tempo') || message.includes('prazo') || message.includes('quando')
    );
    if (faqMatch) {
      return `Pergunta: ${faqMatch.pergunta}\n\nResposta: ${faqMatch.resposta}`;
    }

    // Preços e custos
    if (message.match(/(preço|preços|custo|custos|quanto|valor|pagamento|financiamento|quota|mensalidade)/)) {
      return `Informações sobre Preços:\n\n• A quota mensal começa a partir de 50.000 Kz mensais\n• O valor varia conforme o tipo de habitação pretendida\n• Oferecemos planos personalizados e condições flexíveis\n• Condições financeiras justas adaptadas à realidade angolana\n\nPara informações detalhadas sobre preços específicos de cada projecto, contacte-nos:\n📧 ${knowledgeBase.contacto.email}\n📞 ${knowledgeBase.contacto.telefone}`;
    }

    // Contacto
    if (message.match(/(contacto|contactar|telefone|email|falar|ligar|comunicar|endereço|endereco|morada|sede|localização|localizacao)/)) {
      return `Informações de Contacto:\n\n📍 Endereço:\n${knowledgeBase.contacto.endereco}\n\n📞 Telefone:\n${knowledgeBase.contacto.telefone}\n\n📧 Email:\n${knowledgeBase.contacto.email}\n\n💬 WhatsApp:\n${knowledgeBase.contacto.whatsapp}\n\n🕐 Horário de Funcionamento:\n${knowledgeBase.contacto.horario}\n\nTambém pode preencher o formulário na seção "Como Aderir" do nosso site.`;
    }

    // Portal do cooperado
    if (message.match(/(portal|cooperado|login|acesso|entrar|sistema|área restrita|area restrita)/)) {
      return `Portal do Cooperado:\n\nO Portal do Cooperado é uma plataforma exclusiva para membros da cooperativa, onde podem:\n\n🔐 Aceder às suas informações pessoais\n📊 Acompanhar o progresso dos projectos\n💬 Comunicar com a administração\n📄 Consultar documentos e extratos\n📋 Ver histórico de pagamentos\n\nSe já é cooperado, aceda ao portal através da seção "Portal do Cooperado" no menu do site.`;
    }

    // Prazo de entrega
    if (message.match(/(prazo|quando|entrega|conclusão|conclusao|data|tempo|quanto tempo|quando recebo|quando fica pronto)/)) {
      const prazosText = knowledgeBase.projectos.map(p => 
        `🏠 ${p.nome}: ${p.previsao || p.status}`
      ).join('\n');
      return `Prazos de Entrega:\n\n${prazosText}\n\nGeralmente, o prazo varia entre 24 a 48 meses após a adesão e regularização das quotas, dependendo do projecto escolhido.\n\nPara informações mais específicas, contacte-nos diretamente.`;
    }

    // Tipologias
    if (message.match(/(tipologia|tipos|t2|t3|t4|v3|v4|v5|v6|quartos|dormitórios|dormitorios|vivenda|apartamento)/)) {
      const tipologiasText = knowledgeBase.projectos.map(p => 
        `🏠 ${p.nome}: ${p.tipologias}`
      ).join('\n');
      return `Tipologias Disponíveis:\n\n${tipologiasText}\n\nCada tipologia oferece diferentes áreas e configurações. Visite a seção "Projectos" do nosso site para ver os detalhes completos de cada projecto, incluindo características, áreas e investimentos.`;
    }

    // Despedidas
    if (message.match(/(obrigado|obrigada|tchau|até logo|adeus|bye|thanks|grato|muito obrigado|muito obrigada)/)) {
      return 'De nada! Fico sempre disponível para ajudar. Se tiver mais alguma dúvida sobre a cooperativa, nossos projectos ou como aderir, não hesite em perguntar. Tenha um ótimo dia! 😊\n\nLembre-se: você também pode contactar-nos diretamente através de:\n📧 ' + knowledgeBase.contacto.email + '\n📞 ' + knowledgeBase.contacto.telefone;
    }

    return null;
  };

  const getBotResponse = (userMessage: string): string => {
    const match = findBestMatch(userMessage);
    if (match) return match;

    // Resposta padrão inteligente
    return `Obrigado pela sua pergunta! Posso ajudá-lo com informações sobre:\n\n📋 A cooperativa (missão, visão, valores)\n🏠 Nossos projectos habitacionais\n📝 Como aderir e tornar-se cooperado\n💰 Preços e condições de pagamento\n📄 Requisitos e documentação\n📍 Localização e contactos\n⏱️ Prazos de entrega\n\nPara informações mais específicas:\n• Visite as seções do nosso site\n• Contacte-nos: ${knowledgeBase.contacto.email}\n• Ligue: ${knowledgeBase.contacto.telefone}\n\nComo posso ajudá-lo especificamente?`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular delay de resposta do bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group',
          isOpen && 'hidden'
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Abrir chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse" />
      </motion.button>

      {/* Janela do chat */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[600px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-primary p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-foreground">Assistente Virtual</h3>
                    <p className="text-xs text-primary-foreground/80">CHCGS - Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                  aria-label="Fechar chat"
                >
                  <X className="w-5 h-5 text-primary-foreground" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'flex gap-3',
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-2',
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border border-border text-foreground'
                      )}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString('pt-AO', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl px-4 py-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border bg-background">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    size="icon"
                    className="shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Digite sua pergunta sobre a cooperativa, projectos ou como aderir
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

