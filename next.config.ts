import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // @react-pdf/renderer usa APIs de Node e não deve ser empacotado pelo bundler do servidor.
  serverExternalPackages: ['@react-pdf/renderer'],

  /**
   * Arquivos que o rastreador do Next não consegue enxergar.
   *
   * O pdfkit lê as métricas das fontes padrão (Helvetica e Helvetica-Bold, usadas pelo
   * currículo) com `fs.readFileSync` sobre um caminho montado em tempo de execução. Como
   * a análise estática não segue isso, os `.afm` ficavam de fora do pacote serverless: o
   * PDF gerava local — onde o node_modules inteiro está à mão — e devolvia 500 na Vercel.
   *
   * Um erro que só existe em produção; daí o script `verify:trace`, que confere o
   * rastreamento logo após o build.
   */
  outputFileTracingIncludes: {
    '/api/cv/[locale]': [
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
