import { renderToBuffer } from '@react-pdf/renderer'
import { isLocale, type Locale } from '@/content/types'
import { CvDocument } from '@/lib/cv-document'

export const runtime = 'nodejs'

/**
 * Currículo em PDF, gerado sob demanda a partir de `src/content`.
 *
 * Não existe arquivo de currículo versionado no repositório — o PDF é sempre
 * derivado do mesmo dado que a página mostra, então não há como um ficar
 * desatualizado em relação ao outro.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params
  if (!isLocale(raw)) {
    return new Response('Idioma não suportado', { status: 404 })
  }
  const locale: Locale = raw

  const buffer = await renderToBuffer(CvDocument({ locale }))
  const filename = locale === 'pt' ? 'Jonathan-Tomoyosi-Curriculo.pdf' : 'Jonathan-Tomoyosi-CV.pdf'

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
