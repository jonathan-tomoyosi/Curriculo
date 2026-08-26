import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { LOCALES, isLocale, type Locale } from '@/content/types'
import { getProject, projects } from '@/content/projects'
import { ui } from '@/content/ui'
import { localePath } from '@/lib/i18n'
import { Eyebrow } from '@/components/section'
import { GithubIcon } from '@/components/brand-icons'

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale: Locale = isLocale(raw) ? raw : 'pt'
  const project = getProject(slug)
  if (!project) return {}

  return {
    title: project.name,
    description: project.tagline[locale],
    alternates: {
      canonical: `/${locale}/projetos/${slug}`,
      languages: {
        'pt-BR': `/pt/projetos/${slug}`,
        en: `/en/projetos/${slug}`,
      },
    },
    openGraph: {
      title: project.name,
      description: project.tagline[locale],
      type: 'article',
      images: project.cover ? [{ url: project.cover }] : undefined,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale: Locale = raw

  const project = getProject(slug)
  if (!project) notFound()

  const { caseStudy } = project

  return (
    <article className="pt-28 pb-20 sm:pt-36">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Link
          href={`${localePath(locale, '/')}#projetos`}
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {ui.labels.backToProjects[locale]}
        </Link>

        <header className="mt-8">
          <Eyebrow>{ui.status[project.status][locale]}</Eyebrow>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">{project.tagline[locale]}</p>

          {(project.links?.live || project.links?.repo) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
                >
                  {ui.labels.liveSite[locale]}
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-border-strong"
                >
                  <GithubIcon className="size-3.5" aria-hidden />
                  {ui.labels.repository[locale]}
                </a>
              )}
            </div>
          )}
        </header>

        {project.cover && (
          <Image
            src={project.cover}
            alt={project.name}
            width={1200}
            height={750}
            priority
            sizes="(max-width: 768px) 100vw, 48rem"
            className="mt-10 w-full rounded-xl border border-border object-cover"
          />
        )}

        <p className="mt-10 text-base leading-relaxed text-muted">{project.summary[locale]}</p>

        <Block title={ui.caseStudy.stack[locale]}>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Block>

        {caseStudy && (
          <>
            <Block title={ui.caseStudy.context[locale]}>
              <p className="text-sm leading-relaxed text-muted">{caseStudy.context[locale]}</p>
            </Block>
            <Block title={ui.caseStudy.challenge[locale]}>
              <BulletList items={caseStudy.challenge[locale]} />
            </Block>
            <Block title={ui.caseStudy.solution[locale]}>
              <BulletList items={caseStudy.solution[locale]} />
            </Block>
            <Block title={ui.caseStudy.outcome[locale]}>
              <BulletList items={caseStudy.outcome[locale]} />
            </Block>
          </>
        )}

        <Block title={ui.labels.highlights[locale]}>
          <BulletList items={project.highlights[locale]} />
        </Block>

        {project.modules && (
          <Block title={ui.labels.modules[locale]}>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {project.modules[locale].map((module) => (
                <li
                  key={module}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted"
                >
                  {module}
                </li>
              ))}
            </ul>
          </Block>
        )}
      </div>
    </article>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="reveal mt-10 border-t border-border pt-8">
      <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{title}</h2>
      {children}
    </section>
  )
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-accent-line" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  )
}
