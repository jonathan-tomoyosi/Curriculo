import { describe, expect, it } from 'vitest'
import { resolveSiteUrl } from './site-url'

/**
 * Uma URL canônica errada não quebra nada visivelmente — o buscador é que passa a
 * indexar um endereço inexistente. Como o sintoma é silencioso, a resolução precisa
 * ser coberta por teste.
 */
describe('resolveSiteUrl', () => {
  it('prefere o domínio próprio quando existe', () => {
    expect(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: 'https://jonathantomoyosi.dev',
        VERCEL_PROJECT_PRODUCTION_URL: 'curriculo.vercel.app',
      }),
    ).toBe('https://jonathantomoyosi.dev')
  })

  it('usa o domínio de produção que a Vercel injeta, sem configuração manual', () => {
    expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'curriculo.vercel.app' })).toBe(
      'https://curriculo.vercel.app',
    )
  })

  it('completa o protocolo — a Vercel entrega apenas o host', () => {
    expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'curriculo.vercel.app' })).toMatch(
      /^https:\/\//,
    )
  })

  it('remove barra final, que duplicaria a barra nas URLs montadas', () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: 'https://exemplo.com/' })).toBe(
      'https://exemplo.com',
    )
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: 'https://exemplo.com///' })).toBe(
      'https://exemplo.com',
    )
  })

  it('preserva http explícito, sem forçar https', () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: 'http://localhost:4310' })).toBe(
      'http://localhost:4310',
    )
  })

  it('ignora variável vazia ou só com espaço, em vez de gerar URL inválida', () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: '   ', VERCEL_PROJECT_PRODUCTION_URL: 'a.dev' })).toBe(
      'https://a.dev',
    )
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: '' })).toBe('http://localhost:3000')
  })

  it('cai em localhost no desenvolvimento, respeitando a porta', () => {
    expect(resolveSiteUrl({})).toBe('http://localhost:3000')
    expect(resolveSiteUrl({ PORT: '4310' })).toBe('http://localhost:4310')
  })

  it('sempre produz uma URL que o construtor nativo aceita', () => {
    for (const env of [{}, { PORT: '4310' }, { VERCEL_PROJECT_PRODUCTION_URL: 'x.vercel.app' }]) {
      expect(() => new URL(resolveSiteUrl(env))).not.toThrow()
    }
  })
})
