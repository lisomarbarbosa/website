import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { articlesSEO } from '../data/articlesSEO';

export function BlogPage() {
  // Aplicar SEO da pagina de artigos
  useSEO({
    title: 'Artigos | Lisomar Barbosa Adv',
    description: 'Artigos sobre direito digital, LGPD, crimes ciberneticos, protecao de dados e compliance. Conteudo juridico especializado.',
    canonical: 'https://www.lisomarbarbosa.adv.br/artigos',
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Artigos</h1>
          <p className="text-lg text-gray-600">Conteudo especializado sobre direito digital</p>
        </div>
      </section>

      {/* Lista de Artigos */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesSEO.map((article) => (
              <Link
                key={article.slug}
                to={`/artigos/${article.slug}`}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {article.title.replace(' - Lisomar Barbosa Adv', '')}
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {article.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <p>&copy; 2026 Lisomar Barbosa Adv. Todos os direitos reservados.</p>
          <p className="text-gray-400 mt-2">Direito Digital | LGPD | Crimes Ciberneticos</p>
        </div>
      </footer>
    </div>
  );
}

export default BlogPage;
