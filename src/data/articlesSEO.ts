export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
}

export const articles: Article[] = [
  {
    slug: 'compliance-lgpd-guia-completo-empresas',
    title: 'Compliance LGPD: Guia Completo para Empresas',
    excerpt: 'Saiba como adequar sua empresa à Lei Geral de Proteção de Dados e evitar multas de até R$ 50 milhões.',
    date: '2024-01-15',
    author: 'Liso Mar Barbosa',
    category: 'LGPD',
  },
  {
    slug: 'contratos-digitais-validade-juridica',
    title: 'Contratos Digitais: Validade Jurídica e Assinaturas',
    excerpt: 'Entenda a validade jurídica dos contratos digitais e como garantir segurança nas transaçııes online.',
    date: '2024-01-10',
    author: 'Liso Mar Barbosa',
    category: 'Direito Digital',
  },
];
