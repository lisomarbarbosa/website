import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const DireitoDoConsumidorComprasOnline = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Seus direitos nas compras online: o que a lei garante quando o produto não chega ou chega diferente do combinado | Lisomar Barbosa | Direito Digital</title>
        <meta name="description" content="Comprar pela internet virou rotina, mas poucos sabem exatamente o que a lei protege quando algo dá errado. Este artigo explica, em linguagem clara, os principais direitos do consumidor digital — do arrependimento em sete dias à responsabilidade solidária de marketplaces — e ensina como se prevenir e reagir diante de problemas reais." />
        <link rel="canonical" href="https://www.lisomarbarbosa.adv.br/artigos/direito-do-consumidor-compras-online" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        <meta property="og:site_name" content="Lisomar Barbosa | Direito Digital" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.lisomarbarbosa.adv.br/artigos/direito-do-consumidor-compras-online" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1697545806029-f22eb0f36bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NTA3NjgyfA&ixlib=rb-4.1.0&q=80&w=1080" />
        <meta property="og:title" content="Seus direitos nas compras online: o que a lei garante quando o produto não chega ou chega diferente do combinado | Lisomar Barbosa | Direito Digital" />
        <meta property="og:description" content="Comprar pela internet virou rotina, mas poucos sabem exatamente o que a lei protege quando algo dá errado. Este artigo explica, em linguagem clara, os principais direitos do consumidor digital — do arrependimento em sete dias à responsabilidade solidária de marketplaces — e ensina como se prevenir e reagir diante de problemas reais." />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Seus direitos nas compras online: o que a lei garante quando o produto não chega ou chega diferente do combinado | Lisomar Barbosa | Direito Digital" />
        <meta name="twitter:description" content="Comprar pela internet virou rotina, mas poucos sabem exatamente o que a lei protege quando algo dá errado. Este artigo explica, em linguagem clara, os principais direitos do consumidor digital — do arrependimento em sete dias à responsabilidade solidária de marketplaces — e ensina como se prevenir e reagir diante de problemas reais." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1697545806029-f22eb0f36bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NTA3NjgyfA&ixlib=rb-4.1.0&q=80&w=1080" />
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
                    Seus direitos nas compras online: o que a lei garante quando o produto não chega ou chega diferente do combinado
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>23 de ago de 2026</span>
                    <span>•</span>
                    <span>8 min de leitura</span>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1697545806029-f22eb0f36bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NTA3NjgyfA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Seus direitos nas compras online: o que a lei garante quando o produto não chega ou chega diferente do combinado"
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                  />
                </header>

                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold mt-12 mb-6">Seus direitos nas compras online: o que a lei garante quando o produto não chega ou chega diferente do combinado</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">Você entra no site, escolhe o produto, paga com cartão ou Pix e aguarda a entrega. Dias depois, a caixa chega amassada, o tamanho não serve, o aparelho não liga — ou, pior, o pacote nunca sai do centro de distribuição. Situações assim são corriqueiras no cotidiano digital brasileiro. O que nem todo mundo sabe é que a legislação consumerista não ficou no mundo analógico: ela alcança integralmente as relações de consumo eletrônicas, impondo deveres claros a quem vende e garantias efetivas a quem compra.</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">O ponto de partida é o <strong>Código de Defesa do Consumidor (Lei nº 8.078/1990)</strong>. Seu artigo 2º define consumidor como toda pessoa física ou jurídica que adquire produtos ou serviços como destinatário final, e fornecedor como quem os coloca no mercado. Não há distinção entre loja física e virtual: a proteção é a mesma. O que muda são as regras de operacionalização, detalhadas no <strong>Decreto nº 7.962/2013</strong>, que regulamentou o comércio eletrônico e tornou obrigatórias informações que, no mundo físico, estão visíveis na vitrine — nome empresarial, CNPJ, endereço físico, canais de atendimento, características essenciais do produto, preço total com frete e prazo de entrega.</p>
                  <h2 className="text-3xl font-bold mt-12 mb-6">O direito de arrependimento: sete dias para mudar de ideia</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">Uma das garantias mais valiosas — e ainda pouco conhecidas — é o <strong>direito de arrependimento</strong> previsto no artigo 49 do CDC. Como a compra online ocorre fora do estabelecimento comercial, sem a possibilidade de tocar, experimentar ou testar o produto antes de pagar, a lei concede ao consumidor <strong>sete dias corridos</strong>, contados da assinatura do contrato ou do recebimento do bem, para desistir da aquisição <strong>sem precisar justificar o motivo</strong>.</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">Na prática, isso significa que, se você comprou uma camisa e, ao provar, não gostou do caimento; ou adquiriu um eletrodoméstico e percebeu que não cabe no espaço planejado, pode devolvê-lo e receber <strong>o valor integral pago</strong>, inclusive o frete de ida. O custo do retorno, nessas hipóteses, é do fornecedor. Muitos sites tentam impor políticas restritivas — &quot;não aceitamos devolução de produtos abertos&quot; ou &quot;frete de volta por conta do cliente&quot; —, mas tais cláusulas são <strong>nulas de pleno direito</strong>, por violarem o artigo 51 do CDC, que veda cláusulas abusivas em contratos de adesão.</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">&gt; <strong>Dica prática:</strong> guarde prints da tela de compra, e-mails de confirmação, código de rastreio e, ao receber, faça um vídeo curto abrindo a embalagem. Esses registros facilitam enormemente a comprovação do prazo e do estado do produto caso precise acionar o arrependimento.</p>
                  <h2 className="text-3xl font-bold mt-12 mb-6">Informação adequada: o dever de transparência antes do clique</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">O artigo 6º, inciso III, do CDC assegura o direito à <strong>informação adequada e clara</strong> sobre produtos e serviços. No ambiente digital, isso se traduz em obrigações concretas: descrição fiel (cor, voltagem, dimensões, composição), fotos reais (não apenas ilustrativas), disponibilidade em estoque, prazo de entrega estimado e formas de pagamento. O Decreto nº 7.962/2013 reforça que essas informações devem estar <strong>disponíveis de forma ostensiva</strong> antes da finalização do pedido.</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">Quando o site anuncia &quot;entrega em 2 dias úteis&quot; e o produto leva três semanas; quando a foto mostra um tecido de algodão e chega poliéster; quando o preço do anúncio não inclui taxas que só aparecem no checkout — há violação do dever de informação. O consumidor pode exigir o cumprimento forçado da oferta (entrega do produto nas condições anunciadas), aceitar outro equivalente ou rescindir o contrato com devolução integral e eventuais perdas e danos.</p>
                  <h2 className="text-3xl font-bold mt-12 mb-6">Vício do produto ou do serviço: quem responde?</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">Se o produto chega com defeito — não liga, rasga na primeira lavagem, apresenta erro de fábrica —, estamos diante de <strong>vício de qualidade</strong>. O CDC (artigos 12 a 14) estabelece responsabilidade <strong>solidária</strong> de toda a cadeia de fornecimento: fabricante, importador, distribuidor e varejista. Na prática, você pode reclamar diretamente com a loja onde comprou, sem precisar acionar o fabricante na China ou nos Estados Unidos.</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">O prazo para reclamar é de <strong>30 dias</strong> para produtos não duráveis (alimentos, cosméticos) e <strong>90 dias</strong> para duráveis (eletrônicos, móveis, eletrodomésticos), contados da entrega efetiva. O fornecedor tem <strong>30 dias</strong> para sanar o vício. Se não o fizer, o consumidor escolhe entre: substituição por produto idêntico, restituição imediata da quantia paga (corrigida monetariamente) ou abatimento proporcional do preço.</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">Para serviços — assinaturas de streaming, cursos online, hospedagem de sites —, a lógica é a mesma: o serviço deve cumprir o prometido. Se a plataforma promete &quot;acesso ilimitado&quot; e bloqueia após certo volume, ou garante &quot;suporte 24h&quot; e não responde, há vício de serviço.</p>
                  <h2 className="text-3xl font-bold mt-12 mb-6">Marketplaces e a responsabilidade do intermediador</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">Hoje, grande parte das compras ocorre em <em>marketplaces</em> (Mercado Livre, Amazon, Shopee, Magalu, entre outros). A dúvida frequente: &quot;Se o vendedor é terceiro, o site responde?&quot; A resposta jurisprudencial majoritária e a melhor doutrina consumerista apontam que <strong>sim</strong>. O marketplace exerce atividade econômica, aufere lucro com a intermediação, controla o ambiente de negociação, processa pagamentos e, muitas vezes, a logística. Portanto, integra a cadeia de fornecimento e responde solidariamente pelos vícios e pela entrega.</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">O consumidor não precisa — e não deve — ser obrigado a negociar com um vendedor anônimo, sem CNPJ visível, que some após a venda. A plataforma deve garantir canais efetivos de atendimento, mediar a solução e, se necessário, arcar com o prejuízo.</p>
                  <h2 className="text-3xl font-bold mt-12 mb-6">Proteção de dados: o que a LGPD tem a ver com sua compra</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">Ao comprar online, você entrega nome, CPF, endereço, telefone, e-mail, dados de cartão. A <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong> impõe que esse tratamento tenha <strong>finalidade específica</strong> (processar o pedido, emitir nota, entregar), seja <strong>necessário</strong> (não pode pedir dados excessivos, como RG da mãe para comprar um livro), e ocorra com <strong>segurança</strong> (criptografia, controle de acesso).</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">Você tem direito a <strong>saber</strong> quais dados são coletados, <strong>corrigir</strong> os incorretos, <strong>excluir</strong> os desnecessários após o fim da relação contratual e <strong>portar</strong> seu histórico para outro fornecedor. Vazamento de dados em e-commerce — infelizmente comum — gera dever de notificação à Autoridade Nacional de Proteção de Dados (ANPD) e ao titular, além de possível indenização por danos morais e materiais.</p>
                  <h2 className="text-3xl font-bold mt-12 mb-6">O que fazer quando o problema acontece: roteiro prático</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">1. <strong>Reúna provas</strong>: prints de tela, e-mails, comprovantes de pagamento, código de rastreio, fotos/vídeos do produto recebido, protocolos de atendimento (chat, e-mail, 0800).</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">2. <strong>Registre a reclamação nos canais oficiais da loja/plataforma</strong> e guarde o número de protocolo. O CDC exige que o fornecedor mantenha serviço de atendimento ao consumidor (SAC) gratuito e eficaz.</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">3. <strong>Se não houver solução em prazo razoável (até 5 a 10 dias úteis)</strong>, registre queixa no <strong>Procon</strong> de seu estado (muitos têm formulário online) e no <strong>Consumidor.gov.br</strong>, plataforma federal que costuma gerar respostas mais rápidas.</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">4. <strong>Para valores até 20 salários mínimos</strong>, o <strong>Juizado Especial Cível</strong> permite ingressar sem advogado (embora a assistência jurídica seja recomendada). O processo é célere, gratuito nas primeiras instâncias e não exige formalismos excessivos.</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">5. <strong>Se houver dano moral comprovado</strong> (ex.: exposição indevida de dados, recusa abusiva de direito claro, cobrança indevida com negativação), a via judicial pode incluir pedido de indenização.</p>
                  <h2 className="text-3xl font-bold mt-12 mb-6">Prevenção: hábitos que evitam dores de cabeça</h2>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li className="text-foreground/80"><strong>Compre de sites conhecidos</strong> ou que exibam CNPJ, endereço físico e canais de contato reais. Desconfie de preços absurdamente baixos.</li>
                    <li className="text-foreground/80"><strong>Use cartão de crédito virtual</strong> ou intermediadores de pagamento (Mercado Pago, PayPal, PagSeguro) — eles oferecem mediação e estorno facilitado.</li>
                    <li className="text-foreground/80"><strong>Evite transferências diretas (Pix/TED) para contas de pessoas físicas</strong> em compras de desconhecidos; a rastreabilidade e a reversão são difíceis.</li>
                    <li className="text-foreground/80"><strong>Leia os termos de uso e a política de privacidade</strong> — ao menos as partes sobre troca, devolução, garantia e uso de dados.</li>
                    <li className="text-foreground/80"><strong>Ative autenticação em dois fatores</strong> nas contas de e-commerce e no e-mail cadastrado.</li>
                  </ul>
                  <h2 className="text-3xl font-bold mt-12 mb-6">Conclusão</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">Comprar pela internet não é um ato de fé — é uma relação jurídica regida por normas claras, que equilibram a facilidade do clique com a segurança de quem consome. O ordenamento brasileiro, do CDC à LGPD, passando pelo Marco Civil da Internet, construiu uma rede de proteção que cobre arrependimento, vício, informação, dados pessoais e responsabilidade solidária. Conhecer esses direitos transforma o consumidor de vítima passiva em agente ativo, capaz de exigir cumprimento, reparação e respeito.</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">Se você enfrentou — ou teme enfrentar — problemas em uma compra online, não aceite a negativa automática do chatbot. Documente, reclame nos canais oficiais, busque o Procon ou o Juizado Especial e, se necessário, procure orientação jurídica especializada. A lei está do seu lado; o primeiro passo é conhecê-la.</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">---</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed"><em>Este artigo tem caráter informativo e não substitui consulta jurídica personalizada. Para avaliar seu caso concreto, entre em contato com nossa equipe.</em></p>
                  <p className="text-sm text-foreground/50 italic mt-12">
                    Este artigo tem caráter informativo e não substitui consulta a advogado especializado para análise do caso concreto.
                  </p>
                </div>

                <div className="mt-16 p-8 rounded-2xl gradient-cyber border border-primary/20 text-center">
                  <h3 className="text-2xl font-bold mb-4">Precisa de Orientação Jurídica?</h3>
                  <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                    Nossa equipe especializada em Direito Digital está pronta para analisar o seu caso e orientar as melhores estratégias jurídicas.
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

export default DireitoDoConsumidorComprasOnline;
