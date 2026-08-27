import type { MetadataRoute } from 'next'
import { LOCALES } from '@/content/types'
import { projects } from '@/content/projects'
import { SITE_URL } from '@/lib/site-url'


export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const home = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((alternate) => [
          alternate === 'pt' ? 'pt-BR' : alternate,
          `${SITE_URL}/${alternate}`,
        ]),
      ),
    },
  }))

  const projectPages = LOCALES.flatMap((locale) =>
    projects.map((project) => ({
      url: `${SITE_URL}/${locale}/projetos/${project.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  )

  return [...home, ...projectPages]
}
