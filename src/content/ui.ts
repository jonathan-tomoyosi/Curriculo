import type { L10n } from './types'

/** Textos de interface. Tudo que não é dado de currículo vive aqui. */
export const ui = {
  nav: {
    about: { pt: 'Sobre', en: 'About' },
    stack: { pt: 'Stack', en: 'Stack' },
    experience: { pt: 'Experiência', en: 'Experience' },
    projects: { pt: 'Projetos', en: 'Projects' },
    education: { pt: 'Formação', en: 'Education' },
    contact: { pt: 'Contato', en: 'Contact' },
  },
  hero: {
    available: { pt: 'Disponível para novas oportunidades', en: 'Open to new opportunities' },
    viewProjects: { pt: 'Ver projetos', en: 'View projects' },
    downloadCv: { pt: 'Baixar currículo', en: 'Download CV' },
    scroll: { pt: 'Role para explorar', en: 'Scroll to explore' },
  },
  sections: {
    about: {
      title: { pt: 'Sobre', en: 'About' },
      subtitle: { pt: 'Quem está por trás do código', en: 'Who is behind the code' },
    },
    stack: {
      title: { pt: 'Stack técnico', en: 'Tech stack' },
      subtitle: {
        pt: 'Só entra o que o código comprova — cada item traz onde foi usado',
        en: 'Only what the code proves — each item states where it was used',
      },
    },
    experience: {
      title: { pt: 'Experiência', en: 'Experience' },
      subtitle: { pt: 'Onde apliquei isso na prática', en: 'Where I applied it in practice' },
    },
    projects: {
      title: { pt: 'Projetos', en: 'Projects' },
      subtitle: { pt: 'Problema, decisão técnica e resultado', en: 'Problem, technical decision and outcome' },
    },
    education: {
      title: { pt: 'Formação e idiomas', en: 'Education and languages' },
      subtitle: { pt: 'Base acadêmica', en: 'Academic background' },
    },
    contact: {
      title: { pt: 'Contato', en: 'Contact' },
      subtitle: { pt: 'Vamos conversar', en: 'Let’s talk' },
    },
  },
  labels: {
    present: { pt: 'atual', en: 'present' },
    confidential: { pt: 'Projeto corporativo', en: 'Corporate work' },
    confidentialNote: {
      pt: 'Nomes de cliente e de sistema omitidos por confidencialidade. Posso detalhar em conversa.',
      en: 'Client and system names withheld for confidentiality. Happy to go into detail in conversation.',
    },
    caseStudy: { pt: 'Ver estudo de caso', en: 'Read case study' },
    liveSite: { pt: 'Ver ao vivo', en: 'View live' },
    repository: { pt: 'Repositório', en: 'Repository' },
    back: { pt: 'Voltar', en: 'Back' },
    backToProjects: { pt: 'Voltar aos projetos', en: 'Back to projects' },
    modules: { pt: 'Módulos', en: 'Modules' },
    highlights: { pt: 'Destaques', en: 'Highlights' },
    copy: { pt: 'Copiar', en: 'Copy' },
    copied: { pt: 'Copiado', en: 'Copied' },
    usedIn: { pt: 'Onde usei', en: 'Where I used it' },
  },
  status: {
    live: { pt: 'Em produção', en: 'Live' },
    testing: { pt: 'Em testes', en: 'In testing' },
    private: { pt: 'Código privado', en: 'Private code' },
  },
  caseStudy: {
    context: { pt: 'Contexto', en: 'Context' },
    challenge: { pt: 'Desafio', en: 'Challenge' },
    solution: { pt: 'Solução', en: 'Solution' },
    outcome: { pt: 'Resultado', en: 'Outcome' },
    stack: { pt: 'Tecnologias', en: 'Technologies' },
  },
  theme: {
    label: { pt: 'Tema', en: 'Theme' },
    mode: { pt: 'Modo', en: 'Mode' },
    accent: { pt: 'Cor de destaque', en: 'Accent colour' },
    light: { pt: 'Claro', en: 'Light' },
    dark: { pt: 'Escuro', en: 'Dark' },
    system: { pt: 'Sistema', en: 'System' },
    toggle: { pt: 'Alternar tema', en: 'Toggle theme' },
  },
  accents: {
    slate: { pt: 'Grafite', en: 'Slate' },
    blue: { pt: 'Azul', en: 'Blue' },
    emerald: { pt: 'Verde', en: 'Emerald' },
    violet: { pt: 'Violeta', en: 'Violet' },
    amber: { pt: 'Âmbar', en: 'Amber' },
  },
  palette: {
    open: { pt: 'Buscar', en: 'Search' },
    placeholder: { pt: 'Buscar seções, projetos, tecnologias…', en: 'Search sections, projects, technologies…' },
    empty: { pt: 'Nenhum resultado.', en: 'No results.' },
    hint: { pt: 'para abrir', en: 'to open' },
    groups: {
      navigation: { pt: 'Navegação', en: 'Navigation' },
      projects: { pt: 'Projetos', en: 'Projects' },
      stack: { pt: 'Tecnologias', en: 'Technologies' },
      actions: { pt: 'Ações', en: 'Actions' },
      contact: { pt: 'Contato', en: 'Contact' },
    },
  },
  language: {
    label: { pt: 'Idioma', en: 'Language' },
    pt: { pt: 'Português', en: 'Portuguese' },
    en: { pt: 'Inglês', en: 'English' },
  },
  contact: {
    email: { pt: 'E-mail', en: 'Email' },
    phone: { pt: 'Telefone', en: 'Phone' },
    whatsapp: { pt: 'WhatsApp', en: 'WhatsApp' },
    github: { pt: 'GitHub', en: 'GitHub' },
    linkedin: { pt: 'LinkedIn', en: 'LinkedIn' },
    location: { pt: 'Localização', en: 'Location' },
  },
  footer: {
    builtWith: { pt: 'Construído com', en: 'Built with' },
    source: { pt: 'Código deste site', en: 'Source of this site' },
    rights: { pt: 'Todos os direitos reservados.', en: 'All rights reserved.' },
  },
  notFound: {
    title: { pt: 'Página não encontrada', en: 'Page not found' },
    description: {
      pt: 'O endereço que você acessou não existe ou foi movido.',
      en: 'The address you visited does not exist or has moved.',
    },
    home: { pt: 'Ir para a home', en: 'Go to home' },
  },
  meta: {
    description: {
      pt:
        'Portfólio de Jonathan Gamez Tomoyosi — desenvolvedor fullstack com Python, Next.js, ' +
        'PostgreSQL, AWS e Docker. Projetos, experiência e stack técnico.',
      en:
        'Portfolio of Jonathan Gamez Tomoyosi — fullstack developer with Python, Next.js, ' +
        'PostgreSQL, AWS and Docker. Projects, experience and tech stack.',
    },
  },
} satisfies Record<string, unknown>

/** Atalho de leitura: `s(ui.nav.about, 'en')`. */
export function s(value: L10n<string>, locale: 'pt' | 'en'): string {
  return value[locale]
}
