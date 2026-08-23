import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, AlertTriangle, FileText, Lock, Search } from "lucide-react";
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
        <title>Invasão de Dispositivo Informático: O Que Diz a Lei e Como se Defender | Lisomar Barbosa | Direito Digital</title>
        <meta name="description" content="Entenda o crime de invasão de dispositivo informático (Art. 154-A do CP), as penas previstas, seus direitos como vítima e como agir juridicamente para se proteger." />
        <link rel="canonical" href="https://www.lisomarbarbosa.adv.br/artigos/invasao-dispositivo-informatico-consequencias-juridicas" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:site_name" content="Lisomar Barbosa | Direito Digital" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.lisomarbarbosa.adv.br/artigos/invasao-dispositivo-informatico-consequencias-juridicas" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&auto=format&fit=crop&q=80" />
        <meta property="og:title" content="Invasão de Dispositivo Informático: O Que Diz a Lei e Como se Defender | Lisomar Barbosa | Direito Digital" />
        <meta property="og:description" content="Entenda o crime de invasão de dispositivo informático (Art. 154-A do CP), as penas previstas, seus direitos como vítima e como agir juridicamente para se proteger." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Invasão de Dispositivo Informático: O Que Diz a Lei e Como se Defender | Lisomar Barbosa | Direito Digital" />
        <meta name="twitter:description" content="Entenda o crime de invasão de dispositivo informático (Art. 154-A do CP), as penas previstas, seus direitos como vítima e como agir juridicamente para se proteger." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&auto=format&fit=crop&q=80" />
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
                    Crimes Digitais
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Invasão de Dispositivo Informático: O Que Diz a Lei e Como se Defender
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>15 Ago 2024</span>
                    <span>•</span>
                    <span>9 min de leitura</span>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&auto=format&fit=crop&q=80"
                    alt="Invasão de Dispositivo Informático"
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                    loading="lazy"
                  />
                </header>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                    Ter o celular, computador ou conta invadidos é uma violação grave de privacidade e um crime previsto expressamente no Código Penal Brasileiro. A Lei nº 12.737/2012, conhecida como "Lei Carolina Dieckmann", introduziu o Art. 154-A, que tipifica a invasão de dispositivo informático — e as penas podem ser severas, especialmente quando há exposição de dados íntimos ou prejuízo financeiro.
                  </p>

                  <Card className="p-6 bg-accent/10 border-accent/20 mb-8">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="text-accent flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold mb-2">Atenção: Preserve as Provas Imediatamente</h3>
                        <p className="text-sm text-foreground/80">
                          Se você suspeita de invasão, não reinicie o dispositivo, não apague conversas e faça prints de tudo. Provas digitais são frágeis e podem desaparecer. Consulte um advogado especializado antes de qualquer ação.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Shield className="text-primary" size={28} />
                    O Que Diz o Art. 154-A do Código Penal?
                  </h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    O dispositivo legal define o crime como: <em>"Invadir dispositivo informático de uso alheio, conectado ou não à rede de computadores, com o fim de obter, adulterar ou destruir dados ou informações sem autorização expressa ou tácita do titular do dispositivo ou instalar vulnerabilidades para obter vantagem ilícita."</em>
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A pena base é de <strong>detenção de 3 meses a 1 ano, mais multa</strong>. No entanto, as penas aumentam consideravelmente nas seguintes situações:
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex gap-4 p-4 rounded-lg bg-background border border-border">
                      <span className="font-bold text-primary text-lg">§3º</span>
                      <div>
                        <strong>Reclusão de 6 meses a 2 anos, mais multa</strong> — se da invasão resultar a obtenção de conteúdo de comunicações eletrônicas privadas, segredos comerciais ou industriais, informações sigilosas ou o controle remoto do dispositivo.
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-lg bg-background border border-border">
                      <span className="font-bold text-primary text-lg">§4º</span>
                      <div>
                        <strong>Aumento de 1/3 a 2/3</strong> — se houver divulgação, comercialização ou transmissão dos dados obtidos.
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-lg bg-background border border-border">
                      <span className="font-bold text-primary text-lg">§5º</span>
                      <div>
                        <strong>Aumento de 1/3 a 2/3</strong> — se o crime for praticado contra dirigente máximo da administração direta ou indireta federal, estadual, municipal ou do Distrito Federal.
                      </div>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Search className="text-primary" size={28} />
                    Formas Mais Comuns de Invasão de Dispositivo
                  </h2>

                  <div className="space-y-6 mb-12">
                    <div>
                      <h3 className="text-xl font-bold mb-3">1. Acesso Indevido a Contas (E-mail, Redes Sociais, WhatsApp)</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        O agressor obtém login e senha da vítima — por phishing, engenharia social ou força bruta — e acessa suas contas sem autorização. É uma das formas mais comuns e suficientes para configurar o crime.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">2. Instalação de Spyware ou Stalkerware</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        Softwares espiões instalados no dispositivo da vítima — muitas vezes por parceiros abusivos — permitem monitorar localização, mensagens e ligações em tempo real. Isso configura invasão de dispositivo <em>e</em> violação de privacidade sob a LGPD.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">3. Clonagem de WhatsApp</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        Por meio de engenharia social (ex: fingir ser operadora e pedir o código SMS), o criminoso clona o WhatsApp da vítima e passa a se comunicar em seu nome. Além do Art. 154-A, pode configurar estelionato (Art. 171 CP).
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">4. Acesso Físico Não Autorizado ao Dispositivo</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        Mesmo sem rede, acessar o celular ou computador de outra pessoa sem permissão — para ler mensagens, copiar fotos ou instalar aplicativos — já configura o crime, desde que haja intenção de obter dados.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">5. Ataques de Ransomware</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        O invasor criptografa os dados da vítima e exige pagamento de resgate. Configura invasão de dispositivo em concurso com extorsão (Art. 158 CP), podendo resultar em penas somadas de vários anos.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Lock className="text-primary" size={28} />
                    Como Identificar que Fui Vítima?
                  </h2>

                  <ul className="list-disc pl-6 mb-8 text-foreground/80 space-y-3">
                    <li>Recebe notificações de login em locais ou horários que não reconhece</li>
                    <li>Contatos relatam ter recebido mensagens que você não enviou</li>
                    <li>O dispositivo está mais lento que o normal ou a bateria drena rapidamente</li>
                    <li>Encontra aplicativos que não instalou, especialmente de monitoramento</li>
                    <li>Senhas foram alteradas sem sua ação</li>
                    <li>Fotos, vídeos ou arquivos aparecem ou desaparecem misteriosamente</li>
                    <li>Dados de uso de internet estão anormalmente altos</li>
                  </ul>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <FileText className="text-primary" size={28} />
                    O Que Fazer Imediatamente Após a Invasão?
                  </h2>

                  <ol className="space-y-4 mb-12">
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">1.</span>
                      <div>
                        <strong>Preserve as provas:</strong> Faça capturas de tela de tudo — mensagens recebidas, notificações de acesso, comportamentos estranhos. Grave em local seguro (nuvem, e-mail pessoal diferente).
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">2.</span>
                      <div>
                        <strong>Altere todas as senhas:</strong> Comece pelo e-mail principal, depois redes sociais, bancos e demais contas. Use senhas únicas e ative autenticação em dois fatores (2FA) em tudo.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">3.</span>
                      <div>
                        <strong>Revogue sessões ativas:</strong> Na maioria das plataformas (Google, WhatsApp, Instagram), é possível ver e encerrar todas as sessões abertas. Faça isso imediatamente.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">4.</span>
                      <div>
                        <strong>Registre Boletim de Ocorrência:</strong> Nas delegacias de crimes cibernéticos (DRCI) ou online. Leve prints, datas e qualquer dado que identifique o invasor.
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">5.</span>
                      <div>
                        <strong>Consulte um advogado especializado:</strong> Para orientação sobre representação criminal, medidas cautelares digitais e eventual ação indenizatória por danos morais e materiais.
                      </div>
                    </li>
                  </ol>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Posso Ser Indenizado?</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Sim. Além da esfera criminal, a vítima pode ajuizar ação civil de indenização por danos morais e materiais contra o invasor. Os danos morais decorrem da violação da privacidade, intimidade e honra — valores constitucionalmente protegidos (Art. 5º, X, CF/88). Os danos materiais incluem prejuízos financeiros, gastos com recuperação do sistema, lucros cessantes, entre outros.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Se a invasão envolveu plataformas digitais (redes sociais, serviços de armazenamento em nuvem), pode ser possível responsabilizar civilmente o provedor de aplicação, desde que, notificado, ele não tome providências para remover o conteúdo ilícito ou fornecer os dados do invasor mediante ordem judicial — conforme os Arts. 19 e 21 do Marco Civil da Internet (Lei nº 12.965/2014).
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Conclusão</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A invasão de dispositivo informático é um crime sério, com consequências penais e cíveis relevantes. A legislação brasileira protege a privacidade digital dos cidadãos, e as vítimas têm mecanismos legais concretos para responsabilizar os agressores. Agir com rapidez na preservação das provas e na busca por orientação jurídica especializada é fundamental para o sucesso da defesa dos seus direitos.
                  </p>
                </div>

                <div className="mt-16 p-8 rounded-2xl gradient-cyber border border-primary/20 text-center">
                  <h3 className="text-2xl font-bold mb-4">Seu Dispositivo Foi Invadido?</h3>
                  <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                    Não enfrente isso sozinho. Nossa equipe especializada em Direito Digital pode orientá-lo sobre as melhores medidas jurídicas para responsabilizar os responsáveis e proteger seus dados.
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
