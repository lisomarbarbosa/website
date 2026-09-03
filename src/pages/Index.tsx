import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PracticeAreas from "@/components/PracticeAreas";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { organizationSchema } from "@/lib/schema";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Lisomar Barbosa | Direito Digital e Proteção de Dados</title>
        <meta name="description" content="Advogado especialista em Direito Digital, LGPD e Proteção de Dados. Remoção de conteúdo, reputação online e segurança digital em Belém e online." />
        <link rel="canonical" href="https://www.lisomarbarbosa.adv.br" />
        <meta name="robots" content="index, follow" />

        <meta property="og:site_name" content="Lisomar Barbosa | Direito Digital" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lisomarbarbosa.adv.br" />
        <meta property="og:image" content="https://www.lisomarbarbosa.adv.br/og.webp" />
        <meta property="og:title" content="Lisomar Barbosa | Direito Digital e Proteção de Dados" />
        <meta property="og:description" content="Advogado especialista em Direito Digital, LGPD e Proteção de Dados. Remoção de conteúdo, reputação online e segurança digital em Belém e online." />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lisomar Barbosa | Direito Digital e Proteção de Dados" />
        <meta name="twitter:description" content="Advogado especialista em Direito Digital, LGPD e Proteção de Dados. Remoção de conteúdo, reputação online e segurança digital em Belém e online." />
        <meta name="twitter:image" content="https://www.lisomarbarbosa.adv.br/og.webp" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <About />
          <PracticeAreas />
          <Blog />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
