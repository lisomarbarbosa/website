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

const DEFAULT_MODEL =
  "google/gemma-3-27b-it:free";

const FALLBACK_MODEL =
  "meta-llama/llama-3.1-8b-instruct:free";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200";

const MIN_WORDS = 1250;

const TOPICS = [
  "Direito digital e responsabilidade civil nas rela\u00e7\u00f5es online",
  "Responsabilidade civil por danos causados na internet",
  "Direito ao esquecimento e os limites da remo\u00e7\u00e3o de conte\u00fado digital",
  "Prote\u00e7\u00e3o de dados pessoais e responsabilidade no ambiente digital",
  "Golpes digitais e responsabilidade jur\u00eddica das plataformas",
  "Fraudes eletr\u00f4nicas e consequ\u00eancias no Direito Penal",
  "Crimes digitais e os limites da responsabiliza\u00e7\u00e3o penal",
  "Provas digitais e sua import\u00e2ncia em processos judiciais",
  "Ataques virtuais e responsabilidade civil por danos causados",
  "Uso indevido de imagem na internet e responsabilidade civil",
  "Liberdade de express\u00e3o na internet e seus limites jur\u00eddicos",
  "Ofensas nas redes sociais e poss\u00edveis consequ\u00eancias jur\u00eddicas",
  "Direito do consumidor nas compras realizadas pela internet",
  "Responsabilidade de marketplaces em rela\u00e7\u00f5es de consumo",
  "Contratos digitais e sua validade jur\u00eddica",
  "Assinaturas eletr\u00f4nicas e validade dos neg\u00f3cios jur\u00eddicos",
  "Fraudes banc\u00e1rias digitais e responsabilidade civil",
  "Vazamento de dados e poss\u00edveis consequ\u00eancias jur\u00eddicas",
  "LGPD e prote\u00e7\u00e3o de dados pessoais nas rela\u00e7\u00f5es digitais",
  "Responsabilidade por publica\u00e7\u00e3o de conte\u00fado il\u00edcito na internet",
  "Remo\u00e7\u00e3o de conte\u00fado online e responsabilidade das plataformas",
  "Cyberbullying e consequ\u00eancias jur\u00eddicas no Brasil",
  "Stalking virtual e suas consequ\u00eancias jur\u00eddicas",
  "Persegui\u00e7\u00e3o digital e prote\u00e7\u00e3o jur\u00eddica da v\u00edtima",
  "Estelionato eletr\u00f4nico e Direito Penal",
  "Invas\u00e3o de dispositivo inform\u00e1tico e consequ\u00eancias jur\u00eddicas",
  "Crimes contra a honra praticados pela internet",
  "Difama\u00e7\u00e3o nas redes sociais e responsabilidade jur\u00eddica",
  "Cal\u00fania e inj\u00faria praticadas no ambiente digital",
  "Preserva\u00e7\u00e3o de provas digitais em conflitos jur\u00eddicos"
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
    "A IA n\u00e3o retornou um JSON v\u00e1lido."
  );
}

async function callOpenRouter(messages, model, temperature = 0.2) {
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
      "OpenRouter n\u00e3o retornou conte\u00fado."
    );
  }

  return content;
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
  log("\uD83D\uDD0E Pesquisando Jusbrasil...");

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
      `\u26A0\uFE0F N\u00e3o foi poss\u00edvel consultar diretamente o Jusbrasil: ${error.message}`
    );

    return {
      source: "Jusbrasil",
      url,
      content:
        "A consulta autom\u00e1tica ao Jusbrasil falhou. N\u00c3O presumir resultados, jurisprud\u00eancia ou decis\u00f5es."
    };
  }
}

function buildLegalResearchInstructions(topic) {
  return `
Voc\u00ea est\u00e1 realizando uma CURADORIA JUR\u00cdDICA preliminar para produ\u00e7\u00e3o editorial
do escrit\u00f3rio Lisomar Barbosa Advogados.

TEMA:
${topic}

OBJETIVO:
Identificar somente informa\u00e7\u00f5es jur\u00eddicas que possam ser verificadas.

FONTES PRIORIT\u00c1RIAS:

1. Constitui\u00e7\u00e3o Federal do Brasil.
2. Legisla\u00e7\u00e3o brasileira aplic\u00e1vel.
3. C\u00f3digo Civil.
4. C\u00f3digo de Defesa do Consumidor.
5. C\u00f3digo Penal.
6. Legisla\u00e7\u00e3o especificamente relacionada ao ambiente digital.
7. Jurisprud\u00eancia e decis\u00f5es encontradas no Jusbrasil.

REGRAS ABSOLUTAS:

- N\u00c3O invente lei.
- N\u00c3O invente artigo de lei.
- N\u00c3O invente n\u00famero de processo.
- N\u00c3O invente tribunal.
- N\u00c3O invente desembargador, ministro, juiz ou relator.
- N\u00c3O invente ementa.
- N\u00c3O atribua decis\u00e3o judicial a tribunal sem fonte verific\u00e1vel.
- N\u00c3O transforme hip\u00f3tese em fato jur\u00eddico.
- N\u00c3O trate interpreta\u00e7\u00e3o doutrin\u00e1ria como texto legal.
- N\u00c3O invente orienta\u00e7\u00e3o jur\u00eddica.
- N\u00c3O diga que determinada conduta \"sempre\" gera indeniza\u00e7\u00e3o.
- N\u00c3O diga que determinada conduta \"nunca\" gera responsabilidade.
- N\u00c3O fa\u00e7a promessa de resultado judicial.
- N\u00c3O crie jurisprud\u00eancia apenas para tornar o artigo mais convincente.

Se uma informa\u00e7\u00e3o n\u00e3o puder ser confirmada, marque-a como:
\"INFORMA\u00c7\u00c3O N\u00c3O CONFIRMADA - N\u00c3O PUBLICAR\".

Jurisprud\u00eancia somente pode ser utilizada quando houver dados verific\u00e1veis
e uma fonte correspondente.

N\u00e3o utilizar blogs jur\u00eddicos desconhecidos como autoridade jur\u00eddica.

O objetivo da pesquisa n\u00e3o \u00e9 produzir o artigo.
\u00c9 produzir uma base de fatos verific\u00e1veis para posterior reda\u00e7\u00e3o e auditoria.
`;
}

async function createResearch(topic) {
  const jusbrasil = await searchJusbrasil(topic);

  const system = `
Voc\u00ea \u00e9 um pesquisador jur\u00eddico extremamente conservador.

Sua fun\u00e7\u00e3o \u00e9 fazer curadoria factual antes da produ\u00e7\u00e3o de um artigo sobre Direito Digital.

Voc\u00ea N\u00c3O deve escrever o artigo.

Voc\u00ea deve separar:

- legisla\u00e7\u00e3o;
- dispositivos legais;
- princ\u00edpios constitucionais;
- conceitos jur\u00eddicos;
- jurisprud\u00eancia verific\u00e1vel;
- informa\u00e7\u00f5es que n\u00e3o puderam ser confirmadas.

N\u00e3o invente absolutamente nenhuma informa\u00e7\u00e3o.

Quando houver d\u00favida, diga que a informa\u00e7\u00e3o n\u00e3o foi confirmada.

Nunca complete n\u00fameros de artigos, processos ou decis\u00f5es por mem\u00f3ria.

${buildLegalResearchInstructions(topic)}
`;

  const user = `
Realize a curadoria preliminar sobre:

${topic}

Material obtido do Jusbrasil:

FONTE:
${jusbrasil.url}

CONTE\u00daDO:
${jusbrasil.content}

Retorne exclusivamente JSON v\u00e1lido neste formato:

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

Se n\u00e3o houver jurisprud\u00eancia suficientemente verific\u00e1vel,
retorne \"jurisprudence\": [].

N\u00e3o invente fontes.
`;

  const model =
    process.env.CUSTOM_MODEL ||
    DEFAULT_MODEL;

  let raw;

  try {
    raw = await callOpenRouter(
      [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      model,
      0.1
    );
  } catch (error) {
    log(
      `\u26A0\uFE0F Modelo principal falhou na pesquisa: ${error.message}`
    );

    raw = await callOpenRouter(
      [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      FALLBACK_MODEL,
      0.1
    );
  }

  return extractJson(raw);
}

function buildArticleSystemPrompt() {
  return `
Voc\u00ea \u00e9 o redator jur\u00eddico especializado em Direito Digital do escrit\u00f3rio
Lisomar Barbosa Advogados.

SITE:
https://www.lisomarbarbosa.adv.br

Seu trabalho \u00e9 produzir conte\u00fado jur\u00eddico informativo, rigoroso,
respons\u00e1vel e verific\u00e1vel.

ESPECIALIDADE CENTRAL:
DIREITO DIGITAL.

REGRA MAIS IMPORTANTE: N\u00c3O INVENTAR.

N\u00e3o invente leis, artigos, incisos, jurisprud\u00eancia, n\u00fameros de processos,
decis\u00f5es, tribunais, nomes de magistrados, datas de julgamentos, s\u00famulas,
precedentes, entendimentos atribu\u00eddos a tribunais, obriga\u00e7\u00f5es que n\u00e3o
estejam previstas em lei, direitos que n\u00e3o possam ser sustentados juridicamente.

SEO deve ser consequ\u00eancia da qualidade do conte\u00fado, n\u00e3o o contr\u00e1rio.
`;
}

function buildArticleUserPrompt(topic, research) {
  return `
Escreva um artigo completo para o blog do site:

https://www.lisomarbarbosa.adv.br

TEMA:
${topic}

O artigo precisa ter NO M\u00cdNIMO ${MIN_WORDS} palavras.

Antes de aceitar o artigo, conte as palavras.

Se tiver menos de ${MIN_WORDS} palavras, reescreva e amplie.

FORMATO DE SA\u00cdDA:

Retorne exclusivamente JSON v\u00e1lido:

{
  "title": "...",
  "excerpt": "...",
  "slug": "...",
  "category": "Direito Digital",
  "content": "..."
}

O campo content deve conter Markdown puro.

BASE DA CURADORIA JUR\u00cdDICA:

${JSON.stringify(research, null, 2)}
`;
}

async function generateArticle(topic, research) {
  log("\uD83E\uDD16 Gerando artigo jur\u00eddico...");

  const system = buildArticleSystemPrompt();
  const user = buildArticleUserPrompt(topic, research);

  const model =
    process.env.CUSTOM_MODEL ||
    DEFAULT_MODEL;

  let raw;

  try {
    raw = await callOpenRouter(
      [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      model,
      0.35
    );
  } catch (error) {
    log(`\u26A0\uFE0F Modelo principal falhou: ${error.message}`);

    raw = await callOpenRouter(
      [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      FALLBACK_MODEL,
      0.35
    );
  }

  return extractJson(raw);
}

async function expandArticle(article, research) {
  log("\uD83E\uDD16 Artigo abaixo do m\u00ednimo. Solicitando expans\u00e3o...");

  const prompt = `
O artigo abaixo possui menos de ${MIN_WORDS} palavras.

N\u00e3o altere a tese jur\u00eddica central.

N\u00e3o invente novas leis, jurisprud\u00eancia, decis\u00f5es ou processos.

Amplie o artigo somente desenvolvendo explica\u00e7\u00f5es, fundamentos,
distin\u00e7\u00f5es, exemplos hip\u00f3teticos e consequ\u00eancias poss\u00edveis.

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

  const raw = await callOpenRouter(
    [
      { role: "system", content: buildArticleSystemPrompt() },
      { role: "user", content: prompt }
    ],
    process.env.CUSTOM_MODEL || DEFAULT_MODEL,
    0.25
  );

  return extractJson(raw);
}

async function auditArticle(article, research) {
  log("\u2696\uFE0F Iniciando auditoria jur\u00eddica independente...");

  const prompt = `
Voc\u00ea \u00e9 o revisor jur\u00eddico respons\u00e1vel por impedir a publica\u00e7\u00e3o de
informa\u00e7\u00f5es jur\u00eddicas falsas.

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

  const raw = await callOpenRouter(
    [
      {
        role: "system",
        content: `Voc\u00ea \u00e9 um auditor jur\u00eddico conservador. Quando n\u00e3o puder confirmar, marque como FAIL.`
      },
      { role: "user", content: prompt }
    ],
    process.env.CUSTOM_MODEL || DEFAULT_MODEL,
    0.05
  );

  return extractJson(raw);
}

async function verifyLinks(content) {
  const urls = content.match(
    /https?:\/\/[^\s)"'>]+/g
  ) || [];

  const uniqueUrls = [...new Set(urls)];

  if (!uniqueUrls.length) {
    return [];
  }

  log(`\uD83D\uDD17 Verificando ${uniqueUrls.length} link(s)...`);

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
    throw new Error("Objeto de artigo inv\u00e1lido.");
  }

  const required = ["title", "excerpt", "slug", "category", "content"];

  for (const field of required) {
    if (!article[field] || typeof article[field] !== "string") {
      throw new Error(`Campo obrigat\u00f3rio ausente ou inv\u00e1lido: ${field}`);
    }
  }

  const words = countWords(article.content);

  if (words < MIN_WORDS) {
    throw new Error(
      `Artigo possui apenas ${words} palavras. M\u00ednimo: ${MIN_WORDS}.`
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
  log("\uD83D\uDCDD Atualizando src/data/blog.ts...");

  const original = await readFile(BLOG_FILE, "utf8");

  const slug = slugify(article.slug || article.title);

  if (removeExistingSlug(original, slug)) {
    throw new Error(
      `O slug \"${slug}\" j\u00e1 existe em blog.ts. Publica\u00e7\u00e3o cancelada para evitar duplica\u00e7\u00e3o.`
    );
  }

  const post = buildPostObject(article, imageUrl, date);

  const arrayStart = original.indexOf("[");

  if (arrayStart === -1) {
    throw new Error(
      "N\u00e3o foi encontrado o in\u00edcio do array blogPosts."
    );
  }

  const updated =
    original.slice(0, arrayStart + 1) +
    post +
    original.slice(arrayStart + 1);

  await writeFile(BLOG_FILE, updated, "utf8");

  log("\u2705 blog.ts atualizado.");
}

async function updateSitemap(slug, date) {
  log("\uD83D\uDDFA\uFE0F Atualizando sitemap.xml...");

  const original = await readFile(SITEMAP_FILE, "utf8");

  const loc =
    `https://www.lisomarbarbosa.adv.br/blog/${slug}`;

  if (original.includes(`<loc>${loc}</loc>`)) {
    log("\u26A0\uFE0F URL j\u00e1 existe no sitemap. Nenhuma duplica\u00e7\u00e3o ser\u00e1 criada.");
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
    throw new Error("Tag </urlset> n\u00e3o encontrada no sitemap.");
  }

  const updated =
    original.slice(0, index) +
    entry +
    original.slice(index);

  await writeFile(SITEMAP_FILE, updated, "utf8");

  log("\u2705 sitemap.xml atualizado.");
}

async function getUnsplashImage(topic) {
  log("\uD83D\uDDBC\uFE0F Buscando imagem no Unsplash...");

  if (!process.env.UNSPLASH_ACCESS_KEY) {
    log("\u26A0\uFE0F UNSPLASH_ACCESS_KEY ausente. Usando fallback.");
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

    throw new Error("Unsplash n\u00e3o retornou urls.regular.");
  } catch (error) {
    log(`\u26A0\uFE0F Unsplash falhou: ${error.message}`);
    return FALLBACK_IMAGE;
  }
}

async function main() {
  let originalBlog = null;
  let originalSitemap = null;

  try {
    log("==========================================");
    log("\u2696\uFE0F LISOMAR BARBOSA ADVOGADOS");
    log("\uD83D\uDCBB GERADOR DE CONTE\u00daDO - DIREITO DIGITAL");
    log("==========================================");

    const date = getToday();
    const topic = chooseTopic();

    log(`\uD83D\uDCC5 Data: ${date}`);
    log(`\uD83C\uDFAF Tema: ${topic}`);

    originalBlog = await readFile(BLOG_FILE, "utf8");
    originalSitemap = await readFile(SITEMAP_FILE, "utf8");

    const research = await createResearch(topic);

    log("\u2705 Curadoria jur\u00eddica conclu\u00edda.");

    let article = await generateArticle(topic, research);

    let words = validateArticleStructure(article);

    log(`\uD83D\uDCCA Artigo inicial: ${words} palavras.`);

    if (words < MIN_WORDS) {
      article = await expandArticle(article, research);
      words = validateArticleStructure(article);
      log(`\uD83D\uDCCA Artigo ap\u00f3s expans\u00e3o: ${words} palavras.`);
    }

    if (words < MIN_WORDS) {
      throw new Error(
        `Artigo rejeitado: ${words} palavras. M\u00ednimo exigido: ${MIN_WORDS}.`
      );
    }

    const audit = await auditArticle(article, research);

    if (!audit || audit.status !== "PASS") {
      log("\u274C Auditoria jur\u00eddica reprovou o conte\u00fado.");
      console.error(JSON.stringify(audit, null, 2));
      throw new Error("O artigo n\u00e3o passou na auditoria jur\u00eddica.");
    }

    log("\u2705 Auditoria jur\u00eddica aprovada.");

    const links = await verifyLinks(article.content);
    const brokenLinks = links.filter(item => !item.ok);

    if (brokenLinks.length > 0) {
      throw new Error(
        `Existem ${brokenLinks.length} link(s) que n\u00e3o puderam ser verificados.`
      );
    }

    const image = await getUnsplashImage(topic);
    const slug = slugify(article.slug || article.title);

    await updateBlogFile(article, image, date);
    await updateSitemap(slug, date);

    log("\uD83D\uDE80 Conte\u00fado pronto para commit.");
    log(`\uD83D\uDCCC T\u00edtulo: ${article.title}`);
    log(`\uD83D\uDD17 Slug: ${slug}`);
    log(`\uD83D\uDCCA Palavras: ${words}`);
    log("==========================================");
    log("\u2705 PROCESSO CONCLU\u00cdDO COM SUCESSO");
    log("==========================================");
  } catch (error) {
    log("==========================================");
    log("\u274C ERRO NO WORKFLOW");
    log("==========================================");
    console.error(error);

    try {
      if (originalBlog !== null) {
        await writeFile(BLOG_FILE, originalBlog, "utf8");
      }

      if (originalSitemap !== null) {
        await writeFile(SITEMAP_FILE, originalSitemap, "utf8");
      }

      log("\u21A9\uFE0F Rollback de seguran\u00e7a realizado.");
    } catch (rollbackError) {
      console.error("\u274C Falha durante rollback:", rollbackError);
    }

    process.exit(1);
  }
}

main();
