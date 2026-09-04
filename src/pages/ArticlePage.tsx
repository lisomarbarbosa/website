import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCanonical } from '../hooks/useCanonical';

interface Article {
  slug: string;
  title: string;
  content: string;
}

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  // Canonical tag dinamica para cada artigo
  const canonicalUrl = slug 
    ? `https://www.lisomarbarbosa.adv.br/artigos/${slug}`
    : 'https://www.lisomarbarbosa.adv.br/';
  
  useCanonical(canonicalUrl);

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
