import { expect, test, type Page } from '@playwright/test'

const NAME = 'Jonathan Gamez Tomoyosi'

test.describe('roteamento de idioma', () => {
  test('leva navegador em português para /pt', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'pt-BR' })
    const page = await context.newPage()
    await page.goto('/')
    await expect(page).toHaveURL(/\/pt$/)
    await context.close()
  })

  test('leva navegador em inglês para /en', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'en-US' })
    const page = await context.newPage()
    await page.goto('/')
    await expect(page).toHaveURL(/\/en$/)
    await context.close()
  })

  test('a escolha manual de idioma vence a detecção nas visitas seguintes', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'pt-BR' })
    const page = await context.newPage()
    await page.goto('/pt')

    await page.getByRole('link', { name: 'en', exact: true }).click()
    await expect(page).toHaveURL(/\/en$/)

    // Nova visita à raiz: o cookie deve mandar mais que o Accept-Language.
    await page.goto('/')
    await expect(page).toHaveURL(/\/en$/)
    await context.close()
  })
})

test.describe('home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pt')
  })

  test('mostra identidade e cargo', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jonathan')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.getByText('Desenvolvedor Fullstack').first()).toBeVisible()
  })

  test('declara o idioma no documento', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  })

  test('renderiza todas as seções principais', async ({ page }) => {
    for (const id of ['sobre', 'stack', 'experiencia', 'projetos', 'formacao', 'contato']) {
      await expect(page.locator(`section#${id}`)).toHaveCount(1)
    }
  })

  test('publica dados estruturados de pessoa', async ({ page }) => {
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent()
    const data = JSON.parse(raw ?? '{}')
    expect(data['@type']).toBe('Person')
    expect(data.name).toBe(NAME)
  })

  test('omite cliente e sistema no trabalho confidencial', async ({ page }) => {
    const experiencia = page.locator('section#experiencia')
    await expect(experiencia).toContainText('Open Br')
    await expect(experiencia).toContainText('confidencialidade')
  })
})

test.describe('tema', () => {
  test('troca de modo e sobrevive ao recarregamento', async ({ page }) => {
    await page.goto('/pt')

    await page.getByRole('button', { name: 'Tema' }).click()
    await page.getByRole('radio', { name: 'Claro' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'light')

    await page.reload()
    // Sem flash: o atributo já vem certo na primeira pintura.
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'light')
  })

  /**
   * Regressão: trocar de idioma apagava `data-mode` e `data-accent` de <html>, porque o
   * layout raiz vive dentro do segmento [locale] e o React reconcilia o próprio <html>
   * nessa navegação. O efeito colateral visível era o sobrenome sumir do título — sem
   * `--accent`, o gradiente fica inválido e `.text-gradient` pinta transparente.
   */
  test('sobrevive à troca de idioma, junto com o nome no título', async ({ page }) => {
    await page.goto('/pt')

    await page.getByRole('button', { name: 'Tema' }).click()
    await page.getByRole('radio', { name: 'Escuro' }).click()
    await page.getByRole('radio', { name: 'Violeta' }).click()
    await page.keyboard.press('Escape')

    await page.getByRole('link', { name: 'en', exact: true }).click()
    await expect(page).toHaveURL(/\/en$/)

    await expect(page.locator('html')).toHaveAttribute('data-mode', 'dark')
    await expect(page.locator('html')).toHaveAttribute('data-accent', 'violet')

    // A causa raiz: o token precisa continuar resolvendo para uma cor.
    const accent = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),
    )
    expect(accent).not.toBe('')

    // E o sintoma: o nome completo continua no título.
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Tomoyosi')
  })

  test('troca a cor de destaque de forma independente do modo', async ({ page }) => {
    await page.goto('/pt')

    await page.getByRole('button', { name: 'Tema' }).click()
    await page.getByRole('radio', { name: 'Violeta' }).click()

    await expect(page.locator('html')).toHaveAttribute('data-accent', 'violet')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-accent', 'violet')
  })
})

test.describe('command palette', () => {
  /**
   * Disparar tecla logo após o `goto` corre com a hidratação: se o atalho chega antes
   * de o React registrar o listener, a tecla se perde e o teste falha de forma
   * intermitente. O componente Reveal escreve `data-js` em <html> assim que monta, o
   * que serve de sinal confiável de que o JavaScript do cliente já está no ar.
   */
  async function aguardarHidratacao(page: Page) {
    await expect(page.locator('html')).toHaveAttribute('data-js', /^(true|false)$/)
  }

  async function abrirPorAtalho(page: Page) {
    await aguardarHidratacao(page)
    await page.keyboard.press('ControlOrMeta+k')
    const input = page.getByPlaceholder(/Buscar seções/)
    await expect(input).toBeVisible()
    return input
  }

  async function abrirPaleta(page: Page) {
    await page.getByRole('button', { name: 'Buscar' }).click()
    const input = page.getByPlaceholder(/Buscar seções/)
    await expect(input).toBeVisible()
    return input
  }

  test('abre por atalho de teclado e navega para um projeto', async ({ page }) => {
    await page.goto('/pt')

    const input = await abrirPorAtalho(page)
    await input.fill('Bom Pastor')
    await page.keyboard.press('Enter')

    await expect(page).toHaveURL(/\/pt\/projetos\/bom-pastor-sp$/)
  })

  test('oferece a troca para o modo escuro', async ({ page }) => {
    await page.goto('/pt')

    const input = await abrirPaleta(page)
    await input.fill('escuro')

    // A busca precisa trazer a ação para o topo: se ela cair fora da lista, o usuário
    // conclui que a opção não existe. Por isso o Enter direto, sem clicar.
    await page.keyboard.press('Enter')

    await expect(page.locator('html')).toHaveAttribute('data-mode', 'dark')
  })

  test('oferece a troca de cor de destaque', async ({ page }) => {
    await page.goto('/pt')

    const input = await abrirPaleta(page)
    await input.fill('âmbar')
    await page.keyboard.press('Enter')

    await expect(page.locator('html')).toHaveAttribute('data-accent', 'amber')
  })

  test('fecha com Escape', async ({ page }) => {
    await page.goto('/pt')

    await abrirPorAtalho(page)
    await page.keyboard.press('Escape')

    await expect(page.getByPlaceholder(/Buscar seções/)).toHaveCount(0)
  })
})

test.describe('página de projeto', () => {
  test('apresenta o estudo de caso completo', async ({ page }) => {
    await page.goto('/pt/projetos/bom-pastor-sp')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Igreja Bom Pastor SP')
    for (const block of ['Contexto', 'Desafio', 'Solução', 'Resultado']) {
      await expect(page.getByRole('heading', { name: block, exact: true })).toBeVisible()
    }
    await expect(page.getByRole('link', { name: /Ver ao vivo/ }).first()).toBeVisible()
  })

  test('responde 404 para projeto inexistente', async ({ page }) => {
    const response = await page.goto('/pt/projetos/projeto-que-nao-existe')
    expect(response?.status()).toBe(404)
  })
})

test.describe('currículo em PDF', () => {
  for (const locale of ['pt', 'en'] as const) {
    test(`gera um PDF válido em ${locale}`, async ({ request }) => {
      const response = await request.get(`/api/cv/${locale}`)

      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toContain('application/pdf')
      expect(response.headers()['content-disposition']).toContain('attachment')

      const body = await response.body()
      // Assinatura de abertura e marcador de fim de arquivo: juntos provam que o PDF
      // é um documento completo, não um stream truncado. Um limiar de bytes seria um
      // proxy frágil — muda a cada ajuste de layout sem que nada esteja quebrado.
      expect(body.subarray(0, 5).toString()).toBe('%PDF-')
      expect(body.subarray(-1024).toString('latin1')).toContain('%%EOF')
      expect(body.byteLength).toBeGreaterThan(4_000)
    })
  }

  test('recusa idioma não suportado', async ({ request }) => {
    const response = await request.get('/api/cv/de')
    expect(response.status()).toBe(404)
  })
})

test.describe('acessibilidade e SEO', () => {
  test('oferece link de pular para o conteúdo', async ({ page }) => {
    await page.goto('/pt')
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
  })

  test('declara alternativas de idioma', async ({ page }) => {
    await page.goto('/pt')
    await expect(page.locator('link[hreflang="en"]')).toHaveCount(1)
    await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1)
  })

  test('publica sitemap e robots', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    expect(await sitemap.text()).toContain('/pt/projetos/bom-pastor-sp')

    const robots = await request.get('/robots.txt')
    expect(robots.status()).toBe(200)
    expect(await robots.text()).toContain('Sitemap:')
  })

  test('dá texto alternativo a toda imagem', async ({ page }) => {
    await page.goto('/pt')
    const images = page.locator('img')
    const count = await images.count()
    expect(count).toBeGreaterThan(0)
    for (let index = 0; index < count; index += 1) {
      await expect(images.nth(index)).toHaveAttribute('alt', /.+/)
    }
  })
})
