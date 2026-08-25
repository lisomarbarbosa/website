import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Scale, Shield, FileText, Info } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pageTitle =
  "Direito ao Esquecimento: Limites da Remoção de Conteúdo Digital | Lisomar Barbosa | Direito Digital";

const pageDescription =
  "Entenda o direito ao esquecimento na LGPD e no Marco Civil, limites legais, jurisprudência e como solicitar remoção de dados ou conteúdos online com segurança jurídica.";

const pageUrl =
  "https://www.lisomarbarbosa.adv.br/artigos/direito-ao-esquecimento-limites-da-remocao-de-conteudo-digital";

const pageImage =
  "https://images.unsplash.com/photo-1485740112426-0c2549fa8c86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NjIxMTQyfA&ixlib=rb-4.1.0&q=80&w=1080";

const DireitoAoEsquecimentoLimitesDaRemocaoDeConteudoDigital = () => {
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
                    Direito ao Esquecimento: Limites da Remoção de Conteúdo Digital
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>25 Ago 2026</span>
                    <span>•</span>
                    <span>9 min de leitura</span>
                  </div>

                  <img
                    src={pageImage}
                    alt="Direito ao Esquecimento: Limites da Remoção de Conteúdo Digital"
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                    loading="lazy"
                  />
                </header>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                    Com o avanço da conectividade, informações pessoais e conteúdos digitais passaram a permanecer indefinidamente no ambiente virtual, muitas vezes ultrapassando o contexto em que foram publicados. Diante desse cenário, o direito ao esquecimento emerge como um mecanismo de proteção à privacidade e à memória digital, permitindo que indivíduos solicitem a remoção ou desindexação de dados considerados desatualizados, irrelevantes ou excessivamente expostos. No entanto, esse direito não é absoluto e enfrenta limites constitucionais, legais e práticos que precisam ser compreendidos para evitar abusos ou expectativas irreais. Neste artigo, exploraremos os fundamentos jurídicos do direito ao esquecimento no Brasil, especialmente sob a ótica da Lei Geral de Proteção de Dados (LGPD) e do Marco Civil da Internet, além de apresentar orientações práticas para a apresentação de pedidos e os principais obstáculos encontrados na jurisprudência nacional e internacional.
                  </p>

                  <Card className="p-6 bg-accent/10 border-accent/20 mb-8">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="text-accent flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold mb-2">Atenção: documente tudo desde o início</h3>
                        <p className="text-sm text-foreground/80">
                          Guarde cópias de todos os comprovantes, mensagens e respostas relacionadas ao pedido de remoção. A burocracia e o tempo de resposta dos provedores podem variar bastante, e uma documentação clara fortalece seu direito.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Scale className="text-primary" size={28} />
                    Fundamentos Jurídicos do Direito ao Esquecimento
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O direito ao esquecimento tem sua base principal na Lei Geral de Proteção de Dados Pessoais (Lei 13.709/2018), especialmente no artigo 18, que lista como direito do titular o de solicitar a eliminação de dados pessoais tratados com ódio ou em desconformidade com os princípios da lei. Além disso, o artigo 7º, inciso X, assegura o direito de revogação do consentimento e a eliminação dos dados tratados. Essas disposições permitem que o cidadão pleiteie a não continuidade do tratamento de informações que já não sejam necessárias para as finalidades declaradas.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    No âmbito do Marco Civil da Internet (Lei 12.965/2014), o direito à privacidade e à liberdade de expressão são equilibrados, mas não há uma menção expressa ao esquecimento. Ainda assim, a jurisprudência do STF tem reconhecido essa diretriz indiretamente, especialmente em casos envolvendo exposição indevida de imagens ou informações íntimas. O artigo 5º, LXXIV, do Código de Defesa do Consumidor também pode ser invocado quando o fornecedor de serviço falha em proteger dados pessoais, configurando prática abusiva.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Internacionalmente, a jurisprudência da União Europeia, como no caso Google Spain (2014), reconheceu amplamente o direito ao esquecimento, exigindo que mecanismos de busca excluam referências a conteúdos considerados inadequados após um balanço entre interesses. No Brasil, ainda não há uma súmula ou repercussão semelhante, mas decisões como a do TJSP em processo de desindexação de notícias sobre menores de idade vão criando precedentes úteis.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Shield className="text-primary" size={28} />
                    Limites Constitucionais e Práticos
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Apesar do reconhecimento legal, o direito ao esquecimento encontra limites fundamentais. A Constituição Federal assegura a liberdade de expressão e o acesso à informação, especialmente nos artigos 5º, IX, e 5º, X. Assim, o direito à privacidade não pode prevalecer sobre o interesse público em conhecer informações relevantes, como casos de corrupção, crimes graves ou atuações políticas. O STF tem enfatizado que a remoção de conteúdo não pode ser automática e depende de uma análise caso a caso, ponderando os direitos envolvidos.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Outro limite prático está na própria estrutura da internet: os dados replicados em múltiplos servidores, backups e arquivos de terceiros dificultam a remoção completa. Provedores de internet, portais de notícias e redes sociais costumam exigir formulários específicos, prazos e justificativas detalhadas. Além disso, a jurisprudência brasileira ainda é fragmentada, sem uma linha diretriz nacional, o que gera decisões contraditórias e insegurança jurídica para os cidadãos que buscam exerceer esse direito.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A jurisprudência do Tribunal de Justiça de São Paulo, em decisão de 2021, reconheceu parcialmente um pedido de desindexação de notícias sobre um político que embora não envolvesse crime, afetava sua imagem após o tempo. A decisão destacou a importância do princípio da proporcionalidade, mas rejeitou a remoção total por considerar o conteúdo de interesse público. Esse tipo de julgamento mostra que o direito ao esquecimento é condicional e exige equilíbrio entre privacidade e transparência.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <FileText className="text-primary" size={28} />
                    Como Solicitar a Remoção de Conteúdo Digital
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Para exercer o direito ao esquecimento, é necessário identificar o responsável pelo tratamento dos dados ou pela publicação do conteúdo. Nos termos do artigo 18 da LGPD, o titular deve entrar em contato direto com o controlador ou encarregado de dados, apresentando justificativa clara, documentos de identidade e comprovação do dano à honra, à privacidade ou à imagem. O órgão Nacional de Proteção de Dados (ANPD) também pode ser acionado para mediar a solução quando não houver resposta ou a resposta for negativa injustificadamente.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Em casos de redes sociais, portais de notícias ou mecanismos de busca, é fundamental usar os canais oficiais de reportação de conteúdo, como formulários de contato, ferramentas de denúncia ou e-mails corporativos. A petição inicial deve conter elementos objetivos: link direto ao conteúdo, motivo da remoção (ex: dado ultrapassado, irrelevante, exposta sem consentimento), e o direito legal que embasaa o pedido. O prazo legal para resposta é de até 15 dias, prorrogáveis por igual período, conforme a LGPD.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Se o pedido for negado, o titular pode buscar a via judicial. O artigo 37 da LGPD permite ação judicial para exigir cumprimento de dizeres, e o Código de Processo Civil (CPC) oferece mecanismos como a tutela de urgência. Em casos de exposição de imagens de menores, por exemplo, a ação é mais favorável, conforme entendimento do STF no RE 721.255, que reconheceu a proteção especial da imagem infantil como direito fundamental.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <AlertTriangle className="text-primary" size={28} />
                    Jurisprudência e Precedentes Relevantes
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A jurisprudência brasileira ainda está em formação sobre o direito ao esquecimento, mas alguns precedentes iluminam o caminho. Em 2020, o Tribunal de Justiça do Rio Grande do Sul decidiu favoravelmente a um cidadão que pediu a remoção de notícias sobre uma prisão em flagrante, considerando que o conteúdo já não tinha relevância social após o trânsito em julgado. O tribunal ponderou entre a honra do citado e o direito à informação, concluindo que a proteção da imagem prevalecia no caso concreto.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    No âmbito federal, o STF tem tratado de temas correlatos ao esquecimento digital, como a proteção de dados pessoais e a remoção de imagens íntimas não consentidas. No RE 797.872, o plenário reconheceu que a exposição indevida de dados íntimos configura violação ao direito à privacidade, sendo cabível a ordem de remoção imediata. Essas decisões criam um arcabouço que, embora não trate diretamente do esquecimento, fortalece o direito à proteção de informações pessoais.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Internacionalmente, a jurisprudência da Corte Europeia dos Direitos Humanos (CEDH) e da Comissão Europeia de Direitos Humanos tem sido extensa sobre o tema. Casos como o Delfi AS v. Estônia mostram como plataformas digitais podem ser responsabilizadas por não atuar com celeridade sobre conteúdos ofensivos. No Brasil, ainda há espaço para o desenvolvimento de um entendimento mais consistente, especialmente com a atuação crescente da ANPD.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Info className="text-primary" size={28} />
                    Riscos e Desafios do Direito ao Esquecimento
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Embora o direito ao esquecimento seja essencial para a proteção da dignidade e da privacidade, ele pode gerar riscos se mal aplicado. Um uso excessivo ou indiscriminado pode levar à censura, suprimir a memória histórica e dificultar o acesso à informação pública. O STF tem alertado para a necessidade de que qualquer limitação à liberdade de expressão seja estritamente proporcional e fundamentada, evitando abusos por parte de autoridades ou particulares com interesses conflitantes.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Outro desafio é a diferença de tratamento entre plataformas digitais e veículos de comunicação tradicionais. Enquanto portais de notícias e redes sociais costumam ter mecanismos formais de remoção, a imprensa escrita ou audiovisual tem maior autonomia e menos obrigações legais diretas. Isso cria uma desigualdade na eficácia do direito ao esquecimento, dependendo do meio utilizado para a divulgação do conteúdo indesejado.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Também é preciso considerar o papel da tecnologia no controle de dados. Algoritmos de indexação, arquivamento automático e inteligência artificial podem recriar ou republicar conteúdos mesmo após a remoção solicitada. Nesse contexto, a regulamentação da ANPD e o avanço da Lei de Proteção de Dados precisam ir acompanhando a evolução tecnológica para garantir efetividade ao direito ao esquecimento no Brasil.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6">O que fazer quando o problema acontece</h2>

                  <ol className="space-y-4 mb-12">

                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">1.</span>
                      <div>
                        <strong>Identifique o responsável pelo conteúdo:</strong> Localize o controlador de dados, editor ou plataforma onde o conteúdo está hospedado para direcionar o pedido à instância correta.
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">2.</span>
                      <div>
                        <strong>Reúna documentos e justificativa:</strong> Prepare cópias de documentos pessoais, links diretos ao conteúdo e uma justificativa clara baseada na LGPD ou no CPC.
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">3.</span>
                      <div>
                        <strong>Envie o pedido por escrito:</strong> Use canais oficiais como formulários de contato, e-mails corporativos ou cartas formais com aviso de recebimento.
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">4.</span>
                      <div>
                        <strong>Acompanhe o prazo de resposta:</strong> O controlador tem até 15 dias para responder, prorrogáveis por igual período conforme a LGPD.
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">5.</span>
                      <div>
                        <strong>Busque a ANPD ou o Poder Judiciário:</strong> Se o pedido for negado sem justificativa, entre em contato com a ANPD ou inicie uma ação judicial para exigir o cumprimento.
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">6.</span>
                      <div>
                        <strong>Documente todas as interações:</strong> Guarde cópias de todos os comprovantes, respostas e protocolos para usar como evidência em eventual litígio.
                      </div>
                    </li>
                  </ol>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Hábitos de prevenção</h2>

                  <ul className="list-disc pl-6 mb-8 text-foreground/80 space-y-3">

                    <li>
                      <strong>Cuidado ao compartilhar informações pessoais</strong> Evite publicar dados sensíveis ou imagens íntimas em redes sociais, pois mesmo com privacidade restringida, podem ser acessados indevidamente.
                    </li>

                    <li>
                      <strong>Use configurações de privacidade rigorosas</strong> Ajuste as configurações de visibilidade nas plataformas digitais para limitar o acesso ao seu conteúdo apenas a pessoas autorizadas.
                    </li>

                    <li>
                      <strong>Monitore menções à sua imagem online</strong> Ferramentas de alerta digital podem ajudar a identificar rapidamente quando seu nome ou imagem aparece em novos conteúdos na internet.
                    </li>

                    <li>
                      <strong>Evite publicar em sites de notícias anônimos</strong> Portais sem verificação de identidade podem expor suas informações sem controle, dificultando a remoção posterior.
                    </li>

                    <li>
                      <strong>Mantenha cópias de tudo publicado</strong> Ter registros de quando e onde publicou ajuda a comprovar a autoria e a data de exposição em caso de necessidade de remoção.
                    </li>
                  </ul>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Considerações finais</h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O direito ao esquecimento é um passo importante na proteção da privacidade no mundo digital, mas deve ser exercido com discernimento e respeito aos limites legais. A jurisprudência brasileira ainda precisa se consolidar, mas o cidadão já pode agir com base na LGPD e no Marco Civil, sempre documentando e fundamentando seus pedidos.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Com a evolução da regulamentação e o fortalecimento da ANPD, espera-se um avanço maior na efetividade desse direito. Enquanto isso, a melhor estratégia é prevenir: cuidar do que é compartilhado online e manter controle sobre a própria imagem e dados pessoais.
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

export default DireitoAoEsquecimentoLimitesDaRemocaoDeConteudoDigital;
