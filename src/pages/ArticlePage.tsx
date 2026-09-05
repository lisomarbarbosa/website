import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { articles } from "@/data/articles";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao blog
        </Link>

        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {article.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {article.title}
          </h1>

          <div className="mb-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
              >
                <Tag className="h-3.5 w-3.5" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        <article className="prose prose-sm md:prose-base lg:prose-lg prose-zinc dark:prose-invert max-w-none">
          {article.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="mb-4 leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </article>
      </section>
    </main>
  );
};

export default ArticlePage;
