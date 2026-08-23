import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog";
import ReactMarkdown from "react-markdown";

// Importa estaticamente todos os módulos de conteúdo (resolvido pelo Vite no build)
const contentModules = import.meta.glob<{ content: string }>(
  "../content/blog/*.ts",
  { eager: true }
);

function getContent(slug: string): string | null {
  const key = `../content/blog/${slug}.ts`;
  const mod = contentModules[key];
  return mod?.content ?? null;
}

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  const content = getContent(slug!) ?? post.excerpt;

  return (
    <>
      <Helmet>
        <title>{post.title} | Lisomar Barbosa | Direito Digital</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://www.lisomarbarbosa.adv.br/artigos/${post.slug}`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:site_name" content="Lisomar Barbosa | Direito Digital" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.lisomarbarbosa.adv.br/artigos/${post.slug}`} />
        <meta property="og:image" content={post.image} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Link to="/blog">
                <Button variant="ghost" className="mb-8 -ml-2 text-foreground/70 hover:text-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar ao blog
                </Button>
              </Link>

              {/* Hero da imagem */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  width={900}
                  height={320}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary/90 text-xs font-medium backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Metadados */}
              <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime} de leitura</span>
              </div>

              {/* Conteúdo */}
              <article className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:text-foreground
                prose-p:text-foreground/80
                prose-strong:text-foreground
                prose-a:text-primary
                prose-blockquote:border-primary
                prose-blockquote:text-foreground/70
                prose-li:text-foreground/80
                prose-code:text-primary
                prose-code:bg-muted
                prose-code:px-1
                prose-code:rounded">
                <ReactMarkdown>{content}</ReactMarkdown>
              </article>

              {/* Rodapé do artigo */}
              <div className="mt-16 pt-8 border-t border-border/50">
                <p className="text-sm text-foreground/50 italic mb-6">
                  Este artigo tem caráter informativo e não substitui consulta jurídica personalizada.
                </p>
                <Link to="/blog">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft size={16} />
                    Ver todos os artigos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ArticlePage;
