import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import BlogPage from "./pages/BlogPage";
import NotFound from "./pages/NotFound";
import OfensasRedesSociaisConsequenciasJuridicas from "./pages/articles/OfensasRedesSociaisConsequenciasJuridicas";
import DireitoDoConsumidorComprasOnline from "./pages/articles/DireitoDoConsumidorComprasOnline";
import DireitoAnonimatoInternetLimites from "./pages/articles/DireitoAnonimatoInternetLimites";
import ContratosSoftwareLicencasUsoDireitosDeveres from "./pages/articles/ContratosSoftwareLicencasUsoDireitosDeveres";
import CrimesContraHonraInternetGuiaCompleto from "./pages/articles/CrimesContraHonraInternetGuiaCompleto";
import LGPDErrosComuns from "./pages/articles/LGPDErrosComuns";
import GolpesCriptomoedas from "./pages/articles/GolpesCriptomoedas";
import InstagramHackeado from "./pages/articles/InstagramHackeado";
import CrimesCiberneticos from "./pages/articles/CrimesCiberneticos";
import CustodiaCriptoativos from "./pages/articles/CustodiaCriptoativos";
import ProtecaoDadosPessoais from "./pages/articles/ProtecaoDadosPessoais";
import FakeNewsDifamacao from "./pages/articles/FakeNewsDifamacao";
import ComplianceLGPD from "./pages/articles/ComplianceLGPD";
import RegulamentacaoCriptomoedas from "./pages/articles/RegulamentacaoCriptomoedas";
import StalkingVirtual from "./pages/articles/StalkingVirtual";
import InvasaoDispositivo from "./pages/articles/InvasaoDispositivo";
import PerseguicaoDigital from "./pages/articles/PerseguicaoDigital";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<BlogPage />} />
            {/* <Route path="/links" element={<Links />} /> */}
            <Route path="/artigos/lgpd-erros-comuns" element={<LGPDErrosComuns />} />
            <Route path="/artigos/golpes-criptomoedas" element={<GolpesCriptomoedas />} />
            <Route path="/artigos/instagram-hackeado" element={<InstagramHackeado />} />
            <Route path="/artigos/crimes-ciberneticos" element={<CrimesCiberneticos />} />
            <Route path="/artigos/custodia-criptoativos" element={<CustodiaCriptoativos />} />
            <Route path="/artigos/protecao-dados-pessoais" element={<ProtecaoDadosPessoais />} />
            <Route path="/artigos/fake-news-difamacao" element={<FakeNewsDifamacao />} />
            <Route path="/artigos/compliance-lgpd" element={<ComplianceLGPD />} />
            <Route path="/artigos/regulamentacao-criptomoedas" element={<RegulamentacaoCriptomoedas />} />
            <Route path="/artigos/stalking-virtual-consequencias-juridicas" element={<StalkingVirtual />} />
            <Route path="/artigos/invasao-dispositivo-informatico-consequencias-juridicas" element={<InvasaoDispositivo />} />
            <Route path="/artigos/perseguicao-digital-protecao-juridica-vitima" element={<PerseguicaoDigital />} />
                        <Route path="/artigos/crimes-contra-honra-internet-guia-completo" element={<CrimesContraHonraInternetGuiaCompleto />} />
                        <Route path="/artigos/contratos-software-licencas-uso-direitos-deveres" element={<ContratosSoftwareLicencasUsoDireitosDeveres />} />
                        <Route path="/artigos/direito-anonimato-internet-limites" element={<DireitoAnonimatoInternetLimites />} />
                        <Route path="/artigos/direito-do-consumidor-compras-online" element={<DireitoDoConsumidorComprasOnline />} />
                        <Route path="/artigos/ofensas-redes-sociais-consequencias-juridicas" element={<OfensasRedesSociaisConsequenciasJuridicas />} />
            {/* Rota padrão (404) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
