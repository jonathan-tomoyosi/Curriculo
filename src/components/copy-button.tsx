'use client'

import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { ui } from '@/content/ui'
import type { Locale } from '@/content/types'

export function CopyButton({ value, locale }: { value: string; locale: Locale }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // Sem permissão de área de transferência: o valor continua visível e selecionável.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${copied ? ui.labels.copied[locale] : ui.labels.copy[locale]}: ${value}`}
      className="flex size-8 shrink-0 items-center justify-center rounded-md text-subtle transition-colors hover:bg-elevated hover:text-fg"
    >
      {copied ? (
        <Check className="size-3.5 text-accent" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? ui.labels.copied[locale] : ''}
      </span>
    </button>
  )
}
