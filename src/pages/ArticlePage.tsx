import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  ArrowLeft,
  AlertTriangle,
  Scale,
  Shield,
  FileText,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Importa estaticamente todos os módulos de conteúdo
const contentModules = import.meta.glob<{ content: string }>(
  "../content/blog/*.ts",
  { eager: true }
);

function getContent(slug: string): string | null {
  const key = `../content/blog/${slug}.ts`;
  const mod = contentModules[key];
  return mod?.content ?? null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    const props = (children as { props?: { children?: React.ReactNode } }).props;
    return extractText(props?.children ?? "");
  }
  return "";
}

const articleComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
      {children}
    </h1>
  ),

  h2: ({ children }) => {
    const text = extractText(children);
    const id = slugify(text);

    return (
      <h2
        id={id}
        className="group scroll-mt-32 text-2xl md:text-3xl font-bold text-foreground mt-14 mb-6 flex items-start gap-3"
      >
        <Scale className="text-primary mt-1 shrink-0" size={24} />
        <span>{children}</span>
      </h2>
    );
  },

  h3: ({ children }) => {
    const text = extractText(children);
    const id = slugify(text);

    return (
      <h3
        id={id}
        className="scroll-mt-32 text-xl md:text-2xl font-semibold text-foreground mt-10 mb-4 flex items-start gap-3"
      >
        <Shield className="text-primary/80 mt-1 shrink-0" size={20} />
        <span>{children}</span>
      </h3>
    );
  },

  p: ({ children }) => (
    <p className="text-lg leading-relaxed text-foreground/80 mb-6">
      {children}
    </p>
  ),

  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 inline-flex items-center gap-1"
    >
      <span>{children}</span>
      <ExternalLink size={14} />
    </a>
  ),

  blockquote: ({ children }) => (
    <Card className="my-10 border-primary/20 bg-primary/5 p-6 md:p-7">
      <div className="flex items-start gap-4">
        <AlertTriangle className="text-primary mt-1 shrink-0" size={22} />
        <div className="text-base md:text-lg leading-relaxed text-foreground/85 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </Card>
  ),

  ul: ({ children }) => (
    <ul className="space-y-3 mb-8 pl-0">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="space-y-4 mb-10 pl-0">
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => {
    const isOrdered =
      typeof props.node === "object" &&
      props.node !== null &&
      "position" in props.node;

    return (
      <li className="flex items-start gap-3 text-foreground/80 leading-relaxed">
        <CheckCircle2 className="text-primary mt-1 shrink-0" size={18} />
        <span>{children}</span>
      </li>
    );
  },

  hr: () => <hr className="my-12 border-border/60" />,

  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt ?? ""}
      loading="lazy"
      className="w-full rounded-2xl border border-border/50 my-8"
    />
  ),

  code: ({ inline, children }) =>
    inline ? (
      <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-sm">
        {children}
      </code>
    ) : (
      <code className="block rounded-xl bg-muted p-4 text-sm overflow-x-auto">
        {children}
      </code>
    ),
};

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
        <link
          rel="canonical"
          href={`https://www.lisomarbarbosa.adv.br/artigos/${post.slug}`}
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          property="og:site_name"
          content="Lisomar Barbosa | Direito Digital"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://www.lisomarbarbosa.adv.br/artigos/${post.slug}`}
        />
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
            <div className="max-w-4xl mx-auto">
              <Link to="/blog">
                <Button
                  variant="ghost"
                  className="mb-6 group text-foreground/70 hover:text-foreground"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Voltar aos artigos
                </Button>
              </Link>

              <article className="animate-fade-in">
                <header className="mb-12">
                  <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                    {post.category}
                  </span>

                  <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                    {post.title}
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} de leitura</span>
                  </div>

                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-[280px] md:h-[420px] object-cover rounded-2xl border border-border/40"
                    loading="lazy"
                    width={1200}
                    height={630}
                  />
                </header>

                <div className="mb-10">
                  <Card className="p-6 md:p-7 bg-accent/10 border-accent/20">
                    <div className="flex items-start gap-4">
                      <FileText className="text-accent mt-1 shrink-0" size={24} />
                      <div>
                        <h2 className="text-lg font-bold text-foreground mb-2">
                          Leitura jurídica em formato editorial
                        </h2>
                        <p className="text-foreground/80 leading-relaxed">
                          Este conteúdo foi estruturado para facilitar a leitura,
                          destacar orientações práticas e melhorar a localização
                          dos pontos mais importantes do artigo.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={articleComponents}
                  >
                    {content}
                  </ReactMarkdown>
                </div>

                <div className="mt-16">
                  <Card className="p-8 rounded-2xl border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Precisa de orientação jurídica?
                    </h3>
                    <p className="text-foreground/80 mb-6 max-w-2xl mx-auto leading-relaxed">
                      Nossa atuação em Direito Digital abrange remoção de
                      conteúdo, proteção de dados, golpes online, invasão de
                      contas, reputação digital e medidas urgentes para casos de
                      exposição indevida.
                    </p>
                    <Link to="/#contato">
                      <Button size="lg" className="font-semibold">
                        Fale conosco
                      </Button>
                    </Link>
                  </Card>
                </div>

                <div className="mt-10 pt-8 border-t border-border/50">
                  <p className="text-sm text-foreground/50 italic">
                    Este artigo tem caráter informativo e não substitui consulta
                    jurídica personalizada.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ArticlePage;
