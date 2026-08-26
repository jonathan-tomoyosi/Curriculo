import type { StackGroup } from './types'

/**
 * Stack técnico.
 *
 * Regra desta lista: só entra tecnologia que aparece em código que eu escrevi ou mantive.
 * O campo `evidence` diz onde — é o que torna a lista auditável em vez de aspiracional.
 */
export const stackGroups: readonly StackGroup[] = [
  {
    id: 'languages',
    label: { pt: 'Linguagens', en: 'Languages' },
    items: [
      {
        name: 'TypeScript',
        evidence: { pt: 'Padrão em todos os projetos web e mobile', en: 'Default across every web and mobile project' },
      },
      {
        name: 'Python',
        evidence: { pt: 'Processamento de dados, ETL e funções serverless', en: 'Data processing, ETL and serverless functions' },
      },
      {
        name: 'JavaScript',
        evidence: { pt: 'Serviços Node e scripts de automação', en: 'Node services and automation scripts' },
      },
      {
        name: 'PHP',
        evidence: { pt: 'Manutenção e evolução de API em Laravel', en: 'Maintaining and evolving a Laravel API' },
      },
      {
        name: 'SQL',
        evidence: { pt: 'Modelagem, consultas analíticas e otimização', en: 'Modelling, analytical queries and tuning' },
      },
    ],
  },
  {
    id: 'frontend',
    label: { pt: 'Front-end', en: 'Frontend' },
    items: [
      {
        name: 'Next.js',
        evidence: { pt: 'App Router e renderização no servidor em produção', en: 'App Router and server rendering in production' },
      },
      { name: 'React', evidence: { pt: 'Interface de todos os painéis e sites', en: 'UI of every panel and site' } },
      {
        name: 'React Native · Expo',
        evidence: { pt: 'Aplicativo nativo com build Android', en: 'Native application with Android builds' },
      },
      { name: 'Tailwind CSS', evidence: { pt: 'Sistema de estilo padrão', en: 'Default styling system' } },
      {
        name: 'Radix UI · shadcn/ui',
        evidence: { pt: 'Componentes acessíveis em painéis administrativos', en: 'Accessible components in admin panels' },
      },
      {
        name: 'TanStack Query',
        evidence: { pt: 'Cache e sincronização de estado de servidor', en: 'Server-state cache and synchronisation' },
      },
      {
        name: 'React Hook Form · Zod',
        evidence: { pt: 'Formulários com validação por schema', en: 'Forms with schema validation' },
      },
      {
        name: 'Recharts · Chart.js',
        evidence: { pt: 'Gráficos de gestão e dashboards', en: 'Management charts and dashboards' },
      },
      { name: 'Leaflet', evidence: { pt: 'Mapas e mapas de calor', en: 'Maps and heat maps' } },
      { name: 'Motion', evidence: { pt: 'Animação de interface', en: 'Interface animation' } },
    ],
  },
  {
    id: 'backend',
    label: { pt: 'Back-end', en: 'Backend' },
    items: [
      { name: 'Node.js', evidence: { pt: 'APIs e serviços de apoio', en: 'APIs and supporting services' } },
      {
        name: 'Fastify',
        evidence: { pt: 'API com contrato validado por schema e Swagger', en: 'API with schema-validated contract and Swagger' },
      },
      { name: 'FastAPI', evidence: { pt: 'Serviços de dados em Python', en: 'Python data services' } },
      { name: 'Laravel', evidence: { pt: 'API legada em manutenção e evolução', en: 'Legacy API under maintenance and evolution' } },
      { name: 'Prisma', evidence: { pt: 'ORM e migrações em serviços Node', en: 'ORM and migrations in Node services' } },
      { name: 'Drizzle', evidence: { pt: 'Camada de acesso a dados tipada', en: 'Typed data-access layer' } },
      {
        name: 'JWT · NextAuth',
        evidence: { pt: 'Autenticação e sessão', en: 'Authentication and session handling' },
      },
      { name: 'Opossum', evidence: { pt: 'Circuit breaker em dependência externa', en: 'Circuit breaker on external dependencies' } },
    ],
  },
  {
    id: 'data',
    label: { pt: 'Dados', en: 'Data' },
    items: [
      { name: 'PostgreSQL', evidence: { pt: 'Banco principal em praticamente todo projeto', en: 'Primary database in nearly every project' } },
      { name: 'Supabase', evidence: { pt: 'Postgres gerenciado, auth e políticas de acesso', en: 'Managed Postgres, auth and access policies' } },
      { name: 'Firebird', evidence: { pt: 'Base legada integrada e migrada', en: 'Legacy database integrated and migrated' } },
      { name: 'pandas · NumPy', evidence: { pt: 'Tratamento de grandes volumes', en: 'Large-volume data cleansing' } },
      { name: 'PyArrow', evidence: { pt: 'Formato colunar em pipeline de dados', en: 'Columnar format in data pipelines' } },
      { name: 'Streamlit · Plotly', evidence: { pt: 'Dashboards analíticos', en: 'Analytical dashboards' } },
      {
        name: 'Selenium · BeautifulSoup',
        evidence: { pt: 'Coleta automatizada de dados públicos', en: 'Automated public-data collection' },
      },
    ],
  },
  {
    id: 'infra',
    label: { pt: 'Infraestrutura', en: 'Infrastructure' },
    items: [
      {
        name: 'AWS',
        evidence: { pt: 'Lambda, EC2, RDS, S3, CloudWatch, ECR, SQS e Secrets Manager', en: 'Lambda, EC2, RDS, S3, CloudWatch, ECR, SQS and Secrets Manager' },
      },
      { name: 'Docker', evidence: { pt: 'Containerização e composição de ambientes', en: 'Containerisation and environment composition' } },
      { name: 'Vercel', evidence: { pt: 'Deploy contínuo de aplicações Next.js', en: 'Continuous deployment of Next.js applications' } },
      { name: 'Keycloak', evidence: { pt: 'Identidade e acesso em dashboards internos', en: 'Identity and access in internal dashboards' } },
      { name: 'Sentry', evidence: { pt: 'Monitoramento de erro em produção', en: 'Production error monitoring' } },
      { name: 'GitHub Actions', evidence: { pt: 'Integração contínua', en: 'Continuous integration' } },
    ],
  },
  {
    id: 'quality',
    label: { pt: 'Qualidade', en: 'Quality' },
    items: [
      { name: 'Vitest', evidence: { pt: 'Testes de unidade e de componente', en: 'Unit and component tests' } },
      { name: 'Testing Library', evidence: { pt: 'Teste orientado a comportamento do usuário', en: 'User-behaviour-driven testing' } },
      { name: 'Playwright', evidence: { pt: 'Teste ponta a ponta em navegador real', en: 'End-to-end testing in a real browser' } },
      { name: 'ESLint · Prettier', evidence: { pt: 'Padrão de código em equipe', en: 'Team-wide code standards' } },
      { name: 'Git', evidence: { pt: 'Fluxo com branch, revisão de código e convenção de commit', en: 'Branching flow, code review and commit convention' } },
    ],
  },
]

/** Lista achatada, usada pelo command palette e pela geração do PDF. */
export const allStackItems = stackGroups.flatMap((group) =>
  group.items.map((item) => ({ ...item, groupId: group.id })),
)
