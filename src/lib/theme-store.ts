import {
  DEFAULT_ACCENT,
  DEFAULT_MODE,
  STORAGE_KEY,
  applyPreference,
  readPreference,
  resolveMode,
  type Accent,
  type Mode,
  type ThemePreference,
} from './theme'

/**
 * O tema como fonte externa ao React.
 *
 * Ele já existe fora do React: o script de inicialização escreve os atributos em
 * `<html>` antes da primeira pintura, e o sistema operacional pode mudar de ideia a
 * qualquer momento. Modelar isso como store externo — em vez de estado sincronizado
 * por efeito — elimina a cascata de renders e o risco de divergência de hidratação.
 */

export interface ThemeState extends ThemePreference {
  resolved: 'light' | 'dark'
}

type Listener = () => void

const listeners = new Set<Listener>()

/** Snapshot serializado: `useSyncExternalStore` exige identidade estável. */
const SERVER_SNAPSHOT = JSON.stringify({
  mode: DEFAULT_MODE,
  accent: DEFAULT_ACCENT,
  resolved: 'dark',
} satisfies ThemeState)

let snapshot = SERVER_SNAPSHOT

function compute(): string {
  const preference = readPreference()
  return JSON.stringify({ ...preference, resolved: resolveMode(preference.mode) } satisfies ThemeState)
}

function refresh(): void {
  const next = compute()
  if (next === snapshot) return
  snapshot = next
  for (const listener of listeners) listener()
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener)

  // O valor real só é conhecido no cliente; alinha o snapshot logo na inscrição.
  refresh()

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const onSystemChange = () => {
    const preference = readPreference()
    if (preference.mode === 'system') applyPreference(preference)
    refresh()
  }
  // Mantém abas do mesmo site em sincronia.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return
    applyPreference(readPreference())
    refresh()
  }

  media.addEventListener('change', onSystemChange)
  window.addEventListener('storage', onStorage)

  return () => {
    listeners.delete(listener)
    media.removeEventListener('change', onSystemChange)
    window.removeEventListener('storage', onStorage)
  }
}

export function getSnapshot(): string {
  return snapshot
}

export function getServerSnapshot(): string {
  return SERVER_SNAPSHOT
}

export function parseSnapshot(value: string): ThemeState {
  return JSON.parse(value) as ThemeState
}

/** Aplica no DOM, persiste e avisa os inscritos. */
export function setPreference(preference: ThemePreference): void {
  applyPreference(preference)
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preference))
  } catch {
    // Storage indisponível (janela anônima, cota cheia): o tema vale para a sessão.
  }
  refresh()
}

export function setMode(mode: Mode): void {
  setPreference({ ...readPreference(), mode })
}

export function setAccent(accent: Accent): void {
  setPreference({ ...readPreference(), accent })
}
