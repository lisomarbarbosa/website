import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, AlertTriangle, FileText, Eye, Lock } from "lucide-react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const PerseguicaoDigital = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Perseguição Digital: Proteção Jurídica para a Vítima | Lisomar Barbosa | Direito Digital</title>
        <meta name="description" content="O stalking digital é crime desde 2021 (Lei 14.132). Entenda como a Lei 147-A CP, Lei Maria da Penha, LGPD e Código Civil protegem a vítima e saiba quais passos práticos tomar." />
        <link rel="canonical" href="https://www.lisomarbarbosa.adv.br/artigos/perseguicao-digital-protecao-juridica-vitima" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        <meta property="og:site_name" content="Lisomar Barbosa | Direito Digital" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.lisomarbarbosa.adv.br/artigos/perseguicao-digital-protecao-juridica-vitima" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1768637757717-3e47abf07422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDQ3NTM3fA&ixlib=rb-4.1.0&q=80&w=1080" />
        <meta property="og:title" content="Perseguição Digital: Proteção Jurídica para a Vítima | Lisomar Barbosa | Direito Digital" />
        <meta property="og:description" content="O stalking digital é crime desde 2021. Entenda como a legislação brasileira ampara a vítima e quais passos práticos tomar para recuperar sua segurança." />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Perseguição Digital: Proteção Jurídica para a Vítima | Lisomar Barbosa | Direito Digital" />
        <meta name="twitter:description" content="O stalking digital é crime desde 2021. Entenda como a legislação brasileira ampara a vítima e quais passos práticos tomar para recuperar sua segurança." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1768637757717-3e47abf07422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDQ3NTM3fA&ixlib=rb-4.1.0&q=80&w=1080" />
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
                    Perseguição digital: quando a tela do celular vira uma ameaça real e o que a lei faz para proteger você
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>23 Ago 2026</span>
                    <span>•</span>
                    <span>10 min de leitura</span>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1768637757717-3e47abf07422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDQ3NTM3fA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Perseguição digital - proteção jurídica"
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                  />
                </header>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                    O som de uma notificação que antes trazia alegria passa a gelar a espinha. Quem está do outro lado? O que essa pessoa sabe sobre a sua rotina? Essa sensação de vigilância constante tem nome: <strong>perseguição digital</strong>, ou <em>stalking</em>. E, ao contrário do que ainda se ouve por aí, não é "drama". Desde 2021, é <strong>crime autônomo no Código Penal</strong>.
                  </p>

                  <Card className="p-6 bg-accent/10 border-accent/20 mb-8">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="text-accent flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold mb-2">Preserve as provas — não apague nada</h3>
                        <p className="text-sm text-foreground/80">
                          Faça prints com data e hora visíveis, grave vídeo da tela e registre boletim de ocorrência imediatamente. O prazo de representação criminal é de 6 meses (Art. 38 CPP).
                        </p>
                      </div>
                    </div>
                  </Card>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <FileText className="text-primary" size={28} />
                    O que a lei entende por perseguição
                  </h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A <strong>Lei nº 14.132/2021</strong> inseriu o <strong>Art. 147-A no Código Penal</strong>, tipificando o crime de <strong>perseguição (stalking)</strong>. A norma pune quem, de forma <strong>reiterada</strong>, persegue alguém ameaçando sua integridade física ou psicológica, restringindo sua locomoção ou invadindo sua esfera de liberdade e privacidade — <strong>inclusive por meios virtuais</strong>.
                  </p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    No digital, a reiteração ganha escala: mensagens sucessivas, criação de perfis falsos para burlar bloqueios, monitoramento de <em>stories</em> e localização, aparecimento "coincidente" nos lugares que a vítima frequenta após ver seus <em>check-ins</em>. A pena prevista é de <strong>reclusão de 6 meses a 2 anos, e multa</strong>, aumentada quando praticada contra mulher, criança, adolescente, idoso ou pessoa com deficiência.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Shield className="text-primary" size={28} />
                    Lei Maria da Penha: medidas protetivas urgentes
                  </h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Quando o perseguidor é o ex-companheiro ou familiar, a <strong>Lei Maria da Penha (Lei nº 11.340/2006)</strong> é instrumento poderoso. O Art. 22 autoriza medidas protetivas que incluem <strong>proibição de contato por qualquer meio de comunicação</strong> — WhatsApp, e-mail, redes sociais, SMS e interações indiretas. O descumprimento é crime autônomo (Art. 24-A), com pena de detenção de 3 meses a 2 anos e possibilidade de prisão em flagrante. A medida pode ser concedida em <strong>24 a 48 horas</strong>.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Lock className="text-primary" size={28} />
                    LGPD: seus dados não são munição para o agressor
                  </h2>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    Perseguição digital frequentemente envolve uso indevido de dados pessoais: acesso a e-mail, nuvem, localização em tempo real, histórico de compras. A <strong>LGPD (Lei nº 13.709/2018)</strong> exige base legal e finalidade determinada para todo tratamento de dados. Usar informações pessoais para monitorar e ameaçar alguém viola frontalmente seus princípios. A vítima tem direito a:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex gap-3 text-foreground/80"><span className="text-primary font-bold">→</span> Solicitar a <strong>eliminação</strong> dos dados usados na perseguição (Art. 18, VI);</li>
                    <li className="flex gap-3 text-foreground/80"><span className="text-primary font-bold">→</span> <strong>Revogar o consentimento</strong> a qualquer momento (Art. 8º, § 5º);</li>
                    <li className="flex gap-3 text-foreground/80"><span className="text-primary font-bold">→</span> <strong>Opor-se ao tratamento</strong> ilegal e exigir bloqueio de acesso (Art. 18, § 2º).</li>
                  </ul>

                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <Eye className="text-primary" size={28} />
                    Indenização por danos morais e materiais
                  </h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Independentemente do processo penal, a vítima pode ingressar com <strong>ação de indenização</strong> (Código Civil, Arts. 186, 927). Os danos morais são <strong>presumidos (<em>in re ipsa</em>)</strong>: ansiedade, insônia, medo, perda de oportunidades profissionais, necessidade de tratamento psicológico. Danos materiais incluem troca de aparelhos, mudança de endereço, câmeras de segurança, terapia. A jurisprudência tem reconhecido valores expressivos — especialmente quando há uso de <em>deepfakes</em> ou exposição de dados sensíveis.
                  </p>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Roteiro prático: o que fazer agora</h2>
                  <ol className="space-y-5 mb-12">
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">1.</span>
                      <div><strong>Preserve as provas com método</strong> — prints com data/hora, vídeos da tela, ata notarial em cartório para maior segurança jurídica.</div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">2.</span>
                      <div><strong>Registre o Boletim de Ocorrência</strong> — presencial ou online, mencionando expressamente "perseguição digital (stalking), Art. 147-A do CP".</div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">3.</span>
                      <div><strong>Solicite medida protetiva de urgência</strong> — na delegacia, Defensoria Pública ou com advogado. Pode ser obtida em 24–48h.</div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">4.</span>
                      <div><strong>Fortaleça sua higiene digital</strong> — troque todas as senhas, ative 2FA, revise dispositivos confiáveis e verifique se há spyware instalado.</div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">5.</span>
                      <div><strong>Denuncie às plataformas</strong> — use os canais de cada rede social para reportar assédio e perfis falsos, anexando o BO.</div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">6.</span>
                      <div><strong>Consulte um advogado especializado</strong> em Direito Digital para avaliar ação penal, medidas protetivas, ação indenizatória e notificações LGPD.</div>
                    </li>
                  </ol>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    A lei brasileira oferece respostas concretas: <strong>crime tipificado, medidas protetivas urgentes, proteção de dados pessoais e reparação civil</strong>. A sua liberdade, privacidade e paz não são negociáveis.
                  </p>

                  <p className="text-sm text-foreground/50 italic">
                    Este artigo tem caráter informativo e não substitui consulta jurídica personalizada.
                  </p>
                </div>

                <div className="mt-16 p-8 rounded-2xl gradient-cyber border border-primary/20 text-center">
                  <h3 className="text-2xl font-bold mb-4">Está sofrendo perseguição digital?</h3>
                  <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                    Nossa equipe especializada em Direito Digital está pronta para orientar você desde a preservação das provas até medidas protetivas e indenização.
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

export default PerseguicaoDigital;
