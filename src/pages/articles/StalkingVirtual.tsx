import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertTriangle,
  Eye,
  FileText,
  Shield,
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
  "Entenda o que caracteriza o stalking virtual, como a Lei nº 14.132/2021 tipifica o crime de perseguição no ambiente digital, quais as consequências penais e civis, o papel das plataformas e o que fazer se você está sendo vítima dessa conduta.";

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
                    <span>24 Ago 2026</span>
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
                    Uma mensagem que você não pediu. Depois outra. Um perfil desconhecido que aparece nos seus seguidores. Comentários em fotos antigas. A sensação crescente de que alguém monitora o que você publica, onde você está e com quem você fala. Esse padrão tem nome — <strong>stalking virtual</strong> — e, desde 2021, tem tipificação penal expressa no Brasil. O problema é que muita gente ainda confunde a conduta com "excesso de interesse" ou trata o assunto como algo menor, digital e, portanto, menos grave. Não é. A perseguição no ambiente online causa dano psicológico real, restringe a liberdade de quem a sofre e pode escalar para ameaças físicas. A resposta jurídica existe, é robusta e começa antes mesmo de entrar na Justiça.
                  </p>

                  <Card className="p-6 bg-accent/10 border-accent/20 mb-8">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="text-accent flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold mb-2">Atenção: preserve as provas antes de qualquer coisa</h3>
                        <p className="text-sm text-foreground/80">
                          Não apague mensagens, comentários nem perfis suspeitos. Faça prints com data e hora visíveis, grave vídeos da tela e registre boletim de ocorrência assim que perceber o padrão de reiteração. O prazo para representação criminal é de seis meses a contar do conhecimento do fato, e a prova digital é o principal elemento para sustentar o caso.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Eye className="text-primary" size={28} />
                    O que é stalking virtual
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O stalking virtual, também chamado de <em>ciberstalking</em>, é a perseguição reiterada praticada por meios digitais. Diferente de um contato indesejado isolado, o que caracteriza a conduta é a <strong>reiteração</strong> — o padrão persistente de comportamento que ameaça a integridade psicológica da vítima, restringe sua liberdade ou invade sua privacidade de forma sistemática. A chave está na repetição e no efeito: uma mensagem não solicitada é incômoda; uma sequência interminável de mensagens, monitoramentos e aparições em diferentes plataformas configura perseguição.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Na prática, o stalking virtual inclui: envio repetido de mensagens não solicitadas por qualquer canal digital, criação de perfis falsos para monitorar ou contatar a vítima sem que ela perceba, comentários frequentes e obsessivos em publicações antigas, coleta e divulgação pública de dados pessoais como endereço, local de trabalho e rotina — conduta conhecida como <em>doxxing</em> — uso de <em>spyware</em> para rastrear localização ou interceptar comunicações, e a mobilização organizada de terceiros para assediar a vítima em massa, os chamados <em>raids</em> ou linchamentos virtuais. O meio pode ser qualquer plataforma: WhatsApp, Instagram, Telegram, e-mail, fóruns, Discord, jogos online ou qualquer canal de comunicação digital.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    É importante distinguir o stalking de comportamentos que, embora inconvenientes, não alcançam o limiar jurídico da perseguição. Seguir alguém nas redes sociais, curtir publicações ou enviar uma mensagem sem resposta não configura, por si só, a conduta. O que transforma o comportamento em crime é a persistência, a escala e o efeito concreto sobre a vida da vítima — o medo, a alteração de rotina, o isolamento digital e o sofrimento psicológico decorrentes da sensação constante de estar sendo vigiada.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <FileText className="text-primary" size={28} />
                    A lei brasileira: Art. 147-A do Código Penal
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A <strong>Lei nº 14.132/2021</strong> inseriu o artigo 147-A no Código Penal, tipificando expressamente o crime de <strong>perseguição</strong>. A redação é abrangente: "Perseguir alguém, reiteradamente e por qualquer meio, ameaçando-lhe a integridade física ou psicológica, restringindo-lhe a capacidade de locomoção ou, de qualquer forma, invadindo ou perturbando sua esfera de liberdade ou privacidade." A pena prevista é de reclusão de seis meses a dois anos, além de multa, e a ação penal depende de representação da vítima.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A expressão <strong>"por qualquer meio"</strong> é o que torna a norma plenamente aplicável ao ambiente digital, sem necessidade de uma listagem exaustiva de plataformas ou tecnologias. Não existe um rol fechado de canais — o que importa é a reiteração da conduta e o efeito sobre a esfera de liberdade ou privacidade da vítima. Isso significa que a lei acompanha a evolução tecnológica: novas plataformas que surgirem nos próximos anos estarão igualmente abrangidas pelo tipo penal, desde que a conduta preencha os elementos essenciais.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Antes da Lei nº 14.132/2021, a perseguição virtual era enquadrada de forma fragmentada em outros tipos penais — ameaça, constrangimento ilegal, crimes contra a honra — o que dificultava a resposta jurídica adequada. A criação de um tipo específico para a perseguição foi um avanço relevante, pois permite que a conduta seja apurada de forma autônoma, com a possibilidade de cumulação com outros crimes que tenham ocorrido no mesmo contexto.
                  </p>

                  <blockquote>
                    <p>
                      <strong>Elemento essencial:</strong> para a configuração do crime, a conduta precisa ser <em>reiterada</em>. Um contato isolado, ainda que indesejado, não preenche o tipo penal. O padrão de comportamento persistente é o que distingue o stalking do mero incômodo digital — e é exatamente por isso que documentar desde o primeiro episódio é tão importante.
                    </p>
                  </blockquote>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Shield className="text-primary" size={28} />
                    Quando a pena aumenta
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O § 1º do artigo 147-A prevê aumento de pena de <strong>metade</strong> em situações agravantes: quando a vítima é criança, adolescente ou idoso; quando o crime é cometido por duas ou mais pessoas — hipótese que alcança diretamente os <em>raids</em> organizados e as campanhas coletivas de assédio digital — ou com emprego de arma. Nesses casos, a pena máxima pode chegar a três anos de reclusão. A previsão sobre pluralidade de agentes é particularmente relevante no contexto das redes sociais, onde grupos organizados mobilizam centenas de pessoas para atacar uma única vítima de forma coordenada.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Além disso, o stalking virtual frequentemente ocorre ao lado de outros crimes, e cada conduta autônoma pode ser apurada de forma independente. É comum o concurso com ameaça (artigo 147 do CP), crimes contra a honra como injúria e difamação (artigos 138 a 140), invasão de dispositivo informático (artigo 154-A), registro não autorizado de intimidade sexual (artigo 216-B) e divulgação de cena de estupro ou de nudez sem consentimento (artigo 218-C). A identificação correta de todos os crimes em concurso é tarefa do advogado, e pode impactar significativamente a pena aplicável e as medidas cautelares disponíveis.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <UserX className="text-primary" size={28} />
                    Violência doméstica e medidas protetivas
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Quando o stalking acontece em contexto de violência doméstica — ex-parceiro, cônjuge, familiar ou pessoa com relação de afeto — aplica-se a <strong>Lei Maria da Penha (Lei nº 11.340/2006)</strong>, que amplia consideravelmente as ferramentas de proteção disponíveis. As medidas protetivas de urgência do artigo 22 podem incluir proibição de contato por qualquer meio eletrônico, proibição de aproximação física e monitoramento eletrônico do agressor. Essas medidas são concedidas pelo juiz com rapidez, muitas vezes em regime de plantão, e seu descumprimento constitui crime autônomo.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O descumprimento de medida protetiva é previsto no artigo 24-A do Código Penal, com pena de detenção de três meses a dois anos e ação penal pública incondicionada — ou seja, o Ministério Público pode agir independentemente de nova representação da vítima. Isso significa que, uma vez obtida a medida protetiva, qualquer violação pode ser denunciada e processada sem depender da iniciativa ou da coragem da pessoa perseguida em comparecer novamente à delegacia. A proteção, nesse caso, passa a ser dever do Estado.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Scale className="text-primary" size={28} />
                    Responsabilidade civil e tutela inibitória
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Além da esfera criminal, o stalking virtual abre caminho para a <strong>reparação civil</strong> por danos morais e materiais. O dano moral nessa situação é considerado <em>in re ipsa</em> — presumido pela própria natureza da conduta. O sofrimento psíquico, a angústia, o medo, a restrição da liberdade digital e a necessidade de alterar rotinas e hábitos para se proteger são inerentes à perseguição e não precisam ser provados individualmente para gerar direito à indenização. Basta demonstrar a ocorrência da conduta e seu padrão de reiteração.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Os danos materiais também são ressarcíveis: gastos com tratamento psicológico, assessoria de segurança digital, troca de dispositivos comprometidos, honorários advocatícios e qualquer outro prejuízo financeiro diretamente decorrente da perseguição podem ser incluídos no pedido indenizatório. Em casos mais graves, onde a vítima precisou se afastar do trabalho ou mudar de residência, o escopo do dano material pode ser significativo.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O Código de Processo Civil permite a concessão de <strong>tutelas inibitórias</strong> (artigos 297, 300 e 497): proibição judicial de contato, remoção de conteúdo, bloqueio de contas nas plataformas e preservação de <em>logs</em> para perícia digital. Essas medidas podem ser obtidas em caráter de urgência, antes mesmo do julgamento do mérito, quando há fundamento razoável e risco de dano irreparável — e são ferramentas essenciais para interromper a conduta enquanto o processo principal ainda corre.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Lock className="text-primary" size={28} />
                    O papel das plataformas e a LGPD
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    As plataformas digitais não são espectadoras neutras e têm obrigações jurídicas concretas nesse contexto. O <strong>Marco Civil da Internet (Lei nº 12.965/2014)</strong> estabelece que a remoção de conteúdo de nudez ou ato sexual sem consentimento pode ser feita mediante simples <strong>notificação extrajudicial</strong> da vítima (artigo 21), gerando dever imediato de remoção, independentemente de ordem judicial. Para outros conteúdos que configurem perseguição, em regra exige-se ordem judicial específica (artigo 19), mas isso não impede que a plataforma adote medidas preventivas por suas políticas internas de uso — e cada vez mais as grandes plataformas têm instrumentos próprios de denúncia e bloqueio que podem ser acionados em paralelo à via judicial.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong> entra em cena quando o stalking envolve coleta, exposição ou uso indevido de dados pessoais. Os artigos 46 e 48 da LGPD impõem às plataformas deveres de segurança técnica e de notificação à Autoridade Nacional de Proteção de Dados (ANPD) em caso de incidente de segurança com potencial de causar risco ou dano aos titulares. Quando o <em>doxxing</em> é viabilizado por uma falha de segurança da plataforma — vazamento de dados cadastrais, por exemplo — há responsabilidade civil do controlador e possibilidade de sanção administrativa pela ANPD, que pode aplicar multas de até 2% do faturamento da empresa, limitado a R$ 50 milhões por infração.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6">O que fazer quando o problema acontece</h2>

                  <ol className="space-y-4 mb-12">
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">1.</span>
                      <div>
                        <strong>Preserve as provas imediatamente:</strong> prints com data e hora visíveis, gravação de tela em vídeo e, se possível, ata notarial para prova pré-constituída com valor probatório reforçado (CPC, artigo 381). Não apague nada, mesmo que o conteúdo seja perturbador.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">2.</span>
                      <div>
                        <strong>Registre boletim de ocorrência</strong> na Delegacia de Crimes Cibernéticos do seu estado ou na delegacia comum, com representação expressa contra o autor. O prazo decadencial é de seis meses contados do conhecimento do fato (CPP, artigo 38).
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">3.</span>
                      <div>
                        <strong>Solicite medidas cautelares judiciais urgentes</strong> (CPC, artigo 294 e seguintes): bloqueio de perfis, preservação de <em>logs</em> pelas plataformas e proibição judicial de contato. Se houver contexto de violência doméstica, requeira medida protetiva de urgência com base na Lei Maria da Penha.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">4.</span>
                      <div>
                        <strong>Ajuíze ação de indenização</strong> por danos morais presumidos e materiais comprováveis — gastos com tratamento psicológico, segurança digital, honorários e outros impactos financeiros diretos.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">5.</span>
                      <div>
                        <strong>Se houver vazamento ou exposição de dados pessoais,</strong> registre reclamação formal na ANPD e notifique a plataforma por escrito, gerando o dever legal de resposta e o início do prazo para responsabilização.
                      </div>
                    </li>
                  </ol>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Hábitos de prevenção digital</h2>

                  <ul className="list-disc pl-6 mb-8 text-foreground/80 space-y-3">
                    <li>
                      <strong>Revise as configurações de privacidade</strong> das suas redes sociais periodicamente — limite quem pode ver sua localização, seus seguidores, seu histórico de publicações e suas informações de contato.
                    </li>
                    <li>
                      <strong>Ative autenticação em dois fatores</strong> em todas as contas vinculadas ao seu e-mail e nas plataformas que você mais usa, especialmente redes sociais e serviços de mensagens.
                    </li>
                    <li>
                      <strong>Desconfie de aplicativos que pedem acesso à localização em tempo real</strong> sem justificativa clara de funcionalidade. Revogue permissões de localização de apps que não precisam dela para funcionar.
                    </li>
                    <li>
                      <strong>Use endereços de e-mail diferentes</strong> para cadastros comerciais e para contas pessoais sensíveis — isso reduz a superfície de ataque em caso de vazamento de dados por terceiros.
                    </li>
                    <li>
                      <strong>Documente qualquer contato indesejado desde o primeiro episódio,</strong> mesmo que pareça isolado. O padrão de reiteração pode se tornar juridicamente relevante antes do que você imagina, e a prova mais antiga tem mais valor probatório.
                    </li>
                  </ul>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Considerações finais</h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O stalking virtual não é um aborrecimento passageiro nem uma questão menor por acontecer na tela — é uma conduta com tipificação penal, consequências civis significativas e impacto real sobre a liberdade, a saúde psíquica e a segurança de quem a sofre. A Lei nº 14.132/2021 deu ao ordenamento brasileiro uma ferramenta direta e abrangente para enfrentar essa realidade, e o Marco Civil da Internet, a LGPD e o direito civil completam o arsenal disponível para a vítima agir em diferentes frentes simultaneamente.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Agir cedo faz diferença concreta. Preservar provas desde o primeiro episódio, registrar a ocorrência antes do prazo decadencial e buscar orientação jurídica especializada são os primeiros passos para interromper a conduta, proteger os dados pessoais e garantir reparação pelos danos causados. Silenciar ou apagar evidências na esperança de que o problema cesse por si só costuma ter o efeito contrário — e pode comprometer a possibilidade de ação judicial futura. Diante de perseguição digital, informação e estratégia jurídica são os instrumentos mais eficazes.
                  </p>

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
