# Arquitetura

Decisões técnicas deste projeto e o porquê de cada uma. As premissas de produto estão
em [PREMISSAS.md](./PREMISSAS.md).

---

## 1. A decisão central: uma fonte única de verdade

O site precisa entregar a mesma informação em quatro formatos: página HTML, PDF do
currículo, metadata de SEO e índice do command palette. Em dois idiomas. São oito
combinações do mesmo dado.

A alternativa ingênua — escrever o texto em cada lugar — falha de um jeito específico e
silencioso: você troca de cargo, atualiza a home, e o PDF continua entregando o cargo
antigo para o recrutador. Ninguém percebe até ser tarde.

Por isso todo conteúdo vive em `src/content/`, tipado, e todos os consumidores leem de lá:

```
src/content/
  types.ts        tipos + o utilitário L10n<T>
  profile.ts      identidade, resumo, formação, idiomas, competências
  experience.ts   experiência profissional
  projects.ts     projetos e estudos de caso
  stack.ts        stack técnico com evidência de uso
  ui.ts           textos de interface
        │
        ├──▶ src/app/**            páginas
        ├──▶ src/lib/cv-document   PDF do currículo
        ├──▶ generateMetadata      SEO, hreflang, JSON-LD, OG image
        └──▶ command-palette       índice de busca
```

**Consequência prática:** atualizar o currículo é editar um arquivo. O PDF, a busca, o
SEO e os dois idiomas acompanham sozinhos.

**Consequência de teste:** como o TypeScript garante a *forma* mas não o *conteúdo*,
`src/content/content.test.ts` percorre a árvore inteira procurando qualquer nó traduzível
com idioma vazio, listas de tamanhos diferentes entre PT e EN, ou texto em inglês
idêntico ao português. Um texto esquecido vira falha de build, não uma página publicada
com um buraco.

### A regra do `evidence`

Cada item de `stack.ts` carrega um campo `evidence` dizendo onde aquilo foi usado. Não é
enfeite: é o que impede a lista de virar aspiracional. Se não dá para escrever onde
usou, não entra.

---

## 2. Idioma na URL, não negociado por cabeçalho

Rotas: `/pt/...` e `/en/...`. Um acesso sem prefixo passa pelo middleware, que escolhe
nesta ordem: cookie de preferência → `Accept-Language` → português.

Servir idiomas diferentes na mesma URL conforme o cabeçalho parece mais elegante, mas
quebra três coisas: o buscador indexa só a versão que recebeu, `hreflang` deixa de ter
sentido, e o link compartilhado abre em um idioma para quem envia e em outro para quem
recebe. O prefixo na URL resolve os três.

O cookie só é gravado quando a pessoa troca de idioma manualmente — a partir daí a
escolha explícita vence a detecção automática.

---

## 3. Tema: duas dimensões, escritas em `<html>`, lidas só por CSS

`data-mode` (claro/escuro/sistema) e `data-accent` (cinco paletas) são independentes:
trocar a cor de destaque não mexe no modo.

Três decisões sustentam isso:

**Script antes da primeira pintura.** `THEME_INIT_SCRIPT` roda de forma síncrona no
`<head>` e escreve os atributos antes de qualquer pixel aparecer. Sem ele, a página
pinta no tema padrão e corrige depois — o flash branco que denuncia tema implementado só
no cliente.

**Nenhum componente conhece cor literal.** Tudo consome tokens semânticos
(`bg-surface`, `text-muted`, `border-accent-line`). Adicionar uma paleta nova é
acrescentar um bloco CSS; nenhum componente muda.

**O tema é um store externo, não estado React.** Ele já existe fora do React — o script
o escreveu, e o sistema operacional pode mudá-lo a qualquer momento. `theme-store.ts`
modela isso e o provider lê com `useSyncExternalStore`. A alternativa comum
(`useState` + `useEffect` sincronizando) causa render em cascata e é justamente o que as
regras do React Compiler apontam como erro.

---

## 4. PDF gerado, nunca versionado

Não existe currículo em PDF no repositório. `/api/cv/[locale]` renderiza sob demanda com
`@react-pdf/renderer`, lendo `src/content`.

Um PDF versionado é uma cópia do conteúdo que envelhece sozinha. Um PDF derivado não tem
como divergir.

Layout de coluna única, sem tabela e sem caixa de texto — o suficiente para continuar
legível por leitor automático de currículo (ATS).

---

## 5. Animação como progressive enhancement

As seções aparecem ao entrar na viewport, mas o CSS só esconde o elemento **depois** que
o componente `Reveal` marca `data-js="true"` no documento.

A ordem importa: se o estado inicial fosse `opacity: 0` direto no CSS, qualquer falha de
JavaScript deixaria a página inteira invisível. Aqui, sem JavaScript o conteúdo
simplesmente aparece. `prefers-reduced-motion` desliga o efeito por completo.

---

## 6. Estratégia de renderização

| Rota | Modo | Motivo |
|------|------|--------|
| `/[locale]` | SSG | Conteúdo estático; nada muda entre visitas |
| `/[locale]/projetos/[slug]` | SSG | Idem, via `generateStaticParams` |
| `/[locale]/opengraph-image` | Dinâmica | Gerada por `next/og` |
| `/api/cv/[locale]` | Node runtime | `@react-pdf/renderer` precisa de APIs de Node |
| `sitemap.xml`, `robots.txt` | Estáticos | Gerados no build a partir do conteúdo |

O middleware roda no edge e só faz redirecionamento de idioma.

A URL canônica não é configurada à mão: `src/lib/site-url.ts` prefere um domínio próprio
se houver, senão usa o domínio de produção que a Vercel injeta no ambiente. Uma canônica
errada não quebra a página — só faz o buscador indexar um endereço que não existe, e é
justamente por ser silencioso que a resolução é automática e testada.

---

## 7. Testes

**Unidade (Vitest)** — a lógica que erra silenciosamente: negociação de `Accept-Language`
com pesos `q`, manipulação de prefixo de idioma, leitura de preferência de tema com
storage corrompido, e a integridade do conteúdo descrita na seção 1.

**Ponta a ponta (Playwright, Chromium + Pixel 7)** — o que só falha no navegador:
redirecionamento por idioma, cookie vencendo a detecção, persistência de tema sem flash,
atalho do command palette, 404 real de projeto inexistente, e o PDF verificado pela
assinatura `%PDF-` em ambos os idiomas.

Rodar em perfil mobile não é redundância: foi ele que pegou os botões de modo de tema
sem nome acessível, porque o rótulo visível some abaixo do breakpoint `sm`.

---

## 8. O que foi deliberadamente evitado

| Evitado | Motivo |
|---------|--------|
| Biblioteca de i18n | Dois idiomas e conteúdo estático não justificam a dependência |
| `next-themes` | Não cobre a segunda dimensão (paleta); o store próprio cobre as duas e é testável |
| CMS | O conteúdo muda poucas vezes por ano e quem edita é quem tem o repositório |
| Formulário de contato | Exigiria backend, chave de API e antispam para substituir um clique no LinkedIn |
| Ícones de marca por dependência | O lucide removeu na v1; dois SVGs próprios custam menos que um pacote |
