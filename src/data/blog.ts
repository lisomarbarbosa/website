export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'stalking-virtual-consequencias-juridicas-lei-14132-2021',
    title: 'Stalking Virtual e suas Consequências Jurídicas: Análise Completa à Luz da Lei 14.132/2021, Marco Civil, LGPD e Jurisprudência',
    excerpt: 'Artigo técnico sobre o crime de perseguição (stalking) no ambiente digital. Aborda a tipificação no Art. 147-A do CP, responsabilidade civil por danos morais, tutelas inibitórias, deveres das plataformas (Marco Civil e LGPD), violência doméstica (Lei Maria da Penha), prova digital e desafios da IA.',
    date: '2026-08-22',
    readTime: '13 min',
    category: 'Direito Digital',
    image: 'https://images.unsplash.com/photo-1588873281272-14886ba1f737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDM2MTcyfA&ixlib=rb-4.1.0&q=80&w=1080',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'invasao-dispositivo-informatico-consequencias-juridicas',
    title: 'Invasão de Dispositivo Informático: Análise Completa das Consequências Jurídicas no Ordenamento Brasileiro',
    excerpt: 'Estudo aprofundado sobre o crime de invasão de dispositivo informático (Art. 154-A do CP), responsabilidade civil por danos morais e materiais, deveres de segurança sob a LGPD e Marco Civil da Internet, responsabilidade objetiva do fornecedor no CDC e preservação de provas digitais.',
    date: '2026-08-22',
    readTime: '11 min',
    category: 'Direito Digital',
    image: 'https://images.unsplash.com/photo-1756671994948-183e2d833da0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDQxODI4fA&ixlib=rb-4.1.0&q=80&w=1080',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'regulamentacao-criptomoedas',
    title: 'Regulamentação de Criptomoedas no Brasil: Marco Legal e Perspectivas',
    excerpt: 'Análise completa do marco legal das criptomoedas no Brasil, incluindo a Lei 14.478/2022, regulamentação do Banco Central, tributação pela Receita Federal e os desafios jurídicos do mercado cripto.',
    date: '2025-03-10',
    readTime: '14 min',
    category: 'Direito Digital',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'compliance-lgpd',
    title: 'Compliance com a LGPD: Guia Completo para Empresas',
    excerpt: 'Guia prático e completo para implementar um programa de compliance com a Lei Geral de Proteção de Dados. Desde o mapeamento de dados até a resposta a incidentes de segurança.',
    date: '2025-02-20',
    readTime: '16 min',
    category: 'LGPD',
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'fake-news-difamacao',
    title: 'Fake News e Difamação Digital: Seus Direitos e Como se Defender',
    excerpt: 'Como agir juridicamente contra fake news e difamação nas redes sociais. Direitos das vítimas, responsabilidade das plataformas e estratégias legais para proteção da honra e imagem.',
    date: '2025-01-25',
    readTime: '13 min',
    category: 'Direito Digital',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'protecao-dados-pessoais',
    title: 'Proteção de Dados Pessoais: Seus Direitos como Titular',
    excerpt: 'Conheça todos os seus direitos como titular de dados pessoais garantidos pela LGPD: acesso, correção, exclusão, portabilidade e como exercê-los de forma eficaz.',
    date: '2025-01-10',
    readTime: '11 min',
    category: 'LGPD',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'custodia-criptoativos',
    title: 'Custódia de Criptoativos: Aspectos Jurídicos e Melhores Práticas',
    excerpt: 'Análise dos aspectos jurídicos da custódia de criptoativos no Brasil, incluindo responsabilidade das exchanges, proteção do investidor e boas práticas de segurança.',
    date: '2024-12-15',
    readTime: '12 min',
    category: 'Cripto',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'crimes-ciberneticos',
    title: 'Crimes Cibernéticos: Como se Proteger e Buscar Justiça',
    excerpt: 'Guia completo sobre crimes cibernéticos no Brasil: tipos, legislação aplicável, como registrar ocorrência, preservar provas e buscar reparação judicial.',
    date: '2024-11-20',
    readTime: '14 min',
    category: 'Direito Digital',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'instagram-hackeado',
    title: 'Instagram Hackeado: O Que Fazer e Seus Direitos',
    excerpt: 'Passo a passo completo para recuperar conta do Instagram hackeada, medidas legais cabíveis, responsabilidade da plataforma e como proteger seus dados nas redes sociais.',
    date: '2024-11-05',
    readTime: '10 min',
    category: 'Direito Digital',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'golpes-criptomoedas',
    title: 'Golpes com Criptomoedas: Como Identificar e Recuperar Valores',
    excerpt: 'Os golpes mais comuns no mercado de criptomoedas, como identificá-los antes de cair, e as medidas jurídicas disponíveis para tentar recuperar valores perdidos.',
    date: '2024-10-15',
    readTime: '13 min',
    category: 'Cripto',
    image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'lgpd-erros-comuns',
    title: 'LGPD: Erros Comuns na Implementação e Como Evitá-los',
    excerpt: 'Evite multas e sanções da LGPD. Conheça os erros mais comuns na implementação da Lei Geral de Proteção de Dados e como garantir a conformidade da sua empresa.',
    date: '2024-09-10',
    readTime: '12 min',
    category: 'LGPD',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
];
