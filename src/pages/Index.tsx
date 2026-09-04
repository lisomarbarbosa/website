import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export function Index() {
  // Aplicar SEO da home
  useSEO({
    title: 'Lisomar Barbosa Adv | Direito Digital e LGPD',
    description: 'Advocacia especializada em direito digital, LGPD, crimes ciberneticos, protecao de dados e compliance. Atendimento online para todo o Brasil.',
    canonical: 'https://www.lisomarbarbosa.adv.br/',
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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
              to="/artigos"
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
            <Link to="/artigos/compliance-lgpd" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">Compliance LGPD</h3>
              <p className="text-gray-600">Guia completo para implementar compliance em sua empresa.</p>
            </Link>
            <Link to="/artigos/instagram-hackeado" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">Instagram Hackeado</h3>
              <p className="text-gray-600">Como recuperar sua conta e proteger seus dados.</p>
            </Link>
            <Link to="/artigos/golpes-criptomoedas" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">Golpes com Criptomoedas</h3>
              <p className="text-gray-600">Como identificar fraudes e se proteger.</p>
            </Link>
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
  );
}

export default Index;
