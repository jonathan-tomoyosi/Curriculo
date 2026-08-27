# Portfólio — Jonathan Gamez Tomoyosi

[![CI](https://github.com/jonathan-tomoyosi/Curriculo/actions/workflows/ci.yml/badge.svg)](https://github.com/jonathan-tomoyosi/Curriculo/actions/workflows/ci.yml)

Portfólio e currículo em Next.js 15, bilíngue, com tema configurável e currículo em PDF
gerado a partir dos mesmos dados que a página exibe.

---

## Como rodar

```bash
npm install
```

```bash
npm run dev
```

Abre em `http://localhost:3000`. A rota `/` redireciona para `/pt` ou `/en` conforme o
idioma do navegador.

## Scripts

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção, com verificação do rastreamento de arquivos |
| `npm run start` | Sobe o build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sem emitir |
| `npm test` | Testes de unidade (Vitest) |
| `npm run test:e2e` | Testes ponta a ponta (Playwright) |
| `npm run verify:trace` | Confere se os arquivos de runtime chegam à função serverless |

Antes do primeiro `test:e2e`:

```bash
npx playwright install chromium
```

---

## Stack

**Next.js 15** (App Router) · **React 19** · **TypeScript** estrito · **Tailwind CSS 4** ·
**cmdk** · **Motion** · **@react-pdf/renderer** · **Vitest** + **Testing Library** ·
**Playwright** · **GitHub Actions**

Sem biblioteca de i18n, sem biblioteca de tema e sem CMS — as razões estão em
[docs/ARQUITETURA.md](./docs/ARQUITETURA.md).

---

## Estrutura

```
src/
  content/      fonte única de verdade — todo o conteúdo, tipado, em PT e EN
  app/
    [locale]/   páginas (SSG nos dois idiomas)
    api/cv/     geração do currículo em PDF
  components/   interface
  lib/          i18n, tema, utilidades
  middleware.ts roteamento de idioma
e2e/            testes ponta a ponta
docs/           premissas e arquitetura
legacy/         o site anterior em HTML puro, preservado
```

---

## Editando o conteúdo

Todo o conteúdo do site **e do PDF** vem de `src/content/`. Não existe texto solto em
componente e não existe PDF versionado.

| Para mudar | Edite |
|------------|-------|
| Nome, contato, resumo, formação, idiomas | `src/content/profile.ts` |
| Experiência profissional | `src/content/experience.ts` |
| Projetos e estudos de caso | `src/content/projects.ts` |
| Stack técnico | `src/content/stack.ts` |
| Textos de interface | `src/content/ui.ts` |

Cada campo traduzível é um objeto `{ pt, en }`. Esquecer um idioma **quebra o build**:
`src/content/content.test.ts` percorre a árvore inteira procurando idioma vazio, listas
de tamanhos diferentes e tradução que ficou igual ao original.

A lista de stack tem uma regra: todo item exige um campo `evidence` dizendo onde a
tecnologia foi usada. Se não dá para escrever onde usou, não entra na lista.

---

## Funcionalidades

- **Tema em duas dimensões** — claro / escuro / sistema, combinado com cinco paletas de
  destaque trocáveis de forma independente. Sem flash de tema errado no carregamento.
- **Bilíngue** — `/pt` e `/en` com `hreflang` correto, detecção por `Accept-Language` e
  preferência manual persistida em cookie.
- **Command palette (⌘K)** — busca sobre seções, projetos, tecnologias e ações.
- **Currículo em PDF** — gerado sob demanda em `/api/cv/pt` e `/api/cv/en`.
- **SEO** — metadata por rota, sitemap, robots, JSON-LD de `Person` e Open Graph gerado
  dinamicamente por `next/og`.
- **Acessibilidade** — navegação por teclado, link de pular conteúdo, foco visível,
  respeito a `prefers-reduced-motion` e contraste AA nas dez combinações de tema.

---

## Deploy

Projeto Next.js padrão na Vercel — importar o repositório e publicar. **Não há variável
de ambiente para configurar.**

A URL canônica usada em `metadataBase`, `hreflang`, sitemap e robots é resolvida sozinha
por [`src/lib/site-url.ts`](./src/lib/site-url.ts), nesta ordem:

1. `NEXT_PUBLIC_SITE_URL` — defina apenas se houver domínio próprio
2. `VERCEL_PROJECT_PRODUCTION_URL` — o domínio de produção que a Vercel injeta sozinha
3. `http://localhost:3000` em desenvolvimento

Deploys de preview também apontam a canônica para a produção, e não para si mesmos —
que é o comportamento correto para buscador.

---

## Documentação

- [docs/PREMISSAS.md](./docs/PREMISSAS.md) — decisões de produto e escopo
- [docs/ARQUITETURA.md](./docs/ARQUITETURA.md) — decisões técnicas e o porquê de cada uma
