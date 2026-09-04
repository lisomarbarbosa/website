import { blogPosts } from '../../../data/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Gera params estáticos para cada artigo em blog.ts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Gera metadata para SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  
  return {
    title: `${post.title} | Lisomar Barbosa | Direito Digital`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Lisomar Barbosa'],
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `https://lisomarbarbosa.adv.br/artigos/${post.slug}`,
    },
  };
}

// Página do artigo
export default async function ArtigoPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-foreground/60">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/artigos" className="hover:text-primary transition-colors">
                    Artigos
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="text-foreground">
                  {post.title}
                </li>
              </ol>
            </nav>
            
            <Link href="/artigos" className="text-primary hover:underline mb-6 inline-block">
              ← Voltar aos Artigos
            </Link>
            
            <article className="prose prose-lg max-w-none">
              <header className="mb-8">
                <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                  {post.category || 'Direito Digital'}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center gap-4 text-sm text-foreground/60 mb-6">
                  <time>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime || '5 min'} de leitura</span>
                </div>
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={1200}
                    height={630}
                    className="w-full h-[400px] object-cover rounded-lg mb-6"
                    unoptimized
                  />
                )}
              </header>
              
              <div className="text-foreground/80 mb-8 leading-relaxed">
                <p className="text-xl">{post.excerpt}</p>
              </div>
              
              <div className="text-foreground/80 leading-relaxed">
                <p>Conteudo completo do artigo disponivel em src/content/blog/</p>
              </div>
              
              <footer className="mt-12 pt-8 border-t">
                <p className="text-sm text-foreground/60">
                  Este artigo tem caráter informativo e não substitui consulta jurídica personalizada.
                </p>
              </footer>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
