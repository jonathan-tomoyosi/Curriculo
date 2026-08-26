import { describe, expect, it } from 'vitest'
import {
  DEFAULT_ACCENT,
  DEFAULT_MODE,
  STORAGE_KEY,
  isAccent,
  isMode,
  readPreference,
} from './theme'

describe('validação de tema', () => {
  it('aceita apenas valores conhecidos', () => {
    expect(isMode('dark')).toBe(true)
    expect(isMode('darkish')).toBe(false)
    expect(isAccent('violet')).toBe(true)
    expect(isAccent('rosa')).toBe(false)
    expect(isMode(undefined)).toBe(false)
  })
})

describe('readPreference', () => {
  it('devolve o padrão sem nada salvo', () => {
    expect(readPreference()).toEqual({ mode: DEFAULT_MODE, accent: DEFAULT_ACCENT })
  })

  it('lê uma preferência válida', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode: 'light', accent: 'emerald' }))
    expect(readPreference()).toEqual({ mode: 'light', accent: 'emerald' })
  })

  it('ignora JSON corrompido em vez de quebrar a página', () => {
    localStorage.setItem(STORAGE_KEY, '{isso não é json')
    expect(readPreference()).toEqual({ mode: DEFAULT_MODE, accent: DEFAULT_ACCENT })
  })

  it('descarta valores fora do conjunto permitido', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode: 'neon', accent: 'rosa' }))
    expect(readPreference()).toEqual({ mode: DEFAULT_MODE, accent: DEFAULT_ACCENT })
  })

  it('preserva o campo válido quando só um está errado', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode: 'light', accent: 'rosa' }))
    expect(readPreference()).toEqual({ mode: 'light', accent: DEFAULT_ACCENT })
  })

  it('tolera um valor que não é objeto', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify('dark'))
    expect(readPreference()).toEqual({ mode: DEFAULT_MODE, accent: DEFAULT_ACCENT })
  })
})
