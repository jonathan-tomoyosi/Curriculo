# Premissas — Portfólio / Currículo Jonathan Tomoyosi

> Documento de decisões, definido em entrevista em 26/08/2026.
> Nada é implementado fora do que está aqui sem nova decisão registrada.

---

## 1. Objetivo

Substituir o site estático atual (HTML + CSS puro) por um portfólio em Next.js que
funcione como **prova de competência técnica**, não apenas como currículo online.

**Público-alvo:** recrutador técnico (que abre o repositório) e recrutador de RH
(que lê em 30 segundos no celular). O layout precisa servir aos dois.

---

## 2. Decisões tomadas

| # | Tema | Decisão |
|---|------|---------|
| D1 | Posicionamento | **Generalista** — dev + dados + infra + design com peso equilibrado |
| D2 | Open Br | **Citar apenas a empresa** — sem nome de cliente, município ou sistema |
| D3 | Histórico não-técnico | **Removido** — 100% tech |
| D4 | Estética | **Moderno técnico** (referência Vercel / Linear) |
| D5 | Estrutura | **Home única + página por projeto** (`/projetos/[slug]`) |
| D6 | Deploy | Mesmo repositório `Curriculo` + **projeto Vercel próprio (hobby)** |
| D7 | Contato | **Botões diretos** — sem formulário, sem backend |
| D8 | Idioma | **Detecção pelo navegador**, com troca manual persistida |
| D9 | Telefone | **(11) 94086-4666** (o do PDF; o antigo é descartado) |

### Funcionalidades aprovadas
- Multi-tema: claro/escuro + paletas de acento, com persistência
- i18n PT-BR / EN
- Download do CV em PDF gerado a partir dos mesmos dados do site
- Command palette (⌘K)
- Animações, SEO e responsividade (padrão, não opcionais)

### Provas de engenharia aprovadas
- README profissional + `docs/` com decisões de arquitetura
- Performance, acessibilidade e SEO no limite (Lighthouse ~100, sitemap, robots, OG dinâmica)
- Testes (Vitest + Playwright) e CI no GitHub Actions

---

## 3. Risco aceito (registrado)

D1 (generalista) e D2 (Open Br genérica) puxam em direções opostas: posicionamento
generalista exige **volume de prova**, e a Open Br é justamente onde está o trabalho
mais pesado — Big Data, AWS, Laravel, NFS-e, migração de legado, CRM. Sem detalhá-la,
ela vira um bloco curto e o peso da comprovação recai sobre Bom Pastor e Yma.

**Mitigação:** todo o conteúdo de experiência vive em arquivos de dados tipados e
isolados. Reabrir D2 depois custa editar um arquivo, não refazer o site.

---

## 4. Arquitetura de conteúdo — decisão central

Uma **fonte única de verdade** em `src/content/`, tipada em TypeScript, nos dois idiomas.
Ela alimenta simultaneamente:

```
src/content/*.ts  ──┬──▶  páginas do site
                    ├──▶  PDF do currículo (mesmos dados, nunca desatualizado)
                    ├──▶  metadata / SEO / JSON-LD
                    └──▶  índice do command palette
```

Consequência prática: atualizar o currículo = editar um arquivo. O PDF, o site, a busca
e o SEO acompanham sozinhos.

---

## 5. Stack técnica

| Camada | Escolha | Motivo |
|--------|---------|--------|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript | Mesmo padrão do Bom Pastor e do opencrm |
| Estilo | Tailwind CSS v4, componentes próprios | Tailwind já é padrão nos seus repos; o shadcn foi dispensado — só cinco componentes interativos, nenhum justificava a dependência |
| Temas | CSS custom properties + `data-mode` e `data-accent`, sem flash de tema errado | Duas dimensões independentes; suporta N paletas sem duplicar CSS |
| i18n | Rotas `/pt` e `/en` + middleware (Accept-Language + cookie) | Correto para SEO (`hreflang`), atende D8 |
| Animação | Motion (Framer Motion), respeitando `prefers-reduced-motion` | Sofisticado sem sacrificar acessibilidade |
| Command palette | `cmdk` | Padrão de fato, acessível |
| PDF | Route handler gerando PDF real a partir do `src/content` | Download de verdade, não `window.print()` |
| Testes | Vitest + Testing Library (unidade), Playwright (fumaça) | Atende D-engenharia |
| CI | GitHub Actions: lint, types, test, build | Badge verificável no README |

---

## 6. Sistema de temas

Base neutra (escuro e claro) com paletas de acento trocáveis:

| Paleta | Origem |
|--------|--------|
| Slate | Padrão neutro |
| Azul | Herda o currículo em PDF |
| Verde | Herda o site atual |
| Violeta / Âmbar | Alternativas |

Cada combinação (modo × paleta) é validada em contraste WCAG AA por teste automatizado que
lê os valores direto de `globals.css` — ver `src/app/contrast.test.ts`.

---

## 7. Conteúdo — o que entra, sai e muda

### Sai
Smart Sigma · Ambipar Bank · Rom@ Cell / Alô Cell · Buffet Lolly Pop · Colégio Maria
Imaculada · Tecnoponta · idade · "sei o básico de C" · "aprendendo JavaScript" ·
habilidades de Office / montagem de máquinas / redes Windows · TecBlog · Menu · Anna Bella.

### Entra / permanece
- Nome, cidade (São Caetano do Sul, SP), e-mail, telefone D9, GitHub, LinkedIn
- Resumo profissional reescrito a partir do PDF (nível dev, não nível estagiário)
- Objetivo profissional (do PDF)
- Formação: **Uninove** — Tecnólogo em ADS (2022–2024) · **FIAP** — MBA em Engenharia de Dados (em formação)
- Idiomas: inglês intermediário, espanhol intermediário
- Competências do PDF: design de sistemas, análise e processamento de dados, método ágil, AWS, UI/UX, trabalho em equipe

### Experiência
| Empresa | Tratamento |
|---------|-----------|
| Open Br (2025 – atual) | Descrição genérica por D2: Big Data, infraestrutura AWS, sistemas fiscais, auditoria de processamento, análise de dados, UX/UI, migração de legado |
| Igreja Bom Pastor SP | Detalhada + estudo de caso com link ao vivo |
| Yma Log (2026) | Detalhada — mobile, redesenho, transposição web → mobile |

### Projetos com página própria
1. **Bom Pastor SP** — carro-chefe. Next 15, React 19, Supabase, Tailwind 4, Recharts, Nodemailer; 18 módulos (financeiro, dízimo, escalas, calendário, kids, orações, notificações); mobile-first; no ar em `bom-pastor-scs.vercel.app`
2. **Yma** — mobile + e-commerce. Front/back separados, Prisma, Vitest, shadcn; processo com branch policy e code review

### Tecnologias
A lista de stack será **derivada dos repositórios**, não do texto antigo. Regra: só entra
o que o código comprova. O site atual lista tecnologias em nível de aprendizado
("aprendendo JavaScript") enquanto os repositórios mostram Laravel, Drizzle, Prisma,
Docker, Keycloak, ETL e Lambdas — nada disso estava escrito.

---

## 8. Pendências — resolvidas

| # | Pendência | Resposta |
|---|-----------|----------|
| P1 | URL do LinkedIn | `linkedin.com/in/jonathan-gamez-tomoyosi-6751101b2` |
| P2 | Yma tem link público? | Não — app em fase de teste. Card marcado como "Em testes", sem botão "ver ao vivo" |
| P3 | Qual foto usar | A nova (`foto-perfil.png`). A antiga saiu |
| P4 | Manter Udemy | Removida |
| P5 | Período do Bom Pastor SP | Não se aplica — exibido sem data |
| P6 | Citar "Igreja Bom Pastor SP" pelo nome | Liberado |

### Suposições a confirmar

Datas que o PDF traz apenas com o ano; assumi janeiro e marquei aqui em vez de deixar
passar em silêncio. Corrigir é editar um campo.

| Item | Assumido | Onde |
|------|----------|------|
| Início na Open Br | janeiro/2025 | `src/content/experience.ts` |
| Início na Yma Log | janeiro/2026 | `src/content/experience.ts` |
| ~~Início do MBA na FIAP~~ | **confirmado: agosto/2026** | `src/content/profile.ts` |
| Início na Uninove | janeiro/2022 (conclusão dez/2024) | `src/content/profile.ts` |

### Ajustes decididos durante a construção

| Decisão | Motivo |
|---------|--------|
| Yma virou **dois** estudos de caso (plataforma mobile e e-commerce) | O código mostra dois produtos distintos; um card só desperdiçava o material |
| Seção "Sobre" ganhou texto próprio, separado do resumo | Os dois estavam idênticos na página |
| PDF limitado a 2 destaques por projeto | Com 3, o currículo ia a 3 páginas; o estudo de caso completo já está no site |
| Token `--subtle` escurecido no claro e clareado no escuro | Estava em 3.3–3.9:1, abaixo do mínimo AA para texto |

## 9. Regras de trabalho

- Sem `git commit`, `git push` ou deploy sem aprovação explícita — mesmo padrão do seu `CLAUDE.md` do Yma
- O HTML antigo permanece no histórico do git; nada é perdido
- Cada etapa entregue e revisada antes da seguinte
