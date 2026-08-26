import type { Locale } from '@/content/types'
import { stackGroups } from '@/content/stack'
import { ui } from '@/content/ui'
import { Section } from '../section'

export function StackSection({ locale }: { locale: Locale }) {
  return (
    <Section
      id="stack"
      title={ui.sections.stack.title[locale]}
      subtitle={ui.sections.stack.subtitle[locale]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stackGroups.map((group, index) => (
          <div
            key={group.id}
            className="reveal card p-5"
            data-reveal-delay={String(index * 60)}
          >
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {group.label[locale]}
            </h3>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item.name}>
                  <p className="text-sm font-medium text-fg">{item.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-subtle">
                    {item.evidence[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
