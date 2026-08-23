# Como publicar um novo artigo

## Checklist (2 arquivos, sem risco de quebrar o deploy)

### 1. Adicione os metadados em `src/data/blog.ts`

Copie o bloco abaixo e cole no início do array `blogPosts` (mais recente primeiro):

```ts
{
  slug: 'meu-novo-artigo',        // ← ATENÇÃO: deve ser idêntico ao nome do arquivo .tsx (sem extensão)
  title: 'Título do artigo',
  excerpt: 'Resumo para SEO e card (máx. 160 caracteres).',
  date: '2026-08-23',             // AAAA-MM-DD
  readTime: '8 min',
  category: 'Direito Digital',
  image: 'https://...',           // URL da imagem do Unsplash
  content: '',                    // Deixe vazio — o conteúdo fica no .tsx
},
```

### 2. Crie o componente em `src/pages/articles/MeuNovoArtigo.tsx`

Copie um artigo existente como base (ex: `LGPDErrosComuns.tsx`) e substitua:
- Título no `<Helmet>` e no `<h1>`
- Descrição no `<meta name="description">`
- URL canônica
- Imagem (og:image e src da `<img>`)
- Conteúdo dentro de `<div className="prose prose-lg max-w-none">`

### 3. Registre em `src/pages/ArticlePage.tsx`

Adicione **uma linha** no objeto `articleComponents`:

```ts
"meu-novo-artigo": lazy(() => import("./articles/MeuNovoArtigo")),
```

### Regras anti-bug

- O slug em `blog.ts` deve ser idêntico à chave em `articleComponents`
- Não há mais necessidade de mexer no `App.tsx` nem no `BlogPage.tsx`
- Rode `npm run build` local antes de fazer push
- Nunca use backtick ` dentro de template literals sem escapar com `\`

### Estrutura de pastas após a refatoração

```
src/
  App.tsx                    ← 1 rota dinâmica /artigos/:slug (não editar)
  data/
    blog.ts                  ← só metadados
  pages/
    ArticlePage.tsx          ← gerencia qual .tsx carregar por slug
    BlogPage.tsx             ← listagem (não editar)
    articles/
      LGPDErrosComuns.tsx
      GolpesCriptomoedas.tsx
      ...                    ← 18 artigos existentes
      MeuNovoArtigo.tsx      ← novo artigo
```
