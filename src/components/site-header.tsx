'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import type { Locale } from '@/content/types'
import { profile } from '@/content/profile'
import { ui } from '@/content/ui'
import { localePath, stripLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { ThemeSwitcher } from './theme-switcher'
import { LanguageSwitcher } from './language-switcher'
import { openCommandPalette } from './command-palette'

const NAV = [
  { id: 'sobre', label: ui.nav.about },
  { id: 'stack', label: ui.nav.stack },
  { id: 'experiencia', label: ui.nav.experience },
  { id: 'projetos', label: ui.nav.projects },
  { id: 'contato', label: ui.nav.contact },
] as const

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const onHome = stripLocale(pathname) === '/'
  const home = localePath(locale, '/')
  const active = onHome ? activeSection : null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Destaca no menu a seção que está sendo lida. Fora da home não há seções para
  // observar, então o efeito nem chega a rodar e `active` é ignorado na renderização.
  useEffect(() => {
    if (!onHome) return
    const observer = new IntersectionObserver(
      (entries) => {
        // `threshold: 0` é essencial: numa seção muito alta, a fração dela visível
        // dentro da faixa estreita definida pelo rootMargin nunca chega a 0.1, e um
        // limiar maior faria o menu simplesmente parar de acompanhar o scroll.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    )
    for (const { id } of NAV) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [onHome, pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'no-print fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-bg/80 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href={home}
          className="font-mono text-sm font-medium tracking-tight text-fg transition-colors hover:text-accent"
        >
          <span className="text-accent">{'{'}</span>
          {' JT '}
          <span className="text-accent">{'}'}</span>
          <span className="sr-only">{profile.name}</span>
        </Link>

        <nav aria-label={ui.nav.projects[locale]} className="hidden items-center gap-1 md:flex">
          {NAV.map(({ id, label }) => (
            <Link
              key={id}
              href={onHome ? `#${id}` : `${home}#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm transition-colors',
                active === id ? 'text-accent' : 'text-muted hover:text-fg',
              )}
            >
              {label[locale]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label={ui.palette.open[locale]}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-2 text-muted transition-colors hover:border-border-strong hover:text-fg"
          >
            <Search className="size-4" aria-hidden />
            <kbd className="hidden font-mono text-[10px] text-subtle lg:block">⌘K</kbd>
          </button>

          <LanguageSwitcher locale={locale} />
          <ThemeSwitcher locale={locale} />

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label="Menu"
            className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:text-fg md:hidden"
          >
            {menuOpen ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label={ui.nav.projects[locale]}
          className="border-t border-border bg-bg px-5 py-3 md:hidden"
        >
          {NAV.map(({ id, label }) => (
            <Link
              key={id}
              href={onHome ? `#${id}` : `${home}#${id}`}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-fg"
            >
              {label[locale]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
