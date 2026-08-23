export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ofensas-redes-sociais-consequencias-juridicas',
    title: 'Ofensas nas redes sociais: quando a tela não protege — entenda seus direitos e como agir',
    excerpt: 'Um comentário cruel, um print fora de contexto, uma fake news compartilhada em segundos. O ambiente digital potencializa danos à honra e à imagem, mas a lei não ficou para trás. Saiba o que configura crime, como funciona a reparação civil e quais passos dar para se proteger.',
    date: '2026-08-23',
    readTime: '11 min',
    category: 'Direito Digital',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200',
    content: `A notificação acende na tela do celular. Você abre, lê uma vez, lê de novo, e o estômago revira. Alguém — conhecido ou anônimo escondido atrás de um perfil genérico — acabou de publicar algo que ataca sua honra, distorce um fato seu ou expõe sua intimidade sem consentimento. Nos primeiros minutos, a sensação é de impotência: a internet é rápida, o alcance é imenso e o "print" já circula em grupos de WhatsApp antes mesmo de você terminar o café.

Essa cena, infelizmente, deixou de ser exceção para se tornar rotina. As redes sociais amplificaram a voz de todos, mas não trouxeram, junto com o microfone, a responsabilidade que ele exige. Muitos ainda acreditam que o ambiente virtual é uma "terra de ninguém", onde se pode dizer o que quiser sob a desculpa de "liberdade de expressão" ou "só foi uma brincadeira". A realidade jurídica, porém, é outra: a Constituição Federal, no artigo 5º, inciso X, garante a inviolabilidade da intimidade, da vida privada, da honra e da imagem das pessoas, assegurando o direito a indenização pelo dano material ou moral decorrente de sua violação. Esse princípio não perde validade porque a ofensa foi digitada em vez de falada, ou porque foi publicada no Instagram em vez de impressa em jornal.

## O que o direito entende por ofensa no ambiente digital

Quando falamos em ofensas nas redes sociais, o ordenamento jurídico brasileiro trabalha em duas frentes paralelas e independentes: a esfera penal e a cível. Na esfera penal, o Código Penal tipifica três condutas principais contra a honra — calúnia, difamação e injúria —, e todas elas se aplicam integralmente ao que é escrito, postado, compartilhado ou transmitido ao vivo nas plataformas digitais. A calúnia (artigo 138) ocorre quando alguém imputa falsamente a outrem fato definido como crime — por exemplo, acusar publicamente uma pessoa de ter cometido um furto que nunca aconteceu. A difamação (artigo 139) atinge a reputação: é ofender a dignidade ou o decoro de alguém, espalhando informações vexatórias, ainda que não sejam crimes, como divulgar que alguém foi demitido por justa causa por conduta imoral, se isso não for verdade. Já a injúria (artigo 140) ofende a dignidade ou o decoro através de xingamentos, adjetivos pejorativos ou gestos — o clássico "você é um ladrão" dito nos comentários de uma publicação, sem imputar um fato criminoso específico, mas atacando a honra subjetiva da vítima.

Um detalhe crucial que muita gente desconhece: desde a reforma trazida pela Lei nº 13.964/2019 (conhecida como Pacote Anticrime), o artigo 141, parágrafo 2º, do Código Penal prevê causa de aumento de pena — de um terço até a metade — se qualquer desses crimes for cometido "mediante divulgação em rede social ou meio que facilite a divulgação". O legislador entendeu que o potencial lesivo da ofensa se multiplica exponencialmente quando ela ganha a viralização própria das redes sociais. Não é mais uma ofensa dita no ouvido de alguém; é uma ofensa potencialmente vista por milhares, arquivada nos servidores, replicada em prints e difícil de ser totalmente apagada.

Paralelamente, na esfera cível, o Código Civil (artigos 186, 187 e 927) estabelece que quem, por ação ou omissão voluntária, negligência ou imprudência, violar direito e causar dano a outrem, ainda que exclusivamente moral, comete ato ilícito e deve repará-lo. No contexto digital, isso significa que, independentemente de haver processo criminal ou de o ofensor ser condenado na justiça penal, a vítima pode — e deve — ingressar com ação de indenização por danos morais (e materiais, se houver prejuízo financeiro comprovado, como perda de contrato de trabalho ou cliente). O valor da indenização não segue tabela fixa; o juiz analisa a gravidade da ofensa, o alcance da publicação, a intenção do ofensor, a situação econômica das partes e precedentes de casos semelhantes para fixar quantia que sirva de reparação e de desestímulo (função punitivo-pedagógica).

## A linha tênue entre opinião, crítica e crime

Nem toda fala desagradável é crime ou ilícito civil. A liberdade de expressão e de pensamento (CF/88, art. 5º, IV e IX) é direito fundamental e convive com a proteção à honra. O desafio jurídico — e humano — está em traçar a fronteira. Criticar a atuação profissional de um médico, de um político, de um influenciador, de forma fundamentada, ainda que dura, costuma ser exercício legítimo de opinião. O problema surge quando a crítica abandona o campo das ideias e parte para o ataque pessoal, a mentira deliberada, a exposição de dados sensíveis (orientação sexual, saúde, vida íntima) ou o discurso de ódio.

Imagine um cenário: um cliente insatisfeito posta no Google Maps: "Péssimo atendimento, esperei 40 minutos e o doutor nem olhou no meu rosto. Não recomendo". Isso é avaliação de serviço, protegida. Agora, se o mesmo cliente escreve: "Esse médico é um charlatão que mata pacientes por negligência e desvia dinheiro do SUS", temos calúnia (imputação de crimes) e difamação (ofensa à reputação profissional). Se ele chama o médico de "lixo humano", "incompetente nojento", temos injúria. A plataforma onde isso foi escrito — Google, Instagram, Facebook, X (antigo Twitter), TikTok — guarda os registros de conexão (IP, data, hora, dispositivo) por determinação do Marco Civil da Internet (Lei nº 12.965/2014, artigo 13). Esses dados são a "digital" do ofensor e só podem ser fornecidos mediante ordem judicial, o que garante que a identificação do autor não ocorra de forma arbitrária, mas também impede que o anonimato seja escudo para a impunidade.

## O papel das plataformas e a remoção de conteúdo

Muitas vítimas correm para o "denunciar" da rede social esperando que o post suma em minutos. A regra geral do Marco Civil da Internet (artigo 19) é de que o provedor de aplicações (a rede social) não responde civilmente por danos decorrentes de conteúdo gerado por terceiros *se* não houver ordem judicial específica determinando a remoção. Ou seja: a plataforma não é obrigada a julgar se aquele conteúdo é crime ou ilícito; ela remove mediante decisão do Poder Judiciário. Existe, contudo, uma exceção importante: conteúdos que exponham nudez ou ato sexual de caráter privado sem autorização do participante (o chamado "revenge porn" ou vazamento de nudes) devem ser removidos pela plataforma tão logo notificada, independentemente de ordem judicial, sob pena de responsabilização solidária (artigo 21, parágrafo 1º).

Na prática, isso significa que a via mais eficaz para tirar o conteúdo do ar costuma ser o pedido de tutela de urgência (liminar) em ação cível, solicitando a remoção ao provedor e a quebra de sigilo dos dados cadastrais e de conexão do autor do perfil ofensivo. O Judiciário tem concedido essas liminares com relativa celeridade quando demonstrado o perigo da demora — o "dano viral" que se espalha a cada hora que o post permanece no ar.

## Provas: o que fazer (e não fazer) na hora do susto

A reação imediata diante da ofensa costuma ser emocional: responder com xingamentos, ameaçar processar nos comentários, apagar o print com raiva ou, pior, confrontar o ofensor por mensagem privada. Juridicamente, nada disso ajuda — e pode atrapalhar. O primeiro passo técnico é a **preservação da prova com fé pública**. Prints de tela feitos pelo próprio usuário têm valor probante relativo; a parte contrária pode alegar adulteração. O padrão-ouro é a **ata notarial**: um tabelião de notas acessa o link, documenta o conteúdo, a URL, a data, a hora, os comentários, o número de visualizações/compartilhamentos e lavra uma escritura pública que faz prova plena do que estava na rede naquele momento. Outra opção, mais acessível, é o uso de ferramentas de certificação digital de páginas web (como o *WebPreserver* ou serviços similares), que geram um hash criptográfico do conteúdo, embora a ata notarial ainda tenha aceitação mais universal nos tribunais.

Registre também o Boletim de Ocorrência (BO). Para os crimes contra a honra (calúnia, difamação, injúria), a ação penal é de **iniciativa privada** (exceto se houver elemento de discriminação racial, homofóbica, etc., que torna a ação pública incondicionada). Isso significa que a vítima tem o prazo de **seis meses**, contados da data em que tomou conhecimento da autoria, para oferecer *queixa-crime* perante o Juizado Especial Criminal. O BO não é a queixa-crime em si, mas é o registro oficial que inicia a contagem do prazo e documenta o fato perante a autoridade policial. Sem BO e sem identificação do autor (obtida via quebra de sigilo judicial), o processo criminal não anda.

## A reparação do dano moral: como o juiz decide o valor

Muita gente pergunta: "Quanto vou ganhar?". Não há tabela. O Superior Tribunal de Justiça (STJ) firmou entendimento de que a fixação do dano moral deve observar os princípios da proporcionalidade e da razoabilidade, considerando a capacidade econômica do ofensor e da vítima, a gravidade do ato, a repercussão da ofensa, o grau de dolo ou culpa, e a função pedagógica da sanção. Ofensas com grande viralização, que geraram linchamento virtual, perda de emprego, abalo psicológico comprovado por laudo médico, tendem a receber indenizações mais elevadas. Ofensas pontuais, em perfis pequenos, rapidamente removidas, com pedido de desculpas público, tendem a valores menores. O importante é entender que o dano moral **não exige prova de prejuízo financeiro** — a dor, a angústia, a humilhação, a exposição indevida *são* o dano. Laudos psicológicos, prints de mensagens de apoio de amigos/familiares preocupados, atestados médicos de afastamento por estresse, tudo isso compõe o conjunto probatório.

## Linchamento virtual, cancelamento e a responsabilidade de quem compartilha

Um fenômeno contemporâneo é o "cancelamento" ou linchamento virtual: uma ofensa inicial (às vezes um vídeo editado, uma frase tirada de contexto) dispara uma onda de ódio coletivo. Centenas, milhares de pessoas passam a ofender, ameaçar, expor dados pessoais (doxxing), invadir perfis profissionais da vítima. Juridicamente, **quem compartilha a ofensa original, quem comete novos xingamentos, quem ameaça, quem vaza dados** — todos podem responder individualmente, tanto na esfera penal (concurso de agentes) quanto na cível (responsabilidade solidária pelo dano moral agravado). A "corrente" não dilui a responsabilidade; ela a multiplica. O Marco Civil da Internet, em seu artigo 19, ao exigir ordem judicial para remoção, visa evitar a censura privada, mas não impede que cada autor de nova ofensa seja processado.

## Passos práticos: um roteiro para a vítima

Se você está lendo isso porque acabou de ser vítima, respire. Aqui está um roteiro objetivo:

1.  **Não responda à ofensa no mesmo tom.** Qualquer coisa que você escreva pode ser usada contra você (injurias recíprocas, por exemplo).
2.  **Faça a ata notarial** o mais rápido possível. Se não puder ir ao cartório imediatamente, faça prints detalhados (tela cheia, mostrando URL, data/hora do sistema, perfil do autor, conteúdo, comentários, compartilhamentos) e grave a tela em vídeo narrando o que vê.
3.  **Registre o Boletim de Ocorrência** (pode ser online na maioria dos estados). Guarde o número do protocolo.
4.  **Denuncie na plataforma** (botão "denunciar"). Guarde o comprovante da denúncia (print do "sua denúncia foi enviada").
5.  **Procure um advogado especializado em Direito Digital**. Ele avaliará se cabe pedido de liminar para remoção imediata + quebra de sigilo dos dados do autor + indenização por danos morais (e materiais, se houver).
6.  **Cuide da sua saúde mental**. Ofensa virtual adoece. Busque apoio psicológico; o laudo será prova importante no processo cível.

## Conclusão: a tela não apaga a responsabilidade

A internet não é um território sem lei. A Constituição, o Código Penal, o Código Civil e o Marco Civil da Internet formam um arcabouço robusto para proteger a dignidade humana também no ambiente digital. O anonimato aparente das redes sociais é frágil diante de uma ordem judicial de quebra de sigilo de registros de conexão. A viralização não é detalhe: ela agrava a pena penal e eleva o dano moral.

Se você sofreu uma ofensa, não se cale por vergonha ou medo de "dar ibope". O silêncio costuma ser interpretado como aceitação. A lei lhe dá ferramentas para fazer cessar a violação, identificar o autor, remover o conteúdo e ser reparado. O primeiro passo é documentar com rigor técnico; o segundo, buscar orientação jurídica especializada para transformar o direito abstrato em resultado concreto.

No escritório Lisomar Barbosa Advogados, atuamos diariamente na defesa da honra, da imagem e da privacidade no ambiente digital. Se você passa por isso, entre em contato. A justiça também tem endereço na internet — e ele pode ser o do seu advogado.`,
  },
  {
    slug: 'direito-do-consumidor-compras-online',
    title:
      'Seus direitos nas compras online: o que a lei garante quando o produto não chega ou chega diferente do combinado',
    excerpt:
      'Comprar pela internet virou rotina, mas poucos sabem exatamente o que a lei protege quando algo dá errado. Este artigo explica, em linguagem clara, os principais direitos do consumidor digital e como agir diante de problemas reais.',
    date: '2026-08-23',
    readTime: '8 min',
    category: 'Direito Digital',
    image:
      'https://images.unsplash.com/photo-1697545806029-f22eb0f36bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NTA3NjgyfA&ixlib=rb-4.1.0&q=80&w=1080',
    content: `Você entra no site, escolhe o produto, paga com cartão ou Pix e aguarda a entrega. Dias depois, a caixa chega amassada, o tamanho não serve, o aparelho não liga ou, pior, o pacote nunca sai do centro de distribuição. Situações assim são cada vez mais comuns no cotidiano digital brasileiro. O que nem todo mundo sabe é que a legislação consumerista também se aplica integralmente às relações de consumo eletrônicas, impondo deveres claros a quem vende e garantias efetivas a quem compra.

O ponto de partida é o **Código de Defesa do Consumidor (Lei nº 8.078/1990)**. O artigo 2º define consumidor como toda pessoa física ou jurídica que adquire produto ou serviço como destinatário final, enquanto fornecedor é quem o coloca no mercado. Não há distinção entre loja física e virtual: a proteção é a mesma. No comércio eletrônico, essas obrigações foram detalhadas pelo **Decreto nº 7.962/2013**, que exige informações ostensivas como nome empresarial, CNPJ, endereço físico, canais de atendimento, características essenciais do produto, preço total com frete e prazo de entrega.

## Direito de arrependimento: sete dias para mudar de ideia

Uma das garantias mais relevantes, e ainda pouco conhecidas, é o **direito de arrependimento**, previsto no artigo 49 do CDC. Como a compra online ocorre fora do estabelecimento comercial, sem a possibilidade de tocar, experimentar ou testar o produto antes do pagamento, a lei concede ao consumidor **sete dias corridos**, contados da assinatura do contrato ou do recebimento do bem, para desistir da aquisição **sem necessidade de justificativa**.

Na prática, isso significa que, se você comprou uma camisa e não gostou do caimento, ou adquiriu um eletrodoméstico e percebeu que ele não cabe no espaço planejado, pode devolvê-lo e receber **o valor integral pago**, inclusive o frete. Nessas hipóteses, o custo da devolução também é do fornecedor. Muitos sites ainda tentam impor restrições abusivas, como negar devolução de produtos abertos ou transferir o frete de retorno ao cliente, mas essas cláusulas são **nulas de pleno direito**, nos termos do artigo 51 do CDC.

> **Dica prática:** guarde prints da tela de compra, e-mails de confirmação, código de rastreio e, ao receber o produto, faça um vídeo curto abrindo a embalagem. Esses registros facilitam a comprovação do prazo e do estado do item caso seja necessário acionar o arrependimento.

## Informação adequada: o dever de transparência antes do clique

O artigo 6º, inciso III, do CDC assegura o direito à **informação adequada e clara** sobre produtos e serviços. No ambiente digital, isso se traduz em obrigações concretas: descrição fiel, indicação de cor, voltagem, dimensões, composição, disponibilidade em estoque, prazo de entrega estimado e formas de pagamento. O Decreto nº 7.962/2013 reforça que essas informações devem estar **disponíveis de forma ostensiva** antes da finalização do pedido.

Se o site promete entrega em dois dias úteis e o produto leva três semanas, se a foto mostra um item diferente do que foi entregue, ou se taxas só aparecem no checkout, há violação do dever de informação. Nesses casos, o consumidor pode exigir o cumprimento forçado da oferta, aceitar produto equivalente ou rescindir o contrato com devolução integral dos valores pagos, sem prejuízo de eventuais perdas e danos.

## Vício do produto ou do serviço: quem responde?

Quando o produto chega com defeito, não liga, rasga na primeira lavagem ou apresenta erro de fabricação, estamos diante de **vício de qualidade**. O CDC estabelece responsabilidade **solidária** entre os integrantes da cadeia de fornecimento, o que inclui fabricante, importador, distribuidor e varejista. Isso permite ao consumidor reclamar diretamente com a loja onde comprou, sem depender de contato com fabricante estrangeiro ou intermediários difíceis de localizar.

O prazo para reclamar é de **30 dias** para produtos não duráveis, como alimentos e cosméticos, e de **90 dias** para produtos duráveis, como eletrônicos, móveis e eletrodomésticos, contados da entrega efetiva. O fornecedor tem **30 dias** para sanar o vício. Se isso não ocorrer, o consumidor pode escolher entre a substituição do produto, a restituição imediata da quantia paga, com correção monetária, ou o abatimento proporcional do preço.

Para serviços digitais, como assinaturas de streaming, cursos online e hospedagem de sites, a lógica é semelhante. O serviço deve corresponder ao que foi prometido. Se a plataforma anuncia acesso ilimitado e impõe bloqueios indevidos, ou promete suporte contínuo e não responde, pode haver vício de serviço.

## Marketplaces e a responsabilidade do intermediador

Hoje, grande parte das compras ocorre em *marketplaces*, como Mercado Livre, Amazon, Shopee e Magalu. A dúvida mais comum é: se o vendedor é terceiro, a plataforma responde? Em regra, a resposta tende a ser positiva, especialmente quando o marketplace participa ativamente da cadeia de fornecimento, lucra com a intermediação, controla o ambiente de negociação, processa pagamentos e, em muitos casos, interfere na logística.

Nessas situações, o consumidor não deve ser empurrado para uma negociação isolada com vendedor anônimo ou sem identificação adequada. A plataforma precisa oferecer canais efetivos de atendimento, intermediar a solução do conflito e, conforme o caso concreto, responder solidariamente pelos prejuízos causados.

## Proteção de dados: o que a LGPD tem a ver com sua compra

Ao comprar online, você fornece nome, CPF, endereço, telefone, e-mail e, muitas vezes, dados de pagamento. A **Lei Geral de Proteção de Dados (Lei nº 13.709/2018)** exige que esse tratamento tenha **finalidade específica**, seja **necessário** para a execução da compra e ocorra com **segurança**, evitando coleta excessiva e exposição indevida de informações pessoais.

O consumidor tem direito de saber quais dados são coletados, corrigir informações incorretas, solicitar a exclusão de dados desnecessários após o término da relação contratual e pedir a portabilidade quando cabível. Em casos de vazamento de dados em e-commerce, pode haver dever de notificação à Autoridade Nacional de Proteção de Dados e ao titular afetado, além da possibilidade de responsabilização civil por danos materiais e morais.

## O que fazer quando o problema acontece

1. **Reúna provas:** guarde prints da oferta, e-mails, comprovantes de pagamento, código de rastreio, fotos, vídeos e protocolos de atendimento.
2. **Registre a reclamação nos canais oficiais da loja ou plataforma:** sempre anote e preserve o número de protocolo.
3. **Sem solução em prazo razoável:** procure o Procon do seu estado e registre manifestação no Consumidor.gov.br.
4. **Para valores menores:** avalie o Juizado Especial Cível, que admite ações de até 20 salários mínimos sem advogado, embora o acompanhamento jurídico continue recomendável.
5. **Havendo dano moral ou material relevante:** a via judicial pode incluir pedido indenizatório, sobretudo em casos de negativação indevida, recusa abusiva ou exposição indevida de dados.

## Hábitos de prevenção

- **Prefira sites confiáveis** ou plataformas que exibam claramente CNPJ, endereço físico e canais reais de contato.
- **Use cartão virtual ou intermediadores de pagamento** para ampliar a segurança e facilitar eventual contestação.
- **Evite transferências diretas para pessoas físicas desconhecidas**, especialmente em ofertas muito abaixo do preço de mercado.
- **Leia os termos essenciais** sobre troca, devolução, garantia e tratamento de dados pessoais.
- **Ative autenticação em dois fatores** nas contas de e-commerce e no e-mail vinculado ao cadastro.

## Considerações finais

Comprar pela internet não é um ato de fé, mas uma relação jurídica regulada por normas claras. O ordenamento brasileiro oferece mecanismos de proteção que abrangem direito de arrependimento, dever de informação, responsabilidade por vícios, proteção de dados e responsabilização de integrantes da cadeia de fornecimento.

Conhecer esses direitos ajuda o consumidor a agir com mais segurança e a reagir com estratégia quando a compra não sai como prometido. Diante de negativa automática, silêncio do fornecedor ou resposta abusiva, a recomendação é documentar tudo, reclamar pelos canais formais e buscar orientação jurídica quando o caso exigir análise individualizada.

---

*Este artigo tem caráter informativo e não substitui consulta jurídica personalizada. Para avaliar o seu caso concreto, busque orientação profissional adequada.*`,
  },
  {
    slug: 'direito-anonimato-internet-limites',
    title:
      'Direito ao anonimato na internet: onde termina a liberdade e começa a responsabilidade',
    excerpt:
      'Entenda como a Constituição, o Marco Civil da Internet e a LGPD equilibram privacidade, liberdade de expressão e responsabilização por abusos no ambiente digital.',
    date: '2026-08-23',
    readTime: '10 min',
    category: 'Direito Digital',
    image:
      'https://images.unsplash.com/photo-1614064548237-096f735f344f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDk1ODE1fA&ixlib=rb-4.1.0&q=80&w=1080',
    content: `# Direito ao anonimato na internet: onde termina a liberdade e começa a responsabilidade

A internet não é espaço sem lei. O ordenamento jurídico brasileiro protege a privacidade de quem usa a rede de boa-fé, mas também admite a identificação de quem pratica ilícitos.

## Constituição e anonimato

A Constituição assegura liberdade de manifestação, mas veda o anonimato quando ele serve para impedir responsabilização por abusos.

## Marco Civil da Internet

Os registros de acesso e de aplicação podem ser preservados e fornecidos mediante ordem judicial, nos limites legais.

## Pseudonimato e responsabilidade

Usar apelido, nome artístico ou identificador público não impede responsabilização quando houver ato ilícito.

## O que a vítima pode fazer

Em caso de perfil falso, ameaça, golpe ou ofensa, é importante preservar provas, registrar boletim de ocorrência e buscar orientação jurídica para pedido de remoção, preservação de logs e eventual identificação do autor.

## Proteção de dados

A LGPD exige que o tratamento de dados pessoais ocorra com base legal, finalidade e segurança, inclusive quando houver cumprimento de ordem judicial.

---

*Este artigo tem caráter informativo e não substitui consulta jurídica personalizada.*`,
  },
  {
    slug: 'contratos-software-licencas-uso-direitos-deveres',
    title:
      'Contratos de software e licenças de uso: o que você precisa saber antes de clicar em "concordo"',
    excerpt:
      'Saiba como funcionam licenças de uso, contratos de SaaS, desenvolvimento por encomenda, portabilidade de dados e cláusulas contratuais que merecem atenção.',
    date: '2026-08-23',
    readTime: '9 min',
    category: 'Direito Digital',
    image:
      'https://images.unsplash.com/photo-1783547351290-e3c2cb1cb1a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDg0NDIyfA&ixlib=rb-4.1.0&q=80&w=1080',
    content: `# Contratos de software e licenças de uso: o que você precisa saber antes de clicar em "concordo"

Contratos de software definem direitos, limites de uso, responsabilidades e regras sobre dados, suporte, rescisão e continuidade do serviço.

## Licença não é venda

Na maioria das vezes, o usuário não compra a propriedade do software, mas apenas uma licença de uso nos limites definidos pelo contrato.

## Desenvolvimento por encomenda

Projetos personalizados exigem cláusulas claras sobre titularidade do código, cessão de direitos, entregáveis e documentação.

## SaaS e portabilidade

Nos contratos em nuvem, é essencial prever disponibilidade, suporte, exportação de dados e condições de encerramento da relação.

## LGPD

Se o software trata dados pessoais, o contrato deve disciplinar bases legais, segurança, incidentes, suboperadores e descarte de dados.

## Cuidados práticos

Leia cláusulas de responsabilidade, rescisão, foro, portabilidade e tratamento de dados antes de aceitar.

---

*Este artigo tem caráter informativo e não substitui consulta jurídica personalizada.*`,
  },
  {
    slug: 'perseguicao-digital-protecao-juridica-vitima',
    title:
      'Perseguição digital: quando a tela do celular vira uma ameaça real e o que a lei faz para proteger você',
    excerpt:
      'O stalking digital é uma forma real de violência. Entenda a proteção jurídica disponível, a importância das provas e as medidas cabíveis para cessar a conduta.',
    date: '2026-08-23',
    readTime: '10 min',
    category: 'Direito Digital',
    image:
      'https://images.unsplash.com/photo-1768637757717-3e47abf07422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDQ3NTM3fA&ixlib=rb-4.1.0&q=80&w=1080',
    content: `# Perseguição digital: quando a tela do celular vira uma ameaça real e o que a lei faz para proteger você

A perseguição digital, ou stalking, não é exagero nem mero desconforto virtual. Trata-se de conduta que pode ter relevância penal, cível e até conexão com medidas protetivas.

## Crime de perseguição

A legislação brasileira tipifica a perseguição reiterada, inclusive por meios digitais, quando há invasão da privacidade, ameaça ou comprometimento da liberdade da vítima.

## Provas

É fundamental preservar prints, links, vídeos, datas, horários, perfis e, sempre que possível, formalizar prova por ata notarial.

## Medidas cabíveis

A vítima pode buscar boletim de ocorrência, remoção de conteúdo, preservação de registros, pedido de medida protetiva e indenização, conforme o caso.

## Dados pessoais

Informações usadas para perseguir, monitorar ou ameaçar também podem envolver violação à proteção de dados pessoais.

---

*Este artigo tem caráter informativo e não substitui consulta jurídica personalizada.*`,
  },
  {
    slug: 'crimes-contra-honra-internet-guia-completo',
    title:
      'Crimes contra a honra na internet: o que a lei protege, como provar e o que fazer quando a ofensa vem da tela',
    excerpt:
      'Entenda as diferenças entre calúnia, difamação e injúria no ambiente digital, como preservar provas e por que agir rápido pode ser decisivo.',
    date: '2026-08-23',
    readTime: '12 min',
    category: 'Direito Digital',
    image:
      'https://images.unsplash.com/photo-1762340273954-afe9b71819c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDUwNzA1fA&ixlib=rb-4.1.0&q=80&w=1080',
    content: `# Crimes contra a honra na internet: o que a lei protege, como provar e o que fazer quando a ofensa vem da tela

A honra continua protegida pela lei mesmo quando a agressão ocorre em rede social, aplicativo de mensagem, comentário público ou perfil falso.

## Conceitos básicos

Calúnia, difamação e injúria têm diferenças jurídicas importantes, e a forma como a ofensa acontece influencia a estratégia de resposta.

## Provas

Conteúdo ofensivo deve ser preservado com técnica, preferencialmente com elementos adicionais além de print simples, especialmente em casos mais graves.

## Medidas possíveis

Dependendo do caso, pode haver esfera penal, esfera cível, pedido de remoção de conteúdo e busca pela identificação do autor.

---

*Este artigo tem caráter informativo e não substitui consulta jurídica personalizada.*`,
  },
  {
    slug: 'stalking-virtual-consequencias-juridicas-lei-14132-2021',
    title:
      'Stalking Virtual e suas Consequências Jurídicas: Análise Completa à Luz da Lei 14.132/2021, Marco Civil, LGPD e Jurisprudência',
    excerpt:
      'Artigo técnico sobre o crime de perseguição no ambiente digital, seus desdobramentos civis e penais e os deveres das plataformas.',
    date: '2026-08-22',
    readTime: '13 min',
    category: 'Direito Digital',
    image:
      'https://images.unsplash.com/photo-1588873281272-14886ba1f737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDM2MTcyfA&ixlib=rb-4.1.0&q=80&w=1080',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'invasao-dispositivo-informatico-consequencias-juridicas',
    title:
      'Invasão de Dispositivo Informático: Análise Completa das Consequências Jurídicas no Ordenamento Brasileiro',
    excerpt:
      'Estudo sobre o crime de invasão de dispositivo informático, responsabilidade civil, preservação de provas digitais e impactos jurídicos no Brasil.',
    date: '2026-08-22',
    readTime: '11 min',
    category: 'Direito Digital',
    image:
      'https://images.unsplash.com/photo-1756671994948-183e2d833da0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxyYW5kb218fHx8fHx8fHwxNzg3NDQxODI4fA&ixlib=rb-4.1.0&q=80&w=1080',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'regulamentacao-criptomoedas',
    title: 'Regulamentação de Criptomoedas no Brasil: Marco Legal e Perspectivas',
    excerpt:
      'Análise do marco legal das criptomoedas no Brasil, incluindo regulação, tributação e desafios jurídicos do mercado cripto.',
    date: '2025-03-10',
    readTime: '14 min',
    category: 'Direito Digital',
    image:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'compliance-lgpd',
    title: 'Compliance com a LGPD: Guia Completo para Empresas',
    excerpt:
      'Guia prático para implementação de programa de compliance com a Lei Geral de Proteção de Dados.',
    date: '2025-02-20',
    readTime: '16 min',
    category: 'LGPD',
    image:
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'fake-news-difamacao',
    title: 'Fake News e Difamação Digital: Seus Direitos e Como se Defender',
    excerpt:
      'Como agir juridicamente contra fake news e difamação nas redes sociais, com foco em honra, imagem e responsabilidade.',
    date: '2025-01-25',
    readTime: '13 min',
    category: 'Direito Digital',
    image:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'protecao-dados-pessoais',
    title: 'Proteção de Dados Pessoais: Seus Direitos como Titular',
    excerpt:
      'Conheça os principais direitos do titular de dados pessoais garantidos pela LGPD e como exercê-los.',
    date: '2025-01-10',
    readTime: '11 min',
    category: 'LGPD',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'custodia-criptoativos',
    title: 'Custódia de Criptoativos: Aspectos Jurídicos e Melhores Práticas',
    excerpt:
      'Análise dos aspectos jurídicos da custódia de criptoativos, responsabilidade das exchanges e boas práticas de segurança.',
    date: '2024-12-15',
    readTime: '12 min',
    category: 'Cripto',
    image:
      'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'crimes-ciberneticos',
    title: 'Crimes Cibernéticos: Como se Proteger e Buscar Justiça',
    excerpt:
      'Guia sobre crimes cibernéticos no Brasil, preservação de provas, registro de ocorrência e reparação judicial.',
    date: '2024-11-20',
    readTime: '14 min',
    category: 'Direito Digital',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'instagram-hackeado',
    title: 'Instagram Hackeado: O Que Fazer e Seus Direitos',
    excerpt:
      'Passo a passo para recuperar conta hackeada, avaliar responsabilidade e proteger dados nas redes sociais.',
    date: '2024-11-05',
    readTime: '10 min',
    category: 'Direito Digital',
    image:
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'golpes-criptomoedas',
    title: 'Golpes com Criptomoedas: Como Identificar e Recuperar Valores',
    excerpt:
      'Os golpes mais comuns no mercado de criptomoedas, sinais de alerta e medidas jurídicas possíveis.',
    date: '2024-10-15',
    readTime: '13 min',
    category: 'Cripto',
    image:
      'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
  {
    slug: 'lgpd-erros-comuns',
    title: 'LGPD: Erros Comuns na Implementação e Como Evitá-los',
    excerpt:
      'Conheça falhas frequentes na implementação da LGPD e como reduzir riscos regulatórios e operacionais.',
    date: '2024-09-10',
    readTime: '12 min',
    category: 'LGPD',
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80',
    content: 'Ver página completa do artigo.',
  },
];
