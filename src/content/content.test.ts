import { describe, expect, it } from 'vitest'
import { competencies, education, languages, profile } from './profile'
import { experiences } from './experience'
import { getProject, projects } from './projects'
import { allStackItems, stackGroups } from './stack'
import { ui } from './ui'
import { LOCALES } from './types'

/**
 * Testes de integridade da fonte única de verdade.
 *
 * O site, o PDF, o SEO e o command palette leem os mesmos módulos. Se um texto existe
 * em português e some no inglês, o resultado não é erro de compilação — é uma página
 * publicada com um buraco. Estes testes transformam isso em falha de build.
 */

type Unknown = Record<string, unknown>

/** Um nó é "traduzível" quando tem exatamente as chaves dos idiomas suportados. */
function isLocalized(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false
  const keys = Object.keys(value)
  return keys.length === LOCALES.length && LOCALES.every((locale) => keys.includes(locale))
}

/** Percorre a árvore acumulando todo nó traduzível encontrado, com o caminho. */
function collectLocalized(value: unknown, path = '$'): { path: string; node: Unknown }[] {
  if (isLocalized(value)) {
    return [{ path, node: value as Unknown }]
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectLocalized(item, `${path}[${index}]`))
  }
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).flatMap(([key, child]) => collectLocalized(child, `${path}.${key}`))
  }
  return []
}

const ROOTS = {
  profile,
  education,
  languages,
  competencies,
  experiences,
  projects,
  stackGroups,
  ui,
}

describe('integridade dos textos traduzidos', () => {
  const nodes = collectLocalized(ROOTS)

  it('encontra conteúdo traduzível para validar', () => {
    expect(nodes.length).toBeGreaterThan(100)
  })

  it('não deixa nenhum idioma vazio', () => {
    const problems = nodes.flatMap(({ path, node }) =>
      LOCALES.flatMap((locale) => {
        const value = node[locale]
        if (typeof value === 'string' && value.trim().length > 0) return []
        if (Array.isArray(value) && value.length > 0 && value.every((item) => `${item}`.trim())) {
          return []
        }
        return [`${path}.${locale}`]
      }),
    )
    expect(problems).toEqual([])
  })

  it('mantém listas com o mesmo número de itens nos dois idiomas', () => {
    const problems = nodes
      .filter(({ node }) => Array.isArray(node.pt))
      .filter(({ node }) => (node.pt as unknown[]).length !== (node.en as unknown[]).length)
      .map(({ path }) => path)
    expect(problems).toEqual([])
  })

  it('não deixa texto em inglês idêntico ao português por esquecimento', () => {
    // Nomes próprios e siglas podem coincidir; frases longas iguais são tradução faltando.
    const suspects = nodes
      .filter(({ node }) => typeof node.pt === 'string' && node.pt === node.en)
      .filter(({ node }) => (node.pt as string).length > 45)
      .map(({ path }) => path)
    expect(suspects).toEqual([])
  })
})

describe('perfil', () => {
  it('tem contato utilizável', () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
    expect(profile.phone.e164).toMatch(/^\d{12,13}$/)
    expect(profile.links.github).toMatch(/^https:\/\/github\.com\//)
    expect(profile.links.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\//)
  })

  it('aponta a foto para um caminho público', () => {
    expect(profile.photo.startsWith('/')).toBe(true)
  })
})

describe('projetos', () => {
  it('tem slug único', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('usa slug seguro para URL', () => {
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it('é recuperável por slug e devolve indefinido para slug inexistente', () => {
    expect(getProject('bom-pastor-sp')?.name).toBe('Igreja Bom Pastor SP')
    expect(getProject('nao-existe')).toBeUndefined()
  })

  it('declara stack e destaques em todo projeto', () => {
    for (const project of projects) {
      expect(project.stack.length, project.slug).toBeGreaterThan(0)
      expect(project.highlights.pt.length, project.slug).toBeGreaterThan(0)
    }
  })

  it('só marca como "em produção" o que tem link ao vivo', () => {
    for (const project of projects) {
      if (project.status === 'live') {
        expect(project.links?.live, project.slug).toMatch(/^https:\/\//)
      }
    }
  })
})

describe('experiência', () => {
  it('tem identificador único', () => {
    const ids = experiences.map((experience) => experience.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('usa período no formato AAAA-MM quando existe', () => {
    for (const experience of experiences) {
      if (!experience.period) continue
      expect(experience.period.start).toMatch(/^\d{4}-\d{2}$/)
      if (experience.period.end) expect(experience.period.end).toMatch(/^\d{4}-\d{2}$/)
    }
  })

  it('acompanha todo trabalho confidencial de uma nota explicando a omissão', () => {
    const confidential = experiences.filter((experience) => experience.confidential)
    expect(confidential.length).toBeGreaterThan(0)
    expect(ui.labels.confidentialNote.pt.length).toBeGreaterThan(20)
  })
})

describe('stack', () => {
  it('não repete tecnologia entre grupos', () => {
    const names = allStackItems.map((item) => item.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('exige evidência de uso em todo item — a regra que mantém a lista honesta', () => {
    for (const item of allStackItems) {
      expect(item.evidence.pt.trim().length, item.name).toBeGreaterThan(8)
      expect(item.evidence.en.trim().length, item.name).toBeGreaterThan(8)
    }
  })

  it('tem grupos com identificador único', () => {
    const ids = stackGroups.map((group) => group.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('formação', () => {
  it('lista da mais recente para a mais antiga', () => {
    const starts = education.map((item) => item.period.start)
    expect([...starts].sort().reverse()).toEqual(starts)
  })
})

describe('idiomas', () => {
  it('usa proficiência dentro da escala', () => {
    for (const language of languages) {
      expect(language.proficiency).toBeGreaterThanOrEqual(1)
      expect(language.proficiency).toBeLessThanOrEqual(5)
    }
  })
})
