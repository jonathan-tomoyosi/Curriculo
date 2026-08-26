import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, Download, MapPin } from 'lucide-react'
import type { Locale } from '@/content/types'
import { profile } from '@/content/profile'
import { ui } from '@/content/ui'
import { localePath } from '@/lib/i18n'
import { GithubIcon, LinkedinIcon } from './brand-icons'

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-soft px-3 py-1 text-xs text-accent">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              {ui.hero.available[locale]}
            </p>

            <h1
              className="reveal text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl"
              data-reveal-delay="60"
            >
              {profile.name.split(' ')[0]}{' '}
              <span className="text-gradient">{profile.name.split(' ').slice(1).join(' ')}</span>
            </h1>

            <p
              className="reveal mt-4 font-mono text-sm text-accent sm:text-base"
              data-reveal-delay="120"
            >
              {profile.headline[locale]}
            </p>

            <p
              className="reveal mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base"
              data-reveal-delay="180"
            >
              {profile.summary[locale]}
            </p>

            <p
              className="reveal mt-6 flex items-center gap-2 text-xs text-subtle"
              data-reveal-delay="220"
            >
              <MapPin className="size-3.5" aria-hidden />
              {profile.location[locale]}
            </p>

            <div className="reveal mt-8 flex flex-wrap items-center gap-3" data-reveal-delay="260">
              <Link
                href={`${localePath(locale, '/')}#projetos`}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
              >
                {ui.hero.viewProjects[locale]}
                <ArrowDown className="size-4" aria-hidden />
              </Link>

              <a
                href={`/api/cv/${locale}`}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-border-strong"
              >
                <Download className="size-4" aria-hidden />
                {ui.hero.downloadCv[locale]}
              </a>

              <div className="flex items-center gap-2">
                <IconLink href={profile.links.github} label="GitHub">
                  <GithubIcon className="size-4" aria-hidden />
                </IconLink>
                <IconLink href={profile.links.linkedin} label="LinkedIn">
                  <LinkedinIcon className="size-4" aria-hidden />
                </IconLink>
              </div>
            </div>
          </div>

          <div className="reveal order-first lg:order-none" data-reveal-delay="120">
            <div className="relative mx-auto w-48 sm:w-60 lg:w-full lg:max-w-xs">
              <div
                className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-accent-soft blur-2xl"
                aria-hidden
              />
              {/*
                A foto é retrato (487x689). Forçá-la num quadrado com `object-cover`
                descartaria ~29% da altura, metade disso no topo — ou seja, a cabeça.
                Aqui o quadro usa a proporção real da imagem; `object-top` é apenas
                a garantia caso a foto seja trocada por outra de proporção diferente.
              */}
              <Image
                src={profile.photo}
                alt={profile.name}
                width={487}
                height={689}
                priority
                sizes="(max-width: 1024px) 15rem, 20rem"
                className="aspect-[487/689] w-full rounded-3xl border border-border object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  )
}
