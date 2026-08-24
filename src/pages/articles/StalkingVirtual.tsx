import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertTriangle,
  Shield,
  Eye,
  FileText,
  UserX,
  Scale,
  Lock,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pageTitle =
  "Stalking virtual: o que é e quais as consequências jurídicas no Brasil | Lisomar Barbosa | Direito Digital";

const pageDescription =
  "Entenda o que caracteriza o stalking virtual, como a Lei nº 14.132/2021 tipifica o crime de perseguição no ambiente digital, quais as consequências penais e civis e o que fazer se você está sendo vítima dessa conduta.";

const pageUrl =
  "https://www.lisomarbarbosa.adv.br/artigos/stalking-virtual-o-que-e-e-quais-as-consequencias-juridicas-no-brasil";

const pageImage =
  "https://images.unsplash.com/photo-1588873281272-14886ba1f737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDM2MTcyfA&ixlib=rb-4.1.0&q=80&w=1080";

const StalkingVirtual = () => {
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
                    Direito Digital
                  </span>

                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Stalking virtual: o que é e quais as consequências jurídicas no Brasil
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>22 Ago 2026</span>
                    <span>•</span>
                    <span>10 min de leitura</span>
                  </div>

                  <img
                    src={pageImage}
                    alt="Pessoa olhando para tela de celular em ambiente escuro, representando perseguição digital"
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                    loading="lazy"
                  />
                </header>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                    Uma mensagem que você não pediu. Depois outra. Um perfil desconhecido que aparece nos seus seguidores. Comentários em fotos antigas. A sensação de que alguém monitora o que você publica, onde você está e com quem você fala. Esse padrão tem nome — <strong>stalking virtual</strong> — e, desde 2021, tem tipificação penal expressa no Brasil. O que muita gente ainda não sabe é que a lei alcança essa conduta de forma abrangente, com consequências que vão da esfera criminal à indenização civil, e que a resposta jurídica começa antes mesmo de entrar na Justiça.
                  </p>

                  <Card className="p-6 bg-accent/10 border-accent/20 mb-8">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="text-accent flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold mb-2">Atenção: preserve as provas antes de qualquer coisa</h3>
                        <p className="text-sm text-foreground/80">
                          Não apague mensagens, comentários nem perfis suspeitos. Faça prints com data e hora visíveis, grave vídeos da tela e registre boletim de ocorrência. O prazo para representação criminal é de seis meses a contar do conhecimento do fato, e a prova digital é o principal elemento para o caso.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Eye className="text-primary" size={28} />
                    O que é stalking virtual
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O stalking virtual, também chamado de <em>ciberstalking</em>, é a perseguição reiterada praticada por meios digitais. Diferente de um contato indesejado isolado, o que caracteriza a conduta é a <strong>reiteração</strong> — o padrão persistente de comportamento que ameaça a integridade psicológica da vítima, restringe sua liberdade ou invade sua privacidade de forma sistemática.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Na prática, isso inclui: envio repetido de mensagens não solicitadas, criação de perfis falsos para monitorar ou contatar a vítima, comentários frequentes em publicações, coleta e divulgação de dados pessoais (<em>doxxing</em>), uso de <em>spyware</em> para rastrear localização ou comunicações, e até mobilização de terceiros para assediar a vítima em massa — os chamados <em>raids</em> organizados. O meio pode ser qualquer plataforma digital.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <FileText className="text-primary" size={28} />
                    A lei brasileira: Art. 147-A do Código Penal
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A <strong>Lei nº 14.132/2021</strong> inseriu o artigo 147-A no Código Penal, tipificando o crime de <strong>perseguição</strong>. A redação é direta: "Perseguir alguém, reiteradamente e por qualquer meio, ameaçando-lhe a integridade física ou psicológica, restringindo-lhe a capacidade de locomoção ou, de qualquer forma, invadindo ou perturbando sua esfera de liberdade ou privacidade." A pena é de reclusão de seis meses a dois anos, e multa.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A expressão <strong>"por qualquer meio"</strong> é o que torna a norma plenamente aplicável ao ambiente digital. Não existe uma lista fechada de plataformas ou formas de contato — WhatsApp, Instagram, e-mail, Telegram, fóruns, Discord ou qualquer outro canal pode ser o veículo da perseguição. O que importa é a reiteração da conduta e o efeito sobre a esfera de liberdade ou privacidade da vítima.
                  </p>

                  <blockquote>
                    <p>
                      <strong>Elemento essencial:</strong> para a configuração do crime, a conduta precisa ser <em>reiterada</em>. Um contato isolado, ainda que indesejado, não preenche o tipo penal. O padrão de comportamento persistente é o que distingue o stalking do mero incômodo digital.
                    </p>
                  </blockquote>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Shield className="text-primary" size={28} />
                    Quando a pena aumenta
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O § 1º do artigo 147-A prevê aumento de pena de <strong>metade</strong> em situações agravantes: quando a vítima é criança, adolescente ou idoso; quando o crime é cometido por duas ou mais pessoas, hipótese que alcança os <em>raids</em> organizados e campanhas coletivas de assédio; ou com emprego de arma. Nesses casos, a pena máxima pode chegar a três anos de reclusão.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Além disso, o stalking virtual frequentemente ocorre ao lado de outros crimes. É comum o concurso com ameaça (artigo 147 do CP), crimes contra a honra como injúria e difamação (artigos 138 a 140), invasão de dispositivo informático (artigo 154-A) e registro não autorizado de intimidade sexual (artigo 216-B). Cada conduta autônoma pode ser apurada de forma independente.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <UserX className="text-primary" size={28} />
                    Violência doméstica e medidas protetivas
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Quando o stalking acontece em contexto de violência doméstica — ex-parceiro, cônjuge, familiar com relação de afeto — aplica-se a <strong>Lei Maria da Penha (Lei nº 11.340/2006)</strong>. As medidas protetivas de urgência do artigo 22 podem incluir proibição de contato por qualquer meio eletrônico, proibição de aproximação e monitoramento eletrônico do agressor.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O descumprimento de medida protetiva é crime autônomo, previsto no artigo 24-A do Código Penal, com pena de detenção de três meses a dois anos e ação penal pública incondicionada — ou seja, o Ministério Público pode agir independentemente de representação da vítima.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Scale className="text-primary" size={28} />
                    Responsabilidade civil e tutela inibitória
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Além da esfera criminal, o stalking virtual abre caminho para a <strong>reparação civil</strong>. O dano moral nessa situação é considerado <em>in re ipsa</em> — ou seja, presumido pela própria natureza da conduta. O sofrimento psíquico, a angústia, o medo e a restrição da liberdade digital são inerentes à perseguição e não precisam ser provados individualmente para gerar direito à indenização.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O Código de Processo Civil permite a concessão de <strong>tutelas inibitórias</strong> (artigos 297, 300 e 497): proibição judicial de contato, remoção de conteúdo, bloqueio de contas e preservação de <em>logs</em> para perícia. Essas medidas podem ser obtidas antes mesmo do julgamento do mérito, quando há urgência, e são ferramentas essenciais para interromper a conduta enquanto o processo corre.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Lock className="text-primary" size={28} />
                    O papel das plataformas e a LGPD
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    As plataformas digitais não são espectadoras neutras. O <strong>Marco Civil da Internet</strong> estabelece que a remoção de conteúdo de nudez ou ato sexual sem consentimento pode ser feita mediante <strong>notificação extrajudicial</strong> da vítima (artigo 21), gerando dever imediato de remoção. Para outros conteúdos, em regra exige-se ordem judicial específica (artigo 19), mas isso não impede que a plataforma adote medidas preventivas por suas políticas internas.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A <strong>LGPD (Lei nº 13.709/2018)</strong> entra em cena quando o stalking envolve coleta e exposição de dados pessoais. Os artigos 46 e 48 impõem às plataformas deveres de segurança e notificação em caso de incidente. Quando o <em>doxxing</em> é viabilizado por falha de segurança de uma plataforma, há responsabilidade civil e possibilidade de sanção pela Autoridade Nacional de Proteção de Dados (ANPD).
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6">O que fazer quando o problema acontece</h2>

                  <ol className="space-y-4 mb-12">
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">1.</span>
                      <div>
                        <strong>Preserve as provas imediatamente:</strong> prints com data e hora visíveis, gravação de tela em vídeo e, se possível, ata notarial para prova pré-constituída (CPC, artigo 381).
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">2.</span>
                      <div>
                        <strong>Registre boletim de ocorrência</strong> na Delegacia de Crimes Cibernéticos ou delegacia comum, com representação expressa. O prazo é de seis meses contados do conhecimento do fato (CPP, artigo 38).
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">3.</span>
                      <div>
                        <strong>Solicite medidas cautelares judiciais</strong> (CPC, artigo 294): bloqueio de perfis, preservação de <em>logs</em> e proibição de contato por ordem do juízo.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">4.</span>
                      <div>
                        <strong>Ajuíze ação de indenização</strong> por danos morais presumidos e materiais comprováveis — gastos com tratamento psicológico, segurança digital e outros impactos diretos.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">5.</span>
                      <div>
                        <strong>Se houver vazamento de dados,</strong> registre reclamação na ANPD e notifique a plataforma formalmente para gerar o dever de resposta e responsabilização.
                      </div>
                    </li>
                  </ol>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Hábitos de prevenção digital</h2>

                  <ul className="list-disc pl-6 mb-8 text-foreground/80 space-y-3">
                    <li>
                      <strong>Revise as configurações de privacidade</strong> das suas redes sociais periodicamente e limite quem pode ver sua localização, histórico e contatos.
                    </li>
                    <li>
                      <strong>Ative autenticação em dois fatores</strong> em todas as contas vinculadas ao seu e-mail e nas plataformas que você mais usa.
                    </li>
                    <li>
                      <strong>Desconfie de aplicativos que pedem acesso a localização em tempo real</strong> sem justificativa clara de funcionalidade.
                    </li>
                    <li>
                      <strong>Use e-mails diferentes</strong> para cadastros comerciais e para contas pessoais sensíveis — isso reduz a superfície de ataque em caso de vazamento.
                    </li>
                    <li>
                      <strong>Documente qualquer contato indesejado</strong> desde o início, mesmo que pareça isolado. O padrão de reiteração pode se tornar relevante mais tarde.
                    </li>
                  </ul>

                  <hr />

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    <em>
                      Este artigo tem caráter informativo e não substitui consulta jurídica personalizada. Para avaliar o seu caso concreto, busque orientação profissional adequada.
                    </em>
                  </p>
                </div>

                <div className="mt-16 p-8 rounded-2xl gradient-cyber border border-primary/20 text-center">
                  <h3 className="text-2xl font-bold mb-4">Está sofrendo stalking virtual?</h3>
                  <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                    Nossa equipe especializada em Direito Digital está pronta para orientar você: da preservação das provas à obtenção de medidas protetivas e indenização.
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
