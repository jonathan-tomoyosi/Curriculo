import { describe, expect, it } from 'vitest'
import { formatMonth, formatPeriod, localePath, pickLocale, stripLocale } from './i18n'

describe('pickLocale', () => {
  it('cai no português quando não há cabeçalho', () => {
    expect(pickLocale(null)).toBe('pt')
    expect(pickLocale('')).toBe('pt')
  })

  it('reconhece variantes regionais', () => {
    expect(pickLocale('pt-BR,pt;q=0.9')).toBe('pt')
    expect(pickLocale('en-US,en;q=0.9')).toBe('en')
  })

  it('respeita o peso q em vez da ordem de escrita', () => {
    expect(pickLocale('en;q=0.3, pt-BR;q=0.9')).toBe('pt')
    expect(pickLocale('pt;q=0.2, en;q=0.8')).toBe('en')
  })

  it('ignora idiomas que o site não fala', () => {
    expect(pickLocale('de-DE,de;q=0.9,fr;q=0.8')).toBe('pt')
    expect(pickLocale('de-DE,de;q=0.9,en;q=0.5')).toBe('en')
  })

  it('não descarta um idioma válido por causa de q malformado', () => {
    expect(pickLocale('en;q=abc')).toBe('en')
  })

  it('coloca o q malformado abaixo de um peso bem formado', () => {
    expect(pickLocale('en;q=abc, pt;q=0.5')).toBe('pt')
  })
})

describe('stripLocale', () => {
  it('remove o prefixo de idioma', () => {
    expect(stripLocale('/pt')).toBe('/')
    expect(stripLocale('/en')).toBe('/')
    expect(stripLocale('/pt/projetos/bom-pastor-sp')).toBe('/projetos/bom-pastor-sp')
  })

  it('deixa intacto o caminho sem prefixo', () => {
    expect(stripLocale('/projetos')).toBe('/projetos')
  })

  it('não confunde segmento que apenas começa com o código', () => {
    expect(stripLocale('/ptbr/algo')).toBe('/ptbr/algo')
  })
})

describe('localePath', () => {
  it('monta o caminho no idioma pedido', () => {
    expect(localePath('en', '/pt/projetos')).toBe('/en/projetos')
    expect(localePath('pt', '/en')).toBe('/pt')
    expect(localePath('pt')).toBe('/pt')
  })

  it('é idempotente', () => {
    expect(localePath('en', localePath('en', '/pt/projetos'))).toBe('/en/projetos')
  })
})

describe('formatMonth e formatPeriod', () => {
  it('formata mês e ano no idioma', () => {
    expect(formatMonth('2025-01', 'pt')).toBe('jan 2025')
    expect(formatMonth('2025-01', 'en')).toBe('Jan 2025')
  })

  it('usa o rótulo de "atual" quando não há fim', () => {
    expect(formatPeriod({ start: '2025-01', end: null }, 'pt', 'atual')).toBe('jan 2025 — atual')
  })

  it('formata período fechado', () => {
    expect(formatPeriod({ start: '2022-01', end: '2024-12' }, 'pt', 'atual')).toBe(
      'jan 2022 — dez 2024',
    )
  })

  it('degrada para o ano quando o mês é inválido', () => {
    expect(formatMonth('2025-99', 'pt')).toBe('2025')
  })
})
