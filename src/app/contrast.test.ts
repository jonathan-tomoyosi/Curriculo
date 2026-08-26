import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { ACCENTS, MODES } from '@/lib/theme'

/**
 * Contraste do sistema de temas.
 *
 * Cinco paletas × dois modos = dez combinações. Conferir isso a olho é inviável e, pior,
 * é o tipo de coisa que quebra sem ninguém notar ao acrescentar uma cor nova. Este teste
 * lê os valores direto de globals.css — a mesma fonte que o navegador usa — e reprova
 * qualquer par abaixo do mínimo da WCAG AA.
 */

const css = readFileSync(resolve(process.cwd(), 'src/app/globals.css'), 'utf-8')

/** Extrai `--token: #valor` de dentro do bloco cujo seletor casa exatamente. */
function readTokens(selector: string): Record<string, string> {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const block = new RegExp(`(?:^|\\n)\\s*${escaped}\\s*\\{([^}]*)\\}`).exec(css)
  if (!block?.[1]) throw new Error(`Bloco CSS não encontrado: ${selector}`)

  const tokens: Record<string, string> = {}
  for (const match of block[1].matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,8});/g)) {
    if (match[1] && match[2]) tokens[match[1]] = match[2]
  }
  return tokens
}

function channel(value: number): number {
  const v = value / 255
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}

function luminance(hex: string): number {
  const clean = hex.replace('#', '')
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  const r = Number.parseInt(full.slice(0, 2), 16)
  const g = Number.parseInt(full.slice(2, 4), 16)
  const b = Number.parseInt(full.slice(4, 6), 16)
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

function contrast(foreground: string, background: string): number {
  const a = luminance(foreground)
  const b = luminance(background)
  const [light, dark] = a > b ? [a, b] : [b, a]
  return ((light as number) + 0.05) / ((dark as number) + 0.05)
}

const SURFACES = readTokens(':root')
const DARK_SURFACES = { ...SURFACES, ...readTokens("[data-mode='dark']") }

const surfacesFor = (mode: 'light' | 'dark') => (mode === 'dark' ? DARK_SURFACES : SURFACES)

function accentFor(mode: 'light' | 'dark', accent: string) {
  const base = readTokens(`[data-accent='${accent}']`)
  if (mode === 'light') return base
  return { ...base, ...readTokens(`[data-mode='dark'][data-accent='${accent}']`) }
}

/** WCAG AA para texto normal. Todo texto do site é 11px ou maior sem peso bold, então
    não se qualifica para o limite reduzido de "texto grande". */
const AA_TEXT = 4.5

describe('contraste do texto sobre as superfícies', () => {
  const cases = (['light', 'dark'] as const).flatMap((mode) =>
    (['fg', 'muted', 'subtle'] as const).flatMap((token) =>
      (['bg', 'surface', 'elevated'] as const).map((surface) => ({ mode, token, surface })),
    ),
  )

  it.each(cases)('$token sobre $surface no modo $mode', ({ mode, token, surface }) => {
    const tokens = surfacesFor(mode)
    const ratio = contrast(tokens[token] as string, tokens[surface] as string)
    expect(ratio, `${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(AA_TEXT)
  })
})

describe('contraste da cor de destaque', () => {
  const cases = (['light', 'dark'] as const).flatMap((mode) =>
    ACCENTS.flatMap((accent) =>
      (['bg', 'surface', 'elevated'] as const).map((surface) => ({ mode, accent, surface })),
    ),
  )

  it.each(cases)('$accent sobre $surface no modo $mode', ({ mode, accent, surface }) => {
    const ratio = contrast(
      accentFor(mode, accent).accent as string,
      surfacesFor(mode)[surface] as string,
    )
    expect(ratio, `${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(AA_TEXT)
  })

  it.each(
    (['light', 'dark'] as const).flatMap((mode) => ACCENTS.map((accent) => ({ mode, accent }))),
  )('texto sobre o botão de destaque $accent no modo $mode', ({ mode, accent }) => {
    const tokens = accentFor(mode, accent)
    const ratio = contrast(tokens['accent-fg'] as string, tokens.accent as string)
    expect(ratio, `${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(AA_TEXT)
  })
})

describe('contraste das bordas', () => {
  /**
   * O mínimo de 3:1 da WCAG 1.4.11 vale para a fronteira que comunica *estado* de um
   * componente — não para separador decorativo. As bordas dos cards aqui são decoração:
   * exigir 3:1 delas produziria um traço pesado e errado para o desenho. O que de fato
   * importa checar é que não fiquem invisíveis, e que o indicador de foco — esse sim um
   * componente de UI — use a cor de destaque, já coberta acima.
   */
  it.each((['light', 'dark'] as const).map((mode) => ({ mode })))(
    'borda forte permanece perceptível sobre o fundo no modo $mode',
    ({ mode }) => {
      const tokens = surfacesFor(mode)
      const ratio = contrast(tokens['border-strong'] as string, tokens.bg as string)
      expect(ratio, `${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(1.3)
    },
  )

  it('mantém a hierarquia de leitura fg > muted > subtle em ambos os modos', () => {
    for (const mode of ['light', 'dark'] as const) {
      const tokens = surfacesFor(mode)
      const fg = contrast(tokens.fg as string, tokens.bg as string)
      const muted = contrast(tokens.muted as string, tokens.bg as string)
      const subtle = contrast(tokens.subtle as string, tokens.bg as string)
      expect(fg, mode).toBeGreaterThan(muted)
      expect(muted, mode).toBeGreaterThan(subtle)
    }
  })
})

describe('cobertura', () => {
  it('cobre todos os modos concretos e todas as paletas declaradas', () => {
    expect(MODES).toContain('system')
    expect(ACCENTS.length).toBe(5)
    for (const accent of ACCENTS) {
      expect(accentFor('light', accent).accent, accent).toBeDefined()
      expect(accentFor('dark', accent).accent, accent).toBeDefined()
    }
  })
})
