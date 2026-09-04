import Link from 'next/link'
import { articlesSEO } from '@/data/articlesSEO'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">
            Lisomar Barbosa Adv
          </h1>
          <p className="text-2xl text-gray-600">
            Direito Digital e LGPD
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Advocacia especializada em direito digital, protecao de dados, crimes ciberneticos e compliance. Atendimento online para todo o Brasil.
          </p>
          <div className="flex gap-4 justify-center pt-6">
            <Link
              href="/artigos"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Ver Artigos
            </Link>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Falar com Advogado
            </a>
          </div>
        </div>
      </section>

      {/* Areas de Atuacao */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Areas de Atuacao</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">LGPD e Protecao de Dados</h3>
              <p className="text-gray-600">Consultoria em compliance, implementacao de programas de privacidade e defesa em fiscalizacoes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Crimes Ciberneticos</h3>
              <p className="text-gray-600">Atuacao em invasoes, golpes, fraudes eletronicas e recuperacao de ativos digitais.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Direito do Consumidor Digital</h3>
              <p className="text-gray-600">Defesa em problemas com compras online, servicos digitais e plataformas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Artigos Recentes */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Artigos Recentes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {articlesSEO.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/artigos/${article.slug}`}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {article.title.replace(' - Lisomar Barbosa Adv', '')}
                </h3>
                <p className="text-gray-600 line-clamp-3">{article.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <p>&copy; 2026 Lisomar Barbosa Adv. Todos os direitos reservados.</p>
          <p className="text-gray-400 mt-2">Direito Digital | LGPD | Crimes Ciberneticos</p>
        </div>
      </footer>
    </div>
  )
}
