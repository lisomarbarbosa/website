import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Cpu, Shield, Scale, Lock } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pageTitle =
  "Difamação nas redes sociais e responsabilidade jurídica | Lisomar Barbosa | Direito Digital";

const pageDescription =
  "Entenda como a difamação digital gera responsabilidade civil e penal, direitos de resposta e proteção de dados pessoais.";

const pageUrl =
  "https://www.lisomarbarbosa.adv.br/artigos/difamacao-nas-redes-sociais-e-responsabilidade-juridica";

const pageImage =
  "https://images.unsplash.com/photo-1776243365952-1f103dea9bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NjE4MjkzfA&ixlib=rb-4.1.0&q=80&w=1080";

const DifamacaoNasRedesSociaisEResponsabilidadeJuridica = () => {
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
                    Difamação nas redes sociais e responsabilidade jurídica
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>25 Ago 2026</span>
                    <span>•</span>
                    <span>8 min de leitura</span>
                  </div>

                  <img
                    src={pageImage}
                    alt="Difamação nas redes sociais e responsabilidade jurídica"
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                    loading="lazy"
                  />
                </header>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                    As redes sociais se tornaram o principal canal para a disseminação de informações, mas também para a prática de difamação. Quando alguém publica mentiras ou ofensas que atacam a honra de outra pessoa, as consequências vão muito além da internet. Este artigo explica a definição legal de difamação, a responsabilidade civil e penal do autor, os direitos de resposta previstos no Marco Civil da Internet e a proteção de dados pessoais sob a LGPD. Ao final, você encontrará orientações práticas para coibir, reagir e prevenir casos de difamação online.
                  </p>

                  <Card className="p-6 bg-accent/10 border-accent/20 mb-8">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="text-accent flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold mb-2">Atenção: documente tudo desde o início</h3>
                        <p className="text-sm text-foreground/80">
                          Guarde prints, URLs e horários das publicações ofensivas. Esses elementos são provas essenciais para qualquer ação judicial ou denúncia à autoridade competente.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Cpu className="text-primary" size={28} />
                    O que é difamação segundo o Direito
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A difamação é tipificada no Código Penal como crime de ação penal pública, previsto no artigo 135, que define o crime de injuriar outrem, por palavra, escrito ou gesto, a honra ou o decoro de alguém. Quando a ofensa é feita por publicação em qualquer meio, incluindo redes sociais, o autor responde também pela forma como divulgou o conteúdo difamador. A redação do artigo 135 do CP estabelece penas de reprimenda ou detenção de seis meses a um ano, com aumentando em caso de reincidência ou concurso de autores. O direito brasileiro aplica a regra tanto para pessoas físicas quanto para empresas que se dedicam à divulgação de notícias falsas.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Além da esfera penal, a difamação também gera responsabilidade civil, regulada pelo Código de Defesa do Consumidor e pelo Código Civil. O artigo 18 do CDC protege o consumidor contra práticas abusivas, incluindo a divulgação de informações enganosas que causem dano moral. No âmbito civil, o autor da ofensa responde por danos morais e materiais, conforme previsto nos artigos 186 e 927 do Código Civil. A jurisprudência do Superior Tribunal de Justiça tem reconhecido a obrigação de indenizar o dano moral decorrente de publicações difamadoras nas redes sociais, fixando valores proporcionais à gravidade e ao alcance da ofensa.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Shield className="text-primary" size={28} />
                    Responsabilidade civil e moral na internet
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A responsabilidade civil por difamação nas redes sociais é regulada, em parte, pelo Marco Civil da Internet, aprovado pela Lei 12.965/2014. O artigo 10 desse marco estabelece que o provedor de serviços de internet não responde pelo conteúdo generido pelo usuário, exceto quando for notificado judicialmente para retirar material ofensivo. Assim, o autor da publicação difamadora é o responsável direto pelo dano causado, podendo ser citado em ação de indenização por danos morais. O STF, em decisões sobre casos de fake news, reforçou que a liberdade de expressão não pode ser usada para atacar a honra alheia.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Para que o ofendido obtenha reparação, é necessário comprovar a publicação, a identidade do autor e o prejuízo sofrido. O artigo 186 do Código Civil impõe a obrigação de reparar o dano causado por ato ilícito, enquanto o artigo 927 fixa a indenização por danos morais e materiais. A jurisprudência do STJ tem fixado valores variados, dependendo da gravidade da ofensa, do número de visualizações e do impacto psicológico sofrido pelo ofendido. A apresentação de provas como prints, testemunhas e laudo psicológico fortalece o pedido de indenização.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <AlertTriangle className="text-primary" size={28} />
                    Direitos de resposta e retratação
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O Marco Civil da Internet, em seu artigo 19, reconhece o direito de resposta e de retratação para o usuário que teve seu conteúdo indevidamente removido ou que sofreu ofensa na internet. Quando alguém é difamado em uma rede social, pode exigir a publicação de um comunicado de retratação, conforme orientação do Conselho de Justiça Federal. A Lei 12.965/2014 também prevê, no artigo 12, mecanismos de notificação e resposta entre provedores e usuários, permitindo que o ofendido peça a remoção do conteúdo ofensivo.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A prática do direito de resposta deve ser exercida junto ao autor da publicação ou ao órgão competente, conforme regulamentação da justiça estadual. A jurisprudência do STF tem destacado a importância de equilibrar a liberdade de expressão com o direito à honra, assegurando que o ofendido possa repor sua imagem sem censurar o debate público. O não cumprimento da ordem judicial para remoção de conteúdo difamador pode gerar multa diária, conforme disposto no artigo 10 do Marco Civil.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Scale className="text-primary" size={28} />
                    Proteção de dados pessoais e LGPD
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A divulgação de dados pessoais durante uma campanha difamatória viola a Lei Geral de Proteção de Dados, Lei 13.709/2018. O artigo 5º da LGPD define como dado pessoal qualquer informação que identifique uma pessoa natural, e a publicação de dados sem consentimento configura infração. Quando a difamação inclui informações sensíveis, como saúde ou vida sexual, o tratamento ilícito é considerado agravado, passível de multa administrativa ao responsável pelo site ou plataforma. O ofendido pode acionar a Autoridade Nacional de Proteção de Dados para solicitar a bloqueio do conteúdo e a notificação do provedor.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A LGPD também assegura o direito ao esquecimento, previsto no artigo 18, permitindo que a pessoa solicite a remoção de informações desatualizadas ou ofensivas. No entanto, essa faculdade não pode ser usada para apagar fatos relevantes ao interesse público. A jurisprudência do STF tem equilibrado o direito à honra com a proteção de dados, reconhecendo que a publicação de dados pessoais em contexto difamatório é passível de sanção tanto administrativa quanto penal, conforme artigo 33 da LGPD.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Lock className="text-primary" size={28} />
                    Como se defender e buscar justiça
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O ofendido deve primeiro tentar resolver a questão de forma amigável, solicitando a remoção do conteúdo e a publicação de uma retratação. Caso isso não seja atendido, a vias legais disponíveis incluem a ação de indenização por danos morais e materiais, conforme artigo 186 do Código Civil, e a denúncia ao Ministério Público para investigação penal. O artigo 12 da Lei 12.965/2014 permite a notificação extrajudicial ao provedor para a retirada do conteúdo, sendo eficaz quando a plataforma colabora com a justiça. A apresentação de provas é essencial: prints, testemunhas e laudo psicológico comprovam o impacto da ofensa.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Quando o difamador age com intenção de lucrar com o conteúdo ofensivo, como em blogs ou canais pagos, a responsabilidade civil e penal é agravada. O Código de Defesa do Consumidor, no artigo 14, permite a aplicação de multa ao fornecedor de serviço que não coopere com a remoção de conteúdo ilegal. A jurisprudência do STJ tem fixado valores elevados de indenização em casos de difamação corporativa, reconhecendo o prejuízo ao nome comercial e à imagem da empresa. O acompanhamento de especialistas em direito digital facilita a escolha da estratégia mais adequada ao caso concreto.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Cpu className="text-primary" size={28} />
                    Prevenção e boas práticas online
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Para evitar práticas difamadoras, é fundamental que empresas e profissionais de comunicação sigam as normas éticas estabelecidas pelo Conselho Federal de Jornalismo e pela Associação Brasileira de Jornalismo. A divulgação de informações deve ser sempre verificada com fontes confiáveis, evitando a reprodução de rumores ou notícias falsas. O uso de termos ofensivos ou acusações sem provas constitui infração tanto ética quanto legal, sujeitando o profissional à perda de registro e à responsabilidade civil. A LGPD, no artigo 46, recomenda a adoção de medidas técnicas e organizativas para prevenir o tratamento ilícito de dados pessoais.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Plataformas digitais também têm o dever de moderar conteúdos, conforme diretriz do artigo 23 do Marco Civil da Internet, que incentiva a autogestão da comunidade. A implementação de algoritmos de detecção de conteúdo ofensivo e canais de denúncia anônimos contribuem para a prevenção de difamação. O fomento à educação digital nas escolas e empresas é essencial para conscientizar os usuários sobre os riscos de compartilhar informações sem verificação. A cultura do respeito à honra e da liberdade de expressão equilibrada deve nortar todas as interações online.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6">O que fazer quando o problema acontece</h2>

                  <ol className="space-y-4 mb-12">

                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">1.</span>
                      <div>
                        <strong>Documente a ofensa:</strong> Tire prints, salve URLs e registre horários para usar como prova.
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">2.</span>
                      <div>
                        <strong>Notifique o provedor:</strong> Envie comunicado ao responsável da rede social exigindo remoção do conteúdo.
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">3.</span>
                      <div>
                        <strong>Busque orientação jurídica:</strong> Consulte advogada especialista para avaliar ação de indenização ou denúncia penal.
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">4.</span>
                      <div>
                        <strong>Exija retratação:</strong> Solicite publicação de comunicado de retratação para reparar sua imagem.
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">5.</span>
                      <div>
                        <strong>Denuncie à autoridade:</strong> Acione o Ministério Público ou a ANPD conforme o caso.
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">6.</span>
                      <div>
                        <strong>Mantenha controle de danos:</strong> Guarde laudos, recibos e documentos que comprovem o prejuízo sofrido.
                      </div>
                    </li>
                  </ol>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Hábitos de prevenção</h2>

                  <ul className="list-disc pl-6 mb-8 text-foreground/80 space-y-3">

                    <li>
                      <strong>Verifique fontes antes de compartilhar</strong> Confirme informações com veículos confiáveis para evitar espalhar notícias falsas.
                    </li>

                    <li>
                      <strong>Evite ofensas e acusações sem provas</strong> Comentários que atacam a honra podem gerar responsabilidade civil e penal.
                    </li>

                    <li>
                      <strong>Use canais oficiais para denúncias</strong> Plataformas e órgãos públicos oferecem mecanismos seguros de notificação.
                    </li>

                    <li>
                      <strong>Eduque a equipe sobre ética digital</strong> Treinamentos prevenem erros e protegem a reputação da empresa.
                    </li>

                    <li>
                      <strong>Monitore menções à sua marca ou nome</strong> Ferramentas de monitoramento ajudam a reagir rapidamente a ofensas.
                    </li>

                    <li>
                      <strong>Respeite a LGPD ao tratar dados</strong> Não publique informações pessoais sem consentimento do titular.
                    </li>
                  </ul>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Considerações finais</h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A difamação nas redes sociais exige atenção tanto do ofendido quanto do autor, pois as consequências legais podem ser graves. Com informações e orientação jurídica adequada, é possível proteger a honra e buscar justiça. A responsabilidade digital deve guiar todas as interações na internet.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A evolução da legislação e a jurisprudência do STF e STJ mostram que o Direito está se adaptando às novas formas de ofensa à honra. Manter-se informado e buscar apoio profissional são passos essenciais para enfrentar qualquer situação de difamação online.
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

export default DifamacaoNasRedesSociaisEResponsabilidadeJuridica;
