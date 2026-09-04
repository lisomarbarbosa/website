import { articlesSEO, getArticleSEO } from '@/data/articlesSEO'
import { articlesOG, getArticleOG } from '@/data/articlesOG'
import { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

// Gerar meta tags dinamicamente (SSR)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticleSEO(params.slug)
  const og = getArticleOG(params.slug)

  return {
    title: article?.title || 'Artigo | Lisomar Barbosa Adv',
    description: article?.description,
    openGraph: {
      title: og?.title || article?.title || 'Lisomar Barbosa Adv',
      description: og?.description || article?.description,
      images: [og?.image || '/og.webp'],
      type: 'article',
    },
  }
}

// Gerar JSON-LD (structured data)
function generateStructuredData(article: any, og: any, slug: string) {
  const baseUrl = 'https://www.lisomarbarbosa.adv.br'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: og?.image?.startsWith('http') ? og.image : `${baseUrl}${og.image}`,
    url: `${baseUrl}/artigos/${slug}`,
    author: { '@type': 'Person', name: 'Lisomar Barbosa' },
    publisher: { '@type': 'Organization', name: 'Lisomar Barbosa Adv' },
    datePublished: article.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/artigos/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const article = getArticleSEO(params.slug)
  const og = getArticleOG(params.slug)

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
          <a href="/artigos" className="text-blue-600 hover:underline">Voltar para artigos</a>
        </div>
      </div>
    )
  }

  const structuredData = generateStructuredData(article, og, params.slug)

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD inline (melhor que hook para SSR) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Header */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <a href="/artigos" className="text-blue-600 hover:underline">← Voltar para artigos</a>
        </div>
      </section>

      {/* Artigo */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article>
          <h1 className="text-4xl font-bold mb-6 text-gray-900">{article.title}</h1>
          
          {/* Meta info */}
          <div className="text-sm text-gray-500 mb-8">
            <span>Publicado em: {new Date(article.datePublished).toLocaleDateString('pt-BR')}</span>
          </div>

          {/* Conteudo */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {article.description}
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Conteudo completo do artigo seria carregado aqui a partir de um CMS, markdown, ou banco de dados.
            </p>
          </div>
        </article>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p>&copy; 2026 Lisomar Barbosa Adv. Todos os direitos reservados.</p>
          <p className="text-gray-400 mt-2">Direito Digital | LGPD | Crimes Ciberneticos</p>
        </div>
      </footer>
    </div>
  )
}

// Gerar rotas estáticas em build time
export async function generateStaticParams() {
  return articlesSEO.map((article) => ({
    slug: article.slug,
  }))
}
