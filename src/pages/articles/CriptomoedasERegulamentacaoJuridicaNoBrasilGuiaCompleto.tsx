import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Scale, Shield, FileText, AlertTriangle, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const CriptomoedasERegulamentacaoJuridicaNoBrasilGuiaCompleto = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Criptomoedas e regulamentação jurídica no Brasil: guia completo | Lisomar Barbosa | Direito Digital e Proteção de Dados</title>
        <meta name="description" content="Entenda o marco legal das criptomoedas, obrigações de exchanges, proteção ao consumidor e riscos de lavagem de dinheiro no Brasil." />
        <link rel="canonical" href="https://www.lisomarbarbosa.adv.br/blog/criptomoedas-e-regulamentacao-juridica-no-brasil-guia-completo" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        <meta property="og:site_name" content="Lisomar Barbosa | Direito Digital" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.lisomarbarbosa.adv.br/blog/criptomoedas-e-regulamentacao-juridica-no-brasil-guia-completo" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1555949963-aa79dcee981c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" />
        <meta property="og:title" content="Criptomoedas e regulamentação jurídica no Brasil: guia completo | Lisomar Barbosa" />
        <meta property="og:description" content="Entenda o marco legal das criptomoedas, obrigações de exchanges, proteção ao consumidor e riscos de lavagem de dinheiro no Brasil." />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Criptomoedas e regulamentação jurídica no Brasil: guia completo | Lisomar Barbosa" />
        <meta name="twitter:description" content="Entenda o marco legal das criptomoedas, obrigações de exchanges, proteção ao consumidor e riscos de lavagem de dinheiro no Brasil." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1555949963-aa79dcee981c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" />
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
                    Criptomoedas e regulamentação jurídica no Brasil: guia completo
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>27 Ago 2026</span>
                    <span>•</span>
                    <span>8 min de leitura</span>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                    alt="Criptomoedas e regulamentação jurídica no Brasil"
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                  />
                </header>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                    O mercado de criptomoedas cresceu de forma acelerada no Brasil nos últimos anos, atraindo investidores, empresas e também golpistas. Com isso, surgiram questões jurídicas relevantes sobre regulação, tributação, responsabilidade das exchanges e proteção ao consumidor que todo usuário precisa conhecer.
                  </p>

                  <Card className="p-5 border-amber-500/30 bg-amber-50/30 dark:bg-amber-900/10 mb-10">
                    <p className="text-sm text-foreground/80">
                      <strong>⚠️ Atenção:</strong> O mercado de criptoativos é volátil e regulado por normas em constante evolução. As informações aqui apresentadas têm caráter informativo e não substituem consulta jurídica personalizada.
                    </p>
                  </Card>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <FileText className="text-primary" size={28} />
                    O que são criptoativos para o direito brasileiro
                  </h2>

                  <p className="text-foreground/80 leading-relaxed mb-4">
                    A legislação brasileira adota o termo <strong>criptoativo</strong> para designar a representação digital de valor que pode ser negociada ou transferida por meios eletrônicos e utilizada para realização de pagamentos ou como forma de investimento.
                  </p>
                  <p className="text-foreground/80 leading-relaxed mb-4">
                    A Lei 14.478/2022, conhecida como Marco Legal das Criptomoedas, introduziu essa definição no ordenamento jurídico nacional e estabeleceu as bases para a regulação do setor. O Bitcoin, o Ether e os demais tokens negociados nas exchanges são exemplos de criptoativos sujeitos a esse regime.
                  </p>
                  <p className="text-foreground/80 leading-relaxed mb-8">
                    É importante distinguir os criptoativos de outros instrumentos financeiros. Nem todo token é considerado valor mobiliário. Quando o ativo representar participação em empreendimento coletivo com expectativa de lucro derivado do esforço de terceiros, pode ser enquadrado como valor mobiliário e ficar sujeito à regulação da Comissão de Valores Mobiliários (CVM).
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Scale className="text-primary" size={28} />
                    O Marco Legal das Criptomoedas
                  </h2>

                  <p className="text-foreground/80 leading-relaxed mb-4">
                    A Lei 14.478/2022 representou avanço significativo na regulação do setor. Seus pontos principais são:
                  </p>

                  <Card className="p-6 border-primary/20 mb-8">
                    <ul className="space-y-3 text-foreground/80">
                      <li className="flex gap-2">• <span><strong>Definição legal de criptoativo</strong> e de prestador de serviços de ativos virtuais (PSAV)</span></li>
                      <li className="flex gap-2">• <span><strong>Obrigação de autorização</strong> para funcionamento das exchanges no Brasil, a ser concedida pelo Banco Central do Brasil</span></li>
                      <li className="flex gap-2">• <span><strong>Exigência de segregação patrimonial</strong> entre os recursos dos clientes e o patrimônio da própria exchange</span></li>
                      <li className="flex gap-2">• <span><strong>Prevenção à lavagem de dinheiro</strong>, com obrigações de identificação dos clientes, monitoramento de transações e comunicação de operações suspeitas ao COAF</span></li>
                      <li className="flex gap-2">• <span><strong>Proteção ao consumidor</strong>, com vedação a práticas abusivas e exigência de transparência nas informações prestadas aos usuários</span></li>
                    </ul>
                  </Card>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Shield className="text-primary" size={28} />
                    Obrigações das exchanges
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <Card className="p-6 border-primary/20">
                      <h3 className="text-xl font-bold mb-4">Perante os clientes</h3>
                      <ul className="space-y-2 text-foreground/80 text-sm">
                        <li className="flex gap-2">• Fornecer informações claras sobre os riscos dos ativos negociados</li>
                        <li className="flex gap-2">• Segregar os criptoativos dos clientes do patrimônio próprio</li>
                        <li className="flex gap-2">• Executar ordens de saída e transferência dentro dos prazos</li>
                        <li className="flex gap-2">• Apresentar extratos e históricos de transações</li>
                        <li className="flex gap-2">• Comunicar previamente alterações nos termos de uso</li>
                      </ul>
                    </Card>
                    <Card className="p-6 border-primary/20">
                      <h3 className="text-xl font-bold mb-4">Perante o regulador</h3>
                      <ul className="space-y-2 text-foreground/80 text-sm">
                        <li className="flex gap-2">• Manter cadastro atualizado dos clientes (KYC)</li>
                        <li className="flex gap-2">• Registrar e monitorar transações acima dos valores definidos</li>
                        <li className="flex gap-2">• Comunicar operações suspeitas ao COAF</li>
                        <li className="flex gap-2">• Manter capital mínimo compatível com o volume de negócios</li>
                        <li className="flex gap-2">• Submeter-se a auditorias e inspeções periódicas</li>
                      </ul>
                    </Card>
                  </div>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Shield className="text-primary" size={28} />
                    Proteção ao consumidor no mercado de criptoativos
                  </h2>

                  <p className="text-foreground/80 leading-relaxed mb-4">
                    A relação entre o investidor pessoa física e a exchange é uma relação de consumo. Isso significa que o Código de Defesa do Consumidor (CDC) se aplica, garantindo ao usuário direitos como:
                  </p>

                  <ul className="space-y-3 text-foreground/80 mb-6">
                    <li className="flex gap-2">• Informação adequada e clara sobre os serviços prestados e os riscos envolvidos</li>
                    <li className="flex gap-2">• Proteção contra cláusulas contratuais abusivas</li>
                    <li className="flex gap-2">• Responsabilidade objetiva da exchange por danos causados por falhas na prestação do serviço</li>
                    <li className="flex gap-2">• Direito de arrependimento nas contratações feitas fora do estabelecimento comercial</li>
                  </ul>

                  <p className="text-foreground/80 leading-relaxed mb-8">
                    A <strong>omissão de informações relevantes sobre os riscos de volatilidade</strong> dos criptoativos já foi objeto de condenação judicial. Exchanges que não alertam adequadamente os usuários sobre a possibilidade de perda total do investimento podem ser responsabilizadas pelos danos sofridos. Da mesma forma, falhas de segurança que resultem no furto de criptoativos dos clientes configuram defeito na prestação do serviço, gerando dever de indenização pela exchange, independentemente de culpa.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <TrendingUp className="text-primary" size={28} />
                    Tributação dos criptoativos
                  </h2>

                  <p className="text-foreground/80 leading-relaxed mb-4">
                    A Receita Federal do Brasil trata os criptoativos como bens sujeitos ao regime de ganho de capital, e não como moeda. As regras principais são:
                  </p>

                  <Card className="p-6 border-primary/20 mb-6">
                    <h3 className="text-xl font-bold mb-4">Imposto sobre ganho de capital</h3>
                    <div className="space-y-3 text-sm text-foreground/80">
                      <div className="flex justify-between items-center border-b border-border/30 pb-2">
                        <span>Vendas mensais até R$ 35.000</span>
                        <span className="font-bold text-primary">Isento</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-border/30 pb-2">
                        <span>Vendas entre R$ 35.000,01 e R$ 5 milhões</span>
                        <span className="font-bold">15%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-border/30 pb-2">
                        <span>Vendas entre R$ 5 milhões e R$ 10 milhões</span>
                        <span className="font-bold">17,5%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-border/30 pb-2">
                        <span>Vendas entre R$ 10 milhões e R$ 30 milhões</span>
                        <span className="font-bold">20%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Vendas acima de R$ 30 milhões</span>
                        <span className="font-bold">22,5%</span>
                      </div>
                    </div>
                    <p className="text-xs text-foreground/60 mt-4">O imposto deve ser pago até o último dia útil do mês seguinte ao da operação, por meio de DARF.</p>
                  </Card>

                  <Card className="p-5 border-primary/20 mb-8">
                    <h3 className="text-lg font-bold mb-2">Declaração de ativos no exterior</h3>
                    <p className="text-foreground/80 text-sm">
                      Criptoativos mantidos em exchanges estrangeiras ou em carteiras próprias com saldo superior a R$ 6.000,00 devem ser informados na declaração de capitais brasileiros no exterior (CBE). A omissão ou erro na declaração pode resultar em multa, lançamento de ofício e, em casos de omissão dolosa, configurar crime contra a ordem tributária.
                    </p>
                  </Card>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <AlertTriangle className="text-primary" size={28} />
                    Lavagem de dinheiro e criptoativos
                  </h2>

                  <p className="text-foreground/80 leading-relaxed mb-4">
                    As exchanges são consideradas <strong>pessoas obrigadas</strong> pela Lei 9.613/1998 (Lei de Lavagem de Dinheiro), devendo identificar e verificar a identidade de todos os clientes, manter registros de todas as transações, comunicar ao COAF operações suspeitas ou que ultrapassem os limites estabelecidos, e abster-se de informar ao cliente sobre comunicações feitas ao COAF.
                  </p>
                  <p className="text-foreground/80 leading-relaxed mb-8">
                    O cliente que utiliza criptoativos para dissimular a origem ilícita de valores comete o crime previsto no artigo 1º da Lei 9.613/1998, com pena de reclusão de 3 a 10 anos e multa. A utilização de criptoativos não impede a identificação das transações pelas autoridades, já que a blockchain é um registro público e imutável.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <AlertTriangle className="text-primary" size={28} />
                    Golpes e fraudes com criptomoedas
                  </h2>

                  <div className="space-y-4 mb-10">
                    <Card className="p-5 border-red-400/20 bg-red-50/20 dark:bg-red-900/10">
                      <h3 className="font-bold mb-2">Esquemas Ponzi e pirâmides financeiras</h3>
                      <p className="text-foreground/80 text-sm">Prometem rentabilidade fixa e elevada, captando recursos de novos investidores para pagar os anteriores. Os promotores podem responder pelos crimes de estelionato, gestão fraudulenta e lavagem de dinheiro.</p>
                    </Card>
                    <Card className="p-5 border-red-400/20 bg-red-50/20 dark:bg-red-900/10">
                      <h3 className="font-bold mb-2">Phishing e invasão de contas</h3>
                      <p className="text-foreground/80 text-sm">Mensagens falsas que simulam comunicações legítimas de exchanges para obter credenciais de acesso. A exchange que não adota medidas adequadas de segurança pode ser responsabilizada subsidiariamente.</p>
                    </Card>
                    <Card className="p-5 border-red-400/20 bg-red-50/20 dark:bg-red-900/10">
                      <h3 className="font-bold mb-2">Rug pull e falsas exchanges</h3>
                      <p className="text-foreground/80 text-sm">Projetos que captam investimentos e desaparecem com os recursos, ou plataformas que fingem ser exchanges legítimas e bloqueiam saques. Operar exchange sem autorização do Banco Central é crime, além de configurar estelionato.</p>
                    </Card>
                  </div>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Scale className="text-primary" size={28} />
                    Como agir diante de problemas com exchanges
                  </h2>

                  <div className="space-y-4 mb-10">
                    {[
                      { num: "1", title: "Preserve as provas", desc: "Registre capturas de tela de todas as operações realizadas, saldos, comunicações com o suporte, endereços de carteiras envolvidas e comprovantes de depósito e transferência." },
                      { num: "2", title: "Tente a resolução extrajudicial", desc: "Envie notificação formal à exchange descrevendo o problema, o prejuízo sofrido e o prazo para resposta. Registre o protocolo de atendimento." },
                      { num: "3", title: "Acione os canais regulatórios", desc: "Registre reclamação no Banco Central (se a exchange for autorizada), no Procon e no portal consumidor.gov.br." },
                      { num: "4", title: "Avalie a via judicial", desc: "Dependendo do valor envolvido, o Juizado Especial Cível pode ser a via mais rápida. Para valores maiores, a ação ordinária com pedido de tutela de urgência pode ser mais adequada." },
                      { num: "5", title: "Considere a esfera criminal", desc: "Nos casos de fraude evidente, o registro de boletim de ocorrência e eventual representação criminal podem ser providências importantes para investigação e rastreamento de ativos." },
                    ].map((step) => (
                      <Card key={step.num} className="p-5 border-primary/20 flex gap-4">
                        <span className="text-2xl font-bold text-primary/40 leading-none">{step.num}</span>
                        <div>
                          <h3 className="font-bold mb-1">{step.title}</h3>
                          <p className="text-foreground/80 text-sm">{step.desc}</p>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Card className="p-6 border-primary/30 bg-primary/5 mt-12">
                    <h2 className="text-2xl font-bold mb-4">Considerações finais</h2>
                    <p className="text-foreground/80 leading-relaxed mb-4">
                      O Brasil avançou significativamente na regulação das criptomoedas com o Marco Legal de 2022, mas o setor ainda apresenta riscos relevantes para os investidores. A ausência de garantia pelo Fundo Garantidor de Créditos (FGC), a volatilidade dos ativos e a presença de agentes mal-intencionados exigem cautela redobrada.
                    </p>
                    <p className="text-foreground/80 leading-relaxed">
                      Conhecer os direitos assegurados pela legislação — especialmente pelo CDC, pela Lei 14.478/2022 e pelas normas do Banco Central — é o primeiro passo para se proteger e, quando necessário, buscar reparação judicial pelos danos sofridos.
                    </p>
                  </Card>

                  <p className="text-sm text-foreground/50 mt-8 italic">
                    Este artigo tem caráter informativo e não substitui consulta jurídica personalizada. Para avaliar o seu caso concreto, busque orientação profissional adequada.
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

export default CriptomoedasERegulamentacaoJuridicaNoBrasilGuiaCompleto;
