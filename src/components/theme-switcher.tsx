'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Monitor, Moon, Palette, Sun } from 'lucide-react'
import { ACCENTS, MODES, type Accent, type Mode } from '@/lib/theme'
import { ui } from '@/content/ui'
import type { Locale } from '@/content/types'
import { useTheme } from './theme-provider'
import { cn } from '@/lib/utils'

const MODE_ICON: Record<Mode, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
}

/** Amostras usadas apenas no seletor. O tema real vem das variáveis CSS. */
const SWATCH: Record<Accent, string> = {
  slate: '#64748b',
  blue: '#3b82f6',
  emerald: '#10b981',
  violet: '#8b5cf6',
  amber: '#f59e0b',
}

export function ThemeSwitcher({ locale }: { locale: Locale }) {
  const { mode, accent, setMode, setAccent } = useTheme()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={ui.theme.label[locale]}
        className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-border-strong hover:text-fg"
      >
        <Palette className="size-4" aria-hidden />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={ui.theme.label[locale]}
          className="absolute right-0 top-11 z-50 w-60 rounded-xl border border-border bg-elevated p-4 shadow-xl shadow-black/10"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-subtle">
            {ui.theme.mode[locale]}
          </p>
          <div
            role="radiogroup"
            aria-label={ui.theme.mode[locale]}
            className="mb-4 grid grid-cols-3 gap-1 rounded-lg border border-border bg-surface p-1"
          >
            {MODES.map((option) => {
              const Icon = MODE_ICON[option]
              const active = mode === option
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  // O rótulo visível some abaixo de `sm`. Sem este aria-label, o botão
                  // ficaria sem nome acessível justamente no celular.
                  aria-label={ui.theme[option][locale]}
                  title={ui.theme[option][locale]}
                  onClick={() => setMode(option)}
                  className={cn(
                    'flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors',
                    active
                      ? 'bg-accent text-accent-fg'
                      : 'text-muted hover:bg-elevated hover:text-fg',
                  )}
                >
                  <Icon className="size-3.5" aria-hidden />
                  <span className="hidden sm:inline">{ui.theme[option][locale]}</span>
                </button>
              )
            })}
          </div>

          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-subtle">
            {ui.theme.accent[locale]}
          </p>
          <div role="radiogroup" aria-label={ui.theme.accent[locale]} className="flex gap-2">
            {ACCENTS.map((option) => {
              const active = accent === option
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={ui.accents[option][locale]}
                  title={ui.accents[option][locale]}
                  onClick={() => setAccent(option)}
                  style={{ backgroundColor: SWATCH[option] }}
                  className={cn(
                    'flex size-7 items-center justify-center rounded-full transition-transform hover:scale-110',
                    active && 'ring-2 ring-fg ring-offset-2 ring-offset-elevated',
                  )}
                >
                  {active && <Check className="size-3.5 text-white drop-shadow" aria-hidden />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
