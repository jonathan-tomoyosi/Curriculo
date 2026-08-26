import { defineConfig, devices } from '@playwright/test'

// A porta 3000 é reservada pelo Windows nesta máquina; 4311 fica livre para o build de teste.
const PORT = 4311
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  /**
   * Só sobe o servidor — o build acontece antes, no script `test:e2e`.
   * Rodar `next build` aqui dentro faz o build e o `next start` disputarem a pasta
   * `.next`, o que derruba o servidor de forma intermitente.
   */
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
