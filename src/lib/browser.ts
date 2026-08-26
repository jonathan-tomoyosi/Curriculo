import type { Locale } from '@/content/types'
import { LOCALE_COOKIE } from './i18n'

/**
 * Efeitos colaterais de navegador que não pertencem ao corpo de um componente.
 *
 * Mantê-los aqui deixa os componentes puros — e é o que as regras do React Compiler
 * pedem: componente não escreve em `document` diretamente.
 */

/** Grava a escolha manual de idioma por um ano; o middleware passa a respeitá-la. */
export function rememberLocale(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`
}

/**
 * Dispara o download de um arquivo.
 *
 * Atribuir `window.location.href` faria o navegador tratar como navegação — o que
 * também é sinalizado pelo lint do Next. Um elemento `<a download>` sintético mantém
 * o download como download.
 */
export function downloadFile(url: string, filename?: string): void {
  const anchor = document.createElement('a')
  anchor.href = url
  if (filename) anchor.download = filename
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
}
