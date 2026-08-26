import type { Project } from './types'

export const projects: readonly Project[] = [
  {
    slug: 'bom-pastor-sp',
    name: 'Igreja Bom Pastor SP',
    featured: true,
    status: 'live',
    cover: '/projetos/bom-pastor.png',
    links: { live: 'https://bom-pastor-scs.vercel.app' },
    tagline: {
      pt: 'Plataforma de gestão eclesiástica mobile-first, do banco de dados à interface',
      en: 'Mobile-first church management platform, from database to interface',
    },
    summary: {
      pt:
        'Sistema completo de gestão para uma comunidade — finanças, pessoas, escalas, eventos e ' +
        'comunicação — construído sozinho de ponta a ponta e em produção na Vercel.',
      en:
        'A complete management system for a community — finance, people, rotas, events and ' +
        'communication — built solo end to end and running in production on Vercel.',
    },
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'Supabase',
      'PostgreSQL',
      'Recharts',
      'Nodemailer',
      'date-fns',
      'Vercel',
    ],
    highlights: {
      pt: [
        'Mobile-first de verdade: projetado para o celular e adaptado para telas maiores, não o contrário.',
        'Controle de acesso por papel, com área administrativa e acesso de convidado.',
        'Calendário atualizado em tempo real, com disparo de e-mail para os responsáveis pelo evento.',
        'Integrações contextuais: endereço abre o Waze no celular, contato abre o Instagram da comunidade.',
      ],
      en: [
        'Genuinely mobile-first: designed for the phone and adapted upward, not the other way round.',
        'Role-based access control, with an admin area and guest access.',
        'Calendar updated in real time, emailing the people responsible for each event.',
        'Contextual integrations: the address opens Waze on mobile, contact opens the community’s Instagram.',
      ],
    },
    modules: {
      pt: [
        'Financeiro',
        'Dízimo',
        'Calendário',
        'Escalas',
        'Operários',
        'Aniversariantes',
        'Avisos',
        'Orações',
        'Kids',
        'Notificações',
        'Perfil',
        'Administração',
      ],
      en: [
        'Finance',
        'Tithe',
        'Calendar',
        'Rotas',
        'Volunteers',
        'Birthdays',
        'Notices',
        'Prayers',
        'Kids',
        'Notifications',
        'Profile',
        'Administration',
      ],
    },
    caseStudy: {
      context: {
        pt:
          'A gestão da comunidade acontecia em planilhas soltas, grupos de mensagem e papel. ' +
          'Ninguém tinha visão única de caixa, de escala ou de quem estava responsável por qual ' +
          'evento — e a maior parte das pessoas só acessaria qualquer sistema pelo celular.',
        en:
          'The community was managed through scattered spreadsheets, chat groups and paper. ' +
          'Nobody had a single view of cash flow, rotas or who was responsible for which event — ' +
          'and most people would only ever access a system from their phone.',
      },
      challenge: {
        pt: [
          'Público não-técnico e de faixa etária ampla: a interface precisava ser óbvia sem treinamento.',
          'Perfis de acesso muito diferentes — membro, líder, tesouraria e administração — sobre os mesmos dados.',
          'Informação sensível (financeiro e dados pessoais) exigindo isolamento real por permissão.',
          'Orçamento zero de infraestrutura.',
        ],
        en: [
          'A non-technical audience across a wide age range: the interface had to be obvious with no training.',
          'Very different access profiles — member, leader, treasury and admin — over the same data.',
          'Sensitive information (finance and personal data) requiring real isolation by permission.',
          'Zero infrastructure budget.',
        ],
      },
      solution: {
        pt: [
          'Modelagem no PostgreSQL via Supabase, com as regras de permissão aplicadas na camada de dados em vez de apenas na interface.',
          'Next.js 15 com App Router e renderização no servidor, mantendo o pacote enviado ao celular pequeno.',
          'Doze módulos independentes sobre um design system compartilhado, para que cada área evoluísse sem quebrar as outras.',
          'Notificação por e-mail transacional acoplada aos eventos do calendário.',
          'Documentação de arquitetura, modelo de dados, matriz de permissões e sprints versionada junto com o código.',
        ],
        en: [
          'Data modelled in PostgreSQL via Supabase, with permission rules enforced at the data layer rather than only in the UI.',
          'Next.js 15 with App Router and server rendering, keeping the bundle shipped to phones small.',
          'Twelve independent modules over a shared design system, so each area could evolve without breaking the others.',
          'Transactional email notification wired into calendar events.',
          'Architecture, data model, permission matrix and sprint documentation versioned alongside the code.',
        ],
      },
      outcome: {
        pt: [
          'Gestão financeira, escalas e calendário unificados num único lugar, acessível pelo celular.',
          'Em produção e em uso real, com deploy contínuo na Vercel.',
          'Base documentada o suficiente para outra pessoa assumir a manutenção.',
        ],
        en: [
          'Finance, rotas and calendar unified in one place, accessible from a phone.',
          'In production and real use, with continuous deployment on Vercel.',
          'A codebase documented well enough for someone else to take over maintenance.',
        ],
      },
    },
  },
  {
    slug: 'yma-plataforma',
    name: 'Yma — Plataforma mobile',
    featured: true,
    status: 'testing',
    coverNote: {
      pt: 'app Android nativo · painel web · API documentada · notificação push',
      en: 'native Android app · web panel · documented API · push notifications',
    },
    tagline: {
      pt: 'Aplicativo nativo, painel administrativo e API — três frentes, um produto',
      en: 'Native app, admin panel and API — three fronts, one product',
    },
    summary: {
      pt:
        'Produto composto por aplicativo React Native, painel administrativo web e API Fastify. ' +
        'Atuo no design e na estrutura do app, levando para o celular funcionalidades que ' +
        'nasceram pensadas para desktop.',
      en:
        'A product made of a React Native app, a web admin panel and a Fastify API. I work on ' +
        'the app’s design and structure, bringing features born for desktop onto the phone.',
    },
    stack: [
      'React Native',
      'Expo',
      'TypeScript',
      'React Navigation',
      'Fastify',
      'Prisma',
      'PostgreSQL',
      'Zod',
      'Cloudinary',
      'React Three Fiber',
      'Vitest',
    ],
    highlights: {
      pt: [
        'App nativo em Expo com navegação por abas, bottom sheets, captura e edição de imagem, háptica e build Android.',
        'Notificações push entregues via servidor de push do Expo.',
        'API em Fastify com validação de contrato por schema, documentação Swagger e autenticação por JWT.',
        'Painel administrativo com tabelas de dados, processamento de mídia no navegador e visualização em 3D.',
      ],
      en: [
        'Native Expo app with tab navigation, bottom sheets, image capture and editing, haptics and Android builds.',
        'Push notifications delivered through Expo’s push service.',
        'Fastify API with schema-driven contract validation, Swagger documentation and JWT authentication.',
        'Admin panel with data tables, in-browser media processing and 3D visualisation.',
      ],
    },
    caseStudy: {
      context: {
        pt:
          'O produto existia como aplicação web pensada para monitor grande. Transportá-lo para o ' +
          'celular não era questão de encolher a tela: era decidir o que sobrevive quando a área ' +
          'útil cai para um oitavo.',
        en:
          'The product existed as a web application designed for a large monitor. Moving it to the ' +
          'phone was not a matter of shrinking the screen: it was deciding what survives when the ' +
          'usable area drops to an eighth.',
      },
      challenge: {
        pt: [
          'Densidade de informação pensada para desktop, incompatível com uso a uma mão.',
          'Fluxos longos que, no celular, precisavam ser quebrados sem perder contexto.',
          'Mídia pesada (imagem e vídeo) trafegando em rede móvel.',
        ],
        en: [
          'Information density designed for desktop, incompatible with one-handed use.',
          'Long flows that had to be broken up on mobile without losing context.',
          'Heavy media (image and video) travelling over a mobile network.',
        ],
      },
      solution: {
        pt: [
          'Reestruturação da navegação em abas, com bottom sheets para ações secundárias em vez de novas telas.',
          'Tratamento de imagem no dispositivo antes do envio, reduzindo o peso do upload.',
          'Contrato de API validado por schema nas duas pontas, evitando divergência entre app e servidor.',
        ],
        en: [
          'Navigation restructured into tabs, with bottom sheets for secondary actions instead of new screens.',
          'On-device image processing before upload, cutting payload weight.',
          'Schema-validated API contract on both ends, preventing drift between app and server.',
        ],
      },
      outcome: {
        pt: [
          'Aplicativo em fase de testes, com build Android distribuída.',
          'Transição entre web e mobile sem reaprendizado por parte do usuário.',
        ],
        en: [
          'Application in testing, with an Android build distributed.',
          'Transition between web and mobile with no relearning required from the user.',
        ],
      },
    },
  },
  {
    slug: 'yma-ecommerce',
    name: 'Yma — E-commerce',
    featured: true,
    status: 'testing',
    coverNote: {
      pt: 'circuit breaker · rate limiting · retry com backoff · log estruturado',
      en: 'circuit breaker · rate limiting · retry with backoff · structured logging',
    },
    tagline: {
      pt: 'Loja com backend resiliente: circuit breaker, rate limiting e sanitização',
      en: 'Storefront with a resilient backend: circuit breaker, rate limiting and sanitisation',
    },
    summary: {
      pt:
        'Loja online com front e backend separados. O interesse técnico está no backend: um ' +
        'serviço Fastify tratado como sistema que vai falhar, e não como sistema que espera não falhar.',
      en:
        'Online store with separate front and backend. The technical interest is in the backend: a ' +
        'Fastify service treated as a system that will fail, rather than one that hopes not to.',
    },
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'Fastify',
      'Prisma',
      'PostgreSQL',
      'Zod',
      'Opossum',
      'Pino',
      'Vitest',
    ],
    highlights: {
      pt: [
        'Circuit breaker em chamadas a serviços externos, isolando falha de terceiro para que não derrube a loja.',
        'Rate limiting, cabeçalhos de segurança e sanitização de HTML na entrada.',
        'Retry com backoff no cliente HTTP, para falha transitória de rede não virar erro para o usuário.',
        'Validação de CPF/CNPJ, logging estruturado e rotinas agendadas.',
        'Suíte de testes com cobertura no backend e testes de componente no front.',
      ],
      en: [
        'Circuit breaker on outbound calls, isolating third-party failure so it cannot take the store down.',
        'Rate limiting, security headers and HTML sanitisation on input.',
        'Retry with backoff in the HTTP client, so transient network failure never reaches the user as an error.',
        'CPF/CNPJ validation, structured logging and scheduled jobs.',
        'Test suite with coverage on the backend and component tests on the front.',
      ],
    },
    caseStudy: {
      context: {
        pt:
          'Uma loja depende de serviços que não são seus — pagamento, mídia, entrega. Cada um deles ' +
          'é um ponto onde a loja inteira pode parar por culpa de outra pessoa.',
        en:
          'A store depends on services it does not own — payment, media, delivery. Each one is a point ' +
          'where the whole store can stop because of somebody else’s outage.',
      },
      challenge: {
        pt: [
          'Falha ou lentidão de serviço externo se propagando até o cliente final.',
          'Entrada de usuário chegando ao banco e ao HTML sem tratamento.',
          'Necessidade de diagnosticar problema em produção sem log estruturado.',
        ],
        en: [
          'External service failure or slowness propagating all the way to the end customer.',
          'User input reaching the database and the HTML untreated.',
          'The need to diagnose production problems without structured logging.',
        ],
      },
      solution: {
        pt: [
          'Circuit breaker por dependência externa, com estado aberto interrompendo a cascata de timeouts.',
          'Validação por schema na fronteira e sanitização antes da persistência.',
          'Rate limiting por rota e cabeçalhos de segurança aplicados globalmente.',
          'Logging estruturado, permitindo correlacionar requisição e falha.',
        ],
        en: [
          'A circuit breaker per external dependency, its open state cutting the timeout cascade.',
          'Schema validation at the boundary and sanitisation before persistence.',
          'Per-route rate limiting and globally applied security headers.',
          'Structured logging, making request and failure correlatable.',
        ],
      },
      outcome: {
        pt: [
          'Indisponibilidade de terceiro deixa de significar indisponibilidade da loja.',
          'Backend com cobertura de testes automatizada.',
        ],
        en: [
          'Third-party downtime no longer means store downtime.',
          'Backend with automated test coverage.',
        ],
      },
    },
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export const featuredProjects = projects.filter((project) => project.featured)
