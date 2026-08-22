import { readFile, writeFile } from "fs/promises";
import { copyFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = process.cwd();

const BLOG_FILE = join(ROOT, "src/data/blog.ts");
const SITEMAP_FILE = join(ROOT, "public/sitemap.xml");

const OPENROUTER_URL =
  "https://openrouter.ai/api/v1/chat/completions";

const UNSPLASH_URL =
  "https://api.unsplash.com/photos/random";

/**
 * Cadeia de modelos do OpenRouter.
 * Atualizada em ago/2026 — verificada na API de modelos disponíveis.
 * Ordem: maior capacidade → menor capacidade.
 * Todos confirmados gratuitos em agosto/2026.
 * Ref: openrouter.ai/collections/free-models
 */
const MODELS = [
  "nvidia/nemotron-3-ultra-550b-a55b:free",         // Nemotron 3 Ultra 550B — melhor modelo gratuito atual (1M ctx)
  "nvidia/nemotron-3-super-120b-a12b:free",          // Nemotron 3 Super 120B (1M ctx)
  "openai/gpt-oss-120b:free",                        // GPT-OSS 120B — open-weight Apache 2.0 (131K ctx)
  "openai/gpt-oss-20b:free",                         // GPT-OSS 20B — mais rápido (131K ctx)
  "google/gemma-4-31b-it:free",                      // Gemma 4 31B — multimodal, bom para textos (262K ctx)
  "google/gemma-4-26b-a4b-it:free",                  // Gemma 4 26B (262K ctx)
  "inclusionai/ling-3.0-flash:free",                 // Ling 3.0 Flash — instrução rápida (262K ctx)
  "poolside/laguna-m.1:free",                        // Laguna M.1 — coding/agent (262K ctx)
  "poolside/laguna-s-2.1:free",                      // Laguna S 2.1 (262K ctx)
  "nvidia/nemotron-3-nano-30b-a3b:free",             // Nemotron 3 Nano 30B — eficiente (256K ctx)
  "meta-llama/llama-3.2-3b-instruct:free",           // Llama 3.2 3B — fallback leve (131K ctx)
];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200";

const MIN_WORDS = 1250;

const TOPICS = [
  "Direito digital e responsabilidade civil nas relações online",
  "Responsabilidade civil por danos causados na internet",
  "Direito ao esquecimento e os limites da remoção de conteúdo digital",
  "Proteção de dados pessoais e responsabilidade no ambiente digital",
  "Golpes digitais e responsabilidade jurídica das plataformas",
  "Fraudes eletrônicas e consequências no Direito Penal",
  "Crimes digitais e os limites da responsabilização penal",
  "Provas digitais e sua importância em processos judiciais",
  "Ataques virtuais e responsabilidade civil por danos causados",
  "Uso indevido de imagem na internet e responsabilidade civil",
  "Liberdade de expressão na internet e seus limites jurídicos",
  "Ofensas nas redes sociais e possíveis consequências jurídicas",
  "Direito do consumidor nas compras realizadas pela internet",
  "Responsabilidade de marketplaces em relações de consumo",
  "Contratos digitais e sua validade jurídica",
  "Assinaturas eletrônicas e validade dos negócios jurídicos",
  "Fraudes bancárias digitais e responsabilidade civil",
  "Vazamento de dados e possíveis consequências jurídicas",
  "LGPD e proteção de dados pessoais nas relações digitais",
  "Responsabilidade por publicação de conteúdo ilícito na internet",
  "Remoção de conteúdo online e responsabilidade das plataformas",
  "Cyberbullying e consequências jurídicas no Brasil",
  "Stalking virtual e suas consequências jurídicas",
  "Perseguição digital e proteção jurídica da vítima",
  "Estelionato eletrônico e Direito Penal",
  "Invasão de dispositivo informático e consequências jurídicas",
  "Crimes contra a honra praticados pela internet",
  "Difamação nas redes sociais e responsabilidade jurídica",
  "Calúnia e injúria praticadas no ambiente digital",
  "Preservação de provas digitais em conflitos jurídicos"
];

function log(message) {
  console.log(message);
}

function normalizeText(text) {
  return String(text || "")
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .trim();
}

function countWords(text) {
  return normalizeText(text)
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

function slugify(text) {
  return normalizeText(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeTypeScriptString(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/'/g, "\\'");
}

function calculateReadTime(words) {
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function chooseTopic() {
  if (
    process.env.CUSTOM_TOPIC &&
    process.env.CUSTOM_TOPIC.trim()
  ) {
    return process.env.CUSTOM_TOPIC.trim();
  }

  const now = new Date();
  const dayIndex = now.getUTCDate() % TOPICS.length;

  return TOPICS[dayIndex];
}

function cleanMarkdown(text) {
  let value = normalizeText(text);

  value = value
    .replace(/^```(?:markdown|md)?/i, "")
    .replace(/```$/i, "")
    .trim();

  return value;
}

function extractJson(text) {
  const cleaned = normalizeText(text);

  try {
    return JSON.parse(cleaned);
  } catch (_) {}

  const fenced = cleaned.match(
    /```json\s*([\s\S]*?)```/i
  );

  if (fenced) {
    try {
      return JSON.parse(fenced[1]);
    } catch (_) {}
  }

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start !== -1 && end !== -1 && end > start) {
    try {
      return JSON.parse(cleaned.slice(start, end + 1));
    } catch (_) {}
  }

  throw new Error(
    "A IA não retornou um JSON válido."
  );
}

/**
 * Verifica disponibilidade da API antes de iniciar.
 * Retorna lista de modelos disponíveis para diagnóstico.
 */
async function checkApiKey() {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY não está definida nos secrets do repositório.");
  }

  log(`🔑 OPENROUTER_API_KEY encontrada (${process.env.OPENROUTER_API_KEY.length} chars).`);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      log(`⚠️ Não foi possível listar modelos disponíveis: HTTP ${response.status}`);
      return;
    }

    const data = await response.json();
    const available = (data.data || []).map(m => m.id);
    const freeAvailable = available.filter(id => id.endsWith(":free"));

    log(`📋 Modelos gratuitos disponíveis na conta: ${freeAvailable.length}`);

    const configured = MODELS.filter(m => available.includes(m));
    const missing = MODELS.filter(m => !available.includes(m));

    if (configured.length > 0) {
      log(`✅ Modelos configurados e disponíveis: ${configured.join(", ")}`);
    }
    if (missing.length > 0) {
      log(`⚠️ Modelos configurados mas INDISPONÍVEIS: ${missing.join(", ")}`);
    }

    return configured;
  } catch (err) {
    log(`⚠️ Erro ao verificar modelos disponíveis: ${err.message}`);
  }
}

/**
 * Tenta a chamada no modelo fornecido.
 * Lança erro se HTTP não-ok ou sem conteúdo.
 */
async function callModel(messages, model, temperature = 0.2) {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Authorization":
        `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer":
        "https://www.lisomarbarbosa.adv.br",
      "X-Title":
        "Lisomar Barbosa Advogados - Direito Digital"
    },
    body: JSON.stringify({
      model,
      temperature,
      messages
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `OpenRouter HTTP ${response.status}: ${errorText}`
    );
  }

  const data = await response.json();

  const content =
    data &&
    data.choices &&
    data.choices[0] &&
    data.choices[0].message &&
    data.choices[0].message.content;

  if (!content) {
    throw new Error(
      "OpenRouter não retornou conteúdo."
    );
  }

  return content;
}

/**
 * Percorre a lista MODELS em ordem.
 * Se CUSTOM_MODEL estiver definido, tenta ele PRIMEIRO,
 * mas faz fallback automático para a lista MODELS em caso de erro.
 * Isso evita falha total quando o modelo customizado sai da camada gratuita.
 */
async function callOpenRouter(messages, temperature = 0.2) {
  const chain = [...MODELS];

  // Se CUSTOM_MODEL definido, insere no início como preferência
  if (process.env.CUSTOM_MODEL) {
    const customModel = process.env.CUSTOM_MODEL.trim();
    log(`🤖 Modelo customizado configurado: ${customModel} (com fallback automático)`);
    // Insere no início apenas se ainda não estiver na lista
    if (!chain.includes(customModel)) {
      chain.unshift(customModel);
    } else {
      // Move para o início
      const idx = chain.indexOf(customModel);
      chain.splice(idx, 1);
      chain.unshift(customModel);
    }
  }

  let lastError;
  let attemptCount = 0;

  for (const model of chain) {
    attemptCount++;
    try {
      log(`🤖 [${attemptCount}/${chain.length}] Tentando modelo: ${model}`);
      const result = await callModel(messages, model, temperature);
      log(`✅ Modelo usado com sucesso: ${model}`);
      return result;
    } catch (error) {
      log(`⚠️ Modelo ${model} falhou (${error.message.slice(0, 120)})`);
      lastError = error;
    }
  }

  throw new Error(
    `Todos os ${chain.length} modelos falharam. Último erro: ${lastError?.message}`
  );
}

async function fetchUrl(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; LisomarBarbosaLegalResearchBot/1.0)"
    }
  });

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status} ao acessar ${url}`
    );
  }

  return await response.text();
}

function stripHtml(html) {
  return normalizeText(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/\s+/g, " ")
  );
}

async function searchJusbrasil(topic) {
  log("🔎 Pesquisando Jusbrasil...");

  const query = encodeURIComponent(topic);

  const url =
    `https://www.jusbrasil.com.br/busca?q=${query}`;

  try {
    const html = await fetchUrl(url);

    const text = stripHtml(html);

    return {
      source: "Jusbrasil",
      url,
      content: text.slice(0, 30000)
    };
  } catch (error) {
    log(
      `⚠️ Não foi possível consultar diretamente o Jusbrasil: ${error.message}`
    );

    return {
      source: "Jusbrasil",
      url,
      content:
        "A consulta automática ao Jusbrasil falhou. NÃO presumir resultados, jurisprudência ou decisões."
    };
  }
}

function buildLegalResearchInstructions(topic) {
  return `
Você está realizando uma CURADORIA JURÍDICA preliminar para produção editorial
do escritório Lisomar Barbosa Advogados.

TEMA:
${topic}

OBJETIVO:
Identificar somente informações jurídicas que possam ser verificadas.

FONTES PRIORITÁRIAS:

1. Constituição Federal do Brasil.
2. Legislação brasileira aplicável.
3. Código Civil.
4. Código de Defesa do Consumidor.
5. Código Penal.
6. Legislação especificamente relacionada ao ambiente digital.
7. Jurisprudência e decisões encontradas no Jusbrasil.

REGRAS ABSOLUTAS:

- NÃO invente lei.
- NÃO invente artigo de lei.
- NÃO invente número de processo.
- NÃO invente tribunal.
- NÃO invente desembargador, ministro, juiz ou relator.
- NÃO invente ementa.
- NÃO atribua decisão judicial a tribunal sem fonte verificável.
- NÃO transforme hipótese em fato jurídico.
- NÃO trate interpretação doutrinária como texto legal.
- NÃO invente orientação jurídica.
- NÃO diga que determinada conduta "sempre" gera indenização.
- NÃO diga que determinada conduta "nunca" gera responsabilidade.
- NÃO faça promessa de resultado judicial.
- NÃO crie jurisprudência apenas para tornar o artigo mais convincente.

Se uma informação não puder ser confirmada, marque-a como:
"INFORMAÇÃO NÃO CONFIRMADA - NÃO PUBLICAR".

Jurisprudência somente pode ser utilizada quando houver dados verificáveis
e uma fonte correspondente.

Não utilizar blogs jurídicos desconhecidos como autoridade jurídica.

O objetivo da pesquisa não é produzir o artigo.
É produzir uma base de fatos verificáveis para posterior redação e auditoria.
`;
}

async function createResearch(topic) {
  const jusbrasil = await searchJusbrasil(topic);

  const system = `
Você é um pesquisador jurídico extremamente conservador.

Sua função é fazer curadoria factual antes da produção de um artigo sobre Direito Digital.

Você NÃO deve escrever o artigo.

Você deve separar:

- legislação;
- dispositivos legais;
- princípios constitucionais;
- conceitos jurídicos;
- jurisprudência verificável;
- informações que não puderam ser confirmadas.

Não invente absolutamente nenhuma informação.

Quando houver dúvida, diga que a informação não foi confirmada.

Nunca complete números de artigos, processos ou decisões por memória.

${buildLegalResearchInstructions(topic)}
`;

  const user = `
Realize a curadoria preliminar sobre:

${topic}

Material obtido do Jusbrasil:

FONTE:
${jusbrasil.url}

CONTEÚDO:
${jusbrasil.content}

Retorne exclusivamente JSON válido neste formato:

{
  "topic": "...",
  "legal_basis": [
    {
      "name": "...",
      "reference": "...",
      "explanation": "...",
      "source": "..."
    }
  ],
  "jurisprudence": [
    {
      "court": "...",
      "case": "...",
      "summary": "...",
      "source": "..."
    }
  ],
  "consumer_law": [],
  "civil_law": [],
  "criminal_law": [],
  "digital_law": [],
  "constitutional_basis": [],
  "unverified_information": [],
  "warnings": []
}

Se não houver jurisprudência suficientemente verificável,
retorne "jurisprudence": [].

Não invente fontes.
`;

  return extractJson(
    await callOpenRouter(
      [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      0.1
    )
  );
}

function buildArticleSystemPrompt() {
  return `
Você é o redator jurídico especializado em Direito Digital do escritório
Lisomar Barbosa Advogados.

SITE:
https://www.lisomarbarbosa.adv.br

Seu trabalho é produzir conteúdo jurídico informativo, rigoroso,
responsável e verificável.

ESPECIALIDADE CENTRAL:
DIREITO DIGITAL.

REGRA MAIS IMPORTANTE: NÃO INVENTAR.

Não invente leis, artigos, incisos, jurisprudência, números de processos,
decisões, tribunais, nomes de magistrados, datas de julgamentos, súmulas,
precedentes, entendimentos atribuídos a tribunais, obrigações que não
estejam previstas em lei, direitos que não possam ser sustentados juridicamente.

SEO deve ser consequência da qualidade do conteúdo, não o contrário.
`;
}

function buildArticleUserPrompt(topic, research) {
  return `
Escreva um artigo completo para o blog do site:

https://www.lisomarbarbosa.adv.br

TEMA:
${topic}

O artigo precisa ter NO MÍNIMO ${MIN_WORDS} palavras.

Antes de aceitar o artigo, conte as palavras.

Se tiver menos de ${MIN_WORDS} palavras, reescreva e amplie.

FORMATO DE SAÍDA:

Retorne exclusivamente JSON válido:

{
  "title": "...",
  "excerpt": "...",
  "slug": "...",
  "category": "Direito Digital",
  "content": "..."
}

O campo content deve conter Markdown puro.

BASE DA CURADORIA JURÍDICA:

${JSON.stringify(research, null, 2)}
`;
}

async function generateArticle(topic, research) {
  log("🤖 Gerando artigo jurídico...");

  return extractJson(
    await callOpenRouter(
      [
        { role: "system", content: buildArticleSystemPrompt() },
        { role: "user", content: buildArticleUserPrompt(topic, research) }
      ],
      0.35
    )
  );
}

async function expandArticle(article, research) {
  log("🤖 Artigo abaixo do mínimo. Solicitando expansão...");

  const prompt = `
O artigo abaixo possui menos de ${MIN_WORDS} palavras.

Não altere a tese jurídica central.

Não invente novas leis, jurisprudência, decisões ou processos.

Amplie o artigo somente desenvolvendo explicações, fundamentos,
distinções, exemplos hipotéticos e consequências possíveis.

Base de pesquisa:

${JSON.stringify(research, null, 2)}

Artigo atual:

${JSON.stringify(article)}

Retorne exclusivamente JSON:

{
  "title": "...",
  "excerpt": "...",
  "slug": "...",
  "category": "Direito Digital",
  "content": "..."
}
`;

  return extractJson(
    await callOpenRouter(
      [
        { role: "system", content: buildArticleSystemPrompt() },
        { role: "user", content: prompt }
      ],
      0.25
    )
  );
}

async function auditArticle(article, research) {
  log("⚖️ Iniciando auditoria jurídica independente...");

  const prompt = `
Você é o revisor jurídico responsável por impedir a publicação de
informações jurídicas falsas.

Analise o artigo abaixo.

ARTIGO:

${JSON.stringify(article, null, 2)}

PESQUISA:

${JSON.stringify(research, null, 2)}

Retorne exclusivamente:

{
  "status": "PASS" ou "FAIL",
  "issues": [
    {
      "severity": "critical",
      "text": "...",
      "location": "..."
    }
  ],
  "verified_claims": [],
  "unverified_claims": []
}
`;

  return extractJson(
    await callOpenRouter(
      [
        {
          role: "system",
          content: `Você é um auditor jurídico conservador. Quando não puder confirmar, marque como FAIL.`
        },
        { role: "user", content: prompt }
      ],
      0.05
    )
  );
}

async function verifyLinks(content) {
  const urls = content.match(
    /https?:\/\/[^\s)"'>]+/g
  ) || [];

  const uniqueUrls = [...new Set(urls)];

  if (!uniqueUrls.length) {
    return [];
  }

  log(`🔗 Verificando ${uniqueUrls.length} link(s)...`);

  const results = [];

  for (const url of uniqueUrls) {
    try {
      const response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0 LisomarBarbosaLegalBot"
        }
      });

      results.push({
        url,
        status: response.status,
        ok: response.ok
      });
    } catch (error) {
      results.push({
        url,
        status: null,
        ok: false,
        error: error.message
      });
    }
  }

  return results;
}

function validateArticleStructure(article) {
  if (!article || typeof article !== "object") {
    throw new Error("Objeto de artigo inválido.");
  }

  const required = ["title", "excerpt", "slug", "category", "content"];

  for (const field of required) {
    if (!article[field] || typeof article[field] !== "string") {
      throw new Error(`Campo obrigatório ausente ou inválido: ${field}`);
    }
  }

  const words = countWords(article.content);

  if (words < MIN_WORDS) {
    throw new Error(
      `Artigo possui apenas ${words} palavras. Mínimo: ${MIN_WORDS}.`
    );
  }

  if (!/^Direito Digital$/i.test(article.category)) {
    article.category = "Direito Digital";
  }

  return words;
}

function removeExistingSlug(blogContent, slug) {
  const escaped = slug.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const regex = new RegExp(
    `slug:\\s*['"]${escaped}['"]`,
    "i"
  );

  return regex.test(blogContent);
}

function buildPostObject(article, imageUrl, date) {
  const words = countWords(article.content);

  const safeContent = escapeTypeScriptString(article.content);
  const safeTitle = escapeTypeScriptString(article.title);
  const safeExcerpt = escapeTypeScriptString(article.excerpt);
  const safeSlug = escapeTypeScriptString(
    slugify(article.slug || article.title)
  );
  const safeCategory = escapeTypeScriptString(
    article.category || "Direito Digital"
  );
  const safeImage = escapeTypeScriptString(imageUrl);

  return `
  {
    slug: '${safeSlug}',
    title: '${safeTitle}',
    excerpt: '${safeExcerpt}',
    date: '${date}',
    readTime: '${calculateReadTime(words)}',
    category: '${safeCategory}',
    image: '${safeImage}',
    content: '${safeContent}'
  },`;
}

async function updateBlogFile(article, imageUrl, date) {
  log("📝 Atualizando src/data/blog.ts...");

  const original = await readFile(BLOG_FILE, "utf8");

  const slug = slugify(article.slug || article.title);

  if (removeExistingSlug(original, slug)) {
    throw new Error(
      `O slug "${slug}" já existe em blog.ts. Publicação cancelada para evitar duplicação.`
    );
  }

  const post = buildPostObject(article, imageUrl, date);

  const arrayStart = original.indexOf("[");

  if (arrayStart === -1) {
    throw new Error(
      "Não foi encontrado o início do array blogPosts."
    );
  }

  const updated =
    original.slice(0, arrayStart + 1) +
    post +
    original.slice(arrayStart + 1);

  await writeFile(BLOG_FILE, updated, "utf8");

  log("✅ blog.ts atualizado.");
}

async function updateSitemap(slug, date) {
  log("🗺️ Atualizando sitemap.xml...");

  const original = await readFile(SITEMAP_FILE, "utf8");

  const loc =
    `https://www.lisomarbarbosa.adv.br/blog/${slug}`;

  if (original.includes(`<loc>${loc}</loc>`)) {
    log("⚠️ URL já existe no sitemap. Nenhuma duplicação será criada.");
    return;
  }

  const entry = `
  <url>
    <loc>${loc}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  const closingTag = "</urlset>";

  const index = original.lastIndexOf(closingTag);

  if (index === -1) {
    throw new Error("Tag </urlset> não encontrada no sitemap.");
  }

  const updated =
    original.slice(0, index) +
    entry +
    original.slice(index);

  await writeFile(SITEMAP_FILE, updated, "utf8");

  log("✅ sitemap.xml atualizado.");
}

async function getUnsplashImage(topic) {
  log("🖼️ Buscando imagem no Unsplash...");

  if (!process.env.UNSPLASH_ACCESS_KEY) {
    log("⚠️ UNSPLASH_ACCESS_KEY ausente. Usando fallback.");
    return FALLBACK_IMAGE;
  }

  const query = encodeURIComponent(
    `${topic} law technology digital`
  );

  const url =
    `${UNSPLASH_URL}?query=${query}&orientation=landscape&content_filter=high`;

  try {
    const response = await fetch(url, {
      headers: {
        "Authorization":
          `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Unsplash HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data && data.urls && data.urls.regular) {
      return data.urls.regular;
    }

    throw new Error("Unsplash não retornou urls.regular.");
  } catch (error) {
    log(`⚠️ Unsplash falhou: ${error.message}`);
    return FALLBACK_IMAGE;
  }
}

async function main() {
  let originalBlog = null;
  let originalSitemap = null;

  try {
    log("==========================================");
    log("⚖️ LISOMAR BARBOSA ADVOGADOS");
    log("💻 GERADOR DE CONTEÚDO - DIREITO DIGITAL");
    log("==========================================");

    const date = getToday();
    const topic = chooseTopic();

    log(`📅 Data: ${date}`);
    log(`🎯 Tema: ${topic}`);

    // Diagnóstico da API antes de iniciar
    await checkApiKey();

    originalBlog = await readFile(BLOG_FILE, "utf8");
    originalSitemap = await readFile(SITEMAP_FILE, "utf8");

    const research = await createResearch(topic);

    log("✅ Curadoria jurídica concluída.");

    let article = await generateArticle(topic, research);

    let words = validateArticleStructure(article);

    log(`📊 Artigo inicial: ${words} palavras.`);

    if (words < MIN_WORDS) {
      article = await expandArticle(article, research);
      words = validateArticleStructure(article);
      log(`📊 Artigo após expansão: ${words} palavras.`);
    }

    if (words < MIN_WORDS) {
      throw new Error(
        `Artigo rejeitado: ${words} palavras. Mínimo exigido: ${MIN_WORDS}.`
      );
    }

    const audit = await auditArticle(article, research);

    if (!audit || audit.status !== "PASS") {
      log("❌ Auditoria jurídica reprovou o conteúdo.");
      console.error(JSON.stringify(audit, null, 2));
      throw new Error("O artigo não passou na auditoria jurídica.");
    }

    log("✅ Auditoria jurídica aprovada.");

    const links = await verifyLinks(article.content);
    const brokenLinks = links.filter(item => !item.ok);

    if (brokenLinks.length > 0) {
      throw new Error(
        `Existem ${brokenLinks.length} link(s) que não puderam ser verificados.`
      );
    }

    const image = await getUnsplashImage(topic);
    const slug = slugify(article.slug || article.title);

    await updateBlogFile(article, image, date);
    await updateSitemap(slug, date);

    log("🚀 Conteúdo pronto para commit.");
    log(`📌 Título: ${article.title}`);
    log(`🔗 Slug: ${slug}`);
    log(`📊 Palavras: ${words}`);
    log("==========================================");
    log("✅ PROCESSO CONCLUÍDO COM SUCESSO");
    log("==========================================");
  } catch (error) {
    log("==========================================");
    log("❌ ERRO NO WORKFLOW");
    log("==========================================");
    console.error(error);

    try {
      if (originalBlog !== null) {
        await writeFile(BLOG_FILE, originalBlog, "utf8");
      }

      if (originalSitemap !== null) {
        await writeFile(SITEMAP_FILE, originalSitemap, "utf8");
      }

      log("↩️ Rollback de segurança realizado.");
    } catch (rollbackError) {
      console.error("❌ Falha durante rollback:", rollbackError);
    }

    process.exit(1);
  }
}

main();
