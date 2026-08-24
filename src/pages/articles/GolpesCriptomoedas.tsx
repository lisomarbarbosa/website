import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertTriangle,
  ShieldAlert,
  TrendingUp,
  Lock,
  FileSearch,
  Scale,
  CheckCircle,
  Calendar,
  Clock,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const GolpesCriptomoedas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const golpes = [
    {
      icon: TrendingUp,
      titulo: "Pirâmides financeiras disfarçadas",
      descricao:
        "Plataformas que prometem retornos garantidos e extraordinários são o sinal mais claro de golpe. Funcionam como esquemas Ponzi: usam o dinheiro de novos investidores para pagar os antigos, até o colapso inevitável.",
    },
    {
      icon: ShieldAlert,
      titulo: "Phishing e exchanges falsas",
      descricao:
        "Criminosos clonam sites de exchanges famosas (Binance, Mercado Bitcoin) para roubar senhas e chaves privadas. Um único login no site errado pode ser suficiente para zerar sua carteira.",
    },
    {
      icon: AlertTriangle,
      titulo: "Fake ICOs e tokens fraudulentos",
      descricao:
        "Ofertas de novos tokens revolucionários com whitepapers elaborados e equipes fictícias. Os organizadores arrecadam fundos em pré-venda e desaparecem — os chamados 'rug pulls'.",
    },
    {
      icon: Lock,
      titulo: "Golpe do suporte técnico falso",
      descricao:
        "Contatos se passam por atendentes de exchanges ou carteiras, pedindo sua seed phrase para 'resolver um problema'. Nenhuma empresa legítima jamais pedirá sua chave privada.",
    },
    {
      icon: FileSearch,
      titulo: "Pump and dump",
      descricao:
        "Grupos coordenados inflam artificialmente o preço de uma criptomoeda, atraem investidores ingênuos e vendem suas posições no topo, causando queda brusca e prejuízo aos demais.",
    },
  ];

  const protecao = [
    "Pesquise a empresa na CVM e no Banco Central antes de qualquer investimento",
    "Ative autenticação de dois fatores (2FA) por aplicativo, não por SMS",
    "Nunca compartilhe sua seed phrase ou chave privada com ninguém",
    "Use hardware wallets (carteiras físicas) para valores expressivos",
    "Verifique o URL da exchange antes de cada login — evite links em e-mails",
    "Desconfie de grupos de WhatsApp ou Telegram com 'dicas garantidas'",
    "Guarde print de todas as transações e conversas relevantes",
  ];

  return (
    <>
      <Helmet>
        <title>
          Golpes com Criptomoedas: Como Se Proteger e Recuperar Seus Ativos |
          Lisomar Barbosa | Direito Digital
        </title>
        <meta
          name="description"
          content="Conheça os 5 principais golpes com criptomoedas, aprenda a se proteger e saiba quais medidas jurídicas tomar para recuperar seus ativos digitais."
        />
        <link
          rel="canonical"
          href="https://www.lisomarbarbosa.adv.br/blog/golpes-criptomoedas"
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
          content="https://www.lisomarbarbosa.adv.br/blog/golpes-criptomoedas"
        />
        <meta
          property="og:image"
          content="https://www.lisomarbarbosa.adv.br/og-image.jpg"
        />
        <meta
          property="og:title"
          content="Golpes com Criptomoedas: Como Se Proteger e Recuperar Seus Ativos"
        />
        <meta
          property="og:description"
          content="Conheça os 5 principais golpes com criptomoedas, aprenda a se proteger e saiba quais medidas jurídicas tomar para recuperar seus ativos digitais."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Golpes com Criptomoedas: Como Se Proteger e Recuperar Seus Ativos"
        />
        <meta
          name="twitter:description"
          content="Conheça os 5 principais golpes com criptomoedas, aprenda a se proteger e saiba quais medidas jurídicas tomar para recuperar seus ativos digitais."
        />
        <meta
          name="twitter:image"
          content="https://www.lisomarbarbosa.adv.br/og-image.jpg"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <article className="py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <Link to="/#artigos">
                <Button variant="ghost" className="mb-8">
                  <ArrowLeft className="mr-2" size={18} />
                  Voltar para Artigos
                </Button>
              </Link>

              <div className="mb-12">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Criptoativos
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Golpes com Criptomoedas: Como Se Proteger e Recuperar Seus Ativos
                </h1>
                <div className="flex items-center gap-6 text-foreground/60">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>15 Jan 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>9 min de leitura</span>
                  </div>
                </div>
              </div>

              <div className="relative h-96 rounded-2xl overflow-hidden mb-12 shadow-cyber">
                <img
                  src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1200&auto=format&fit=crop&q=80"
                  alt="Criptomoedas e segurança digital"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-lg prose-invert max-w-none">

                <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                  O mercado de criptomoedas movimenta bilhões de reais no Brasil, mas essa popularidade atrai
                  golpistas cada vez mais sofisticados. Segundo a Chainalysis, somente em 2023 foram roubados
                  mais de US$ 1,7 bilhão em cripto em todo o mundo por meio de fraudes. Conhecer os golpes
                  mais comuns é o primeiro passo para não ser a próxima vítima.
                </p>

                {/* Alerta */}
                <Card className="p-6 mb-10 border-yellow-500/30 bg-yellow-500/5">
                  <div className="flex gap-4">
                    <AlertTriangle className="text-yellow-400 shrink-0 mt-1" size={22} />
                    <div>
                      <p className="font-semibold text-yellow-300 mb-1">Atenção</p>
                      <p className="text-foreground/80 text-sm leading-relaxed">
                        Se alguém prometer retorno garantido em criptomoedas, pode ter certeza: é golpe.
                        Rentabilidade certa não existe em ativos de risco. Esta é a regra de ouro do mercado cripto.
                      </p>
                    </div>
                  </div>
                </Card>

                <h2 className="text-3xl font-bold mt-12 mb-8">Os 5 golpes mais comuns</h2>

                <div className="grid gap-6 mb-12">
                  {golpes.map((item, i) => (
                    <Card key={i} className="p-6 border border-primary/10">
                      <div className="flex gap-4">
                        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                          <item.icon className="text-primary" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{item.titulo}</h3>
                          <p className="text-foreground/70 text-sm leading-relaxed">{item.descricao}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6">Como se proteger</h2>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  A maioria dos golpes com cripto explora dois elementos: urgência e ganância. Adotar hábitos
                  simples de segurança digital reduz drasticamente o risco:
                </p>

                <div className="grid gap-3 mb-10">
                  {protecao.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={18} />
                      <p className="text-foreground/80 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6">O que fazer se você foi vítima</h2>

                <div className="space-y-6 mb-10">
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-bold">1</span>
                      Documente tudo imediatamente
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Faça capturas de tela de todas as transações, conversas, contratos e e-mails. Salve
                      os hashes das transações blockchain — eles são imutáveis e servirão de prova. Não delete
                      nada, mesmo que pareça irrelevante.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-bold">2</span>
                      Registre Boletim de Ocorrência
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Procure uma Delegacia de Crimes Cibernéticos (DEIC) ou use o sistema online da sua
                      estado. O B.O. é indispensável para qualquer ação posterior. Informe todos os dados:
                      valores, plataforma envolvida, datas e como o contato foi iniciado.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-bold">3</span>
                      Denuncie à CVM e ao Banco Central
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Se a plataforma operava como investimento coletivo sem autorização, registre denúncia
                      na CVM (cvm.gov.br) e no Banco Central. Isso pode deflagrar investigações que beneficiam
                      todas as vítimas.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-bold">4</span>
                      Busque assessoria jurídica especializada
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Um advogado especializado em direito digital e criptoativos pode acionar medidas cautelares
                      para bloqueio de ativos, rastrear transações blockchain, identificar responsáveis e ingressar
                      com ação de reparação de danos — incluindo danos morais.
                    </p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6">Fundamento jurídico</h2>
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  Os golpes com criptomoedas podem configurar múltiplos crimes previstos no ordenamento brasileiro:
                </p>
                <Card className="p-6 border border-primary/10 mb-8">
                  <div className="flex gap-4">
                    <Scale className="text-primary shrink-0 mt-1" size={22} />
                    <ul className="space-y-2 text-foreground/80 text-sm leading-relaxed">
                      <li><strong>Estelionato (art. 171 do Código Penal)</strong> — fraude mediante indução em erro</li>
                      <li><strong>Lei 7.492/1986 (crimes contra o sistema financeiro)</strong> — quando há captação de recursos sem autorização</li>
                      <li><strong>Lei 14.478/2022 (Marco Legal dos Criptoativos)</strong> — regulação e responsabilidade de prestadoras de serviços</li>
                      <li><strong>Código de Defesa do Consumidor</strong> — quando o golpe ocorre em relação de consumo</li>
                    </ul>
                  </div>
                </Card>

                <p className="text-foreground/80 leading-relaxed">
                  A recuperação de criptoativos é tecnicamente possível em muitos casos. Ferramentas de análise
                  de blockchain permitem rastrear o destino dos fundos, e determinações judiciais podem compelir
                  exchanges a bloquear contas e revelar dados de clientes suspeitos.
                </p>
              </div>

              <div className="mt-16 p-8 rounded-2xl gradient-cyber border border-primary/20 text-center">
                <h3 className="text-2xl font-bold mb-4">Foi vítima de golpe com criptomoedas?</h3>
                <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                  Consultoria especializada em recuperação de criptoativos, rastreamento blockchain e
                  ações contra fraudes digitais. Agende uma consulta e entenda suas opções.
                </p>
                <Link to="/#contato">
                  <Button
                    size="lg"
                    className="bg-gradient-accent text-background font-semibold shadow-cyber"
                  >
                    Buscar Ajuda Jurídica
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
};

export default GolpesCriptomoedas;
