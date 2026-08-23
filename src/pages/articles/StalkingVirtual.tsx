import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, AlertTriangle, FileText, Eye } from "lucide-react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const StalkingVirtual = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Stalking Virtual e suas Consequências Jurídicas | Lisomar Barbosa | Direito Digital</title>
        <meta name="description" content="Análise completa sobre o crime de perseguição (Art. 147-A do CP) no ambiente digital, responsabilidade civil, tutelas inibitórias, deveres das plataformas (Marco Civil e LGPD) e prova digital." />
        <link rel="canonical" href="https://www.lisomarbarbosa.adv.br/artigos/stalking-virtual-consequencias-juridicas" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        <meta property="og:site_name" content="Lisomar Barbosa | Direito Digital" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.lisomarbarbosa.adv.br/artigos/stalking-virtual-consequencias-juridicas" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1588873281272-14886ba1f737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDM2MTcyfA&ixlib=rb-4.1.0&q=80&w=1080" />
        <meta property="og:title" content="Stalking Virtual e suas Consequências Jurídicas | Lisomar Barbosa | Direito Digital" />
        <meta property="og:description" content="Análise completa sobre o crime de perseguição (Art. 147-A do CP) no ambiente digital, responsabilidade civil, tutelas inibitórias, deveres das plataformas (Marco Civil e LGPD) e prova digital." />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stalking Virtual e suas Consequências Jurídicas | Lisomar Barbosa | Direito Digital" />
        <meta name="twitter:description" content="Análise completa sobre o crime de perseguição (Art. 147-A do CP) no ambiente digital, responsabilidade civil, tutelas inibitórias, deveres das plataformas (Marco Civil e LGPD) e prova digital." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1588873281272-14886ba1f737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDM2MTcyfA&ixlib=rb-4.1.0&q=80&w=1080" />
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
                    Direito Digital
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Stalking Virtual e suas Consequências Jurídicas: Análise Completa à Luz da Lei 14.132/2021, Marco Civil, LGPD e Jurisprudência
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>22 Ago 2026</span>
                    <span>•</span>
                    <span>13 min de leitura</span>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1588873281272-14886ba1f737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDM2MTcyfA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Stalking Virtual e Perseguição Digital"
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                  />
                </header>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                    A expansão das relações sociais para o ambiente digital trouxe consigo a replicação e a potencialização de condutas lesivas à dignidade humana. Entre elas, destaca-se o <strong>stalking virtual</strong> (ciberstalking), fenômeno caracterizado pela perseguição reiterada, intrusiva e ameaçadora perpetrada por meio de tecnologias da informação e comunicação. No Brasil, a promulgação da <strong>Lei nº 14.132/2021</strong>, que inseriu o <strong>Art. 147-A no Código Penal</strong>, marcou um divisor de águas ao tipificar especificamente o crime de <strong>Perseguição</strong>, abrangendo expressamente os meios virtuais.
                  </p>

                  <Card className="p-6 bg-accent/10 border-accent/20 mb-8">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="text-accent flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold mb-2">Atenção: Preserve as Provas Digitais</h3>
                        <p className="text-sm text-foreground/80">
                          Ao identificar perseguição virtual, não exclua as mensagens. Faça prints com data/hora visíveis, grave vídeo da tela e registre boletim de ocorrência imediatamente. O prazo para representação criminal é de 6 meses.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Shield className="text-primary" size={28} />
                    1. Fundamentação Constitucional
                  </h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A tutela jurídica contra o stalking virtual encontra sua raiz na <strong>Constituição Federal de 1988</strong>. O <strong>Art. 1º, III</strong>, estabelece a <strong>dignidade da pessoa humana</strong> como fundamento da República. O <strong>Art. 5º, X</strong>, garante a inviolabilidade da intimidade, vida privada, honra e imagem, assegurando indenização por dano material ou moral. No contexto digital, essa cláusula geral de tutela da personalidade é a base para a reparação civil por danos morais <em>in re ipsa</em> e para a concessão de tutelas inibitórias.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <FileText className="text-primary" size={28} />
                    2. O Crime de Perseguição (Art. 147-A do CP)
                  </h2>

                  <div className="space-y-6 mb-12">
                    <div>
                      <h3 className="text-xl font-bold mb-3">2.1 Tipificação</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        A <strong>Lei nº 14.132/2021</strong> inseriu o Art. 147-A no Código Penal: <em>"Perseguir alguém, reiteradamente e por qualquer meio, ameaçando-lhe a integridade física ou psicológica, restringindo-lhe a capacidade de locomoção ou, de qualquer forma, invadindo ou perturbando sua esfera de liberdade ou privacidade — pena de reclusão de 6 meses a 2 anos, e multa."</em>
                      </p>
                      <p className="text-foreground/80 leading-relaxed mt-3">
                        A expressão <strong>"por qualquer meio"</strong> abrange o ambiente virtual: mensagens instantâneas (WhatsApp, Telegram), redes sociais, e-mails, criação de perfis falsos, monitoramento por <em>spyware</em>, geolocalização não consentida e <em>doxxing</em>.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">2.2 Causas de Aumento de Pena (§ 1º)</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        A pena é aumentada de <strong>metade</strong> se o crime é cometido: contra criança, adolescente ou idoso; mediante concurso de 2 ou mais pessoas (incluindo <em>raids</em> organizados, bots de assédio em massa); ou com emprego de arma.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">2.3 Concurso de Crimes</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        O stalking virtual frequentemente ocorre com: Ameaça (Art. 147 CP), Crimes contra a Honra (Arts. 138-140 CP), Invasão de Dispositivo Informático (Art. 154-A CP), Registro Não Autorizado da Intimidade Sexual (Art. 216-B CP) e Descumprimento de Medida Protetiva (Art. 24-A CP).
                      </p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Eye className="text-primary" size={28} />
                    3. Responsabilidade Civil e Tutela Inibitória
                  </h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O dano moral no stalking virtual é <strong>presumido (<em>in re ipsa</em>)</strong>. O sofrimento psíquico, a angústia, o medo fundado e a restrição da liberdade digital são inerentes à conduta persecutória. São cabíveis tutelas inibitórias (CPC Arts. 297, 300, 497): proibição de contato virtual, remoção de conteúdos, bloqueio de contas e preservação de <em>logs</em> para perícia.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6">4. Marco Civil e LGPD: Deveres das Plataformas</h2>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    O <strong>Art. 19 do Marco Civil da Internet</strong> exige <strong>ordem judicial específica</strong> para a remoção de conteúdo geral. Já o <strong>Art. 21</strong> — para conteúdo de nudez ou ato sexual privado — admite <strong>notificação extrajudicial</strong> da vítima, gerando dever de remoção imediata sob pena de responsabilidade solidária.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A <strong>LGPD (Arts. 46 e 48)</strong> impõe às plataformas o dever de segurança. Vazamentos de dados que facilitam o <em>doxxing</em> configuram incidente de segurança, sujeitos a sanções pela ANPD e reparação civil.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6">5. Lei Maria da Penha: Violência Doméstica e Virtual</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Quando o stalking ocorre em contexto de violência doméstica, aplicam-se as <strong>Medidas Protetivas de Urgência (Art. 22 da Lei 11.340/2006)</strong>, incluindo proibição de contato por qualquer meio eletrônico. O descumprimento é crime autônomo (Art. 24-A CP), com pena de detenção de 3 meses a 2 anos, ação pública incondicionada.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6">6. Como Agir em Caso de Stalking Virtual</h2>
                  <ol className="space-y-4 mb-12">
                    <li className="flex gap-4">
                      <span className="font-bold text-primary">1.</span>
                      <div><strong>Preserve as provas:</strong> Prints com data/hora, gravação de tela em vídeo, ata notarial para prova pré-constituída (CPC Art. 381).</div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary">2.</span>
                      <div><strong>Boletim de Ocorrência:</strong> Registre na Delegacia de Crimes Cibernéticos com <strong>representação</strong> expressa (prazo de 6 meses do Art. 38 CPP).</div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary">3.</span>
                      <div><strong>Medidas Cautelares (CPC Art. 294):</strong> Bloqueio de perfis, preservação de logs, proibição de contato por ordem judicial.</div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary">4.</span>
                      <div><strong>Ação de Indenização:</strong> Por danos morais (<em>in re ipsa</em>) e materiais (tratamento psicológico, gastos com segurança).</div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary">5.</span>
                      <div><strong>ANPD:</strong> Peticione à Autoridade Nacional de Proteção de Dados se houver vazamento de dados pessoais.</div>
                    </li>
                  </ol>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Conclusão</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O stalking virtual é uma violação de direitos fundamentais potencializada pela tecnologia. A resposta jurídica brasileira é multinível: penal (Art. 147-A CP), cível (reparação integral e tutelas inibitórias), regulatória (MCI/LGPD) e especial (Lei Maria da Penha). A efetividade depende da preservação imediata da prova digital e da atuação advocatícia estratégica combinando as vias penal, cível e administrativa.
                  </p>
                  <p className="text-sm text-foreground/50 italic">
                    Este artigo tem caráter informativo e não substitui consulta a advogado especializado para análise do caso concreto.
                  </p>
                </div>

                <div className="mt-16 p-8 rounded-2xl gradient-cyber border border-primary/20 text-center">
                  <h3 className="text-2xl font-bold mb-4">Está Sofrendo Stalking Virtual?</h3>
                  <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                    Nossa equipe especializada em Direito Digital está pronta para orientar você, desde a preservação das provas até a obtenção de medidas protetivas e indenização.
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

export default StalkingVirtual;
