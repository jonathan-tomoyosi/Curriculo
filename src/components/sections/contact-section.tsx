import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { Locale } from '@/content/types'
import { profile } from '@/content/profile'
import { ui } from '@/content/ui'
import { Section } from '../section'
import { CopyButton } from '../copy-button'
import { GithubIcon, LinkedinIcon } from '../brand-icons'

export function ContactSection({ locale }: { locale: Locale }) {
  const whatsapp = `https://wa.me/${profile.phone.e164}`

  return (
    <Section
      id="contato"
      title={ui.sections.contact.title[locale]}
      subtitle={ui.sections.contact.subtitle[locale]}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <CopyableRow
          icon={<Mail className="size-4" aria-hidden />}
          label={ui.contact.email[locale]}
          value={profile.email}
          href={`mailto:${profile.email}`}
          locale={locale}
          delay={0}
        />
        <CopyableRow
          icon={<Phone className="size-4" aria-hidden />}
          label={ui.contact.phone[locale]}
          value={profile.phone.display}
          href={`tel:+${profile.phone.e164}`}
          locale={locale}
          delay={60}
        />
        <ExternalRow
          icon={<MessageCircle className="size-4" aria-hidden />}
          label={ui.contact.whatsapp[locale]}
          value={profile.phone.display}
          href={whatsapp}
          delay={120}
        />
        <ExternalRow
          icon={<LinkedinIcon className="size-4" aria-hidden />}
          label={ui.contact.linkedin[locale]}
          value="/in/jonathan-gamez-tomoyosi"
          href={profile.links.linkedin}
          delay={180}
        />
        <ExternalRow
          icon={<GithubIcon className="size-4" aria-hidden />}
          label={ui.contact.github[locale]}
          value="@jonathan-tomoyosi"
          href={profile.links.github}
          delay={240}
        />
        <div className="reveal card flex items-center gap-4 p-4" data-reveal-delay="300">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-elevated text-accent">
            <MapPin className="size-4" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider text-subtle">
              {ui.contact.location[locale]}
            </p>
            <p className="truncate text-sm text-fg">{profile.location[locale]}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}

function CopyableRow({
  icon,
  label,
  value,
  href,
  locale,
  delay,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  locale: Locale
  delay: number
}) {
  return (
    <div className="reveal card flex items-center gap-4 p-4" data-reveal-delay={String(delay)}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-elevated text-accent">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-wider text-subtle">{label}</p>
        <a
          href={href}
          className="block truncate text-sm text-fg transition-colors hover:text-accent"
        >
          {value}
        </a>
      </div>
      <CopyButton value={value} locale={locale} />
    </div>
  )
}

function ExternalRow({
  icon,
  label,
  value,
  href,
  delay,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  delay: number
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="reveal card group flex items-center gap-4 p-4 transition-colors hover:border-border-strong"
      data-reveal-delay={String(delay)}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-elevated text-accent">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-wider text-subtle">{label}</p>
        <p className="truncate text-sm text-fg">{value}</p>
      </div>
      <ArrowUpRight
        className="size-4 shrink-0 text-subtle transition-colors group-hover:text-accent"
        aria-hidden
      />
    </a>
  )
}
