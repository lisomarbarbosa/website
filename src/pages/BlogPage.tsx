import { useCanonical } from '../hooks/useCanonical';

export function BlogPage() {
  // Canonical tag para pagina de listagem do blog
  useCanonical('https://www.lisomarbarbosa.adv.br/blog');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Artigos sobre direito digital, LGPD e proteçª£o de dados
        </p>

        {/* Lista de artigos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Article cards */}
        </div>
      </div>
    </div>
  );
}
