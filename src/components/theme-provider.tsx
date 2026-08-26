'use client'

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react'
import { applyPreference, readPreference, type Accent, type Mode } from '@/lib/theme'
import {
  getServerSnapshot,
  getSnapshot,
  parseSnapshot,
  setAccent,
  setMode,
  subscribe,
  type ThemeState,
} from '@/lib/theme-store'

interface ThemeContextValue extends ThemeState {
  setMode: (mode: Mode) => void
  setAccent: (accent: Accent) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * Expõe o tema à árvore React.
 *
 * O estado vive em `@/lib/theme-store` e é lido com `useSyncExternalStore`: sem
 * efeito de sincronização, sem setState em efeito, sem flash na hidratação.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  /**
   * Reafirma `data-mode` e `data-accent` em <html> depois de cada render.
   *
   * O layout raiz mora dentro do segmento `[locale]`. Ao trocar de idioma, o React
   * reconcilia o próprio elemento <html> — e os dois atributos, que foram escritos
   * pelo script de pré-pintura e não pelo React, se perdem nessa troca. O sintoma é
   * cruel: sem `data-accent`, `--accent` fica indefinido; o gradiente do nome vira
   * inválido; e como `.text-gradient` pinta com `color: transparent`, o sobrenome
   * simplesmente desaparece — sem erro no console.
   *
   * Sincronizar um sistema externo (o DOM) é exatamente o que um efeito deve fazer.
   * Sem array de dependências de propósito: reescrever dois atributos com o mesmo
   * valor é no-op para o navegador, e a garantia vale mais que a micro-otimização.
   */
  useEffect(() => {
    applyPreference(readPreference())
  })

  const value = useMemo<ThemeContextValue>(() => {
    const state = parseSnapshot(raw)
    return {
      ...state,
      setMode,
      setAccent,
      toggleMode: () => setMode(state.resolved === 'dark' ? 'light' : 'dark'),
    }
  }, [raw])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme precisa estar dentro de <ThemeProvider>')
  return context
}
