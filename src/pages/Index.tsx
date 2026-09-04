import { useCanonical } from '../hooks/useCanonical';

export function Index() {
  // Canonical tag para homepage
  useCanonical('https://www.lisomarbarbosa.adv.br/');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Proteçª£o Jurídica na Era Digital
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Advocacia especializada em Direito Digital, LGPD e proteçª£o de dados
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Á«reas de Atuaçª£o</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Service cards */}
          </div>
        </div>
      </section>
    </div>
  );
}
