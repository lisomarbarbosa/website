'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Liso Mar Barbosa
          </Link>
          <div className="flex space-x-6">
            <Link
              href="/"
              className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/' ? 'font-semibold text-blue-600 dark:text-blue-400' : ''
              }`}
            >
              In�cio
            </Link>
            <Link
              href="/artigos"
              className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/artigos' || pathname.startsWith('/artigos/') ? 'font-semibold text-blue-600 dark:text-blue-400' : ''
              }`}
            >
              Artigos
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
