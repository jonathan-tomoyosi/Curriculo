import { readFile } from 'node:fs/promises'

/**
 * Confere o rastreamento de arquivos do build.
 *
 * Existe por causa de uma falha real: o PDF do currículo gerava perfeitamente em
 * desenvolvimento e passava nos testes ponta a ponta, mas devolvia 500 em produção.
 * O motivo é que `next start` roda com o `node_modules` inteiro disponível, enquanto a
 * função serverless recebe apenas os arquivos que o rastreador conseguiu detectar — e o
 * pdfkit lê as métricas das fontes padrão via `fs.readFileSync` com caminho montado em
 * tempo de execução, invisível para a análise estática.
 *
 * Nenhum teste local pega esse tipo de erro, porque ele não é de código: é de
 * empacotamento. Este script lê o manifesto de rastreamento gerado pelo build e falha
 * se um arquivo obrigatório em tempo de execução ficou de fora.
 */

const VERIFICACOES = [
  {
    rota: '.next/server/app/api/cv/[locale]/route.js.nft.json',
    descricao: 'geração do currículo em PDF',
    exigencias: [
      {
        // Esta é a verificação que importa: foi exatamente este arquivo que faltou em
        // produção. A primeira versão deste script conferia os `.afm` e dava verde
        // enquanto o módulo realmente exigido continuava fora do pacote.
        nome: 'módulos das fontes padrão do pdfkit (standard-fonts/*.cjs)',
        // Sem normalizar separador: o manifesto usa `\` no Windows e `/` no Linux.
        casa: (arquivo) => arquivo.includes('standard-fonts'),
        minimo: 14,
        porque:
          'o pdfkit exige cada fonte pelo nome em tempo de execução; sem elas a função ' +
          'falha com "Cannot find module .../standard-fonts/Helvetica.cjs"',
      },
      {
        nome: 'métricas das fontes padrão do pdfkit (.afm)',
        casa: (arquivo) => arquivo.endsWith('.afm'),
        minimo: 14,
        porque: 'usadas para medir o texto das fontes padrão',
      },
      {
        nome: 'tabelas unicode do fontkit (.trie)',
        casa: (arquivo) => arquivo.endsWith('.trie'),
        minimo: 3,
        porque: 'usadas na quebra de linha e no shaping de texto',
      },
    ],
  },
]

let houveFalha = false

for (const { rota, descricao, exigencias } of VERIFICACOES) {
  let arquivos

  try {
    const manifesto = JSON.parse(await readFile(rota, 'utf-8'))
    arquivos = manifesto.files ?? []
  } catch {
    console.error(`✗ manifesto de rastreamento não encontrado: ${rota}`)
    console.error('  rode `next build` antes desta verificação.')
    houveFalha = true
    continue
  }

  for (const { nome, casa, minimo, porque } of exigencias) {
    const encontrados = arquivos.filter(casa).length

    if (encontrados >= minimo) {
      console.log(`✓ ${descricao}: ${nome} — ${encontrados} arquivo(s)`)
      continue
    }

    console.error(`✗ ${descricao}: ${nome} — ${encontrados} de ${minimo} esperado(s)`)
    console.error(`  ${porque}`)
    console.error('  corrija em `outputFileTracingIncludes`, no next.config.ts.')
    houveFalha = true
  }
}

if (houveFalha) {
  console.error('\nO build passaria, mas a função quebraria em produção.')
  process.exit(1)
}

console.log('\nRastreamento completo: os arquivos de runtime chegam à função serverless.')
