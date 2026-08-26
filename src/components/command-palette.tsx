'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Command } from 'cmdk'
import {
  ArrowUpRight,
  Briefcase,
  Download,
  FileText,
  GraduationCap,
  Languages,
  Layers,
  Mail,
  Monitor,
  Moon,
  Palette,
  Sun,
  User,
} from 'lucide-react'
import { LOCALES, type Locale } from '@/content/types'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { allStackItems } from '@/content/stack'
import { ui } from '@/content/ui'
import { ACCENTS } from '@/lib/theme'
import { localePath } from '@/lib/i18n'
import { downloadFile, rememberLocale } from '@/lib/browser'
import { scoreCommand } from '@/lib/command-score'
import { useTheme } from './theme-provider'
import { GithubIcon, LinkedinIcon } from './brand-icons'

export const COMMAND_PALETTE_EVENT = 'jt:open-command-palette'

/** Abre a paleta a partir de qualquer lugar da árvore, sem estado global. */
export function openCommandPalette() {
  window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT))
}

const SECTIONS = [
  { id: 'sobre', label: ui.nav.about, icon: User },
  { id: 'stack', label: ui.nav.stack, icon: Layers },
  { id: 'experiencia', label: ui.nav.experience, icon: Briefcase },
  { id: 'projetos', label: ui.nav.projects, icon: FileText },
  { id: 'formacao', label: ui.nav.education, icon: GraduationCap },
  { id: 'contato', label: ui.nav.contact, icon: Mail },
] as const

export function CommandPalette({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { setMode, setAccent } = useTheme()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    const onOpen = () => setOpen(true)

    document.addEventListener('keydown', onKeyDown)
    window.addEventListener(COMMAND_PALETTE_EVENT, onOpen)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener(COMMAND_PALETTE_EVENT, onOpen)
    }
  }, [])

  const run = useCallback((action: () => void) => {
    action()
    setOpen(false)
  }, [])

  const goToSection = useCallback(
    (id: string) => {
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push(`${localePath(locale, '/')}#${id}`)
      }
    },
    [locale, router],
  )

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label={ui.palette.placeholder[locale]}
      filter={scoreCommand}
      className="fixed inset-0 z-[90]"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div className="fixed left-1/2 top-[18vh] z-10 w-[min(92vw,560px)] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-elevated shadow-2xl shadow-black/30">
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Command.Input
            placeholder={ui.palette.placeholder[locale]}
            className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-subtle"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:block">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[62vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-sm text-muted">
            {ui.palette.empty[locale]}
          </Command.Empty>

          <Group heading={ui.palette.groups.navigation[locale]}>
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <Item key={id} onSelect={() => run(() => goToSection(id))}>
                <Icon className="size-4 text-subtle" aria-hidden />
                {label[locale]}
              </Item>
            ))}
          </Group>

          <Group heading={ui.palette.groups.projects[locale]}>
            {projects.map((project) => (
              <Item
                key={project.slug}
                value={`${project.name} ${project.tagline[locale]}`}
                onSelect={() =>
                  run(() => router.push(localePath(locale, `/projetos/${project.slug}`)))
                }
              >
                <FileText className="size-4 text-subtle" aria-hidden />
                <span className="flex-1 truncate">{project.name}</span>
                <span className="truncate text-xs text-subtle">{ui.status[project.status][locale]}</span>
              </Item>
            ))}
          </Group>

          <Group heading={ui.theme.label[locale]}>
            <Item
              value={`${ui.theme.mode[locale]} ${ui.theme.light[locale]} light claro`}
              onSelect={() => run(() => setMode('light'))}
            >
              <Sun className="size-4 text-subtle" aria-hidden />
              {`${ui.theme.mode[locale]}: ${ui.theme.light[locale]}`}
            </Item>
            <Item
              value={`${ui.theme.mode[locale]} ${ui.theme.dark[locale]} dark escuro noturno`}
              onSelect={() => run(() => setMode('dark'))}
            >
              <Moon className="size-4 text-subtle" aria-hidden />
              {`${ui.theme.mode[locale]}: ${ui.theme.dark[locale]}`}
            </Item>
            <Item
              value={`${ui.theme.mode[locale]} ${ui.theme.system[locale]} system sistema automático`}
              onSelect={() => run(() => setMode('system'))}
            >
              <Monitor className="size-4 text-subtle" aria-hidden />
              {`${ui.theme.mode[locale]}: ${ui.theme.system[locale]}`}
            </Item>
            {ACCENTS.map((accent) => (
              <Item
                key={accent}
                value={`${ui.theme.accent[locale]} ${ui.accents[accent][locale]} ${accent}`}
                onSelect={() => run(() => setAccent(accent))}
              >
                <Palette className="size-4 text-subtle" aria-hidden />
                {`${ui.theme.accent[locale]}: ${ui.accents[accent][locale]}`}
              </Item>
            ))}
          </Group>

          <Group heading={ui.palette.groups.actions[locale]}>
            <Item
              value={`${ui.hero.downloadCv[locale]} pdf currículo cv`}
              onSelect={() => run(() => downloadFile(`/api/cv/${locale}`))}
            >
              <Download className="size-4 text-subtle" aria-hidden />
              {ui.hero.downloadCv[locale]}
            </Item>
            {LOCALES.filter((option) => option !== locale).map((option) => (
              <Item
                key={option}
                value={`${ui.language.label[locale]} ${ui.language[option][locale]} ${option}`}
                onSelect={() =>
                  run(() => {
                    rememberLocale(option)
                    router.push(localePath(option, pathname))
                  })
                }
              >
                <Languages className="size-4 text-subtle" aria-hidden />
                {`${ui.language.label[locale]}: ${ui.language[option][locale]}`}
              </Item>
            ))}
          </Group>

          <Group heading={ui.palette.groups.contact[locale]}>
            <Item
              onSelect={() =>
                run(() => {
                  window.location.href = `mailto:${profile.email}`
                })
              }
            >
              <Mail className="size-4 text-subtle" aria-hidden />
              {profile.email}
            </Item>
            <Item onSelect={() => run(() => window.open(profile.links.github, '_blank'))}>
              <GithubIcon className="size-4 text-subtle" aria-hidden />
              GitHub
              <ArrowUpRight className="ml-auto size-3.5 text-subtle" aria-hidden />
            </Item>
            <Item onSelect={() => run(() => window.open(profile.links.linkedin, '_blank'))}>
              <LinkedinIcon className="size-4 text-subtle" aria-hidden />
              LinkedIn
              <ArrowUpRight className="ml-auto size-3.5 text-subtle" aria-hidden />
            </Item>
          </Group>

          <Group heading={ui.palette.groups.stack[locale]}>
            {allStackItems.map((item) => (
              <Item
                key={item.name}
                value={`${item.name} ${item.evidence[locale]}`}
                onSelect={() => run(() => goToSection('stack'))}
              >
                <Layers className="size-4 text-subtle" aria-hidden />
                <span className="flex-1 truncate">{item.name}</span>
                <span className="hidden truncate text-xs text-subtle sm:block">
                  {item.evidence[locale]}
                </span>
              </Item>
            ))}
          </Group>
        </Command.List>
      </div>
    </Command.Dialog>
  )
}

function Group({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <Command.Group
      heading={heading}
      className="mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-subtle"
    >
      {children}
    </Command.Group>
  )
}

function Item({
  children,
  onSelect,
  value,
}: {
  children: React.ReactNode
  onSelect: () => void
  value?: string
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted data-[selected=true]:bg-accent-soft data-[selected=true]:text-fg"
    >
      {children}
    </Command.Item>
  )
}
