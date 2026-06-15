/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SalesPageConfig } from '../types';

export const DEFAULT_SALES_PAGE: SalesPageConfig = {
  headline: "Descubra o Método Exclusivo para Faturar de R$ 3.000 a R$ 10.000/Mês Prestando Serviços Simples de Inteligência Artificial",
  subheadline: "Sem precisar programar, sem gastar fortunas com anúncios e sem nenhuma experiência prévia. O passo a passo definitivo para você faturar com contratos recorrentes em menos de 15 dias.",
  vslUrl: "", // Empty will display our beautiful simulated premium video player
  vslBadge: "🔴 VÍDEO EXCLUSIVO: ASSISTA ANTES QUE SAIA DO AR",
  primaryCtaText: "QUERO GARANTIR MINHA VAGA COM 70% OFF",
  countdownMinutes: 15,
  featuresTitle: "O que você vai receber dentro do treinamento?",
  featuresSubtitle: "Um ecossistema completo desenhado para te levar do zero absoluto aos primeiros contratos de alta conversão.",
  features: [
    {
      id: "feat_1",
      icon: "Cpu",
      title: "Agência de IA Lucrativa",
      description: "Como criar robôs de atendimento automáticos, geradores de conteúdo e dashboards inteligentes para empresas locais em menos de 30 minutos por cliente."
    },
    {
      id: "feat_2",
      icon: "Zap",
      title: "Funis de Atração Orgânica",
      description: "Copie e cole os scripts de copy exatos que usamos para abordar donos de negócios e fechar contratos recorrentes de R$ 1.500 a R$ 3.000 sem fazer reuniões maçantes."
    },
    {
      id: "feat_3",
      icon: "MessageSquareText",
      title: "Chatbots de Integração Avançada",
      description: "Aprenda a conectar a API do Gemini e WhatsApp para criar assistentes de suporte humano simulado que reduzem os custos das empresas em até 80%."
    },
    {
      id: "feat_4",
      icon: "ShieldAlert",
      title: "Contratos e Propostas Prontas",
      description: "Modelos jurídicos prontos para você assinar com segurança, proteger seu trabalho e manter parcerias de longo prazo com as maiores empresas do mercado."
    },
    {
      id: "feat_5",
      icon: "Users2",
      title: "Comunidade VIP no Discord",
      description: "Entre em contato diário com dezenas de empreendedores de IA que compartilham parcerias, táticas secretas, integrações exclusivas e contatos de clientes."
    },
    {
      id: "feat_6",
      icon: "Award",
      title: "Certificado de Especialista",
      description: "Ao finalizar os módulos práticos, você receberá um certificado exclusivo chancelado de Integrador de Soluções de IA, agregando grande valor profissional."
    }
  ],
  authorName: "Mateus Santana",
  authorRole: "Fundador da IA Scaler & Especialista em Automação",
  authorBio: "Após faturar mais de R$ 1.2 milhão no mercado digital desenvolvendo fluxos corporativos automatizados, Mateus decidiu abrir a sua metodologia secreta. Hoje, a IA Scaler capacita mais de 4.200 alunos a lucrar diariamente com o poder transformador da inteligência artificial aplicada aos negócios reais.",
  authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80",
  authorSignature: "Juntos rumo ao próximo nível.",
  testimonialsTitle: "Quem já aplica o método aprova os resultados",
  testimonials: [
    {
      id: "t_1",
      name: "Larissa Mendes",
      role: "@larissadigital_ • Ex-vendedora de shopping",
      rating: 5,
      content: "Melhor investimento da minha vida! No meu primeiro mês, aplicando os prompts prontos de captação orgânica, fechei três contratos de atendimento por IA para clínicas locais. Faturei R$ 4.500 trabalhando do meu celular.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      id: "t_2",
      name: "Carlos Eduardo (Cadu)",
      role: "@cadu.growth • Especialista de Tráfego",
      rating: 5,
      content: "O suporte é sensacional e a metodologia vai direto ao ponto. Consegui agregar o serviço de chatbot de IA ao meu portfólio de tráfego pago e dobrei o faturamento de todos os meus clientes ativos em apenas duas semanas de uso.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      id: "t_3",
      name: "Bruna Silveira",
      role: "@brunas_tech • Designer Freelancer",
      rating: 5,
      content: "Eu era muito descrente sobre IA, achava que era só brincadeira do ChatGPT. Mas os robôs ensinados mudam o jogo comercial. Comprei o treinamento há 20 dias e já recuperei 8 vezes o valor investido. Recomendo muito!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ],
  priceTitle: "Escolha o melhor plano para você começar hoje",
  priceSubtitle: "Acesso imediato à plataforma de alunos, atualizações contínuas, suporte e comunidade.",
  priceTiers: [
    {
      id: "p_1",
      name: "Acesso Essencial",
      badge: "PLANO SEMESTRAL",
      originalPrice: 397,
      currentPrice: 147,
      installmentsCount: 12,
      installmentsValue: 14.65,
      features: [
        "Curso Completo IA Scaler",
        "Módulos Básicos e Intermediários",
        "Modelos de Abordagem de Clientes",
        "6 Meses de Acesso à Plataforma",
        "Suporte por E-mail"
      ],
      ctaText: "QUERO O PLANO ESSENCIAL"
    },
    {
      id: "p_2",
      name: "Formação Expert + Comunidade",
      badge: "O MAIS RECOMENDADO • ECONOMIA DE 70%",
      originalPrice: 997,
      currentPrice: 297,
      installmentsCount: 12,
      installmentsValue: 29.62,
      features: [
        "Acesso Vitalício a Todos os Módulos",
        "Acesso à Comunidade VIP no Discord",
        "Aulas e Mentorias Práticas Mensais",
        "Biblioteca de Prompts & Bots Copie e Cole",
        "Grupo de Networking de Negócios",
        "Kit de Contratos e Jurídico de IA",
        "Prioridade no Suporte e Dúvidas"
      ],
      isPopular: true,
      ctaText: "QUERO ME TORNAR UM EXPERT AGORA"
    }
  ],
  guaranteeDays: 7,
  guaranteeText: "Seu risco é absolutamente zero. Compre o treinamento e teste todos os métodos. Se por qualquer motivo você não achar que gerou valor ou não se adaptar ao método simples, basta enviar um único e-mail em até 7 dias e devolveremos 100% do seu dinheiro, centavo por centavo, sem burocracia ou perguntas chatas.",
  faqTitle: "Dúvidas Frequentes",
  faqs: [
    {
      id: "faq_1",
      question: "Preciso saber de programação ou ter conhecimentos técnicos avançados?",
      answer: "Absolutamente não! O treinamento foi desenvolvido do completo zero pensado em pessoas comuns. Todas as ferramentas e robôs usados exigem apenas cliques em layouts intuitivos que nós ensinamos passo a passo na prática."
    },
    {
      id: "faq_2",
      question: "Como recebo o acesso ao treinamento?",
      answer: "O acesso é imediato e 100% automático. Assim que seu pagamento for processado (por PIX ou Cartão de Crédito), você receberá um e-mail com o link de login, usuário, senha temporária e instruções para entrar na plataforma de estudos de imediato."
    },
    {
      id: "faq_3",
      question: "Como funciona a garantia incondicional de 7 dias?",
      answer: "É muito simples. Você se inscreve hoje, assiste às aulas, acessa os robôs e as propostas comerciais. Se dentro de 7 dias você desistir da compra, manda um e-mail de suporte e reembolsamos integralmente o valor pago de forma descomplicada."
    },
    {
      id: "faq_4",
      question: "Por quanto tempo poderei acessar o curso?",
      answer: "No Plano Expert, o seu acesso é vitálicio! Compre uma vez e tenha acesso para sempre, incluindo todas as atualizações futuras e bônus que forem adicionados à grade curricular gratuitamente."
    },
    {
      id: "faq_5",
      question: "E se eu tiver dúvidas durante as aulas?",
      answer: "Você nunca estará sozinho. Disponibilizamos suporte rápido e especializado tanto na área de membros de cada aula quanto em nossos canais de relacionamento dedicados e na própria comunidade exclusiva com outros alunos."
    }
  ],
  theme: "premium-gold",
  purchaseAlertNames: [
    "Juliana de Souza",
    "Ricardo Alencar",
    "Felipe Nogueira",
    "Carolina Martins",
    "Marcos Vinícius",
    "Gabriela Lima",
    "Arthur Silva",
    "Patricia Ramos",
    "Marcelo Andrade",
    "Vitor Pinheiro"
  ]
};
