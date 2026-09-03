import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { blogPosts } from "@/data/blog";

function formatDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const months = [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez",
    ];
    return `${day.toString().padStart(2, "0")} ${months[month - 1]} ${year}`;
  } catch {
    return dateStr;
  }
}

const BlogPage = () => {
  const articles = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const blogUrl = "https://www.lisomarbarbosa.adv.br/blog";

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${blogUrl}#collection`,
    name: "Artigos de Direito Digital",
    description:
      "Artigos jurídicos sobre Direito Digital, LGPD, proteção de dados, crimes digitais, privacidade, contratos eletrônicos e responsabilidade civil na internet.",
    url: blogUrl,
    inLanguage: "pt-BR",
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: articles.length,
      itemListElement: articles.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: `https://www.lisomarbarbosa.adv.br/artigos/${post.slug}`,
      })),
    },
  };

  return (
    <>
      <Helmet>
        <title>Blog | Lisomar Barbosa | Direito Digital e Proteção de Dados</title>
        <meta name="description" content="Artigos sobre Direito Digital, LGPD, proteção de dados, crimes cibernéticos e criptoativos." />
        <link rel="canonical" href="https://www.lisomarbarbosa.adv.br/blog" />
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="Lisomar Barbosa | Direito Digital" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lisomarbarbosa.adv.br/blog" />
        <meta property="og:image" content="https://www.lisomarbarbosa.adv.br/og.webp" />
        <meta property="og:title" content="Blog | Lisomar Barbosa | Direito Digital e Proteção de Dados" />
        <meta property="og:description" content="Artigos sobre Direito Digital, LGPD, proteção de dados, crimes cibernéticos e criptoativos." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Lisomar Barbosa | Direito Digital e Proteção de Dados" />
        <meta name="twitter:description" content="Artigos sobre Direito Digital, LGPD, proteção de dados, crimes cibernéticos e criptoativos." />
        <meta name="twitter:image" content="https://www.lisomarbarbosa.adv.br/og.webp" />
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 animate-fade-in">
                <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                  Blog & Artigos
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Artigos sobre <span className="gradient-text">Direito Digital</span>
                </h1>
                <p className="text-lg text-foreground/80 max-w-3xl leading-relaxed">
                  Insights, análises e novidades sobre LGPD, proteção de dados, crimes cibernéticos,
                  criptoativos e tudo relacionado ao direito na era digital.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                  <Link key={article.slug} to={`/artigos/${article.slug}`} className="block">
                    <Card
                      className="group border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-smooth hover:shadow-cyber overflow-hidden animate-scale-in cursor-pointer h-full"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700"
                          loading="lazy"
                          width={800}
                          height={192}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-primary/90 text-xs font-medium backdrop-blur-sm">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 text-xs text-foreground/60 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{formatDate(article.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <h2 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-smooth line-clamp-2">
                          {article.title}
                        </h2>
                        <p className="text-foreground/70 leading-relaxed mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-smooth">
                          <span>Ler artigo</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-smooth" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
