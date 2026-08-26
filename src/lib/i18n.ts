import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale, type Period } from '@/content/types'

export const LOCALE_COOKIE = 'locale'

/**
 * Escolhe o idioma a partir do cabeçalho `Accept-Language`.
 *
 * Implementação deliberadamente simples: só existem dois idiomas, então basta saber
 * qual dos dois aparece primeiro com maior peso.
 */
export function pickLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE

  const ranked = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag = '', ...params] = part.trim().split(';')
      const qParam = params.find((p) => p.trim().startsWith('q='))
      const quality = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1
      return { tag: tag.trim().toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality }
    })
    .filter((entry) => entry.tag.length > 0)
    .sort((a, b) => b.quality - a.quality)

  for (const { tag } of ranked) {
    const base = tag.split('-')[0]
    if (base && isLocale(base)) return base
  }

  return DEFAULT_LOCALE
}

/** Remove o prefixo de idioma de um caminho: `/en/projetos` → `/projetos`. */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1)
  }
  return pathname
}

/** Constrói um caminho com prefixo de idioma: `('en', '/projetos')` → `/en/projetos`. */
export function localePath(locale: Locale, pathname = '/'): string {
  const clean = stripLocale(pathname)
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

const MONTHS: Record<Locale, readonly string[]> = {
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

/** Formata `AAAA-MM` como `mês/AAAA`. Entrada inválida volta como veio. */
export function formatMonth(value: string, locale: Locale): string {
  const [year, month] = value.split('-')
  if (!year) return value
  const index = Number.parseInt(month ?? '', 10) - 1
  const name = MONTHS[locale][index]
  return name ? `${name} ${year}` : year
}

/** Formata um período completo. `end: null` vira o rótulo de "até o momento". */
export function formatPeriod(period: Period, locale: Locale, presentLabel: string): string {
  const start = formatMonth(period.start, locale)
  const end = period.end ? formatMonth(period.end, locale) : presentLabel
  return `${start} — ${end}`
}
