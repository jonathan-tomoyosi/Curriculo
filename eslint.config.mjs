import next from 'eslint-config-next/core-web-vitals'

/**
 * O `eslint-config-next` a partir da v16 já é um flat config nativo — envolvê-lo em
 * `FlatCompat` produz referência circular. Aqui ele é espalhado diretamente.
 * O preset já inclui `next/typescript`.
 */
const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'legacy/**',
      'playwright-report/**',
      'test-results/**',
      'next-env.d.ts',
    ],
  },
  ...next,
]

export default eslintConfig
