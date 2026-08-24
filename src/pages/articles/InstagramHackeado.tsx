import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertTriangle,
  ShieldCheck,
  Smartphone,
  KeyRound,
  Scale,
  CheckCircle,
  Calendar,
  Clock,
  Eye,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const InstagramHackeado = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sinais = [
    "Não consegue fazer login mesmo com a senha correta",
    "Seu e-mail ou número de telefone foram alterados sem sua autorização",
    "Publicações ou stories que você não criou aparecem no perfil",
    "Mensagens sendo enviadas automaticamente para seus seguidores",
    "Recebeu e-mail do Instagram notificando alterações que você não fez",
    "Seguidores reportam contatos estranhos vindos da sua conta",
  ];

  const preventivos = [
    {
      icon: KeyRound,
      titulo: "Autenticação de dois fatores (2FA)",
      descricao:
        "Acesse Configurações → Segurança → Autenticação de dois fatores. Use um aplicativo autenticador (Google Authenticator ou Authy), não o SMS, que pode ser interceptado via SIM swap.",
    },
    {
      icon: ShieldCheck,
      titulo: "Senha única e forte",
      descricao:
        "Crie uma senha com no mínimo 12 caracteres misturando letras, números e símbolos. Nunca reutilize a mesma senha em outros serviços. Use um gerenciador de senhas.",
    },
    {
      icon: Eye,
      titulo: "Revise aplicativos conectados",
      descricao:
        "Em Configurações → Segurança → Aplicativos autorizados, remova qualquer app que você não reconhece. Apps de terceiros com permissão de leitura são uma porta de entrada comum.",
    },
    {
      icon: Smartphone,
      titulo: "Cuidado com phishing",
      descricao:
        "O Instagram nunca solicita sua senha por e-mail. Não clique em links recebidos por DM ou e-mail pedindo para 'verificar' ou 'confirmar' sua conta. Acesse sempre pelo app oficial.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Instagram Hackeado: Passo a Passo para Recuperar sua Conta e seus
          Direitos | Lisomar Barbosa | Direito Digital
        </title>
        <meta
          name="description"
          content="Sua conta do Instagram foi hackeada? Saiba como recuperar o acesso em 4 etapas, quais medidas legais tomar e como responsabilizar os invasores pela Lei Carolina Dieckmann e LGPD."
        />
        <link
          rel="canonical"
          href="https://www.lisomarbarbosa.adv.br/blog/instagram-hackeado"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          property="og:site_name"
          content="Lisomar Barbosa | Direito Digital"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://www.lisomarbarbosa.adv.br/blog/instagram-hackeado"
        />
        <meta
          property="og:image"
          content="https://www.lisomarbarbosa.adv.br/og-image.jpg"
        />
        <meta
          property="og:title"
          content="Instagram Hackeado: Passo a Passo para Recuperar sua Conta e seus Direitos"
        />
        <meta
          property="og:description"
          content="Sua conta do Instagram foi hackeada? Saiba como recuperar o acesso em 4 etapas, quais medidas legais tomar e como responsabilizar os invasores."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Instagram Hackeado: Passo a Passo para Recuperar sua Conta e seus Direitos"
        />
        <meta
          name="twitter:description"
          content="Saiba como recuperar o acesso em 4 etapas, quais medidas legais tomar e como responsabilizar os invasores."
        />
        <meta
          name="twitter:image"
          content="https://www.lisomarbarbosa.adv.br/og-image.jpg"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <article className="py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <Link to="/#artigos">
                <Button variant="ghost" className="mb-8">
                  <ArrowLeft className="mr-2" size={18} />
                  Voltar para Artigos
                </Button>
              </Link>

              <div className="mb-12">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Redes Sociais
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Instagram Hackeado? Passo a Passo para Recuperar sua Conta
                </h1>
                <div className="flex items-center gap-6 text-foreground/60">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>8 Jan 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>7 min de leitura</span>
                  </div>
                </div>
              </div>

              <div className="relative h-96 rounded-2xl overflow-hidden mb-12 shadow-cyber">
                <img
                  src="https://images.unsplash.com/photo-1611262588024-d12430b98920?w=1200&auto=format&fit=crop&q=80"
                  alt="Instagram — Segurança de contas"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-lg prose-invert max-w-none">

                <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                  Ter o Instagram invadido é mais comum do que parece: milhares de brasileiros perdem acesso
                  às suas contas todos os dias por meio de phishing, SIM swap e vazamentos de senha. Além do
                  transtorno imediato, a invasão pode gerar danos à imagem, prejuízos financeiros e violação
                  de dados pessoais. Saiba o que fazer.
                </p>

                {/* Sinais de alerta */}
                <h2 className="text-3xl font-bold mt-12 mb-6">Sinais de que sua conta foi invadida</h2>

                <Card className="p-6 mb-10 border-red-500/30 bg-red-500/5">
                  <div className="flex gap-4">
                    <AlertTriangle className="text-red-400 shrink-0 mt-1" size={22} />
                    <ul className="space-y-2">
                      {sinais.map((s, i) => (
                        <li key={i} className="text-foreground/80 text-sm leading-relaxed flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>

                {/* Passo a passo */}
                <h2 className="text-3xl font-bold mt-12 mb-6">Passo a passo para recuperação imediata</h2>
                <p className="text-foreground/80 mb-8 leading-relaxed">
                  Aja rápido. Quanto mais tempo o invasor tiver acesso, maior o dano. Siga estas etapas na ordem:
                </p>

                <div className="space-y-6 mb-10">
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-bold">1</span>
                      Use a opção “Esqueci a senha”
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Na tela de login, toque em “Esqueceu a senha?” e tente recuperar via e-mail ou telefone.
                      Se você ainda controla esse e-mail ou número, poderá redefinir a senha e retomar o acesso
                      imediatamente.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-bold">2</span>
                      Desfaça alterações nas primeiras 48 horas
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      O Instagram envia uma notificação ao e-mail anterior sempre que o endereço cadastrado é
                      alterado. Nessa mensagem há um botão “Desfazer esta alteração” — use-o imediatamente.
                      Esse link tem prazo limitádo.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-bold">3</span>
                      Solicite ajuda do suporte com verificação de identidade
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Em casos mais graves, acesse instagram.com/hacked, escolha a opção correspondente ao seu
                      problema e siga as instruções. O Instagram pode pedir um vídeo selfie para verificar sua
                      identidade — esse processo comprova que você é o dono legítimo da conta.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-bold">4</span>
                      Documente tudo antes de qualquer ação
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Faça prints das mensagens suspeitas, do perfil alterado, das notificações recebidas e de
                      qualquer comunicação com o suporte. Essa documentação será essencial para o Boletim de
                      Ocorrência e para eventual ação judicial.
                    </p>
                  </div>
                </div>

                {/* Medidas Juridicas */}
                <h2 className="text-3xl font-bold mt-12 mb-6">Medidas jurídicas disponíveis</h2>

                <Card className="p-6 border border-primary/10 mb-8">
                  <div className="flex gap-4">
                    <Scale className="text-primary shrink-0 mt-1" size={22} />
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">Responsabilização criminal do invasor</p>
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          O acesso não autorizado a dispositivos e contas digitais configura crime pela
                          <strong> Lei Carolina Dieckmann (Lei 12.737/2012)</strong>, com pena de detenção
                          de 3 meses a 1 ano, além de multa. Se houver indução a erro para obter vantagem
                          econômica, pode configurar estelionato.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">Responsabilidade da plataforma</p>
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          Se o Instagram não fornecer suporte adequado ou se houver falhas comprovadas de
                          segurança, é possível acionar a plataforma com base no Marco Civil da Internet
                          (Lei 12.965/2014) e no Código de Defesa do Consumidor.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">Proteção de dados pessoais (LGPD)</p>
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          Se dados pessoais foram expostos ou utilizados indevidamente, você tem direito à
                          reparação com base na Lei 13.709/2018. Um advogado pode formalizar a exigência
                          de medidas de proteção e indenização.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Prevencao */}
                <h2 className="text-3xl font-bold mt-12 mb-8">Como prevenir futuros ataques</h2>

                <div className="grid gap-6 mb-10">
                  {preventivos.map((item, i) => (
                    <Card key={i} className="p-6 border border-primary/10">
                      <div className="flex gap-4">
                        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                          <item.icon className="text-primary" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{item.titulo}</h3>
                          <p className="text-foreground/70 text-sm leading-relaxed">{item.descricao}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6">Quando buscar ajuda jurídica</h2>
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  Se você tentou todos os métodos de recuperação sem sucesso, ou se sua conta foi usada para
                  praticar fraudes ou publicar conteúdo ilegal, é hora de agir juridicamente. Um advogado
                  especializado pode:
                </p>

                <div className="grid gap-3 mb-8">
                  {[
                    "Enviar notificação extrajudicial ao Instagram exigindo a recuperação da conta",
                    "Ingressar com ação judicial contra a plataforma ou o invasor",
                    "Formalizar representacão criminal por acesso não autorizado",
                    "Buscar reparação por danos morais e materiais sofridos",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={18} />
                      <p className="text-foreground/80 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16 p-8 rounded-2xl gradient-cyber border border-primary/20 text-center">
                <h3 className="text-2xl font-bold mb-4">Precisa recuperar sua conta do Instagram?</h3>
                <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                  Assessoria jurídica especializada em recuperação de contas em redes sociais e
                  responsabilização de invasores. Agende uma consulta.
                </p>
                <Link to="/#contato">
                  <Button
                    size="lg"
                    className="bg-gradient-accent text-background font-semibold shadow-cyber"
                  >
                    Falar com Especialista
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
};

export default InstagramHackeado;
