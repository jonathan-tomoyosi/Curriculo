import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import type { Locale, Project } from '@/content/types'
import { ui } from '@/content/ui'
import { localePath } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const STATUS_STYLE: Record<Project['status'], string> = {
  live: 'border-accent-line bg-accent-soft text-accent',
  testing: 'border-border bg-surface text-muted',
  private: 'border-border bg-surface text-subtle',
}

/**
 * Cabeçalho visual do card.
 *
 * Projeto sem screenshot público ganha uma capa gerada em vez de nada: num grid, um
 * card sem imagem ao lado de outro com imagem é esticado até a mesma altura e abre um
 * vazio grande. A capa gerada resolve isso sem inventar um print que não existe.
 */
function ProjectCover({ project, locale }: { project: Project; locale: Locale }) {
  const note = project.coverNote?.[locale]

  if (project.cover) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-elevated">
        <Image
          src={project.cover}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    )
  }

  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-border bg-elevated px-8">
      <div className="bg-dots absolute inset-0 opacity-70" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent-soft),transparent_70%)]"
        aria-hidden
      />
      {note && (
        <p className="relative text-center font-mono text-sm leading-relaxed text-accent">{note}</p>
      )}
    </div>
  )
}

export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const href = localePath(locale, `/projetos/${project.slug}`)

  return (
    <article className="card group relative flex w-full flex-col overflow-hidden transition-colors hover:border-border-strong">
      <ProjectCover project={project} locale={locale} />

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-medium text-fg">{project.name}</h3>
          <span
            className={cn(
              'shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider',
              STATUS_STYLE[project.status],
            )}
          >
            {ui.status[project.status][locale]}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted">{project.tagline[locale]}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border bg-elevated px-2 py-0.5 font-mono text-[11px] text-subtle"
            >
              {tech}
            </li>
          ))}
          {project.stack.length > 6 && (
            <li className="px-1 py-0.5 font-mono text-[11px] text-subtle">
              +{project.stack.length - 6}
            </li>
          )}
        </ul>

        {/* `mt-auto` ancora a ação na base: cards de alturas diferentes alinham o rodapé. */}
        <div className="mt-auto flex items-center gap-4 pt-6">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
          >
            {/* Cobre o card inteiro, mantendo um único alvo de clique acessível. */}
            <span className="absolute inset-0" aria-hidden />
            {ui.labels.caseStudy[locale]}
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>

          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
            >
              {ui.labels.liveSite[locale]}
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
