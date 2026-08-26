import Link from 'next/link'
import { Mail } from 'lucide-react'
import type { Locale } from '@/content/types'
import { profile } from '@/content/profile'
import { ui } from '@/content/ui'
import { GithubIcon, LinkedinIcon } from './brand-icons'

const REPOSITORY = 'https://github.com/jonathan-tomoyosi/Curriculo'

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="no-print border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="space-y-1">
          <p className="text-sm text-fg">{profile.name}</p>
          <p className="text-xs text-subtle">
            {ui.footer.builtWith[locale]} Next.js, TypeScript &amp; Tailwind CSS ·{' '}
            <Link
              href={REPOSITORY}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
            >
              {ui.footer.source[locale]}
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FooterLink href={`mailto:${profile.email}`} label={ui.contact.email[locale]}>
            <Mail className="size-4" aria-hidden />
          </FooterLink>
          <FooterLink href={profile.links.github} label="GitHub" external>
            <GithubIcon className="size-4" aria-hidden />
          </FooterLink>
          <FooterLink href={profile.links.linkedin} label="LinkedIn" external>
            <LinkedinIcon className="size-4" aria-hidden />
          </FooterLink>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({
  href,
  label,
  external,
  children,
}: {
  href: string
  label: string
  external?: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </Link>
  )
}
