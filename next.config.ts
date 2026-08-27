import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // @react-pdf/renderer usa APIs de Node e não deve ser empacotado pelo bundler do servidor.
  serverExternalPackages: ['@react-pdf/renderer'],

  /**
   * Arquivos que o rastreador do Next não consegue enxergar.
   *
   * O pdfkit carrega cada fonte padrão como um módulo próprio, exigido pelo nome em
   * tempo de execução — `standard-fonts/Helvetica.cjs` e companhia. A análise estática
   * não consegue seguir um `require` montado por concatenação, então esses arquivos
   * ficavam de fora do pacote serverless. O PDF gerava em desenvolvimento, onde o
   * node_modules inteiro está à mão, e devolvia 500 na Vercel com
   * `Cannot find module '.../standard-fonts/Helvetica.cjs'`.
   *
   * Um erro que só existe em produção; daí o script `verify:trace`, que confere o
   * rastreamento logo após o build.
   */
  outputFileTracingIncludes: {
    '/api/cv/[locale]': [
      './node_modules/pdfkit/js/standard-fonts/**',
      './node_modules/pdfkit/js/data/**',
      './node_modules/fontkit/src/opentype/shapers/*.trie',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    dirs: ['src'],
  },
}

export default nextConfig
