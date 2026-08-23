import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pageTitle =
  "Compras online: quais são os seus direitos quando o produto não chega ou chega errado?";

const pageDescription =
  "Saiba o que a lei garante nas compras pela internet: prazo de arrependimento, vício do produto, responsabilidade do marketplace e proteção de dados pela LGPD. Guia prático com base no CDC e Decreto nº 7.962/2013.";

const pageUrl =
  "https://www.lisomarbarbosa.adv.br/artigos/direito-do-consumidor-compras-online";

const pageImage =
  "https://images.unsplash.com/photo-1697545806029-f22eb0f36bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NTA3NjgyfA&ixlib=rb-4.1.0&q=80&w=1080";

const DireitoDoConsumidorComprasOnline = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
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

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "${pageTitle}",
            "description": "${pageDescription}",
            "image": "${pageImage}",
            "datePublished": "2026-08-23",
            "dateModified": "2026-08-23",
            "author": {
              "@type": "Person",
              "name": "Lisomar Barbosa",
              "url": "https://www.lisomarbarbosa.adv.br"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Lisomar Barbosa | Direito Digital",
              "url": "https://www.lisomarbarbosa.adv.br"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${pageUrl}"
            }
          }
        `}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <Link to="/blog" aria-label="Voltar aos artigos">
                <Button variant="ghost" className="group mb-6">
                  <ArrowLeft
                    className="mr-2 size-[18px] transition-transform duration-300 group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                  Voltar aos Artigos
                </Button>
              </Link>

              <article className="animate-fade-in">
                <header className="mb-12">
                  <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
                    Direito do Consumidor Digital
                  </span>

                  <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                    Compras online: quais são os seus direitos quando o produto não chega ou chega errado?
                  </h1>

                  <div className="mb-8 flex items-center gap-4 text-sm text-foreground/60">
                    <span>23 de ago. de 2026</span>
                    <span aria-hidden="true">•</span>
                    <span>8 min de leitura</span>
                  </div>

                  <img
                    src={pageImage}
                    alt="Pessoa realizando compra online pelo celular com cartão na mão"
                    className="mb-8 h-[400px] w-full rounded-lg object-cover"
                    loading="eager"
                  />
                </header>

                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-foreground/80 prose-p:leading-relaxed prose-li:text-foreground/80">

                  {/* Resposta direta nos dois primeiros parágrafos — padrão GEO/SEO */}
                  <p>
                    Quando uma compra online dá errado, o consumidor tem direitos claros garantidos pelo <strong>Código de Defesa do Consumidor (Lei nº 8.078/1990)</strong> e pelo <strong>Decreto nº 7.962/2013</strong>. Isso inclui o direito de arrependimento em até sete dias, substituição ou reembolso em caso de vício do produto e, em muitos casos, responsabilização direta da plataforma intermediadora, como marketplaces.
                  </p>

                  <p>
                    A proteção consumerista não distingue loja física de loja virtual. O que muda são as regras operacionais aplicadas ao comércio eletrônico, que impõem ao fornecedor obrigações específicas de informação, transparência e atendimento. Conhecer cada uma dessas garantias é o primeiro passo para agir com segurança quando a compra não sai como prometido.
                  </p>

                  <h2>Qual lei protege o consumidor nas compras online?</h2>

                  <p>
                    O ponto de partida é o <strong>CDC</strong>, que define consumidor como toda pessoa física ou jurídica que adquire produto ou serviço como destinatário final, e fornecedor como quem o coloca no mercado. O <strong>Decreto nº 7.962/2013</strong> regulamentou o comércio eletrônico especificamente, tornando obrigatória a exibição ostensiva de nome empresarial, CNPJ, endereço físico, canais de atendimento, características do produto, preço total com frete e prazo de entrega antes da finalização do pedido.
                  </p>

                  <p>
                    Em complemento, a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong> e o <strong>Marco Civil da Internet (Lei nº 12.965/2014)</strong> completam o arcabouço de proteção digital, regulando o tratamento de dados pessoais e a responsabilidade de plataformas online.
                  </p>

                  <h2>Posso desistir da compra online? Qual é o prazo?</h2>

                  <p>
                    Sim. O artigo 49 do CDC garante o <strong>direito de arrependimento</strong>: o consumidor tem <strong>sete dias corridos</strong>, contados da assinatura do contrato ou do recebimento do produto, para desistir da compra <strong>sem precisar justificar o motivo</strong>. Essa regra existe porque, nas compras online, não é possível tocar, experimentar ou verificar o produto antes do pagamento.
                  </p>

                  <p>
                    Exercendo esse direito, o consumidor recebe o <strong>valor integral pago, inclusive o frete de ida</strong>. O custo de devolução também é do fornecedor. Cláusulas contrárias, como "não aceitamos devolução de produtos abertos" ou "frete de retorno por conta do cliente", são <strong>nulas de pleno direito</strong> por violarem o artigo 51 do CDC.
                  </p>

                  <blockquote>
                    <p>
                      <strong>Dica prática:</strong> ao receber qualquer produto, grave um vídeo curto abrindo a embalagem. Esse registro é prova válida do estado do item e do prazo de recebimento, fundamental caso precise exercer o arrependimento ou reclamar vício.
                    </p>
                  </blockquote>

                  <h2>O site é obrigado a informar tudo antes da compra?</h2>

                  <p>
                    Sim. O artigo 6º, inciso III, do CDC assegura o direito à <strong>informação adequada e clara</strong>. No e-commerce, isso significa descrição fiel do produto, indicação de cor, voltagem, dimensões e composição, disponibilidade em estoque, prazo de entrega estimado e formas de pagamento. Essas informações devem estar visíveis <strong>antes</strong> da finalização do pedido, não apenas na nota fiscal.
                  </p>

                  <p>
                    Se o site anunciou "entrega em 2 dias" e o produto levou três semanas, se a foto mostrou material diferente do entregue, ou se taxas apareceram apenas no checkout, há violação do dever de informação. Nesses casos, o consumidor pode exigir o cumprimento da oferta como anunciada, aceitar produto equivalente ou rescindir o contrato com reembolso integral — e, dependendo do dano, pleitear indenização.
                  </p>

                  <h2>O produto chegou com defeito: quem responde e qual é o prazo?</h2>

                  <p>
                    Produto que chega com defeito configura <strong>vício de qualidade</strong>, previsto nos artigos 12 a 18 do CDC. A responsabilidade é <strong>solidária</strong> entre todos os integrantes da cadeia de fornecimento: fabricante, importador, distribuidor e loja. Isso significa que você pode reclamar diretamente com o vendedor, sem precisar acionar fabricante estrangeiro ou intermediários.
                  </p>

                  <p>
                    Os prazos para reclamar são:
                  </p>

                  <ul>
                    <li><strong>30 dias</strong> para produtos não duráveis (alimentos, cosméticos, descartáveis)</li>
                    <li><strong>90 dias</strong> para produtos duráveis (eletrônicos, eletrodomésticos, móveis)</li>
                  </ul>

                  <p>
                    Após a reclamação, o fornecedor tem <strong>30 dias</strong> para sanar o defeito. Se não o fizer, o consumidor pode escolher entre: (1) substituição por produto idêntico; (2) restituição imediata do valor pago, com correção monetária; ou (3) abatimento proporcional do preço.
                  </p>

                  <h2>Marketplace responde quando o vendedor é terceiro?</h2>

                  <p>
                    Essa é uma das dúvidas mais frequentes nas compras em plataformas como Mercado Livre, Amazon, Shopee e Magalu. A resposta, na maioria dos casos, tende a ser <strong>sim</strong>. Quando o marketplace participa ativamente da cadeia de fornecimento, lucra com a intermediação, processa pagamentos e controla o ambiente de negociação, ele integra a relação de consumo e pode responder solidariamente pelos vícios e pelo descumprimento da entrega.
                  </p>

                  <p>
                    O consumidor não deve ser obrigado a negociar sozinho com um vendedor sem identificação adequada ou que simplesmente deixa de responder após o pagamento. A plataforma precisa disponibilizar canais efetivos de atendimento e, conforme o caso concreto, mediar ou assumir a solução do problema.
                  </p>

                  <h2>A LGPD protege meus dados quando compro online?</h2>

                  <p>
                    Sim. Ao finalizar uma compra, você fornece nome, CPF, endereço, telefone, e-mail e dados de pagamento. A <strong>Lei nº 13.709/2018 (LGPD)</strong> exige que esse tratamento tenha finalidade específica, seja limitado ao necessário para executar a compra e ocorra com medidas de segurança adequadas. Pedir dados excessivos ou usar informações para fins diferentes do declarado é prática irregular.
                  </p>

                  <p>
                    Você tem direito de saber quais dados são coletados, corrigi-los, solicitar a exclusão após o fim da relação contratual e ser notificado em caso de vazamento. Incidentes de segurança em e-commerce podem gerar responsabilização civil por danos morais e materiais, além de obrigação de notificação à Autoridade Nacional de Proteção de Dados (ANPD).
                  </p>

                  <h2>O que fazer quando o problema acontece: passo a passo</h2>

                  <ol>
                    <li>
                      <strong>Reúna provas:</strong> prints da oferta original, e-mails de confirmação, código de rastreio, fotos ou vídeo do produto recebido e todos os protocolos de atendimento.
                    </li>
                    <li>
                      <strong>Registre reclamação formal na loja ou plataforma</strong> e guarde o número de protocolo gerado.
                    </li>
                    <li>
                      <strong>Sem solução em até 5 a 10 dias úteis:</strong> registre ocorrência no Procon do seu estado e na plataforma federal <strong>Consumidor.gov.br</strong>, que costuma gerar resposta mais rápida das empresas.
                    </li>
                    <li>
                      <strong>Para valores até 20 salários mínimos:</strong> o Juizado Especial Cível permite ajuizar ação sem advogado. O processo é gratuito nas primeiras instâncias e mais célere do que a Justiça comum.
                    </li>
                    <li>
                      <strong>Com dano moral ou material comprovado</strong> (negativação indevida, exposição de dados, recusa abusiva de direito claro), a ação judicial pode incluir pedido de indenização.
                    </li>
                  </ol>

                  <h2>Como se proteger antes de comprar</h2>

                  <ul>
                    <li>
                      <strong>Compre de lojas que exibem CNPJ, endereço físico e canais reais de contato.</strong> Desconfie de preços muito abaixo do mercado.
                    </li>
                    <li>
                      <strong>Prefira cartão de crédito virtual ou intermediadores de pagamento</strong> como Mercado Pago, PayPal ou PagSeguro. Facilitam o estorno em caso de problema.
                    </li>
                    <li>
                      <strong>Evite transferências por Pix ou TED para pessoas físicas desconhecidas</strong> em compras de valor relevante. A reversão é difícil.
                    </li>
                    <li>
                      <strong>Leia as políticas de troca, devolução e garantia</strong> antes de finalizar o pedido. Cláusulas abusivas podem ser contestadas, mas é mais simples evitá-las.
                    </li>
                    <li>
                      <strong>Ative autenticação em dois fatores</strong> nas contas de e-commerce e no e-mail vinculado ao cadastro para reduzir risco de fraude.
                    </li>
                  </ul>

                  <h2>Considerações finais</h2>

                  <p>
                    O ordenamento brasileiro oferece um conjunto robusto de proteções para o consumidor digital: do CDC à LGPD, passando pelo Marco Civil da Internet e pelo Decreto do e-commerce. Conhecer esses mecanismos transforma o consumidor de vítima passiva em agente capaz de exigir cumprimento, reparação e respeito.
                  </p>

                  <p>
                    Se você foi lesado em uma compra online e a loja se recusa a resolver, não aceite o "não" do chatbot como resposta final. Documente, acione os canais formais e, quando necessário, busque orientação jurídica especializada. A lei está do seu lado — o primeiro passo é conhecê-la e saber como aplicá-la.
                  </p>

                  <hr />

                  <p>
                    <em>
                      Este artigo tem caráter informativo e não substitui consulta jurídica individualizada. Para análise do seu caso concreto, entre em contato com nossa equipe.
                    </em>
                  </p>
                </div>

                {/* CTA jurídico com copy de conversão */}
                <div className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8 text-center">
                  <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">
                    Está com problema em uma compra online?
                  </p>
                  <h3 className="mb-4 text-2xl font-bold">
                    Avalie seu caso com um especialista em Direito Digital
                  </h3>
                  <p className="mx-auto mb-6 max-w-2xl text-foreground/80">
                    Plataforma que não reembolsa, produto com defeito sem solução, dados vazados ou negativação indevida — cada situação tem estratégia jurídica própria. Nossa equipe analisa seu caso e indica o caminho mais rápido e efetivo.
                  </p>
                  <Link to="/#contato">
                    <Button
                      size="lg"
                      className="bg-gradient-accent font-semibold text-background shadow-cyber transition-transform hover:scale-105"
                    >
                      Consultar agora →
                    </Button>
                  </Link>
                  <p className="mt-4 text-xs text-foreground/50">
                    Atendimento online · Resposta em até 24h úteis
                  </p>
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

export default DireitoDoConsumidorComprasOnline;
