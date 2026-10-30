import type { Experience } from './types'

/**
 * Experiência profissional.
 *
 * `confidential: true` marca trabalho corporativo cujo detalhamento por cliente ou
 * sistema não é publicado (docs/PREMISSAS.md, D2). Os itens abaixo descrevem tipo de
 * trabalho e tecnologia, nunca cliente, município ou nome de sistema.
 */
export const experiences: readonly Experience[] = [
  {
    id: 'open-br',
    company: 'Open Br',
    confidential: true,
    role: {
      pt: 'Desenvolvedor Fullstack',
      en: 'Fullstack Developer',
    },
    period: { start: '2025-11', end: null },
    summary: {
      pt:
        'Atuação de ponta a ponta em plataformas de dados do setor público: da ingestão e ' +
        'processamento de grandes volumes até a interface que a gestão usa para decidir.',
      en:
        'End-to-end work on public-sector data platforms: from ingesting and processing large ' +
        'volumes through to the interface management uses to make decisions.',
    },
    highlights: {
      pt: [
        'Desenvolvimento de rotinas de processamento e tratamento de Big Data, com foco em reduzir tempo de execução.',
        'Infraestrutura dos projetos em AWS — funções serverless, instâncias, bancos gerenciados, armazenamento de objetos, observabilidade e registro de imagens.',
        'Criação de sistemas de gestão de notas fiscais eletrônicas e auditoria de processamento.',
        'Análise de dados e construção de dashboards que transformam base bruta em indicador de gestão.',
        'Responsável pelo UX/UI dos projetos.',
        'Introdução de novos métodos e padrões de desenvolvimento no time.',
        'Migração de códigos e bases legadas para tecnologias atuais, incluindo integração de bancos Firebird com consolidação em PostgreSQL.',
      ],
      en: [
        'Built Big Data processing and cleansing routines, focused on cutting execution time.',
        'Owned project infrastructure on AWS — serverless functions, instances, managed databases, object storage, observability and image registry.',
        'Built systems for electronic invoice management and processing audit.',
        'Data analysis and dashboards that turn raw databases into management indicators.',
        'Responsible for the UX/UI of the projects.',
        'Introduced new development methods and standards to the team.',
        'Migrated legacy code and databases to current technology, including Firebird integration consolidated into PostgreSQL.',
      ],
    },
    stack: [
      'Python',
      'pandas',
      'PostgreSQL',
      'AWS',
      'Docker',
      'Next.js',
      'TypeScript',
      'FastAPI',
      'Laravel',
      'Streamlit',
      'Firebird',
    ],
  },
  {
    id: 'yma-log',
    company: 'Yma Log',
    role: {
      pt: 'Desenvolvedor Mobile',
      en: 'Mobile Developer',
    },
    period: { start: '2026-01', end: null },
    summary: {
      pt:
        'Responsável por design e estrutura do aplicativo, traduzindo funcionalidades pensadas ' +
        'para desktop em uma experiência que funcione de verdade numa tela pequena.',
      en:
        'Responsible for the app’s design and structure, translating features designed for ' +
        'desktop into an experience that genuinely works on a small screen.',
    },
    highlights: {
      pt: [
        'Melhorias de design e de estrutura do aplicativo mobile.',
        'Transposição das funcionalidades da web para o mobile com uma navegação simples e fluida.',
        'Redução do atrito na transição entre a tela de computador e a tela do celular.',
        'Aplicação nativa em React Native com Expo, publicada para Android.',
      ],
      en: [
        'Design and structural improvements to the mobile application.',
        'Ported web features to mobile with simple, fluid navigation.',
        'Reduced friction in the transition from desktop screen to phone screen.',
        'Native application in React Native with Expo, shipped for Android.',
      ],
    },
    stack: ['React Native', 'Expo', 'TypeScript', 'Fastify', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 'bom-pastor',
    company: 'Igreja Bom Pastor SP',
    role: {
      pt: 'Desenvolvedor Fullstack',
      en: 'Fullstack Developer',
    },
    summary: {
      pt:
        'Sistema de gestão eclesiástica construído de ponta a ponta — do modelo de dados e das ' +
        'regras de permissão à interface mobile-first usada pelos membros.',
      en:
        'Church management system built end to end — from the data model and permission rules ' +
        'to the mobile-first interface members actually use.',
    },
    highlights: {
      pt: [
        'Setor financeiro completo, com gestão de entrada e saída de caixa.',
        'Gestão pastoral: aniversários, grupos de que cada membro participa e situação de dízimo.',
        'Gestão de escalas de serviço para membros, com avisos.',
        'Calendário com controle de eventos, participantes responsáveis e notificação por e-mail.',
        'Relatórios para os professores das aulas infantis.',
        'Sistema completo de autenticação, com cadastro, recuperação e redefinição de senha.',
      ],
      en: [
        'Full finance module, with cash in/out management.',
        'Pastoral management: birthdays, the groups each member belongs to, and tithe status.',
        'Service rota management for members, with notices.',
        'Calendar with event control, responsible participants and email notification.',
        'Reports for the children’s class teachers.',
        'Complete authentication system with sign-up, password recovery and reset.',
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Recharts', 'Vercel'],
  },
  {
    id: 'smart-sigma',
    company: 'Smart Sigma',
    role: {
      pt: 'Auxiliar de Logística',
      en: 'Logistics Assistant',
    },
    period: { start: '2024-07', end: '2025-04' },
    summary: {
      pt:
        'Ponte entre o estoque e o campo: garantir que cada equipamento de rede e de segurança ' +
        'saísse testado, configurado e rastreável até o cliente.',
      en:
        'The bridge between stock and the field: making sure every network and security device ' +
        'left tested, configured and traceable all the way to the customer.',
    },
    highlights: {
      pt: [
        'Testes e configuração de switches, access points e câmeras de segurança Ubiquiti pelo UniFi.',
        'Controle do inventário técnico, mantendo a quantidade em estoque confiável para o planejamento das instalações.',
        'Rastreamento dos equipamentos instalados em cada cliente, do envio à manutenção.',
      ],
      en: [
        'Tested and configured Ubiquiti switches, access points and security cameras through UniFi.',
        'Kept the technical inventory under control, so stock counts could be trusted when planning installations.',
        'Tracked the equipment installed at each customer, from shipment to maintenance.',
      ],
    },
    stack: [],
  },
  {
    id: 'ambipar-bank',
    company: 'Ambipar Bank',
    role: {
      pt: 'Suporte ao Cliente e Análise Antifraude',
      en: 'Customer Support & Fraud Analyst',
    },
    period: { start: '2022-12', end: '2023-10' },
    summary: {
      pt:
        'Linha de frente do aplicativo do banco: resolver o problema do cliente e, ao mesmo ' +
        'tempo, proteger a operação de movimentações suspeitas.',
      en:
        'Front line for the bank’s app: solving the customer’s problem while protecting the ' +
        'operation from suspicious transactions.',
    },
    highlights: {
      pt: [
        'Suporte ao aplicativo bancário: diagnóstico do problema relatado pelo cliente e solução de ponta a ponta.',
        'Análise antifraude de movimentações, com registro de evidências e encaminhamento para a segunda análise.',
        'Validação de identidade e atualização cadastral, seguindo os procedimentos de segurança e compliance.',
      ],
      en: [
        'Support for the banking app: diagnosing the issue reported by the customer and solving it end to end.',
        'Fraud analysis of account activity, documenting evidence and escalating cases to second-level review.',
        'Identity verification and customer record updates, following security and compliance procedures.',
      ],
    },
    stack: [],
  },
  {
    id: 'romacell',
    company: 'Romacell',
    role: {
      pt: 'Técnico de Manutenção e Atendimento',
      en: 'Repair Technician & Customer Service',
    },
    period: { start: '2019-12', end: '2022-12' },
    summary: {
      pt:
        'Negócio da família, onde o contato com tecnologia começou de verdade: diagnosticar, ' +
        'consertar e explicar para o cliente o que tinha acontecido com o aparelho.',
      en:
        'The family business where my hands-on work with technology really started: diagnosing, ' +
        'fixing and explaining to customers what had happened to their device.',
    },
    highlights: {
      pt: [
        'Manutenção de hardware em celulares e notebooks, do diagnóstico à troca de componentes.',
        'Reparo de software: formatação, reinstalação de sistema e recuperação de aparelhos com falha.',
        'Atendimento ao cliente e controle do estoque de acessórios da loja.',
      ],
      en: [
        'Hardware repair on phones and laptops, from diagnosis to component replacement.',
        'Software repair: formatting, OS reinstallation and recovery of failing devices.',
        'Customer service and inventory control of the store’s accessories.',
      ],
    },
    stack: [],
  },
]
