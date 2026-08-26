import { Target } from 'lucide-react'
import type { Locale } from '@/content/types'
import { competencies, profile } from '@/content/profile'
import { ui } from '@/content/ui'
import { Section } from '../section'

export function AboutSection({ locale }: { locale: Locale }) {
  const paragraphs = profile.about[locale].split('\n\n')

  return (
    <Section
      id="sobre"
      title={ui.sections.about.title[locale]}
      subtitle={ui.sections.about.subtitle[locale]}
    >
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="reveal space-y-5 text-sm leading-relaxed text-muted sm:text-base">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="card flex gap-4 p-5">
            <Target className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
            <p className="text-sm leading-relaxed text-muted">{profile.objective[locale]}</p>
          </div>
        </div>

        <ul className="reveal flex flex-wrap content-start gap-2" data-reveal-delay="80">
          {competencies.map((competency) => (
            <li
              key={competency.pt}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-muted"
            >
              {competency[locale]}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
