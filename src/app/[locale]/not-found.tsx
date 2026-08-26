import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ui } from '@/content/ui'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-6xl font-semibold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-fg">
        {ui.notFound.title.pt} · {ui.notFound.title.en}
      </h1>
      <p className="mt-3 text-sm text-muted">{ui.notFound.description.pt}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {ui.notFound.home.pt}
      </Link>
    </div>
  )
}
