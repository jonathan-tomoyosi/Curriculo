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
    period: { start: '2025-01', end: null },
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
]
