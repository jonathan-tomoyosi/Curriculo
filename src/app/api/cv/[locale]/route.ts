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
export async function GET(request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) {
    return new Response('Idioma não suportado', { status: 404 })
  }
  const locale: Locale = raw

  const filename = locale === 'pt' ? 'Jonathan-Tomoyosi-Curriculo.pdf' : 'Jonathan-Tomoyosi-CV.pdf'

  try {
    const buffer = await renderToBuffer(CvDocument({ locale }))

    return new Response(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    // Um 500 mudo aqui custou uma ida à produção para ser diagnosticado: a falha era de
    // empacotamento, não de código. O log dá o motivo real; a resposta continua genérica
    // para não expor detalhe interno a quem só pediu um currículo.
    console.error('Falha ao gerar o currículo em PDF', { locale, error })

    // TEMPORÁRIO: a falha só acontece no ambiente serverless, e o 500 genérico não diz
    // nada de fora. Sai assim que a causa for identificada.
    if (request.headers.get('x-cv-debug') === '1') {
      const detalhe =
        error instanceof Error
          ? [error.name, error.message, error.stack].filter(Boolean).join('\n')
          : String(error)

      return new Response(detalhe, {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    }

    return new Response('Não foi possível gerar o PDF no momento.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
}
