import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pageTitle =
  "Seus direitos nas compras online: o que a lei garante quando o produto não chega ou chega diferente do combinado | Lisomar Barbosa | Direito Digital";

const pageDescription =
  "Comprar pela internet virou rotina, mas poucos sabem exatamente o que a lei protege quando algo dá errado. Este artigo explica, em linguagem clara, os principais direitos do consumidor digital, do arrependimento em sete dias à responsabilidade solidária dos marketplaces, e ensina como se prevenir e reagir diante de problemas reais.";

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
                    Direito Digital
                  </span>

                  <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                    Seus direitos nas compras online: o que a lei garante quando o produto não chega ou chega diferente do combinado
                  </h1>

                  <div className="mb-8 flex items-center gap-4 text-sm text-foreground/60">
                    <span>23 de ago. de 2026</span>
                    <span aria-hidden="true">•</span>
                    <span>8 min de leitura</span>
                  </div>

                  <img
                    src={pageImage}
                    alt="Consumidora realizando compra online pelo celular"
                    className="mb-8 h-[400px] w-full rounded-lg object-cover"
                    loading="eager"
                  />
                </header>

                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-foreground/80 prose-p:leading-relaxed prose-li:text-foreground/80">
                  <p>
                    Você entra no site, escolhe o produto, paga com cartão ou Pix e aguarda a entrega. Dias depois, a caixa chega amassada, o tamanho não serve, o aparelho não liga ou, pior, o pacote nunca sai do centro de distribuição. Situações assim são cada vez mais comuns no cotidiano digital brasileiro. O que nem todo mundo sabe é que a legislação consumerista também se aplica integralmente às relações de consumo eletrônicas, impondo deveres claros a quem vende e garantias efetivas a quem compra.
                  </p>

                  <p>
                    O ponto de partida é o <strong>Código de Defesa do Consumidor (Lei nº 8.078/1990)</strong>. O artigo 2º define consumidor como toda pessoa física ou jurídica que adquire produto ou serviço como destinatário final, enquanto fornecedor é quem o coloca no mercado. Não há distinção entre loja física e virtual: a proteção é a mesma. No comércio eletrônico, essas obrigações foram detalhadas pelo <strong>Decreto nº 7.962/2013</strong>, que exige informações ostensivas como nome empresarial, CNPJ, endereço físico, canais de atendimento, características essenciais do produto, preço total com frete e prazo de entrega.
                  </p>

                  <h2>Direito de arrependimento: sete dias para mudar de ideia</h2>

                  <p>
                    Uma das garantias mais relevantes, e ainda pouco conhecidas, é o <strong>direito de arrependimento</strong>, previsto no artigo 49 do CDC. Como a compra online ocorre fora do estabelecimento comercial, sem a possibilidade de tocar, experimentar ou testar o produto antes do pagamento, a lei concede ao consumidor <strong>sete dias corridos</strong>, contados da assinatura do contrato ou do recebimento do bem, para desistir da aquisição <strong>sem necessidade de justificativa</strong>.
                  </p>

                  <p>
                    Na prática, isso significa que, se você comprou uma camisa e não gostou do caimento, ou adquiriu um eletrodoméstico e percebeu que ele não cabe no espaço planejado, pode devolvê-lo e receber <strong>o valor integral pago</strong>, inclusive o frete. Nessas hipóteses, o custo da devolução também é do fornecedor. Muitos sites ainda tentam impor restrições abusivas, como negar devolução de produtos abertos ou transferir o frete de retorno ao cliente, mas essas cláusulas são <strong>nulas de pleno direito</strong>, nos termos do artigo 51 do CDC.
                  </p>

                  <blockquote>
                    <p>
                      <strong>Dica prática:</strong> guarde prints da tela de compra, e-mails de confirmação, código de rastreio e, ao receber o produto, faça um vídeo curto abrindo a embalagem. Esses registros facilitam a comprovação do prazo e do estado do item caso seja necessário acionar o arrependimento.
                    </p>
                  </blockquote>

                  <h2>Informação adequada: o dever de transparência antes do clique</h2>

                  <p>
                    O artigo 6º, inciso III, do CDC assegura o direito à <strong>informação adequada e clara</strong> sobre produtos e serviços. No ambiente digital, isso se traduz em obrigações concretas: descrição fiel, indicação de cor, voltagem, dimensões, composição, disponibilidade em estoque, prazo de entrega estimado e formas de pagamento. O Decreto nº 7.962/2013 reforça que essas informações devem estar <strong>disponíveis de forma ostensiva</strong> antes da finalização do pedido.
                  </p>

                  <p>
                    Se o site promete entrega em dois dias úteis e o produto leva três semanas, se a foto mostra um item diferente do que foi entregue, ou se taxas só aparecem no checkout, há violação do dever de informação. Nesses casos, o consumidor pode exigir o cumprimento forçado da oferta, aceitar produto equivalente ou rescindir o contrato com devolução integral dos valores pagos, sem prejuízo de eventuais perdas e danos.
                  </p>

                  <h2>Vício do produto ou do serviço: quem responde?</h2>

                  <p>
                    Quando o produto chega com defeito, não liga, rasga na primeira lavagem ou apresenta erro de fabricação, estamos diante de <strong>vício de qualidade</strong>. O CDC estabelece responsabilidade <strong>solidária</strong> entre os integrantes da cadeia de fornecimento, o que inclui fabricante, importador, distribuidor e varejista. Isso permite ao consumidor reclamar diretamente com a loja onde comprou, sem depender de contato com fabricante estrangeiro ou intermediários difíceis de localizar.
                  </p>

                  <p>
                    O prazo para reclamar é de <strong>30 dias</strong> para produtos não duráveis, como alimentos e cosméticos, e de <strong>90 dias</strong> para produtos duráveis, como eletrônicos, móveis e eletrodomésticos, contados da entrega efetiva. O fornecedor tem <strong>30 dias</strong> para sanar o vício. Se isso não ocorrer, o consumidor pode escolher entre a substituição do produto, a restituição imediata da quantia paga, com correção monetária, ou o abatimento proporcional do preço.
                  </p>

                  <p>
                    Para serviços digitais, como assinaturas de streaming, cursos online e hospedagem de sites, a lógica é semelhante. O serviço deve corresponder ao que foi prometido. Se a plataforma anuncia acesso ilimitado e impõe bloqueios indevidos, ou promete suporte contínuo e não responde, pode haver vício de serviço.
                  </p>

                  <h2>Marketplaces e a responsabilidade do intermediador</h2>

                  <p>
                    Hoje, grande parte das compras ocorre em <em>marketplaces</em>, como Mercado Livre, Amazon, Shopee e Magalu. A dúvida mais comum é: se o vendedor é terceiro, a plataforma responde? Em regra, a resposta tende a ser positiva, especialmente quando o marketplace participa ativamente da cadeia de fornecimento, lucra com a intermediação, controla o ambiente de negociação, processa pagamentos e, em muitos casos, interfere na logística.
                  </p>

                  <p>
                    Nessas situações, o consumidor não deve ser empurrado para uma negociação isolada com vendedor anônimo ou sem identificação adequada. A plataforma precisa oferecer canais efetivos de atendimento, intermediar a solução do conflito e, conforme o caso concreto, responder solidariamente pelos prejuízos causados.
                  </p>

                  <h2>Proteção de dados: o que a LGPD tem a ver com sua compra</h2>

                  <p>
                    Ao comprar online, você fornece nome, CPF, endereço, telefone, e-mail e, muitas vezes, dados de pagamento. A <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong> exige que esse tratamento tenha <strong>finalidade específica</strong>, seja <strong>necessário</strong> para a execução da compra e ocorra com <strong>segurança</strong>, evitando coleta excessiva e exposição indevida de informações pessoais.
                  </p>

                  <p>
                    O consumidor tem direito de saber quais dados são coletados, corrigir informações incorretas, solicitar a exclusão de dados desnecessários após o término da relação contratual e pedir a portabilidade quando cabível. Em casos de vazamento de dados em e-commerce, pode haver dever de notificação à Autoridade Nacional de Proteção de Dados e ao titular afetado, além da possibilidade de responsabilização civil por danos materiais e morais.
                  </p>

                  <h2>O que fazer quando o problema acontece</h2>

                  <ol>
                    <li>
                      <strong>Reúna provas:</strong> guarde prints da oferta, e-mails, comprovantes de pagamento, código de rastreio, fotos, vídeos e protocolos de atendimento.
                    </li>
                    <li>
                      <strong>Registre a reclamação nos canais oficiais da loja ou plataforma:</strong> sempre anote e preserve o número de protocolo.
                    </li>
                    <li>
                      <strong>Sem solução em prazo razoável:</strong> procure o Procon do seu estado e registre manifestação no Consumidor.gov.br.
                    </li>
                    <li>
                      <strong>Para valores menores:</strong> avalie o Juizado Especial Cível, que admite ações de até 20 salários mínimos sem advogado, embora o acompanhamento jurídico continue recomendável.
                    </li>
                    <li>
                      <strong>Havendo dano moral ou material relevante:</strong> a via judicial pode incluir pedido indenizatório, sobretudo em casos de negativação indevida, recusa abusiva ou exposição indevida de dados.
                    </li>
                  </ol>

                  <h2>Hábitos de prevenção</h2>

                  <ul>
                    <li>
                      <strong>Prefira sites confiáveis</strong> ou plataformas que exibam claramente CNPJ, endereço físico e canais reais de contato.
                    </li>
                    <li>
                      <strong>Use cartão virtual ou intermediadores de pagamento</strong> para ampliar a segurança e facilitar eventual contestação.
                    </li>
                    <li>
                      <strong>Evite transferências diretas para pessoas físicas desconhecidas</strong>, especialmente em ofertas muito abaixo do preço de mercado.
                    </li>
                    <li>
                      <strong>Leia os termos essenciais</strong> sobre troca, devolução, garantia e tratamento de dados pessoais.
                    </li>
                    <li>
                      <strong>Ative autenticação em dois fatores</strong> nas contas de e-commerce e no e-mail vinculado ao cadastro.
                    </li>
                  </ul>

                  <h2>Considerações finais</h2>

                  <p>
                    Comprar pela internet não é um ato de fé, mas uma relação jurídica regulada por normas claras. O ordenamento brasileiro oferece mecanismos de proteção que abrangem direito de arrependimento, dever de informação, responsabilidade por vícios, proteção de dados e responsabilização de integrantes da cadeia de fornecimento.
                  </p>

                  <p>
                    Conhecer esses direitos ajuda o consumidor a agir com mais segurança e a reagir com estratégia quando a compra não sai como prometido. Diante de negativa automática, silêncio do fornecedor ou resposta abusiva, a recomendação é documentar tudo, reclamar pelos canais formais e buscar orientação jurídica quando o caso exigir análise individualizada.
                  </p>

                  <hr />

                  <p>
                    <em>
                      Este artigo tem caráter informativo e não substitui consulta jurídica personalizada. Para avaliar o seu caso concreto, busque orientação profissional adequada.
                    </em>
                  </p>
                </div>

                <div className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8 text-center">
                  <h3 className="mb-4 text-2xl font-bold">Precisa de orientação jurídica?</h3>
                  <p className="mx-auto mb-6 max-w-2xl text-foreground/80">
                    Nossa equipe especializada em Direito Digital está pronta para analisar o seu caso e indicar as melhores estratégias jurídicas.
                  </p>
                  <Link to="/#contato">
                    <Button size="lg" className="bg-gradient-accent font-semibold text-background shadow-cyber">
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

export default DireitoDoConsumidorComprasOnline;
