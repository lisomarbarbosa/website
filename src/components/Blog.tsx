import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featuredArticles = [
  {
    title: "LGPD na Prática: 5 Erros que Podem Custar Multas Millionárias",
    excerpt: "Empresas brasileiras estão sendo multadas por não adequarem seus processos à LGPD. Descubra os erros mais comuns e como evitá-los.",
    date: "28 Jan 2025",
    readTime: "7 min",
    category: "LGPD",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop&q=80",
    link: "/artigos/lgpd-erros-comuns"
  },
  {
    title: "Golpes com Criptomoedas: Como Se Proteger e Recuperar Seus Ativos",
    excerpt: "Golpes envolvendo Bitcoin e outras criptomoedas crescem no Brasil. Saiba identificar fraudes e o que fazer se for vítima.",
    date: "15 Jan 2025",
    readTime: "9 min",
    category: "Criptoativos",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&auto=format&fit=crop&q=80",
    link: "/artigos/golpes-criptomoedas"
  },
  {
    title: "Instagram Hackeado? Passo a Passo para Recuperar sua Conta",
    excerpt: "Perdeu acesso à sua conta do Instagram? Veja o passo a passo jurídico para recuperar perfis hackeados e prevenir novos ataques.",
    date: "8 Jan 2025",
    readTime: "6 min",
    category: "Redes Sociais",
    image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&auto=format&fit=crop&q=80",
    link: "/artigos/instagram-hackeado"
  },
];

const Blog = () => {
  return (
    <section id="artigos" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Blog & Artigos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Conteúdo <span className="gradient-text">Especializado</span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Insights, análises e novidades sobre Direito Digital
            </p>
          </div>

          {/* Featured Articles — 3 only */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredArticles.map((article, index) => (
              <Link key={index} to={article.link} className="block">
                <Card
                  className="group border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-smooth hover:shadow-cyber overflow-hidden animate-scale-in cursor-pointer h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
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
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-smooth line-clamp-2">
                      {article.title}
                    </h3>

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

          {/* CTA to full blog */}
          <div className="text-center animate-fade-in">
            <Link to="/blog">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10 font-semibold px-8 backdrop-blur-sm"
              >
                Ver Todos os Artigos
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
