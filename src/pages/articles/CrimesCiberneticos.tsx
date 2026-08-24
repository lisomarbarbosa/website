import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertTriangle,
  Shield,
  ShieldAlert,
  FileText,
  Bug,
  UserX,
  Lock,
  Scale,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pageTitle =
  "Crimes cibernéticos: o que a lei prevê, como se proteger e o que fazer se você for vítima | Lisomar Barbosa | Direito Digital";

const pageDescription =
  "Fraudes online, phishing, ransomware, roubo de identidade e cyberbullying estão entre os crimes digitais mais comuns no Brasil. Este artigo explica, em linguagem clara, o que cada modalidade significa, quais penas a lei prevê, como se prevenir e quais passos seguir caso você já tenha sido vítima.";

const pageUrl =
  "https://www.lisomarbarbosa.adv.br/artigos/crimes-ciberneticos";

const pageImage =
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80";

const CrimesCiberneticos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:site_name" content="Lisomar Barbosa | Direito Digital" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Link to="/blog">
                <Button variant="ghost" className="mb-6 group">
                  <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-smooth" size={18} />
                  Voltar aos Artigos
                </Button>
              </Link>

              <article className="animate-fade-in">
                <header className="mb-12">
                  <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                    Crimes Digitais
                  </span>

                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Crimes cibernéticos: o que a lei prevê, como se proteger e o que fazer se você for vítima
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>24 Ago 2026</span>
                    <span>•</span>
                    <span>10 min de leitura</span>
                  </div>

                  <img
                    src={pageImage}
                    alt="Tela de computador com código em fundo escuro representando ameaças cibernéticas"
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                    loading="lazy"
                  />
                </header>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                    Com a crescente digitalização da vida cotidiana, os crimes cibernéticos deixaram de ser um risco distante e se tornaram uma ameaça concreta para pessoas físicas, empresas e órgãos públicos no Brasil. Fraudes online, roubo de dados, ataques de phishing, ransomware e extorsão digital são apenas os tipos mais conhecidos de uma lista que cresce a cada ano. Entender como cada modalidade funciona, o que a legislação prevê e quais medidas adotar é o primeiro passo para se proteger — e para reagir com eficiência quando o pior acontece.
                  </p>

                  <Card className="p-6 bg-accent/10 border-accent/20 mb-8">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="text-accent flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold mb-2">Atenção: tempo é essencial em casos de extorsão digital</h3>
                        <p className="text-sm text-foreground/80">
                          Se você recebeu uma ameaça, teve dados sequestrados ou está sendo chantageado online, não pague nenhum valor antes de consultar um advogado especializado. Registre um boletim de ocorrência imediatamente e preserve todas as provas: prints, e-mails, capturas de tela e registros de acesso.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Shield className="text-primary" size={28} />
                    O que diz a legislação brasileira
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O Brasil possui um conjunto de leis que criminalizam condutas praticadas no ambiente digital. A <strong>Lei nº 12.737/2012</strong>, conhecida como Lei Carolina Dieckmann, foi pioneira ao tipificar a invasão de dispositivo informático, com pena de detenção de três meses a um ano — agravada quando a invasão resulta em obtenção de conteúdo íntimo ou causa prejuízo econômico. O <strong>Marco Civil da Internet (Lei nº 12.965/2014)</strong> estabelece princípios, direitos e deveres para o uso da internet no país, incluindo a responsabilidade dos provedores pela guarda de logs e pela remoção de conteúdo ilícito mediante ordem judicial.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Já a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong> impõe obrigações às organizações que tratam dados pessoais e prevê sanções administrativas em caso de negligência, incluindo multas de até 2% do faturamento da empresa, limitadas a R$ 50 milhões por infração. Além dessas normas específicas, crimes como estelionato, extorsão, difamação, ameaça e falsidade ideológica também se aplicam quando praticados por meios digitais, com as mesmas penas previstas no Código Penal. A prática do crime pela internet não afasta a responsabilidade penal — apenas exige provas digitais adequadas para a apuração e a persecução criminal.
                  </p>

                  <blockquote>
                    <p>
                      <strong>Dado relevante:</strong> segundo o Anuário Brasileiro de Segurança Pública, os crimes cibernéticos apresentaram crescimento expressivo nos últimos anos, com o estelionato digital respondendo pela maior parte dos registros. O subnoticiamento ainda é alto, pois muitas vítimas não sabem como ou onde registrar a ocorrência.
                    </p>
                  </blockquote>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <ShieldAlert className="text-primary" size={28} />
                    Principais modalidades de crimes cibernéticos
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O universo dos crimes digitais é amplo e está em constante evolução. Conhecer as modalidades mais comuns ajuda a identificar riscos e a agir com mais rapidez quando algo ocorre.
                  </p>

                  <div className="space-y-8 mb-12">
                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Bug className="text-accent" size={20} />
                        Phishing
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        Técnica de engenharia social que consiste em induzir a vítima a revelar informações confidenciais — senhas, dados bancários, número de cartão — por meio de e-mails, mensagens de texto ou sites falsos que imitam plataformas legítimas. O phishing é a porta de entrada de grande parte das fraudes financeiras digitais no Brasil. Em muitos casos, o link enviado é indistinguível do endereço original, e a página falsa replica fielmente a identidade visual do banco ou da loja.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Bug className="text-accent" size={20} />
                        Malware e ransomware
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        Softwares maliciosos instalados no dispositivo da vítima sem seu conhecimento. O ransomware, em especial, criptografa os arquivos do computador ou celular e exige pagamento de resgate para liberação do acesso — frequentemente em criptomoedas, o que dificulta o rastreamento. Empresas, hospitais e órgãos públicos têm sido alvos frequentes, mas pessoas físicas também são atingidas, muitas vezes por meio de arquivos recebidos por e-mail ou aplicativos baixados de fontes não oficiais.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <UserX className="text-accent" size={20} />
                        Roubo de identidade
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        Uso não autorizado de dados pessoais para abrir contas bancárias, contrair empréstimos, realizar compras ou cometer fraudes em nome da vítima. O roubo de identidade pode causar danos financeiros severos e manchar o histórico de crédito do titular por anos. Nos casos mais graves, a vítima só descobre o problema quando já está negativada por dívidas que nunca contraiu.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <ShieldAlert className="text-accent" size={20} />
                        Fraudes online
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        Incluem falsas promoções em redes sociais, lojas virtuais inexistentes, golpes de investimento com criptomoedas ou rendimentos impossíveis, leilões fraudulentos e compras que nunca são entregues. O estelionato praticado por meio eletrônico é crime previsto no artigo 171 do Código Penal, com pena de um a cinco anos de reclusão. Quando a fraude envolve dispositivos eletrônicos ou transferências bancárias indevidas, as penas podem ser aumentadas.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <AlertTriangle className="text-accent" size={20} />
                        Cyberbullying, difamação e ameaças
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        Assédio sistemático, exposição vexatória, ameaças, publicação de informações falsas ou ofensivas e disseminação de conteúdo íntimo sem autorização são condutas que combinam ilicitude penal e civil. A vítima pode buscar tanto a responsabilização criminal do agressor quanto indenização por danos morais na esfera cível. A Lei nº 14.811/2024 reforçou o arcabouço normativo de combate à intimidação sistêmica, inclusive no ambiente digital.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Scale className="text-primary" size={28} />
                    Responsabilidade civil e criminal: quem pode ser responsabilizado
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Em crimes cibernéticos, a responsabilidade pode recair sobre o autor direto do ilícito, mas também sobre terceiros que, de alguma forma, contribuíram para o dano. Provedores de aplicação são responsabilizados por danos decorrentes de conteúdo gerado por terceiros quando, notificados judicialmente, deixam de remover o conteúdo apontado como ilícito, nos termos do artigo 19 do Marco Civil da Internet.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Empresas que sofrem vazamentos de dados e negligenciaram medidas básicas de segurança também podem responder civil e administrativamente perante a Autoridade Nacional de Proteção de Dados (ANPD). O titular de dados tem direito à reparação por danos materiais e morais decorrentes do tratamento irregular de suas informações, independentemente de culpa do responsável pelo tratamento, quando aplicável a responsabilidade objetiva.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Lock className="text-primary" size={28} />
                    Como se proteger
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A prevenção combina boas práticas de segurança digital com atenção redobrada ao comportamento online. Nenhuma medida isolada é suficiente, mas a combinação delas reduz significativamente a exposição ao risco.
                  </p>

                  <ul className="list-disc pl-6 mb-8 text-foreground/80 space-y-3">
                    <li>
                      <strong>Senhas fortes e únicas:</strong> use combinações longas e diferentes para cada serviço. Gerenciadores de senhas facilitam esse controle sem comprometer a segurança.
                    </li>
                    <li>
                      <strong>Autenticação em dois fatores (2FA):</strong> ative em e-mail, redes sociais, aplicativos bancários e qualquer plataforma que ofereça essa opção. Prefira aplicativos autenticadores a SMS.
                    </li>
                    <li>
                      <strong>Atualizações em dia:</strong> mantenha sistema operacional, navegador e antivírus sempre atualizados. Vulnerabilidades corrigidas deixam de ser porta de entrada para ataques.
                    </li>
                    <li>
                      <strong>Desconfie de links e anexos:</strong> não clique em links recebidos por e-mail ou WhatsApp sem verificar a origem. Sites fraudulentos costumam imitar domínios legítimos com pequenas alterações ortográficas.
                    </li>
                    <li>
                      <strong>Backup regular:</strong> mantenha cópias dos seus arquivos em local separado do dispositivo principal. Em caso de ransomware, o backup pode evitar o pagamento de resgate e a perda definitiva dos dados.
                    </li>
                    <li>
                      <strong>Monitore suas contas:</strong> verifique periodicamente extratos bancários, histórico de crédito e atividades nas suas contas digitais para identificar movimentações suspeitas com antecedência.
                    </li>
                  </ul>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <FileText className="text-primary" size={28} />
                    O que fazer se você foi vítima
                  </h2>

                  <ol className="space-y-4 mb-12">
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">1.</span>
                      <div>
                        <strong>Preserve todas as provas:</strong> prints de tela, e-mails, mensagens, registros de acesso, extratos e qualquer outro documento que comprove o ocorrido. Provas digitais são frágeis e podem ser apagadas pelo agressor a qualquer momento.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">2.</span>
                      <div>
                        <strong>Registre boletim de ocorrência:</strong> presencialmente na Delegacia de Crimes Cibernéticos (onde houver) ou pela internet, dependendo do estado. O BO é documento essencial para qualquer providência posterior, inclusive judicial.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">3.</span>
                      <div>
                        <strong>Comunique as instituições envolvidas:</strong> informe o banco, a operadora do cartão ou a plataforma onde o crime ocorreu. Em casos de fraude financeira, a comunicação imediata pode viabilizar o bloqueio de transações e o ressarcimento dos valores.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">4.</span>
                      <div>
                        <strong>Solicite remoção de conteúdo:</strong> em casos de difamação, exposição íntima ou conteúdo falso, plataformas como Google, Instagram e WhatsApp possuem canais de denúncia. Em situações urgentes, é possível obter ordem judicial de remoção em 24 horas mediante tutela de urgência.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">5.</span>
                      <div>
                        <strong>Busque orientação jurídica especializada:</strong> um advogado de Direito Digital pode orientar sobre medidas cautelares, ação penal privada ou pública, e eventual pedido de indenização por danos materiais e morais, além de acompanhar a investigação criminal.
                      </div>
                    </li>
                  </ol>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Hábitos de prevenção</h2>

                  <ul className="list-disc pl-6 mb-8 text-foreground/80 space-y-3">
                    <li>
                      <strong>Verifique sempre o remetente</strong> de e-mails e mensagens antes de clicar em qualquer link, especialmente os que pedem dados ou senhas.
                    </li>
                    <li>
                      <strong>Use redes Wi-Fi seguras</strong> ou VPN ao acessar serviços bancários e plataformas sensíveis em locais públicos.
                    </li>
                    <li>
                      <strong>Revise as permissões dos aplicativos</strong> instalados no celular e remova aqueles que solicitam acesso além do necessário para sua função.
                    </li>
                    <li>
                      <strong>Ative alertas de transação</strong> em todos os seus serviços financeiros para ser notificado imediatamente de qualquer movimentação.
                    </li>
                    <li>
                      <strong>Eduque as pessoas próximas:</strong> muitos ataques chegam através de contatos da vítima que já foram comprometidos. A segurança digital de um depende da do outro.
                    </li>
                  </ul>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Considerações finais</h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Os crimes cibernéticos são uma realidade do ambiente digital contemporâneo, mas o ordenamento jurídico brasileiro dispõe de ferramentas concretas para responsabilizar os autores e proteger as vítimas. O caminho passa pela combinação de prevenção técnica, atenção comportamental e conhecimento dos seus direitos.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Quando o crime já ocorreu, agir rápido e com estratégia faz toda a diferença: documentar, registrar a ocorrência, comunicar as instituições envolvidas e buscar orientação jurídica especializada são as etapas que abrem o caminho para a responsabilização do agressor e, quando possível, para a reparação dos danos sofridos.
                  </p>

                  <hr />

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    <em>
                      Este artigo tem caráter informativo e não substitui consulta jurídica personalizada. Para avaliar o seu caso concreto, busque orientação profissional adequada.
                    </em>
                  </p>
                </div>

                <div className="mt-16 p-8 rounded-2xl gradient-cyber border border-primary/20 text-center">
                  <h3 className="text-2xl font-bold mb-4">Precisa de orientação jurídica?</h3>
                  <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                    Nossa equipe especializada em Direito Digital está pronta para analisar o seu caso e indicar as melhores estratégias jurídicas.
                  </p>
                  <Link to="/#contato">
                    <Button size="lg" className="bg-gradient-accent text-background font-semibold shadow-cyber">
                      Fale Conosco
                    </Button>
                  </Link>
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

export default CrimesCiberneticos;
