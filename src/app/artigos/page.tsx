import Link from 'next/link';

export default function ArtigosPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Artigos
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Em breve: lista completa de artigos sobre Direito Digital.
        </p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Voltar ao in�cio
        </Link>
      </div>
    </div>
  );
}
