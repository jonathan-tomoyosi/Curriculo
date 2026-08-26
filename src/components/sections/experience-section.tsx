import { Lock } from 'lucide-react'
import type { Locale } from '@/content/types'
import { experiences } from '@/content/experience'
import { ui } from '@/content/ui'
import { formatPeriod } from '@/lib/i18n'
import { Section } from '../section'

export function ExperienceSection({ locale }: { locale: Locale }) {
  return (
    <Section
      id="experiencia"
      title={ui.sections.experience.title[locale]}
      subtitle={ui.sections.experience.subtitle[locale]}
    >
      <ol className="space-y-12">
        {experiences.map((experience, index) => (
          <li
            key={experience.id}
            className="reveal grid gap-x-10 gap-y-4 border-t border-border pt-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
            data-reveal-delay={String(index * 80)}
          >
            {/* Coluna de identificação: em telas largas acompanha o texto pelo lado. */}
            <div>
              <h3 className="text-lg font-medium text-fg">{experience.company}</h3>
              <p className="mt-0.5 text-sm text-accent">{experience.role[locale]}</p>
              {experience.period && (
                <p className="mt-2 font-mono text-xs text-subtle">
                  {formatPeriod(experience.period, locale, ui.labels.present[locale])}
                </p>
              )}
              {experience.confidential && (
                <p className="mt-3 inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] uppercase tracking-wider text-subtle">
                  <Lock className="size-2.5" aria-hidden />
                  {ui.labels.confidential[locale]}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm leading-relaxed text-muted">{experience.summary[locale]}</p>

              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {experience.highlights[locale].map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent-line" aria-hidden />
                    {highlight}
                  </li>
                ))}
              </ul>

              {experience.confidential && (
                <p className="mt-4 text-xs italic text-subtle">
                  {ui.labels.confidentialNote[locale]}
                </p>
              )}

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {experience.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-subtle"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
