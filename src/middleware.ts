import { NextResponse, type NextRequest } from 'next/server'
import { LOCALES, isLocale } from '@/content/types'
import { LOCALE_COOKIE, pickLocale } from '@/lib/i18n'

/**
 * Roteamento de idioma.
 *
 * Todo conteúdo vive sob `/pt` ou `/en`. Um acesso sem prefixo é redirecionado
 * para o idioma escolhido nesta ordem:
 *   1. cookie de preferência (o visitante já trocou manualmente)
 *   2. cabeçalho Accept-Language do navegador
 *   3. português
 *
 * Manter o idioma na URL — em vez de negociar o conteúdo na mesma rota — é o que
 * permite `hreflang` correto, cache por idioma e link compartilhável.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) return NextResponse.next()

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const locale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : pickLocale(request.headers.get('accept-language'))

  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Fora do middleware: rotas de API, artefatos do build, arquivos de metadata e
  // qualquer caminho que já tenha extensão (imagens, fontes, PDF).
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
}
