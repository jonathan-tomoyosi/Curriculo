import { GraduationCap } from 'lucide-react'
import type { Locale } from '@/content/types'
import { education, languages } from '@/content/profile'
import { ui } from '@/content/ui'
import { formatPeriod } from '@/lib/i18n'
import { Section } from '../section'

export function EducationSection({ locale }: { locale: Locale }) {
  return (
    <Section
      id="formacao"
      title={ui.sections.education.title[locale]}
      subtitle={ui.sections.education.subtitle[locale]}
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <ul className="space-y-4">
          {education.map((item, index) => (
            <li
              key={item.institution}
              className="reveal card flex gap-4 p-5"
              data-reveal-delay={String(index * 70)}
            >
              <GraduationCap className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-medium text-fg">{item.institution}</h3>
                  <span className="rounded-full border border-border bg-elevated px-2 py-0.5 text-[10px] uppercase tracking-wider text-subtle">
                    {item.status[locale]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{item.degree[locale]}</p>
                <p className="mt-1 font-mono text-xs text-subtle">
                  {formatPeriod(item.period, locale, ui.labels.present[locale])}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <ul className="reveal card space-y-4 p-5" data-reveal-delay="140">
          {languages.map((language) => (
            <li key={language.name.pt}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-fg">{language.name[locale]}</span>
                <span className="text-xs text-subtle">{language.level[locale]}</span>
              </div>
              <div
                className="mt-2 flex gap-1"
                role="img"
                aria-label={`${language.name[locale]}: ${language.level[locale]}`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={
                      index < language.proficiency
                        ? 'h-1 flex-1 rounded-full bg-accent'
                        : 'h-1 flex-1 rounded-full bg-border'
                    }
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
