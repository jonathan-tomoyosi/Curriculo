/**
 * Contrato do sistema de temas.
 *
 * Duas dimensões independentes:
 *   - `mode`   — claro, escuro ou seguir o sistema operacional
 *   - `accent` — a cor de destaque, trocável sem afetar o modo
 *
 * As duas são escritas como atributos em `<html>` (`data-mode`, `data-accent`) e
 * lidas apenas por CSS. Nenhum componente precisa saber o tema para se pintar.
 */

export const MODES = ['light', 'dark', 'system'] as const
export type Mode = (typeof MODES)[number]

export const ACCENTS = ['slate', 'blue', 'emerald', 'violet', 'amber'] as const
export type Accent = (typeof ACCENTS)[number]

export const DEFAULT_MODE: Mode = 'system'
export const DEFAULT_ACCENT: Accent = 'blue'

export const STORAGE_KEY = 'jt-theme'

export interface ThemePreference {
  mode: Mode
  accent: Accent
}

export function isMode(value: unknown): value is Mode {
  return typeof value === 'string' && (MODES as readonly string[]).includes(value)
}

export function isAccent(value: unknown): value is Accent {
  return typeof value === 'string' && (ACCENTS as readonly string[]).includes(value)
}

/** Lê a preferência salva, tolerando storage corrompido ou indisponível. */
export function readPreference(): ThemePreference {
  const fallback: ThemePreference = { mode: DEFAULT_MODE, accent: DEFAULT_ACCENT }
  if (typeof window === 'undefined') return fallback

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return fallback
    const { mode, accent } = parsed as Partial<ThemePreference>
    return {
      mode: isMode(mode) ? mode : DEFAULT_MODE,
      accent: isAccent(accent) ? accent : DEFAULT_ACCENT,
    }
  } catch {
    return fallback
  }
}

/** Converte `system` no modo concreto que o sistema operacional está pedindo. */
export function resolveMode(mode: Mode): Exclude<Mode, 'system'> {
  if (mode !== 'system') return mode
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyPreference(preference: ThemePreference): void {
  const root = document.documentElement
  root.dataset.mode = resolveMode(preference.mode)
  root.dataset.accent = preference.accent
  root.style.colorScheme = resolveMode(preference.mode)
}

/**
 * Script injetado antes da primeira pintura.
 *
 * Sem isso, a página renderiza no tema errado e corrige depois — o "flash" que
 * denuncia um tema implementado só no cliente.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var pref = stored ? JSON.parse(stored) : {};
    var mode = ['light','dark','system'].indexOf(pref.mode) >= 0 ? pref.mode : '${DEFAULT_MODE}';
    var accent = ['${ACCENTS.join("','")}'].indexOf(pref.accent) >= 0 ? pref.accent : '${DEFAULT_ACCENT}';
    var resolved = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    var root = document.documentElement;
    root.dataset.mode = resolved;
    root.dataset.accent = accent;
    root.style.colorScheme = resolved;
  } catch (e) {
    document.documentElement.dataset.mode = 'dark';
    document.documentElement.dataset.accent = '${DEFAULT_ACCENT}';
  }
})();
`.trim()
