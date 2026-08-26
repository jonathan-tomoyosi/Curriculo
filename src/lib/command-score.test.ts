import { describe, expect, it } from 'vitest'
import { scoreCommand } from './command-score'

/**
 * O bug que este módulo existe para impedir: com o filtro difuso padrão do cmdk,
 * buscar "escuro" colocava a ação "Modo: Escuro" abaixo de itens sem relação, porque
 * as letras e-s-c-u-r-o aparecem espalhadas em vários textos. Quem buscava concluía
 * que a opção não existia.
 */
describe('scoreCommand', () => {
  it('mostra tudo quando não há busca', () => {
    expect(scoreCommand('qualquer coisa', '')).toBe(1)
    expect(scoreCommand('qualquer coisa', '   ')).toBe(1)
  })

  it('coloca "Modo: Escuro" acima de um casamento apenas de subsequência', () => {
    const alvo = scoreCommand('Modo Escuro dark escuro noturno', 'escuro')
    const ruido = scoreCommand('Processamento de dados, ETL e funções serverless', 'escuro')

    expect(alvo).toBeGreaterThan(0)
    expect(ruido).toBe(0)
    expect(alvo).toBeGreaterThan(ruido)
  })

  it('prioriza quem começa com o termo', () => {
    const comeco = scoreCommand('Projetos', 'proj')
    const meio = scoreCommand('Ver projetos agora', 'proj')
    expect(comeco).toBeGreaterThan(meio)
    expect(meio).toBeGreaterThan(0)
  })

  it('ignora diferença de caixa', () => {
    expect(scoreCommand('PostgreSQL', 'postgres')).toBeGreaterThan(0)
    expect(scoreCommand('postgresql', 'POSTGRES')).toBeGreaterThan(0)
  })

  it('aceita palavras fora de ordem, com pontuação menor', () => {
    const foraDeOrdem = scoreCommand('Igreja Bom Pastor SP', 'pastor igreja')
    const emOrdem = scoreCommand('Igreja Bom Pastor SP', 'igreja bom')
    expect(foraDeOrdem).toBeGreaterThan(0)
    expect(emOrdem).toBeGreaterThan(foraDeOrdem)
  })

  it('considera as palavras-chave junto do rótulo', () => {
    expect(scoreCommand('Modo: Sistema', 'automático', ['system', 'automático'])).toBeGreaterThan(0)
  })

  it('esconde o que não casa, em vez de listar item irrelevante', () => {
    expect(scoreCommand('Igreja Bom Pastor SP', 'kubernetes')).toBe(0)
  })
})
