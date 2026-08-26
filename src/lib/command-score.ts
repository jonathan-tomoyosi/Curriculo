/**
 * Ranqueamento da busca.
 *
 * O filtro padrão do cmdk casa subsequência: digitar "escuro" dá pontos a qualquer
 * texto que contenha e-s-c-u-r-o espalhados, e a ação "Modo: Escuro" acaba abaixo de
 * itens que não têm nada a ver. O resultado prático é o usuário concluir que a opção
 * não existe. Aqui o casamento é por substring — previsível e sempre priorizando o
 * começo do rótulo.
 */
export function scoreCommand(value: string, search: string, keywords?: string[]): number {
  const query = search.trim().toLowerCase()
  if (!query) return 1

  const haystack = `${value} ${keywords?.join(' ') ?? ''}`.toLowerCase()
  if (haystack.startsWith(query)) return 1
  if (haystack.includes(query)) return 0.8

  const words = query.split(/\s+/).filter(Boolean)
  if (words.length > 1 && words.every((word) => haystack.includes(word))) return 0.6

  return 0
}
