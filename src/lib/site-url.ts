/**
 * URL canônica do site.
 *
 * Usada em `metadataBase`, nas alternativas de idioma (`hreflang`), no sitemap e no
 * robots.txt. Se ela apontar para o lugar errado, nada quebra visivelmente — o
 * buscador é que passa a indexar um endereço que não existe. É exatamente o tipo de
 * erro que ninguém percebe.
 *
 * Por isso a resolução é automática, em ordem de confiança:
 *
 *   1. `NEXT_PUBLIC_SITE_URL` — só quando existe domínio próprio
 *   2. `VERCEL_PROJECT_PRODUCTION_URL` — o domínio de produção que a Vercel injeta
 *      sozinha, inclusive em deploys de preview, que assim apontam a canônica para a
 *      produção em vez de para si mesmos
 *   3. localhost, em desenvolvimento
 *
 * Com isso, publicar não exige configurar nada.
 */

type Env = Record<string, string | undefined>

export function resolveSiteUrl(env: Env = process.env): string {
  const explicit = env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) return normalize(explicit)

  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (vercel) return normalize(vercel)

  return `http://localhost:${env.PORT?.trim() || '3000'}`
}

/** Aceita com ou sem protocolo e sem barra final — a Vercel entrega só o host. */
function normalize(value: string): string {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
  return withProtocol.replace(/\/+$/, '')
}

export const SITE_URL = resolveSiteUrl()
