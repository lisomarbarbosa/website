import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useParams, Navigate } from "react-router-dom";
import { blogPosts } from "@/data/blog";

// Mapa slug → import estático do componente do artigo
// Para adicionar um novo artigo: crie o .tsx em articles/ e adicione aqui
const articleComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "lgpd-erros-comuns": lazy(() => import("./articles/LGPDErrosComuns")),
  "golpes-criptomoedas": lazy(() => import("./articles/GolpesCriptomoedas")),
  "instagram-hackeado": lazy(() => import("./articles/InstagramHackeado")),
  "crimes-ciberneticos": lazy(() => import("./articles/CrimesCiberneticos")),
  "custodia-criptoativos": lazy(() => import("./articles/CustodiaCriptoativos")),
  "protecao-dados-pessoais": lazy(() => import("./articles/ProtecaoDadosPessoais")),
  "fake-news-difamacao": lazy(() => import("./articles/FakeNewsDifamacao")),
  "compliance-lgpd": lazy(() => import("./articles/ComplianceLGPD")),
  "regulamentacao-criptomoedas": lazy(() => import("./articles/RegulamentacaoCriptomoedas")),
  "stalking-virtual-consequencias-juridicas-lei-14132-2021": lazy(() => import("./articles/StalkingVirtual")),
  "stalking-virtual-consequencias-juridicas": lazy(() => import("./articles/StalkingVirtual")),
  "invasao-dispositivo-informatico-consequencias-juridicas": lazy(() => import("./articles/InvasaoDispositivo")),
  "perseguicao-digital-protecao-juridica-vitima": lazy(() => import("./articles/PerseguicaoDigital")),
  "crimes-contra-honra-internet-guia-completo": lazy(() => import("./articles/CrimesContraHonraInternetGuiaCompleto")),
  "contratos-software-licencas-uso-direitos-deveres": lazy(() => import("./articles/ContratosSoftwareLicencasUsoDireitosDeveres")),
  "direito-anonimato-internet-limites": lazy(() => import("./articles/DireitoAnonimatoInternetLimites")),
  "direito-do-consumidor-compras-online": lazy(() => import("./articles/DireitoDoConsumidorComprasOnline")),
  "ofensas-redes-sociais-consequencias-juridicas": lazy(() => import("./articles/OfensasRedesSociaisConsequenciasJuridicas")),
  "contratos-digitais-validade-juridica-assinaturas-direitos": lazy(() => import("./articles/ContratosDigitaisValidadeJuridicaAssinaturasDireitos")),
};

const ArticleLoading = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-foreground/10 rounded mb-6 w-32" />
            <div className="h-4 bg-foreground/10 rounded mb-4 w-24" />
            <div className="h-12 bg-foreground/10 rounded mb-6" />
            <div className="h-12 bg-foreground/10 rounded mb-6 w-3/4" />
            <div className="h-4 bg-foreground/10 rounded mb-8 w-48" />
            <div className="h-[400px] bg-foreground/10 rounded-lg mb-8" />
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-foreground/10 rounded mb-3" />
            ))}
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

const ArticleNotFound = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6 group">
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-smooth" size={18} />
              Voltar aos Artigos
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
          <p className="text-foreground/70 mb-8">O artigo que você procura não existe ou foi movido.</p>
          <Link to="/blog">
            <Button>Ver todos os artigos</Button>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug) return <Navigate to="/blog" replace />;

  const ArticleComponent = articleComponents[slug];

  // Slug existe no mapa de rotas mas não tem artigo cadastrado
  if (!ArticleComponent) {
    // Verifica se existe no blogPosts para mostrar 404 contextual
    const postExists = blogPosts.find((p) => p.slug === slug);
    if (!postExists) return <ArticleNotFound />;
    return <ArticleNotFound />;
  }

  return (
    <Suspense fallback={<ArticleLoading />}>
      <ArticleComponent />
    </Suspense>
  );
};

export default ArticlePage;
