/**
 * Tipos da camada de conteúdo.
 *
 * Toda a informação exibida no site — páginas, PDF do currículo, metadata de SEO
 * e índice do command palette — nasce daqui. Ver docs/ARQUITETURA.md.
 */

export const LOCALES = ['pt', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'pt'

/** Valor traduzido para todos os idiomas suportados. */
export type L10n<T> = Readonly<Record<Locale, T>>

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/** Resolve um valor localizado, com queda para o idioma padrão. */
export function t<T>(value: L10n<T>, locale: Locale): T {
  return value[locale] ?? value[DEFAULT_LOCALE]
}

/** Período no formato `AAAA-MM`. `end: null` significa "até o momento". */
export interface Period {
  start: string
  end: string | null
}

export interface Profile {
  name: string
  shortName: string
  headline: L10n<string>
  location: L10n<string>
  email: string
  phone: {
    /** Formato de exibição, com máscara brasileira. */
    display: string
    /** Formato E.164, usado em `tel:` e `wa.me`. */
    e164: string
  }
  photo: string
  links: {
    github: string
    linkedin: string
  }
  /** Uma frase de posicionamento. Usada no hero e no topo do PDF. */
  summary: L10n<string>
  /** Narrativa mais longa, exclusiva da seção "Sobre" — nunca repete o resumo. */
  about: L10n<string>
  objective: L10n<string>
}

export interface Experience {
  id: string
  company: string
  role: L10n<string>
  /** Ausente quando o trabalho não tem recorte temporal definido. */
  period?: Period
  summary: L10n<string>
  highlights: L10n<readonly string[]>
  stack: readonly string[]
  /**
   * Trabalho sob confidencialidade: nomes de cliente, sistema e links são omitidos
   * por decisão registrada em docs/PREMISSAS.md (D2).
   */
  confidential?: boolean
}

export type ProjectStatus = 'live' | 'testing' | 'private'

export interface CaseStudy {
  context: L10n<string>
  challenge: L10n<readonly string[]>
  solution: L10n<readonly string[]>
  outcome: L10n<readonly string[]>
}

export interface Project {
  slug: string
  name: string
  tagline: L10n<string>
  status: ProjectStatus
  /** Aparece na home. Os demais ficam apenas na listagem. */
  featured: boolean
  cover?: string
  /**
   * Legenda da capa gerada, usada só quando não há screenshot público. Deve trazer
   * informação que o card ainda não mostra — nunca repetir nome, tagline ou stack.
   */
  coverNote?: L10n<string>
  links?: {
    live?: string
    repo?: string
  }
  stack: readonly string[]
  summary: L10n<string>
  highlights: L10n<readonly string[]>
  modules?: L10n<readonly string[]>
  caseStudy?: CaseStudy
}

export interface StackItem {
  name: string
  /** Onde essa tecnologia foi de fato usada — mantém a lista honesta e auditável. */
  evidence: L10n<string>
}

export interface StackGroup {
  id: string
  label: L10n<string>
  items: readonly StackItem[]
}

export interface Education {
  institution: string
  degree: L10n<string>
  period: Period
  status: L10n<string>
}

export interface Language {
  name: L10n<string>
  level: L10n<string>
  /** 1 a 5, usado apenas como indicador visual. */
  proficiency: number
}
