import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, AlertTriangle, FileText, Eye } from "lucide-react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const InvasaoDispositivo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Invasão de Dispositivo Informático: Consequências Jurídicas | Lisomar Barbosa | Direito Digital</title>
        <meta name="description" content="Análise completa sobre o crime de invasão de dispositivo informático (Art. 154-A do CP), responsabilidade civil por danos morais e materiais, deveres de segurança sob a LGPD e Marco Civil da Internet, responsabilidade objetiva do fornecedor no CDC e preservação de provas digitais." />
        <link rel="canonical" href="https://www.lisomarbarbosa.adv.br/artigos/invasao-dispositivo-informatico-consequencias-juridicas" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        <meta property="og:site_name" content="Lisomar Barbosa | Direito Digital" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.lisomarbarbosa.adv.br/artigos/invasao-dispositivo-informatico-consequencias-juridicas" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1756671994948-183e2d833da0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDQxODI4fA&ixlib=rb-4.1.0&q=80&w=1080" />
        <meta property="og:title" content="Invasão de Dispositivo Informático: Consequências Jurídicas | Lisomar Barbosa | Direito Digital" />
        <meta property="og:description" content="Análise completa sobre o crime de invasão de dispositivo informático (Art. 154-A do CP), responsabilidade civil por danos morais e materiais, deveres de segurança sob a LGPD e Marco Civil da Internet, responsabilidade objetiva do fornecedor no CDC e preservação de provas digitais." />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Invasão de Dispositivo Informático: Consequências Jurídicas | Lisomar Barbosa | Direito Digital" />
        <meta name="twitter:description" content="Análise completa sobre o crime de invasão de dispositivo informático (Art. 154-A do CP), responsabilidade civil por danos morais e materiais, deveres de segurança sob a LGPD e Marco Civil da Internet, responsabilidade objetiva do fornecedor no CDC e preservação de provas digitais." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1756671994948-183e2d833da0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDQxODI4fA&ixlib=rb-4.1.0&q=80&w=1080" />
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
                    Invasão de Dispositivo Informático: Análise Completa das Consequências Jurídicas no Ordenamento Brasileiro
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>22 Ago 2026</span>
                    <span>•</span>
                    <span>11 min de leitura</span>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1756671994948-183e2d833da0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDQxODI4fA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Invasão de Dispositivo Informático e Segurança Digital"
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                  />
                </header>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                    A expansão das tecnologias da informação trouxe a necessidade imperativa de tutelar juridicamente o espaço digital. A Constituição Federal de 1988 estabelece os pilares dessa proteção: o <strong>Art. 5º, X</strong> garante a inviolabilidade da intimidade e vida privada; o <strong>inciso XII</strong> assegura o sigilo das comunicações de dados; e o <strong>inciso LXXII</strong> concede o <em>habeas data</em>. Esses dispositivos fundamentam a proteção constitucional dos dispositivos informáticos e dos dados neles contidos.
                  </p>

                  <Card className="p-6 bg-accent/10 border-accent/20 mb-8">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="text-accent flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold mb-2">Atenção: Não Formate o Dispositivo!</h3>
                        <p className="text-sm text-foreground/80">
                          Em caso de invasão, <strong>não realize factory reset</strong> antes de preservar as provas. Desconecte da internet (modo avião), solicite perícia forense e registre boletim de ocorrência com representação expressa. A ação penal do Art. 154-A é condicionada à representação, com prazo de 6 meses.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Shield className="text-primary" size={28} />
                    1. Esfera Penal: Tipificação (Lei nº 12.737/2012)
                  </h2>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    A <strong>Lei nº 12.737/2012 (Lei Carolina Dieckmann)</strong> inseriu no Código Penal tipos penais específicos para reprimir a invasão de dispositivos informáticos e condutas correlatas.
                  </p>

                  <div className="space-y-6 mb-12">
                    <div>
                      <h3 className="text-xl font-bold mb-3">1.1 Crime de Invasão de Dispositivo Informático (Art. 154-A do CP)</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        O Art. 154-A tipifica a conduta de <em>"invadir dispositivo informático alheio, conectado ou não à rede de computadores, mediante violação indevida de mecanismo de segurança"</em>. Trata-se de crime formal, que se consuma com a simples invasão. A pena base é de <strong>detenção de 3 meses a 1 ano e multa</strong>. O § 2º eleva a pena para <strong>reclusão de 6 meses a 2 anos e multa</strong> quando resultar em obtenção de comunicações privadas, segredos comerciais ou controle remoto do dispositivo.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">1.2 Divulgação de Segredo Obtido (Art. 154, § 1º do CP)</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        Divulgar, utilizar ou transmitir segredo alheio obtido mediante invasão constitui crime autônomo com <strong>pena de reclusão de 1 a 4 anos e multa</strong>. A ação penal é pública incondicionada, diferentemente do crime principal.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">1.3 Crimes Correlatos e Concurso Material</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        A invasão frequentemente é meio para outros delitos em concurso material (Art. 69 CP): Estelionato Eletrônico (Art. 171, § 2º CP), Falsificação de Documento Particular (Art. 298 CP), Interceptação Ilícita de Comunicações (Lei nº 9.296/1996) e Violação de Direitos Autorais de Software (Lei nº 9.609/1998).
                      </p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <FileText className="text-primary" size={28} />
                    2. Esfera Cível: Reparação Integral dos Danos
                  </h2>

                  <div className="space-y-6 mb-12">
                    <div>
                      <h3 className="text-xl font-bold mb-3">2.1 Dano Moral Presumido (<em>In Re Ipsa</em>)</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        A jurisprudência do STJ consolidou que a invasão de dispositivo informático, por violar diretamente a intimidade e vida privada (dados sensíveis, conversas íntimas, imagens, localização), gera <strong>dano moral <em>in re ipsa</em></strong> — presumido, dispensando prova do sofrimento subjetivo. A indenização tem função compensatória, punitiva e pedagógica.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">2.2 Danos Materiais</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        Exigem comprovação documental (Arts. 402, 403, 944 do CC) e abrangem: gastos com perícia forense e soluções de segurança; perda de arquivos de trabalho e propriedade intelectual; prejuízos por fraudes bancárias; e lucros cessantes comprovados por paralisação de e-commerce ou perda de contratos.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">2.3 Responsabilidade de Terceiros</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        O <strong>empregador/comitente</strong> responde objetivamente por atos de prepostos praticados em razão da função (Art. 932, III, e Art. 933 do CC). Os <strong>provedores de aplicação</strong> não respondem por conteúdo de terceiros, salvo após ordem judicial específica (Art. 19 MCI) — exceto para conteúdo íntimo (Art. 21 MCI), onde notificação extrajudicial basta.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Eye className="text-primary" size={28} />
                    3. LGPD e CDC: Deveres de Segurança
                  </h2>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    A <strong>LGPD (Arts. 46 e 48)</strong> impõe ao controlador o dever de adotar medidas técnicas e administrativas para proteger os dados (<em>security by design</em> e <em>by default</em>), comunicar incidentes à ANPD e ao titular, e sujeitar-se a sanções administrativas de até <strong>R$ 50 milhões por infração</strong>.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O <strong>CDC (Art. 14)</strong> responsabiliza objetivamente o fornecedor de serviços online por falhas de segurança que permitam a invasão ou o vazamento de dados do consumidor. A <strong>inversão do ônus da prova (Art. 6º, VIII CDC)</strong> favorece a vítima, cabendo ao fornecedor demonstrar que adotou medidas adequadas ou que houve caso fortuito exclusivo.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6">4. Marco Civil: Provedores e Preservação de Provas</h2>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    Os <strong>provedores de conexão</strong> devem guardar registros de IP, data, hora e duração por <strong>1 ano (Art. 13 MCI)</strong>. Os <strong>provedores de aplicação</strong> devem guardar logs de acesso por <strong>6 meses (Art. 15 MCI)</strong>. Ambos só fornecem esses dados mediante <strong>ordem judicial fundamentada (Art. 22 MCI)</strong>.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A <strong>perícia forense digital</strong> deve seguir a norma ISO 27037 e o NIST SP 800-86 para garantir <em>chain of custody</em> — integridade, autenticidade e admissibilidade judicial (CPP Art. 158).
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6">5. O Que Fazer em Caso de Invasão</h2>
                  <ol className="space-y-4 mb-12">
                    <li className="flex gap-4">
                      <span className="font-bold text-primary">1.</span>
                      <div><strong>Isolamento imediato:</strong> Desconecte o dispositivo da internet (modo avião). <em>Não realize factory reset.</em></div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary">2.</span>
                      <div><strong>Preservação de evidências:</strong> Prints com data/hora, logs do sistema, cópia forense (<em>bitstream image</em>) por perito, ata notarial (CPC Art. 381).</div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary">3.</span>
                      <div><strong>Boletim de Ocorrência:</strong> Registre na Delegacia de Crimes Cibernéticos com <strong>representação</strong> expressa (prazo: 6 meses, Art. 38 CPP).</div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary">4.</span>
                      <div><strong>Notificação à ANPD (LGPD Art. 48):</strong> Se houver vazamento de dados pessoais, o controlador deve notificar. O titular pode peticionar à ANPD.</div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary">5.</span>
                      <div><strong>Medidas cautelares cíveis (CPC Art. 294):</strong> Busca e apreensão, bloqueio de contas, exibição de logs por provedores, tutela de urgência para cessação do vazamento.</div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary">6.</span>
                      <div><strong>Mitigação:</strong> Troque todas as senhas (use gerenciador), ative 2FA/MFA, monitore CPF nos bureaus de crédito e comunique bancos/instituições financeiras.</div>
                    </li>
                  </ol>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Conclusão</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A invasão de dispositivo informático é violação sistêmica de direitos fundamentais que desencadeia responsabilização em múltiplas esferas: penal (Arts. 154-A, 154 §1º, 266 CP), civil (Arts. 186, 927, 932, 933, 935 CC), consumerista (CDC Arts. 6º, 14, 27), regulatória (LGPD Arts. 46, 48, 52) e processual (Marco Civil Arts. 13, 15, 19, 21, 22). A efetividade da tutela depende da atuação célere na preservação da prova digital (<em>chain of custody</em>), da representação criminal tempestiva e da propositura coordenada das ações civis e administrativas cabíveis.
                  </p>
                  <p className="text-sm text-foreground/50 italic">
                    Este artigo tem caráter informativo e não substitui consulta a advogado especializado para análise do caso concreto. A legislação e a jurisprudência estão em constante evolução.
                  </p>
                </div>

                <div className="mt-16 p-8 rounded-2xl gradient-cyber border border-primary/20 text-center">
                  <h3 className="text-2xl font-bold mb-4">Seu Dispositivo Foi Invadido?</h3>
                  <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                    Nossa equipe especializada em Direito Digital atua desde a fase de resposta ao incidente e preservação forense até a obtenção de reparação integral nas esferas judicial e administrativa.
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

export default InvasaoDispositivo;
