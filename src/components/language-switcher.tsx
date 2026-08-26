'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LOCALES, type Locale } from '@/content/types'
import { localePath } from '@/lib/i18n'
import { rememberLocale } from '@/lib/browser'
import { ui } from '@/content/ui'
import { cn } from '@/lib/utils'

/**
 * Troca de idioma preservando a rota atual.
 *
 * Ao trocar, grava a escolha num cookie de um ano: a partir daí a preferência
 * manual vence a detecção por `Accept-Language` no middleware.
 */
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  return (
    <div
      className="flex items-center rounded-lg border border-border bg-surface p-0.5"
      role="group"
      aria-label={ui.language.label[locale]}
    >
      {LOCALES.map((option) => {
        const active = option === locale
        return (
          <Link
            key={option}
            href={localePath(option, pathname)}
            hrefLang={option}
            onClick={() => rememberLocale(option)}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'rounded-md px-2 py-1 text-xs font-medium uppercase transition-colors',
              active ? 'bg-accent text-accent-fg' : 'text-muted hover:text-fg',
            )}
          >
            {option}
          </Link>
        )
      })}
    </div>
  )
}
