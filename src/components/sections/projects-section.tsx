import type { Locale } from '@/content/types'
import { projects } from '@/content/projects'
import { ui } from '@/content/ui'
import { Section } from '../section'
import { ProjectCard } from '../project-card'

export function ProjectsSection({ locale }: { locale: Locale }) {
  return (
    <Section
      id="projetos"
      title={ui.sections.projects.title[locale]}
      subtitle={ui.sections.projects.subtitle[locale]}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            className="reveal flex"
            data-reveal-delay={String(index * 80)}
          >
            <ProjectCard project={project} locale={locale} />
          </div>
        ))}
      </div>
    </Section>
  )
}
