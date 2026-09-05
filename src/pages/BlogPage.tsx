import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { articles } from "@/data/articles";

const BlogPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-12 md:py-16">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao inicio
        </Link>

        <header className="mb-10 max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Blog de Direito Digital
          </h1>
          <p className="text-lg text-muted-foreground">
            Conteudos praticos sobre direito digital, LGPD, privacidade, seguranca da informacao e relacoes juridicas no ambiente online.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {article.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="mb-3 text-xl font-semibold leading-snug text-foreground">
                <Link to={`/artigos/${article.slug}`} className="transition-colors hover:text-primary">
                  {article.title}
                </Link>
              </h2>

              <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>

              <div className="mb-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/artigos/${article.slug}`}
                className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Ler artigo
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
