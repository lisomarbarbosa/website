import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog";

const InvasaoDispositivo = () => {
  const post = blogPosts.find(
    (p) => p.slug === "invasao-dispositivo-informatico-consequencias-juridicas"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) return null;

  const contentLines = post.content.split("\n");

  const renderContent = (lines: string[]) => {
    return lines.map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-foreground">
            {line.replace("# ", "")}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-3 text-foreground">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-semibold mt-6 mb-2 text-foreground">
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("#### ")) {
        return (
          <h4 key={index} className="text-lg font-semibold mt-4 mb-2 text-foreground">
            {line.replace("#### ", "")}
          </h4>
        );
      } else if (line.startsWith("* ") || line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-1 list-disc text-muted-foreground">
            {line.replace(/^[*-] /, "")}
          </li>
        );
      } else if (line.startsWith("> ")) {
        return (
          <blockquote
            key={index}
            className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground"
          >
            {line.replace("> ", "")}
          </blockquote>
        );
      } else if (line.startsWith("---")) {
        return <hr key={index} className="my-8 border-border" />;
      } else if (line.trim() === "") {
        return <br key={index} />;
      } else {
        return (
          <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
            {line}
          </p>
        );
      }
    });
  };

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
        <meta property="og:site_name" content="Lisomar Barbosa | Direito Digital" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://www.lisomarbarbosa.adv.br/artigos/${post.slug}`}
        />
        <meta property="og:image" content={post.image} />
        <meta property="og:title" content={`${post.title} | Lisomar Barbosa | Direito Digital`} />
        <meta property="og:description" content={post.excerpt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | Lisomar Barbosa | Direito Digital`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Blog
          </Link>

          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} de leitura</span>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-10"
            loading="lazy"
          />

          <article className="prose prose-invert max-w-none">
            {renderContent(contentLines)}
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default InvasaoDispositivo;
