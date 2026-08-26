'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Revela elementos `.reveal` quando entram na viewport.
 *
 * Progressive enhancement: o CSS só esconde o elemento depois que este componente
 * marca `data-js="true"` no documento. Sem JavaScript, ou se o observer não existir,
 * o conteúdo simplesmente aparece — nunca fica invisível.
 */
export function Reveal() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      root.dataset.js = 'false'
      return
    }

    root.dataset.js = 'true'
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const element = entry.target as HTMLElement
          const delay = Number(element.dataset.revealDelay ?? 0)
          window.setTimeout(() => {
            element.dataset.visible = 'true'
          }, delay)
          observer.unobserve(element)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )

    for (const target of targets) observer.observe(target)
    return () => observer.disconnect()
  }, [pathname])

  return null
}
