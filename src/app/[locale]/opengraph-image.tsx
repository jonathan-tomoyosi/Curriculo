import { ImageResponse } from 'next/og'
import { isLocale } from '@/content/types'
import { profile } from '@/content/profile'

export const alt = `${profile.name} — Portfólio`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Imagem de compartilhamento gerada no build, a partir dos mesmos dados do site.
 * Trocar o cargo em src/content/profile.ts também troca o card do LinkedIn.
 */
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : 'pt'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: '#60a5fa',
            fontSize: 26,
            fontFamily: 'monospace',
          }}
        >
          {'{ JT }'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ color: '#ededed', fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div style={{ color: '#60a5fa', fontSize: 34, fontFamily: 'monospace' }}>
            {profile.headline[locale]}
          </div>
          <div style={{ color: '#a0a0a0', fontSize: 26, maxWidth: 900, lineHeight: 1.45 }}>
            {locale === 'pt'
              ? 'Python · Next.js · PostgreSQL · AWS · Docker'
              : 'Python · Next.js · PostgreSQL · AWS · Docker'}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: '#6f6f6f',
            fontSize: 22,
            borderTop: '1px solid #232323',
            paddingTop: 28,
          }}
        >
          <span>{profile.location[locale]}</span>
          <span>github.com/jonathan-tomoyosi</span>
        </div>
      </div>
    ),
    size,
  )
}
