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
  "Stalking virtual: o que é, como identificar e quais as consequências jurídicas no Brasil | Lisomar Barbosa | Direito Digital";

const pageDescription =
  "Entenda o que caracteriza o stalking virtual, como a Lei nº 14.132/2021 tipifica o crime de perseguição no ambiente digital, quando a pena aumenta, o papel da LGPD e do Marco Civil da Internet, e o que fazer se você está sendo vítima dessa conduta.";

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
                    Stalking virtual: o que é, como identificar e quais as consequências jurídicas no Brasil
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>24 Ago 2026</span>
                    <span>•</span>
                    <span>10 min de leitura</span>
                  </div>

                  <img
                    src={pageImage}
                    alt="Pessoa olhando para a tela do celular em ambiente escuro, representando perseguição digital"
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                    loading="lazy"
                  />
                </header>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                    Uma mensagem que você não pediu. Depois outra. E mais outra. Um perfil desconhecido que aparece entre seus seguidores, visualiza tudo o que você publica e volta a comentar em fotos antigas, como se estivesse marcando presença de propósito. Aos poucos, o que parecia apenas um incômodo digital passa a gerar sensação real de vigilância, medo e perda de controle. Esse padrão de comportamento tem nome: <strong>stalking virtual</strong>. E, no Brasil, ele não é tratado como mera insistência online, mas como conduta capaz de gerar responsabilização penal, civil e, em muitos casos, medidas urgentes de proteção.
                  </p>

                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                    O problema é que muitas vítimas demoram para perceber quando a linha foi ultrapassada. Em um ambiente em que insistência, curiosidade invasiva, perfis falsos, exposição de dados e mensagens repetidas se misturam com a rotina das redes sociais, nem sempre é simples identificar o momento em que o comportamento deixa de ser inconveniente e passa a configurar perseguição. Por isso, compreender o que caracteriza o stalking virtual, quais são os seus elementos jurídicos e quais providências devem ser adotadas desde os primeiros sinais faz diferença prática. Em casos assim, agir cedo protege a vítima, fortalece a prova e aumenta a chance de interromper a conduta antes que ela escale.
                  </p>

                  <Card className="p-6 bg-accent/10 border-accent/20 mb-8">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="text-accent flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold mb-2">Atenção: documente tudo antes de bloquear ou apagar</h3>
                        <p className="text-sm text-foreground/80">
                          Prints, vídeos de tela, links de perfis, nomes de usuários, datas, horários, e-mails, mensagens diretas e protocolos de atendimento podem ser decisivos. Em casos de perseguição digital, a prova documental é um dos elementos mais importantes para pedidos de medidas protetivas, investigação criminal e eventual indenização.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Eye className="text-primary" size={28} />
                    O que é stalking virtual e como ele costuma aparecer
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O stalking virtual, também chamado de <em>ciberstalking</em>, consiste em uma perseguição reiterada praticada por meios digitais. O ponto central não está em um contato isolado, mas na repetição insistente de condutas capazes de invadir a privacidade, perturbar a liberdade da vítima ou afetar sua integridade psicológica. Em outras palavras, não se trata apenas de alguém mandando mensagem demais, mas de um comportamento persistente que cria cerco, vigilância e constrangimento.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Essa perseguição pode assumir formas bastante variadas: envio constante de mensagens não desejadas, criação de perfis falsos para acompanhar a rotina da vítima, insistência em múltiplas plataformas após bloqueios sucessivos, comentários invasivos em publicações antigas, contato com amigos, familiares ou colegas de trabalho, monitoramento de localização, divulgação de dados pessoais e até uso de aplicativos clandestinos para rastrear atividades digitais. Em muitos casos, o agressor alterna momentos de aparente cordialidade com ameaças veladas, o que torna a situação ainda mais confusa emocionalmente para quem sofre a conduta.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Também é comum que o stalking virtual venha acompanhado de outras práticas abusivas, como difamação, exposição indevida da intimidade, chantagem emocional, assédio coletivo e tentativas de isolar socialmente a vítima. Quando terceiros são mobilizados para ampliar o ataque, o dano tende a crescer de forma rápida. Por isso, o olhar jurídico sobre o stalking digital precisa considerar não apenas a plataforma usada, mas o padrão global da conduta, sua repetição e seus efeitos concretos.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <FileText className="text-primary" size={28} />
                    O que diz a lei brasileira
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A tipificação penal da perseguição foi introduzida pela Lei nº 14.132/2021, que acrescentou o artigo 147-A ao Código Penal. A norma passou a prever, expressamente, o crime de perseguir alguém de forma reiterada, por qualquer meio, ameaçando sua integridade física ou psicológica, restringindo sua capacidade de locomoção ou invadindo e perturbando sua esfera de liberdade ou privacidade.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Um aspecto importante da redação legal é a expressão <strong>&quot;por qualquer meio&quot;</strong>. Isso torna a regra plenamente aplicável ao ambiente digital, alcançando redes sociais, aplicativos de mensagens, e-mails, fóruns, jogos online e outras ferramentas tecnológicas. A lei não depende do nome da plataforma, mas da conduta praticada e de sua reiteração. É justamente essa amplitude que permite enquadrar juridicamente o stalking virtual com mais segurança.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Outro ponto essencial é compreender que um único episódio, ainda que desagradável, pode não ser suficiente para configurar o crime de perseguição. O stalking exige um padrão reiterado. Isso não significa que o primeiro ato deva ser ignorado, mas que ele precisa ser documentado desde o início, porque o histórico de repetição costuma ser o elemento que dá consistência probatória ao caso.
                  </p>

                  <blockquote>
                    <p>
                      <strong>Dica prática:</strong> não espere ficar grave demais para começar a registrar os fatos. Em perseguição digital, a cronologia da conduta costuma ser tão importante quanto o conteúdo de cada ato.
                    </p>
                  </blockquote>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Shield className="text-primary" size={28} />
                    Quando a situação pode ser ainda mais grave
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Em determinados contextos, a gravidade jurídica aumenta. A legislação prevê hipóteses de majoração da pena, como situações envolvendo crianças, adolescentes, pessoas idosas ou quando a perseguição é praticada por mais de uma pessoa. No ambiente digital, isso pode ocorrer em campanhas coordenadas de assédio, perseguição em massa ou ataques articulados para intimidar a vítima.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Além disso, o stalking virtual raramente aparece sozinho. Muitas vezes ele se conecta a outros ilícitos, como ameaça, injúria, difamação, calúnia, invasão de dispositivo informático, divulgação não autorizada de imagens íntimas ou exposição indevida de dados pessoais. Cada um desses fatos pode gerar consequências jurídicas próprias, o que amplia a responsabilidade do agressor e muda a estratégia processual mais adequada.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Na prática, isso significa que uma análise jurídica cuidadosa do caso concreto é indispensável. O mesmo conjunto de fatos pode envolver esfera penal, responsabilidade civil, tutela de urgência, proteção de dados e até medidas protetivas em contexto de violência doméstica. Reduzir tudo a um único rótulo jurídico pode enfraquecer a reação e deixar de explorar mecanismos relevantes de proteção.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <UserX className="text-primary" size={28} />
                    Violência doméstica, ex-relacionamentos e medidas protetivas
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Uma parte significativa dos casos de stalking virtual surge em contextos de ruptura afetiva. Ex-companheiros, ex-namorados ou pessoas inconformadas com o término podem passar a usar a internet como instrumento de vigilância, controle e intimidação. Nesses casos, a situação pode se enquadrar também na Lei Maria da Penha, quando houver relação doméstica, familiar ou íntima de afeto.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Isso é relevante porque as medidas protetivas de urgência podem ser fundamentais para interromper rapidamente a conduta. A proibição de contato por qualquer meio, inclusive redes sociais, mensagens e e-mails, pode ser determinada judicialmente. Dependendo da gravidade, também podem ser fixadas restrições de aproximação, retirada de conteúdos e outras providências voltadas à proteção imediata da vítima.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O ambiente digital não reduz a violência; em muitos casos, ele a amplia. A sensação de acesso contínuo à vítima, a facilidade de criar perfis falsos e a possibilidade de perseguição permanente por múltiplos canais tornam esse cenário particularmente nocivo. Por isso, minimizar a perseguição por acontecer só pela internet é um erro grave.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Scale className="text-primary" size={28} />
                    Responsabilidade civil e medidas judiciais urgentes
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Além da apuração criminal, o stalking virtual pode gerar dever de indenizar. A vítima pode buscar reparação por danos morais e, quando houver, também por danos materiais. Gastos com suporte psicológico, segurança digital, recuperação de contas, monitoramento de vazamento e outras consequências concretas podem integrar o pedido indenizatório, desde que devidamente documentados.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Também é possível buscar tutela inibitória, isto é, uma ordem judicial voltada a cessar imediatamente a conduta. Dependendo do caso, isso pode envolver proibição de contato, remoção de conteúdo, bloqueio de perfis, preservação de registros e determinação para que plataformas mantenham logs ou dados necessários à identificação do agressor. Em situações urgentes, essas medidas não precisam esperar o final do processo.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Em muitos casos, a atuação rápida faz mais diferença do que a própria condenação futura. Interromper o comportamento, preservar provas e evitar a escalada do assédio é, juridicamente, tão importante quanto discutir a punição do agressor ao final.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Lock className="text-primary" size={28} />
                    O papel das plataformas, do Marco Civil e da LGPD
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O stalking virtual frequentemente envolve tratamento indevido de dados pessoais. Quando há exposição de telefone, endereço, documentos, imagens, rotina, localização ou qualquer outro elemento capaz de identificar a vítima, a Lei Geral de Proteção de Dados passa a ter relevância concreta. A divulgação indevida dessas informações pode aprofundar os danos, ampliar o risco físico e aumentar a vulnerabilidade da pessoa perseguida.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    As plataformas também têm papel importante. Embora a responsabilidade delas dependa do contexto e do regime jurídico aplicável, é fundamental registrar formalmente denúncias, guardar protocolos e exigir respostas claras. Em certas hipóteses, a omissão diante de conteúdos abusivos, perfis reiteradamente usados para perseguição ou falhas de segurança que permitam exposição indevida de dados pode integrar a análise jurídica do caso.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O Marco Civil da Internet, as políticas internas das plataformas e a LGPD formam, nesse ponto, uma camada complementar de proteção. A vítima não deve pensar apenas em denunciar o agressor, mas também em estruturar uma reação documentada perante os intermediários digitais envolvidos.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6">O que fazer quando o problema acontece</h2>

                  <ol className="space-y-4 mb-12">
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">1.</span>
                      <div>
                        <strong>Preserve as provas:</strong> faça prints, grave vídeos de tela, anote links, nomes de usuários, datas, horários e canais utilizados.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">2.</span>
                      <div>
                        <strong>Organize os fatos em ordem cronológica,</strong> porque a repetição da conduta é parte central da caracterização jurídica.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">3.</span>
                      <div>
                        <strong>Registre boletim de ocorrência</strong> e leve o máximo de documentação possível.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">4.</span>
                      <div>
                        <strong>Denuncie formalmente nas plataformas</strong> e guarde todos os protocolos de atendimento.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">5.</span>
                      <div>
                        <strong>Considere medidas urgentes,</strong> como tutela judicial para cessação da conduta e preservação de registros.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">6.</span>
                      <div>
                        <strong>Busque orientação jurídica especializada</strong> para avaliar as vias penal, cível e eventualmente protetiva de forma integrada.
                      </div>
                    </li>
                  </ol>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Hábitos de prevenção</h2>

                  <ul className="list-disc pl-6 mb-8 text-foreground/80 space-y-3">
                    <li>
                      <strong>Revise suas configurações de privacidade</strong> nas redes sociais e reduza a exposição pública desnecessária.
                    </li>
                    <li>
                      <strong>Ative autenticação em dois fatores</strong> nas principais contas digitais.
                    </li>
                    <li>
                      <strong>Evite compartilhar localização em tempo real</strong> com frequência ou sem necessidade.
                    </li>
                    <li>
                      <strong>Separe canais pessoais e públicos</strong> sempre que possível.
                    </li>
                    <li>
                      <strong>Desconfie de perfis insistentes, novos ou incoerentes,</strong> especialmente após bloqueios anteriores.
                    </li>
                    <li>
                      <strong>Comece a documentar cedo,</strong> porque o histórico costuma ser decisivo.
                    </li>
                  </ul>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Considerações finais</h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O stalking virtual não é exagero, sensibilidade excessiva nem drama de internet. Trata-se de uma conduta que pode comprometer a liberdade, a paz psicológica, a intimidade e a segurança de quem a sofre. O fato de acontecer por telas, aplicativos e perfis não diminui sua gravidade; em muitos casos, torna o assédio mais constante, invasivo e difícil de interromper.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Conhecer a estrutura jurídica disponível muda a forma como a vítima reage. Em vez de apenas tentar bloquear perfis sucessivamente, passa a ser possível construir prova, acionar mecanismos legais adequados, buscar proteção urgente e exigir responsabilização. Em matéria de perseguição digital, informação e documentação são parte da estratégia de defesa.
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Quando há insistência reiterada, vigilância, exposição, medo ou restrição concreta da liberdade digital, a resposta não deve ser improvisada. O caminho mais seguro é documentar tudo, formalizar as denúncias e avaliar o caso com abordagem jurídica individualizada.
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
                    Nossa equipe especializada em Direito Digital está pronta para orientar você, da preservação das provas à adoção de medidas protetivas e indenizatórias.
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
