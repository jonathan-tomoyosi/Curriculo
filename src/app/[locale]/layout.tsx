import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { LOCALES, isLocale, type Locale } from '@/content/types'
import { profile } from '@/content/profile'
import { ui } from '@/content/ui'
import { THEME_INIT_SCRIPT } from '@/lib/theme'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CommandPalette } from '@/components/command-palette'
import { Reveal } from '@/components/reveal'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-family',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jonathan-tomoyosi.vercel.app'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'pt'
  const title = `${profile.name} — ${profile.headline[locale]}`
  const description = ui.meta.description[locale]

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s — ${profile.shortName}`,
    },
    description,
    authors: [{ name: profile.name, url: profile.links.github }],
    creator: profile.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'pt-BR': '/pt',
        en: '/en',
        'x-default': '/pt',
      },
    },
    openGraph: {
      type: 'profile',
      siteName: profile.name,
      title,
      description,
      url: `/${locale}`,
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale: Locale = raw

  return (
    <html
      lang={locale === 'pt' ? 'pt-BR' : 'en'}
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Roda antes da primeira pintura: evita o flash de tema errado. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-fg antialiased">
        <ThemeProvider>
          <Reveal />
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
          >
            {locale === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
          </a>
          <SiteHeader locale={locale} />
          <main id="conteudo">{children}</main>
          <SiteFooter locale={locale} />
          <CommandPalette locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  )
}
