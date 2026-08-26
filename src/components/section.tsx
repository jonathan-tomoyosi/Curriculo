import { cn } from '@/lib/utils'

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
}: {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('border-t border-border py-20 sm:py-28', className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="reveal mb-12 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-muted sm:text-base">{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

/** Rótulo monoespaçado usado como marcador de categoria. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{children}</span>
  )
}
