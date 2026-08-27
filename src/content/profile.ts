import type { Education, Language, Profile } from './types'

export const profile: Profile = {
  name: 'Jonathan Gamez Tomoyosi',
  shortName: 'Jonathan Tomoyosi',
  headline: {
    pt: 'Desenvolvedor Fullstack',
    en: 'Fullstack Developer',
  },
  location: {
    pt: 'São Caetano do Sul, SP — Brasil',
    en: 'São Caetano do Sul, SP — Brazil',
  },
  email: 'jonathan.tomoyosi@gmail.com',
  phone: {
    display: '(11) 94086-4666',
    e164: '5511940864666',
  },
  photo: '/foto-perfil.png',
  links: {
    github: 'https://github.com/jonathan-tomoyosi',
    linkedin: 'https://www.linkedin.com/in/jonathan-gamez-tomoyosi-6751101b2/',
  },
  summary: {
    pt:
      'Desenvolvedor fullstack que atua da modelagem de dados à interface. Trabalho com ' +
      'Python e Next.js sobre PostgreSQL, com infraestrutura em AWS e Docker — de pipelines ' +
      'de Big Data e sistemas fiscais a aplicações web e mobile de ponta a ponta. Tenho ' +
      'resultados concretos em velocidade de processamento, estruturação de projeto e em ' +
      'transformar dado bruto em informação útil para a gestão do dia a dia.',
    en:
      'Fullstack developer working from data modelling through to the interface. I build with ' +
      'Python and Next.js on PostgreSQL, with infrastructure on AWS and Docker — from Big Data ' +
      'pipelines and tax-document systems to end-to-end web and mobile applications. I have ' +
      'concrete results in processing speed, project structure, and in turning raw data into ' +
      'information management can actually act on.',
  },
  /** Parágrafos separados por linha em branco; a seção "Sobre" quebra automaticamente. */
  about: {
    pt: [
      'Sou curioso por natureza e teimoso com problema difícil. Comecei mexendo em hardware e ' +
        'em rede, passei por suporte técnico, e foi ali que aprendi a coisa que mais uso hoje: ' +
        'escutar quem vai usar o sistema antes de decidir como ele deve funcionar.',
      'Isso mudou a forma como escrevo código. Meu trabalho hoje costuma envolver as duas ' +
        'pontas — o banco que precisa aguentar volume e a tela que uma pessoa não-técnica vai ' +
        'abrir no celular. Gosto de projeto documentado, de decisão explicada e de código que ' +
        'outra pessoa consegue assumir sem precisar me chamar.',
      'Comunico com clareza, trabalho bem em equipe e me adapto rápido a contexto novo: ' +
        'vim do suporte técnico para o desenvolvimento fullstack e hoje respondo também pela ' +
        'infraestrutura AWS dos projetos.',
    ].join('\n\n'),
    en: [
      'I am curious by nature and stubborn with a hard problem. I started out with hardware and ' +
        'networks, spent time in technical support, and that is where I learned the thing I use ' +
        'most today: listen to whoever will use the system before deciding how it should work.',
      'That changed how I write code. My work now usually spans both ends — the database that ' +
        'has to hold up under volume, and the screen a non-technical person will open on their ' +
        'phone. I like documented projects, explained decisions, and code someone else can take ' +
        'over without having to call me.',
      'I communicate clearly, work well in a team and adapt quickly to new context: I came ' +
        'from technical support into fullstack development and today I am also responsible for ' +
        'the projects’ AWS infrastructure.',
    ].join('\n\n'),
  },
  objective: {
    pt:
      'Trazer soluções para a melhoria da gestão empresarial, para a estrutura e a performance ' +
      'dos dados, e entregar design e experiência cada vez melhores aos usuários.',
    en:
      'Deliver solutions that improve business management, data structure and performance, ' +
      'while continuously raising the design and experience delivered to users.',
  },
}

export const education: readonly Education[] = [
  {
    institution: 'FIAP',
    degree: {
      pt: 'MBA em Engenharia de Dados',
      en: 'MBA in Data Engineering',
    },
    period: { start: '2026-08', end: null },
    status: { pt: 'Em formação', en: 'In progress' },
  },
  {
    institution: 'Universidade Nove de Julho — Uninove',
    degree: {
      pt: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      en: 'Technologist in Systems Analysis and Development',
    },
    period: { start: '2022-01', end: '2024-12' },
    status: { pt: 'Concluído', en: 'Completed' },
  },
]

export const languages: readonly Language[] = [
  {
    name: { pt: 'Português', en: 'Portuguese' },
    level: { pt: 'Nativo', en: 'Native' },
    proficiency: 5,
  },
  {
    name: { pt: 'Inglês', en: 'English' },
    level: { pt: 'Intermediário', en: 'Intermediate' },
    proficiency: 3,
  },
  {
    name: { pt: 'Espanhol', en: 'Spanish' },
    level: { pt: 'Intermediário', en: 'Intermediate' },
    proficiency: 3,
  },
]

export const competencies: readonly { pt: string; en: string }[] = [
  { pt: 'Design de sistemas', en: 'Systems design' },
  { pt: 'Análise e processamento de dados', en: 'Data analysis and processing' },
  { pt: 'Infraestrutura em AWS', en: 'AWS infrastructure' },
  { pt: 'UI/UX', en: 'UI/UX' },
  { pt: 'Método ágil', en: 'Agile methodology' },
  { pt: 'Trabalho em equipe', en: 'Teamwork' },
]
