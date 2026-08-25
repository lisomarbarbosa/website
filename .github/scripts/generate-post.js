import { readFile, writeFile, readdir, mkdir } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = process.cwd();

const PAGES_DIR           = join(ROOT, "src/pages/artigos");
const BLOG_DATA_FILE      = join(ROOT, "src/data/blog.ts");
const GENERATED_SLUG_FILE = join(ROOT, ".generated_slug");

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const UNSPLASH_URL   = "https://api.unsplash.com/photos/random";

const MAX_ATTEMPTS = 15;

// ─── Pool de modelos corrigido ────────────────────────────────────────────────
// Removidos:
//   nvidia/llama-nemotron-rerank-vl-1b-v2:free  → modelo de reranking, não gera texto
//   nvidia/nemotron-3-nano-30b-a3b:free          → versão free descontinuada (HTTP 404)
//   thinkingmachines/inkling:free                → só disponível em "agentic harnesses" (HTTP 403)
// Reduzidos:
//   google/gemma-4-31b-it:free e google/gemma-4-26b-a4b-it:free → sofrem rate limit intenso;
//   mantidos apenas ao final como último recurso.
const MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "deepseek/deepseek-chat:free",
  "meta-llama/llama-3.1-8b-instruct:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "dots-studio/dots-3-note-preview:free",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
  "poolside/laguna-s-2.1:free",
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
];

// Quantas tentativas consecutivas no MESMO tema antes de sortear um novo
const SAME_TOPIC_RETRIES = 3;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200";

const MIN_WORDS = 1250;

// Ícones Lucide disponíveis para escolha automática por tema
const ICON_MAP = {
  default:    ["Scale", "Shield", "FileText", "AlertTriangle", "Info"],
  consumidor: ["ShoppingCart", "PackageSearch", "ShieldCheck", "Scale", "AlertTriangle"],
  dados:      ["Lock", "Database", "ShieldCheck", "AlertTriangle", "Scale"],
  crimes:     ["AlertTriangle", "Shield", "Scale", "FileText", "Lock"],
  contratos:  ["FileText", "Scale", "ShieldCheck", "AlertTriangle", "Info"],
  lgpd:       ["Lock", "ShieldCheck", "Database", "AlertTriangle", "Scale"],
  internet:   ["Globe", "Shield", "AlertTriangle", "Scale", "Lock"],
  ia:         ["Cpu", "Shield", "AlertTriangle", "Scale", "Lock"],
  crypto:     ["Bitcoin", "Shield", "AlertTriangle", "Scale", "Lock"],
};

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
  "Preservação de provas digitais em conflitos jurídicos",
  "Direito à privacidade e proteção contra vigilância digital",
  "Responsabilidade dos provedores de internet no Brasil",
  "Marco Civil da Internet e seus reflexos práticos",
  "Phishing e engenharia social: aspectos jurídicos",
  "Deepfake e responsabilidade civil e penal",
  "Criptomoedas e regulamentação jurídica no Brasil",
  "NFTs e propriedade intelectual no ambiente digital",
  "Inteligência artificial e responsabilidade civil",
  "Direito ao anonimato na internet e seus limites",
  "Proteção de menores na internet: obrigações legais",
  "Assédio digital e responsabilidade jurídica das plataformas",
  "Revenge porn e tutela jurídica da vítima",
  "Monitoramento de empregados e proteção de dados",
  "E-commerce e direito de arrependimento",
  "Contratos de software e licenças de uso",
];

// ─── Utilitários ──────────────────────────────────────────────────────────────

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
    .filter(Boolean).length;
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

function calculateReadTime(words) {
  return `${Math.max(1, Math.ceil(words / 200))} min de leitura`;
}

function getToday() {
  const d = new Date();
  const day   = String(d.getDate()).padStart(2, "0");
  const month = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"][d.getMonth()];
  const year  = d.getFullYear();
  return `${day} ${month} ${year}`;
}

function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
}

function escapeForSingleQuote(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}

function pickIcons(topic, count) {
  const t = topic.toLowerCase();
  let pool = ICON_MAP.default;
  if (t.includes("consumidor") || t.includes("compra") || t.includes("marketplace")) pool = ICON_MAP.consumidor;
  else if (t.includes("lgpd") || t.includes("dado") || t.includes("privacidade")) pool = ICON_MAP.lgpd;
  else if (t.includes("crime") || t.includes("penal") || t.includes("fraude") || t.includes("stalking")) pool = ICON_MAP.crimes;
  else if (t.includes("contrato") || t.includes("assinatura")) pool = ICON_MAP.contratos;
  else if (t.includes("internet") || t.includes("provedor") || t.includes("marco civil")) pool = ICON_MAP.internet;
  else if (t.includes("intelig") || t.includes("ia") || t.includes("artificial")) pool = ICON_MAP.ia;
  else if (t.includes("cripto") || t.includes("nft") || t.includes("bitcoin")) pool = ICON_MAP.crypto;
  const icons = [];
  for (let i = 0; i < count; i++) icons.push(pool[i % pool.length]);
  return icons;
}

// ─── Curadoria de temas ───────────────────────────────────────────────────────

async function getPublishedSlugs() {
  try {
    const files = await readdir(PAGES_DIR);
    return files
      .filter(f => f.endsWith(".tsx"))
      .map(f => f.replace(/\.tsx$/, ""));
  } catch (_) {
    return [];
  }
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function chooseTopic(usedTopicSlugs = []) {
  if (process.env.CUSTOM_TOPIC && process.env.CUSTOM_TOPIC.trim()) {
    return process.env.CUSTOM_TOPIC.trim();
  }
  const publishedSlugs = await getPublishedSlugs();
  const allUsed = [...publishedSlugs, ...usedTopicSlugs];
  const available = TOPICS.filter(t => {
    const ts = slugify(t);
    return !allUsed.some(
      used => used.includes(ts.slice(0, 20)) || ts.includes(used.slice(0, 20))
    );
  });
  const pool = available.length > 0 ? available : TOPICS;
  const shuffled = shuffleArray(pool);
  log(`🎲 Pool de temas disponíveis: ${pool.length} (${TOPICS.length - pool.length} já publicados)`);
  const chosen = shuffled[0];
  log(`🎯 Tema sorteado: ${chosen}`);
  return chosen;
}

// ─── Extração de JSON ─────────────────────────────────────────────────────────

function extractJson(text) {
  const cleaned = normalizeText(text);
  try { return JSON.parse(cleaned); } catch (_) {}
  const fenced = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) {
    try { return JSON.parse(fenced[1].trim()); } catch (_) {}
  }
  const start = cleaned.indexOf("{");
  if (start !== -1) {
    let depth = 0, inStr = false, esc = false;
    for (let i = start; i < cleaned.length; i++) {
      const ch = cleaned[i];
      if (esc) { esc = false; continue; }
      if (ch === "\\" && inStr) { esc = true; continue; }
      if (ch === '"') { inStr = !inStr; continue; }
      if (inStr) continue;
      if (ch === "{") depth++;
      else if (ch === "}") { depth--; if (depth === 0) { try { return JSON.parse(cleaned.slice(start, i + 1)); } catch (_) {} } }
    }
  }
  throw new Error(`Não foi possível extrair JSON: ${cleaned.slice(0, 200)}`);
}

// ─── Imagem (Unsplash) ────────────────────────────────────────────────────────

async function fetchImage(topic) {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) { log("⚠️  UNSPLASH_ACCESS_KEY não configurada — usando fallback."); return FALLBACK_IMAGE; }
  try {
    const query = encodeURIComponent("law digital technology");
    const url = `${UNSPLASH_URL}?query=${query}&orientation=landscape&client_id=${key}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Unsplash HTTP ${res.status}`);
    const data = await res.json();
    return data?.urls?.regular || FALLBACK_IMAGE;
  } catch (err) {
    log(`⚠️  Unsplash falhou (${err.message}) — usando fallback.`);
    return FALLBACK_IMAGE;
  }
}

// ─── OpenRouter ───────────────────────────────────────────────────────────────

async function callOpenRouter(messages, modelIndex = 0) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY não configurada.");
  const model = MODELS[modelIndex % MODELS.length];
  log(`🤖 Modelo: ${model}`);
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      "HTTP-Referer": "https://lisomarbarbosa.adv.br",
      "X-Title": "Blog Lisomar Barbosa ADV",
    },
    body: JSON.stringify({ model, messages, max_tokens: 4096, temperature: 0.7 }),
  });
  if (!res.ok) { const body = await res.text(); throw new Error(`OpenRouter HTTP ${res.status}: ${body}`); }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Resposta vazia do modelo.");
  return content;
}

// ─── Geração do artigo estruturado ───────────────────────────────────────────

/**
 * Monta o prompt do sistema. Em modo reforçado (reinforced=true), adiciona
 * instruções adicionais de formato para modelos que ignoraram o JSON na
 * tentativa anterior.
 */
function buildSystemPrompt(reinforced = false) {
  const base = `Você é Lisomar Barbosa, advogada especialista em Direito Digital.
Escreva artigos jurídicos informativos, acessíveis e bem fundamentados em português do Brasil.
Use linguagem clara, evite jargão desnecessário, cite legislação e jurisprudência relevantes.`;

  const jsonRule = reinforced
    ? `

CRITICAL OUTPUT RULE (MANDATORY):
- Your ENTIRE response must be a single raw JSON object.
- Do NOT write any text before the opening { or after the closing }.
- Do NOT wrap the JSON in markdown code fences (no \`\`\`json, no \`\`\`).
- Do NOT add any explanation, commentary, or apology.
- Start your response with { and end it with }.`
    : `
Nunca inclua blocos de código Markdown. Responda APENAS com JSON válido, começando com { e terminando com }.`;

  return base + jsonRule;
}

/**
 * Solicita ao modelo um artigo estruturado em JSON com seções bem definidas.
 * O parâmetro reinforced=true endurece as instruções de formato JSON.
 */
async function generateArticle(topic, modelIndex = 0, reinforced = false) {
  log(`✍️  Gerando artigo sobre: "${topic}"${reinforced ? " [modo reforçado]" : ""}`);

  const systemPrompt = buildSystemPrompt(reinforced);

  const userPrompt = `
RETURN ONLY A RAW JSON OBJECT. No markdown. No explanation. Start with { end with }.

Escreva um artigo jurídico completo sobre o tema: "${topic}".

O objeto JSON deve ter exatamente esta estrutura (todos os campos são obrigatórios):

{
  "title": "Título informativo e claro (máximo 100 caracteres)",
  "description": "Meta descrição para SEO (máximo 200 caracteres, explica o valor do artigo)",
  "intro": "Parágrafo introdutório forte (2-4 frases, contextualiza o problema e anuncia o que o artigo cobre)",
  "alertTitle": "Título curto do bloco de atenção (ex: Atenção: documente tudo desde o início)",
  "alertBody": "Texto do bloco de atenção (1-3 frases práticas e diretas)",
  "sections": [
    {
      "heading": "Subtítulo da seção (H2, até 60 caracteres)",
      "paragraphs": ["Parágrafo 1 da seção com pelo menos 80 palavras.", "Parágrafo 2 da seção com pelo menos 80 palavras."]
    }
  ],
  "actionSteps": [
    { "title": "Título curto da ação", "body": "Descrição da ação em 1-2 frases." }
  ],
  "preventionItems": [
    { "bold": "Título em negrito", "text": "Explicação breve." }
  ],
  "closing": "Parágrafo final de considerações (2-3 frases).",
  "closingExtra": "Segundo parágrafo final opcional (2-3 frases).",
  "disclaimer": "Este artigo tem caráter informativo e não substitui consulta jurídica personalizada. Para avaliar o seu caso concreto, busque orientação profissional adequada."
}

Requisitos de conteúdo:
- sections: entre 4 e 6 seções, cada uma com 2-3 parágrafos bem desenvolvidos (mínimo 80 palavras por parágrafo)
- actionSteps: 4 a 6 passos numerados práticos
- preventionItems: 4 a 6 dicas de prevenção
- Total de palavras no artigo: mínimo ${MIN_WORDS} palavras
- Cite leis, artigos do CDC, LGPD, Marco Civil, CPB ou jurisprudência relevante onde apropriado
- Linguagem acessível ao público leigo interessado em seus direitos

IMPORTANT: All string values must use double quotes. Escape any internal double quotes with backslash. No trailing commas.`;

  const raw = await callOpenRouter(
    [
      { role: "system", content: systemPrompt },
      { role: "user",   content: userPrompt },
    ],
    modelIndex
  );

  let data;
  try {
    data = extractJson(raw);
  } catch (err) {
    throw new Error(`JSON inválido do modelo: ${err.message}`);
  }

  // Valida campos obrigatórios
  for (const field of ["title", "intro", "alertTitle", "alertBody", "sections", "actionSteps", "preventionItems", "closing"]) {
    if (!data[field]) throw new Error(`Campo ausente no JSON do modelo: ${field}`);
  }
  if (!Array.isArray(data.sections)     || data.sections.length < 2)     throw new Error("sections inválido.");
  if (!Array.isArray(data.actionSteps)  || data.actionSteps.length < 2)  throw new Error("actionSteps inválido.");
  if (!Array.isArray(data.preventionItems) || data.preventionItems.length < 2) throw new Error("preventionItems inválido.");

  const fullText = [
    data.intro,
    data.alertTitle, data.alertBody,
    ...data.sections.flatMap(s => [s.heading, ...s.paragraphs]),
    ...data.actionSteps.map(s => `${s.title} ${s.body}`),
    ...data.preventionItems.map(p => `${p.bold} ${p.text}`),
    data.closing,
    data.closingExtra || "",
  ].join(" ");

  const wordCount = countWords(fullText);
  const slug = slugify(data.title);

  log(`📝 Artigo gerado: "${data.title}" (~${wordCount} palavras)`);
  return { ...data, slug, wordCount, description: data.description || data.title };
}

// ─── Auditoria ────────────────────────────────────────────────────────────────

async function auditArticle(title, intro, sections, modelIndex = 0) {
  log(`🔍 Auditando artigo: "${title}"`);
  const preview = [intro, ...sections.map(s => s.paragraphs.join(" "))].join("\n\n").slice(0, 3000);
  const prompt = `Você é um editor jurídico sênior. Avalie o artigo abaixo e retorne JSON com:
{ "approved": true, "reason": "" }
ou
{ "approved": false, "reason": "motivo breve" }

Return ONLY a raw JSON object — no markdown, no explanation.

Reprove se:
- Conteúdo genérico demais, sem referências jurídicas concretas
- Menos de 800 palavras no preview
- Título não condiz com o conteúdo
- Conteúdo claramente incorreto juridicamente

Artigo:
---
${preview}
---`;
  try {
    const raw = await callOpenRouter([{ role: "user", content: prompt }], modelIndex);
    const result = extractJson(raw);
    log(`✅ Auditoria: ${result.approved ? "APROVADO" : `REPROVADO — ${result.reason}`}`);
    return { ok: !!result.approved, reason: result.reason || "" };
  } catch (err) {
    log(`⚠️  Auditoria falhou (${err.message}) — aprovando por padrão.`);
    return { ok: true, reason: "" };
  }
}

// ─── Excerpt ─────────────────────────────────────────────────────────────────

async function generateExcerpt(title, description, intro, modelIndex = 0) {
  if (description && description.length > 20) return description.slice(0, 200);
  log(`📋 Gerando excerpt para: "${title}"`);
  const prompt = `Escreva um resumo em português do Brasil com no máximo 200 caracteres para o artigo abaixo. Retorne APENAS o texto do resumo, sem aspas, sem JSON.\n\nTítulo: ${title}\n\nIntrodução: ${intro.slice(0, 500)}`;
  try {
    const raw = await callOpenRouter([{ role: "user", content: prompt }], modelIndex);
    return normalizeText(raw).slice(0, 200);
  } catch {
    return title.slice(0, 200);
  }
}

// ─── Geração do componente TSX ────────────────────────────────────────────────

function escapeJsx(text) {
  return String(text || "")
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeJsxAttr(text) {
  return String(text || "")
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${")
    .replace(/"/g, '\\"');
}

function mdBoldToJsx(text) {
  return escapeJsx(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function buildTsxComponent({ slug, title, description, image, date, readTime, intro, alertTitle, alertBody, sections, actionSteps, preventionItems, closing, closingExtra, disclaimer, topic }) {
  const componentName = slug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  const pageUrl = `https://www.lisomarbarbosa.adv.br/artigos/${slug}`;
  const icons = pickIcons(topic, sections.length);
  const usedIcons = [...new Set(["AlertTriangle", "ArrowLeft", ...icons])].join(", ");

  const sectionsJsx = sections.map((s, i) => {
    const icon = icons[i] || "Scale";
    const heading = escapeJsx(s.heading);
    const paras = s.paragraphs
      .map(p => `                  <p className="text-foreground/80 mb-6 leading-relaxed">\n                    ${mdBoldToJsx(p)}\n                  </p>`)
      .join("\n");
    return `
                  <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
                    <${icon} className="text-primary" size={28} />
                    ${heading}
                  </h2>

${paras}`;
  }).join("\n");

  const stepsJsx = actionSteps.map((step, i) => `
                    <li className="flex gap-4">
                      <span className="font-bold text-primary text-lg">${i + 1}.</span>
                      <div>
                        <strong>${escapeJsx(step.title)}:</strong> ${mdBoldToJsx(step.body)}
                      </div>
                    </li>`).join("\n");

  const preventionJsx = preventionItems.map(item => `
                    <li>
                      <strong>${escapeJsx(item.bold)}</strong> ${mdBoldToJsx(item.text)}
                    </li>`).join("\n");

  const closingExtra2 = closingExtra
    ? `\n                  <p className="text-foreground/80 mb-6 leading-relaxed">\n                    ${mdBoldToJsx(closingExtra)}\n                  </p>`
    : "";

  return `import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ${usedIcons} } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pageTitle =
  "${escapeJsxAttr(title)} | Lisomar Barbosa | Direito Digital";

const pageDescription =
  "${escapeJsxAttr(description)}";

const pageUrl =
  "${pageUrl}";

const pageImage =
  "${image}";

const ${componentName} = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
                    ${escapeJsx(title)}
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>${date}</span>
                    <span>•</span>
                    <span>${readTime}</span>
                  </div>

                  <img
                    src={pageImage}
                    alt="${escapeJsxAttr(title)}"
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                    loading="lazy"
                  />
                </header>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                    ${mdBoldToJsx(intro)}
                  </p>

                  <Card className="p-6 bg-accent/10 border-accent/20 mb-8">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="text-accent flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold mb-2">${escapeJsx(alertTitle)}</h3>
                        <p className="text-sm text-foreground/80">
                          ${mdBoldToJsx(alertBody)}
                        </p>
                      </div>
                    </div>
                  </Card>
${sectionsJsx}

                  <h2 className="text-3xl font-bold mt-12 mb-6">O que fazer quando o problema acontece</h2>

                  <ol className="space-y-4 mb-12">
${stepsJsx}
                  </ol>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Hábitos de prevenção</h2>

                  <ul className="list-disc pl-6 mb-8 text-foreground/80 space-y-3">
${preventionJsx}
                  </ul>

                  <h2 className="text-3xl font-bold mt-12 mb-6">Considerações finais</h2>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    ${mdBoldToJsx(closing)}
                  </p>
${closingExtra2}

                  <hr />

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    <em>
                      ${escapeJsx(disclaimer || "Este artigo tem caráter informativo e não substitui consulta jurídica personalizada. Para avaliar o seu caso concreto, busque orientação profissional adequada.")}
                    </em>
                  </p>
                </div>

                <div className="mt-16 p-8 rounded-2xl gradient-cyber border border-primary/20 text-center">
                  <h3 className="text-2xl font-bold mb-4">Precisa de orientação jurídica?</h3>
                  <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                    Nossa equipe especializada em Direito Digital está pronta para analisar o seu caso e indicar as melhores estratégias jurídicas.
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

export default ${componentName};
`;
}

// ─── Escrita dos arquivos ─────────────────────────────────────────────────────

async function writePageFile(slug, tsxContent) {
  const filePath = join(PAGES_DIR, `${slug}.tsx`);
  await mkdir(PAGES_DIR, { recursive: true });
  await writeFile(filePath, tsxContent, "utf8");
  log(`💾 Arquivo salvo: src/pages/artigos/${slug}.tsx`);
  return filePath;
}

async function updateBlogData({ slug, title, excerpt, date, readTime, category, image }) {
  const source = await readFile(BLOG_DATA_FILE, "utf8");
  const arrayStart = source.indexOf("export const blogPosts: BlogPost[] = [");
  if (arrayStart === -1) throw new Error("Não foi possível localizar o array blogPosts em src/data/blog.ts");
  const insertAt = source.indexOf("[", arrayStart) + 1;
  const safe = s => escapeForSingleQuote(s);
  const newEntry = `
  {
    slug: '${safe(slug)}',
    title: '${safe(title)}',
    excerpt: '${safe(excerpt)}',
    date: '${safe(date)}',
    readTime: '${safe(readTime)}',
    category: '${safe(category)}',
    image: '${safe(image)}',
  },`;
  const updated = source.slice(0, insertAt) + newEntry + source.slice(insertAt);
  await writeFile(BLOG_DATA_FILE, updated, "utf8");
  log(`📚 blogPosts atualizado: entrada '${slug}' inserida em src/data/blog.ts`);
}

async function saveGeneratedSlug(slug) {
  await writeFile(GENERATED_SLUG_FILE, slug, "utf8");
  log(`🏷️  Slug salvo em .generated_slug: ${slug}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  log("🚀 Iniciando geração de artigo (formato TSX)...");

  let attempt        = 0;
  let topic          = null;
  let topicRetries   = 0;   // tentativas no tema atual
  const usedSlugs    = [];

  while (attempt < MAX_ATTEMPTS) {
    attempt++;
    log(`\n🔄 Tentativa ${attempt}/${MAX_ATTEMPTS}`);

    // ── Estratégia de seleção de tema ────────────────────────────────────────
    // Nas primeiras SAME_TOPIC_RETRIES tentativas após um erro de JSON/palavras,
    // reusa o mesmo tema com prompt reforçado.
    // Só sorteia novo tema quando: (a) ainda não tem tema, (b) esgotou retries
    // no tema atual, ou (c) o tema foi reprovado na auditoria de qualidade.
    const needNewTopic = topic === null || topicRetries >= SAME_TOPIC_RETRIES;
    const reinforced   = topic !== null && topicRetries > 0 && !needNewTopic;

    if (needNewTopic) {
      topic = await chooseTopic(usedSlugs);
      const candidateSlug = slugify(topic);
      usedSlugs.push(candidateSlug);
      topicRetries = 0;

      // Verifica se o slug já existe antes mesmo de chamar o modelo
      const existingFiles = await getPublishedSlugs();
      if (existingFiles.includes(candidateSlug)) {
        log(`⏩ Slug "${candidateSlug}" já existe — pulando.`);
        topic = null;
        continue;
      }
    } else {
      log(`♻️  Reutilizando tema: "${topic}" (retry ${topicRetries}/${SAME_TOPIC_RETRIES})`);
    }

    topicRetries++;

    // ── Geração ───────────────────────────────────────────────────────────────
    let article;
    try {
      article = await generateArticle(topic, attempt - 1, reinforced);
    } catch (err) {
      log(`❌ Falha na geração: ${err.message}`);
      // Não descarta o tema ainda — tenta de novo com prompt reforçado
      continue;
    }

    // ── Verifica contagem mínima ───────────────────────────────────────────────
    if (article.wordCount < MIN_WORDS) {
      log(`⚠️  Artigo muito curto (${article.wordCount} palavras, mínimo ${MIN_WORDS}) — tentando novamente com o mesmo tema.`);
      // Não descarta o tema — tenta de novo com reforço
      continue;
    }

    // ── Auditoria de qualidade ─────────────────────────────────────────────────
    const audit = await auditArticle(article.title, article.intro, article.sections, attempt - 1);
    if (!audit.ok) {
      log(`🔁 Artigo reprovado na auditoria — sorteando novo tema.`);
      topic = null; // força novo tema
      topicRetries = 0;
      continue;
    }

    // ── Verifica colisão de slug final ────────────────────────────────────────
    const existingFiles = await getPublishedSlugs();
    if (existingFiles.includes(article.slug)) {
      log(`⏩ Slug final "${article.slug}" já existe — sorteando novo tema.`);
      topic = null;
      topicRetries = 0;
      continue;
    }

    // ── Busca imagem e excerpt em paralelo ────────────────────────────────────
    const [image, excerpt] = await Promise.all([
      fetchImage(topic),
      generateExcerpt(article.title, article.description, article.intro, attempt - 1),
    ]);

    const date     = getToday();
    const dateISO  = getTodayISO();
    const readTime = calculateReadTime(article.wordCount);
    const category = "Direito Digital";

    // ── Constrói o componente TSX ─────────────────────────────────────────────
    const tsxContent = buildTsxComponent({
      slug:            article.slug,
      title:           article.title,
      description:     article.description,
      image,
      date,
      readTime,
      intro:           article.intro,
      alertTitle:      article.alertTitle,
      alertBody:       article.alertBody,
      sections:        article.sections,
      actionSteps:     article.actionSteps,
      preventionItems: article.preventionItems,
      closing:         article.closing,
      closingExtra:    article.closingExtra || "",
      disclaimer:      article.disclaimer || "",
      topic,
    });

    // ── Salva os arquivos ─────────────────────────────────────────────────────
    try {
      await writePageFile(article.slug, tsxContent);
      await updateBlogData({
        slug:     article.slug,
        title:    article.title,
        excerpt,
        date:     dateISO,
        readTime,
        category,
        image,
      });
      await saveGeneratedSlug(article.slug);
    } catch (err) {
      log(`❌ Falha ao salvar arquivo: ${err.message}`);
      throw err;
    }

    log(`\n🎉 Artigo publicado com sucesso!`);
    log(`   Título:   ${article.title}`);
    log(`   Slug:     ${article.slug}`);
    log(`   Palavras: ${article.wordCount}`);
    log(`   Arquivo:  src/pages/artigos/${article.slug}.tsx`);
    log(`   Blog:     src/data/blog.ts atualizado`);
    return;
  }

  throw new Error(`❌ Não foi possível gerar um artigo aprovado após ${MAX_ATTEMPTS} tentativas.`);
}

main().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
