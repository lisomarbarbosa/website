import { articles } from '@/data/articlesSEO';
import Link from 'next/link';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find(a => a.slug === params.slug);

  if (!article) {
    return <div>Artigo não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/artigos" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Voltar aos artigos
        </Link>
        <article>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {article.date} • {article.author}
          </p>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300">
              {article.excerpt}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
