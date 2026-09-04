import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { useOpenGraph } from '../hooks/useOpenGraph';
import { getArticleSEO } from '../data/articlesSEO';
import { getArticleOG } from '../data/articlesOG';

interface Article {
  slug: string;
  title: string;
  content: string;
}

const BASE_URL = 'https://www.lisomarbarbosa.adv.br';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  // Buscar dados SEO e OG especificos do artigo
  const seoData = slug ? getArticleSEO(slug) : undefined;
  const ogData = slug ? getArticleOG(slug) : undefined;
  const canonicalUrl = slug ? `${BASE_URL}/artigos/${slug}` : BASE_URL;
  const imageUrl = ogData?.image || '/og.webp';

  // Aplicar SEO basico (title, meta description, canonical)
  useSEO({
    title: seoData?.title || 'Direito Digital | Lisomar Barbosa Adv',
    description: seoData?.description || 'Advocacia especializada em direito digital, LGPD, crimes ciberneticos e protecao de dados.',
    canonical: canonicalUrl,
  });

  // Aplicar Open Graph tags (Facebook, LinkedIn, WhatsApp)
  useOpenGraph({
    title: ogData?.title || seoData?.title || 'Direito Digital | Lisomar Barbosa Adv',
    description: ogData?.description || seoData?.description || 'Advocacia especializada em direito digital.',
    image: imageUrl,
    url: canonicalUrl,
    type: 'article',
  });

  useEffect(() => {
    // Carregar artigo baseado no slug
    async function loadArticle() {
      try {
        // const data = await fetchArticleBySlug(slug);
        // setArticle(data);
      } catch (error) {
        console.error('Erro ao carregar artigo:', error);
      }
    }
    
    if (slug) {
      loadArticle();
    }
  }, [slug]);

  if (!article) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article>
          <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </div>
  );
}
