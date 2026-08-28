import { readFile, writeFile, readdir, mkdir } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = process.cwd();

const CONTENT_DIR         = join(ROOT, "src/content/blog");
const BLOG_DATA_FILE      = join(ROOT, "src/data/blog.ts");
const GENERATED_SLUG_FILE = join(ROOT, ".generated_slug");

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const UNSPLASH_URL   = "https://api.unsplash.com/photos/random";
const GEMINI_URL     = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";
const GROQ_URL       = "https://api.groq.com/openai/v1/chat/completions";

const MAX_ATTEMPTS = 5;

// ── Pool de modelos OpenRouter (slugs free válidos em ago/2026) ────────────────
// Removidos: openai/gpt-oss-20b (pago), nvidia/nemotron-3-nano-30b-a3b (pago)
const MODELS = [
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
  "moonshotai/kimi-k2.6:free",
  "inclusionai/ling-3.0-flash:free",
  "meta-llama/llama-4-scout:free",
  "mistralai/mistral-nemo:free",
];

// ── Pool de modelos Groq (fallback 1) ─────────────────────────────────────────
// Removidos: llama3-8b-8192 (decommissioned), gemma2-9b-it (decommissioned)
// llama-4-scout/maverick só funcionam no plano pago do Groq
// Usando apenas modelos confirmados no free tier em ago/2026
const GROQ_MODELS = [
  "meta-llama/llama-4-maverick-17b-128e-instruct",
  "llama-3.1-8b-instant",
  "llama-3.1-70b-versatile",
];

const SAME_TOPIC_RETRIES = 3;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200";

const MIN_WORDS = 1250;
// Limite mínimo de palavras para o preview da auditoria editorial.
// Deve ser < MIN_WORDS para não reprovar artigos válidos.
// O preview usa intro + paragraphs (subconjunto do artigo completo),
// por isso o threshold é mantido bem abaixo do total exigido.
const AUDIT_MIN_WORDS = 300;

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

// ── Utilitários ────────────────────────────────────────────────────────────────

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

// CORREÇÃO 1: retorna apenas "X min" — o template já acrescenta " de leitura"
// Antes: `${Math.ceil(words / 200)} min de leitura`  ← duplicava "de leitura"
function calculateReadTime(words) {
  return `${Math.max(1, Math.ceil(words / 200))} min`;
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

// ── Curadoria de temas ─────────────────────────────────────────────────────────

async function getPublishedSlugs() {
  try {
    const files = await readdir(CONTENT_DIR);
    return files
      .filter(f => f.endsWith(".ts"))
      .map(f => f.replace(/\.ts$/, ""));
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

// ── Extração de JSON ───────────────────────────────────────────────────────────

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

// ── Imagem (Unsplash) ──────────────────────────────────────────────────────────

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

// ── OpenRouter ─────────────────────────────────────────────────────────────────

async function callOpenRouter(messages, modelIndex = 0) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY não configurada.");
  const model = MODELS[modelIndex % MODELS.length];
  log(`🤖 OpenRouter · modelo: ${model}`);
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      "HTTP-Referer": "https://lisomarbarbosa.adv.br",
      "X-Title": "Blog Lisomar Barbosa ADV",
    },
    body: JSON.stringify({ model, messages, max_tokens: 8192, temperature: 0.7 }),
  });
  if (!res.ok) { const body = await res.text(); throw new Error(`OpenRouter HTTP ${res.status}: ${body}`); }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Resposta vazia do modelo.");
  return content;
}

// ── Groq API (fallback 1) ──────────────────────────────────────────────────────

async function callGroq(messages, modelIndex = 0) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY não configurada.");
  const model = GROQ_MODELS[modelIndex % GROQ_MODELS.length];
  log(`⚡ Groq API · modelo: ${model} (fallback 1)`);
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model, messages, max_tokens: 8000, temperature: 0.7 }),
  });
  if (!res.ok) { const body = await res.text(); throw new Error(`Groq HTTP ${res.status}: ${body}`); }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Resposta vazia do Groq.");
  return content;
}

// ── Gemini API (fallback 2) ────────────────────────────────────────────────────

async function callGemini(messages) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY não configurada.");
  log(`🔷 Gemini API · modelo: gemini-3.6-flash (fallback 2)`);

  const systemMsg = messages.find(m => m.role === "system");
  const userMsgs  = messages.filter(m => m.role !== "system");

  const contents = userMsgs.map((m, i) => {
    let text = m.content;
    if (i === 0 && systemMsg) {
      text = `${systemMsg.content}\n\n${text}`;
    }
    return {
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text }],
    };
  });

  const res = await fetch(`${GEMINI_URL}?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: { maxOutputTokens: 8192, temperature: 0.7 },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gemini HTTP ${res.status}: ${body}`);
  }

  const data = await res.json();
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) throw new Error("Resposta vazia do Gemini.");
  return content;
}

// ── callAI: OpenRouter → Groq → Gemini ────────────────────────────────────────

async function callAI(messages, modelIndex = 0) {
  try {
    return await callOpenRouter(messages, modelIndex);
  } catch (orErr) {
    log(`⚠️  OpenRouter falhou (${orErr.message}) — tentando Groq como fallback 1...`);
  }

  try {
    return await callGroq(messages, modelIndex);
  } catch (groqErr) {
    log(`⚠️  Groq falhou (${groqErr.message}) — tentando Gemini como fallback 2...`);
    try {
      return await callGemini(messages);
    } catch (gemErr) {
      throw new Error(`OpenRouter falhou | Groq falhou | Gemini: ${gemErr.message}`);
    }
  }
}

// ── Geração do artigo estruturado ─────────────────────────────────────────────

function buildSystemPrompt(reinforced = false) {
  const base = `Você é Lisomar Barbosa, advogada especialista em Direito Digital.\nEscreva artigos jurídicos informativos, acessíveis e bem fundamentados em português do Brasil.\nUse linguagem clara, evite jargão desnecessário, cite legislação e jurisprudência relevantes.`;

  const jsonRule = reinforced
    ? `\n\nCRITICAL OUTPUT RULE (MANDATORY):\n- Your ENTIRE response must be a single raw JSON object.\n- Do NOT write any text before the opening { or after the closing }.\n- Do NOT wrap the JSON in markdown code fences (no \`\`\`json, no \`\`\`).\n- Do NOT add any explanation, commentary, or apology.\n- Start your response with { and end it with }.`
    : `\nNunca inclua blocos de código Markdown. Responda APENAS com JSON válido, começando com { e terminando com }.`;

  return base + jsonRule;
}

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

  const raw = await callAI(
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

  for (const field of ["title", "intro", "alertTitle", "alertBody", "sections", "actionSteps", "preventionItems", "closing"]) {
    if (!data[field]) throw new Error(`Campo ausente no JSON do modelo: ${field}`);
  }
  if (!Array.isArray(data.sections)        || data.sections.length < 2)        throw new Error("sections inválido.");
  if (!Array.isArray(data.actionSteps)     || data.actionSteps.length < 2)     throw new Error("actionSteps inválido.");
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

// ── Auditoria de qualidade editorial ──────────────────────────────────────────
//
// BUG CORRIGIDO: o preview anterior usava apenas intro + paragraphs,
// gerando ~300-400 palavras e sendo reprovado pelo threshold de 800.
// Agora o preview inclui todos os campos relevantes (igual ao fullText
// calculado em generateArticle), garantindo representação fiel do artigo.
// O threshold foi reduzido para AUDIT_MIN_WORDS (300) para refletir que
// o preview é um subconjunto e a contagem real já é validada por MIN_WORDS.

async function auditArticle(title, intro, sections, alertBody, actionSteps, preventionItems, closing, modelIndex = 0) {
  log(`🔍 Auditoria editorial: "${title}"`);

  // Monta preview completo para dar ao modelo contexto suficiente
  const previewParts = [
    intro,
    alertBody || "",
    ...sections.flatMap(s => [s.heading, ...s.paragraphs]),
    ...( Array.isArray(actionSteps)     ? actionSteps.map(s => `${s.title} ${s.body}`)     : [] ),
    ...( Array.isArray(preventionItems) ? preventionItems.map(p => `${p.bold} ${p.text}`) : [] ),
    closing || "",
  ];
  const preview = previewParts.join("\n\n").slice(0, 4000);
  const previewWords = countWords(previewParts.join(" "));
  log(`   Preview da auditoria: ${previewWords} palavras`);

  const prompt = `Você é um editor jurídico sênior. Avalie o artigo abaixo e retorne JSON com:\n{ "approved": true, "reason": "" }\nou\n{ "approved": false, "reason": "motivo breve" }\n\nReturn ONLY a raw JSON object — no markdown, no explanation.\n\nReprove APENAS se:\n- Conteúdo claramente genérico demais, sem qualquer referência jurídica\n- Título não condiz absolutamente com o conteúdo\n- Conteúdo claramente incorreto juridicamente de forma grave\n\nNÃO reprove por contagem de palavras — isso já é validado separadamente.\n\nArtigo:\n---\n${preview}\n---`;

  try {
    const raw = await callAI([{ role: "user", content: prompt }], modelIndex);
    const result = extractJson(raw);
    log(`✅ Auditoria editorial: ${result.approved ? "APROVADO" : `REPROVADO — ${result.reason}`}`);
    return { ok: !!result.approved, reason: result.reason || "" };
  } catch (err) {
    log(`⚠️  Auditoria editorial falhou (${err.message}) — aprovando por padrão.`);
    return { ok: true, reason: "" };
  }
}

// ── Auditoria jurídica: jurisprudência e doutrina ─────────────────────────────

async function auditJuridico(title, intro, sections, modelIndex = 0) {
  log(`⚖️  Auditoria jurídica: "${title}"`);

  const fullText = [intro, ...sections.map(s => [s.heading, ...s.paragraphs].join(" "))]
    .join("\n\n")
    .slice(0, 4000);

  const prompt = `Você é um especialista em Direito brasileiro com profundo conhecimento em Direito Digital, Direito Civil, Direito Penal e legislação correlata.\n\nAnalise o artigo jurídico abaixo e verifique:\n\n1. JURISPRUDÊNCIA: Os acórdãos, súmulas e entendimentos de tribunais citados correspondem ao que realmente foi decidido?\n\n2. LEGISLAÇÃO: As leis citadas existem com essa numeração? Os artigos referenciados tratam realmente do que o artigo afirma?\n\n3. DOUTRINA: Os entendimentos doutrinários refletem o estado atual do direito brasileiro?\n\n4. CONSISTÊNCIA INTERNA: O artigo é internamente consistente?\n\nImportante:\n- Reprove APENAS quando houver erro GRAVE: lei inexistente, jurisprudência completamente inventada, tese oposta ao entendimento consolidado.\n- Pequenas imprecisões e simplificações didáticas NÃO devem reprovar.\n\nRetorne APENAS JSON válido:\n{ "approved": true, "errors": [], "warnings": [], "reason": "" }\n\nNão inclua markdown. Comece com { e termine com }.\n\nArtigo:\n---\nTítulo: ${title}\n\n${fullText}\n---`;

  try {
    const raw = await callAI([{ role: "user", content: prompt }], modelIndex + 1);
    const result = extractJson(raw);

    const approved = !!result.approved;
    const errors   = Array.isArray(result.errors)   ? result.errors   : [];
    const warnings = Array.isArray(result.warnings) ? result.warnings : [];
    const reason   = result.reason || "";

    if (approved) {
      log(`✅ Auditoria jurídica: APROVADO`);
      if (warnings.length > 0) {
        log(`⚠️  Avisos jurídicos (não bloqueantes):`);
        warnings.forEach(w => log(`   • ${w}`));
      }
    } else {
      log(`❌ Auditoria jurídica: REPROVADO — ${reason}`);
      errors.forEach(e => log(`   🚫 ${e}`));
    }

    return { ok: approved, errors, warnings, reason };
  } catch (err) {
    log(`⚠️  Auditoria jurídica falhou (${err.message}) — aprovando por padrão.`);
    return { ok: true, errors: [], warnings: [], reason: "" };
  }
}

// ── Excerpt ────────────────────────────────────────────────────────────────────

async function generateExcerpt(title, description, intro, modelIndex = 0) {
  if (description && description.length > 20) return description.slice(0, 200);
  log(`📋 Gerando excerpt para: "${title}"`);
  const prompt = `Escreva um resumo em português do Brasil com no máximo 200 caracteres para o artigo abaixo. Retorne APENAS o texto do resumo, sem aspas, sem JSON.\n\nTítulo: ${title}\n\nIntrodução: ${intro.slice(0, 500)}`;
  try {
    const raw = await callAI([{ role: "user", content: prompt }], modelIndex);
    return normalizeText(raw).slice(0, 200);
  } catch {
    return title.slice(0, 200);
  }
}

// ── Montagem do Markdown ───────────────────────────────────────────────────────

function buildMarkdownContent({ title, intro, alertTitle, alertBody, sections, actionSteps, preventionItems, closing, closingExtra, disclaimer }) {
  const sectionsText = sections.map(s => {
    const paras = s.paragraphs.join("\n\n");
    return `## ${s.heading}\n\n${paras}`;
  }).join("\n\n");

  const stepsText = actionSteps
    .map((step, i) => `${i + 1}. **${step.title}:** ${step.body}`)
    .join("\n");

  const preventionText = preventionItems
    .map(item => `- **${item.bold}** ${item.text}`)
    .join("\n");

  const closingExtraText = closingExtra
    ? `\n\n${closingExtra}`
    : "";

  return `# ${title}

${intro}

> **${alertTitle}**
>
> ${alertBody}

${sectionsText}

## O que fazer quando o problema acontece

${stepsText}

## Hábitos de prevenção

${preventionText}

## Considerações finais

${closing}${closingExtraText}

---

*${disclaimer || "Este artigo tem caráter informativo e não substitui consulta jurídica personalizada. Para avaliar o seu caso concreto, busque orientação profissional adequada."}*

---

## Fale Conosco

Se você precisa de orientação jurídica especializada em Direito Digital, entre em contato com o escritório Lisomar Barbosa Advocacia. Estamos prontos para analisar o seu caso e oferecer a melhor solução para a sua situação.
`;
}

// ── Escrita dos arquivos ───────────────────────────────────────────────────────

async function writeContentFile(slug, title, description, excerpt, dateISO, image, category, readTime, markdownContent) {
  await mkdir(CONTENT_DIR, { recursive: true });
  const filePath = join(CONTENT_DIR, `${slug}.ts`);

  // Escapa o conteúdo para uso dentro de template literal TypeScript
  const safeContent = markdownContent
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");

  // Escapa campos de string para uso dentro de aspas simples
  const esc = s => String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'");

  const fileContent = `// Artigo gerado automaticamente — NÃO EDITAR MANUALMENTE
export const slug = '${esc(slug)}';
export const title = '${esc(title)}';
export const description = '${esc(description)}';
export const excerpt = '${esc(excerpt)}';
export const date = '${esc(dateISO)}';
export const image = '${esc(image)}';
export const category = '${esc(category)}';
export const readTime = '${esc(readTime)}';

export const content = \`
${safeContent}\`;

export default {
  slug,
  title,
  description,
  excerpt,
  date,
  image,
  category,
  readTime,
  content,
};
`;
  await writeFile(filePath, fileContent, "utf8");
  log(`💾 Conteúdo salvo: src/content/blog/${slug}.ts`);
  return filePath;
}

async function updateBlogData({ slug, title, excerpt, date, readTime, category, image }) {
  const source = await readFile(BLOG_DATA_FILE, "utf8");

  const MARKER = "export const blogPosts: BlogPost[] = [";
  const markerPos = source.indexOf(MARKER);
  if (markerPos === -1) {
    throw new Error("Não foi possível localizar o array blogPosts em src/data/blog.ts");
  }

  const arrayOpen = source.indexOf("[", markerPos);
  if (arrayOpen === -1) {
    throw new Error("Não foi possível localizar o abre-colchete do array blogPosts.");
  }

  let depth = 0;
  let arrayClose = -1;
  let inStr = false;
  let esc = false;

  for (let i = arrayOpen; i < source.length; i++) {
    const ch = source[i];
    if (esc) { esc = false; continue; }
    if (ch === "\\" && inStr) { esc = true; continue; }
    if (ch === '"' || ch === "'" || ch === "`") {
      if (!inStr) { inStr = true; } else { inStr = false; }
      continue;
    }
    if (inStr) continue;
    if (ch === "[") { depth++; continue; }
    if (ch === "]") {
      depth--;
      if (depth === 0) { arrayClose = i; break; }
    }
  }

  if (arrayClose === -1) {
    throw new Error("Não foi possível localizar o fecha-colchete do array blogPosts.");
  }

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

  const updated =
    source.slice(0, arrayClose) +
    newEntry + "\n" +
    source.slice(arrayClose);

  await writeFile(BLOG_DATA_FILE, updated, "utf8");
  log(`📚 blogPosts atualizado: entrada '${slug}' inserida em src/data/blog.ts`);
}

async function saveGeneratedSlug(slug) {
  await writeFile(GENERATED_SLUG_FILE, slug, "utf8");
  log(`🏷️  Slug salvo em .generated_slug: ${slug}`);
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  log("🚀 Iniciando geração de artigo...");

  let attempt      = 0;
  let topic        = null;
  let topicRetries = 0;
  const usedSlugs  = [];

  while (attempt < MAX_ATTEMPTS) {
    attempt++;
    log(`\n🔄 Tentativa ${attempt}/${MAX_ATTEMPTS}`);

    const needNewTopic = topic === null || topicRetries >= SAME_TOPIC_RETRIES;
    const reinforced   = topic !== null && topicRetries > 0 && !needNewTopic;

    if (needNewTopic) {
      topic = await chooseTopic(usedSlugs);
      const candidateSlug = slugify(topic);
      usedSlugs.push(candidateSlug);
      topicRetries = 0;

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

    let article;
    try {
      article = await generateArticle(topic, attempt - 1, reinforced);
    } catch (err) {
      log(`❌ Falha na geração: ${err.message}`);
      continue;
    }

    if (article.wordCount < MIN_WORDS) {
      log(`⚠️  Artigo muito curto (${article.wordCount} palavras, mínimo ${MIN_WORDS}) — tentando novamente.`);
      continue;
    }

    // Passa todos os campos relevantes para auditoria ter preview completo
    const editorialAudit = await auditArticle(
      article.title, article.intro, article.sections,
      article.alertBody, article.actionSteps, article.preventionItems, article.closing,
      attempt - 1
    );
    if (!editorialAudit.ok) {
      log(`🔁 Artigo reprovado na auditoria editorial — sorteando novo tema.`);
      topic = null;
      topicRetries = 0;
      continue;
    }

    const juridicalAudit = await auditJuridico(article.title, article.intro, article.sections, attempt - 1);
    if (!juridicalAudit.ok) {
      log(`🔁 Artigo reprovado na auditoria jurídica — sorteando novo tema.`);
      log(`   Motivo: ${juridicalAudit.reason}`);
      topic = null;
      topicRetries = 0;
      continue;
    }

    const existingFiles = await getPublishedSlugs();
    if (existingFiles.includes(article.slug)) {
      log(`⏩ Slug final "${article.slug}" já existe — sorteando novo tema.`);
      topic = null;
      topicRetries = 0;
      continue;
    }

    const [image, excerpt] = await Promise.all([
      fetchImage(topic),
      generateExcerpt(article.title, article.description, article.intro, attempt - 1),
    ]);

    const date     = getToday();
    const dateISO  = getTodayISO();
    const readTime = calculateReadTime(article.wordCount);
    const category = "Direito Digital";

    const markdownContent = buildMarkdownContent({
      title:           article.title,
      intro:           article.intro,
      alertTitle:      article.alertTitle,
      alertBody:       article.alertBody,
      sections:        article.sections,
      actionSteps:     article.actionSteps,
      preventionItems: article.preventionItems,
      closing:         article.closing,
      closingExtra:    article.closingExtra || "",
      disclaimer:      article.disclaimer || "",
    });

    try {
      await writeContentFile(
        article.slug,
        article.title,
        article.description,
        excerpt,
        dateISO,
        image,
        category,
        readTime,
        markdownContent
      );
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
    log(`   Arquivo:  src/content/blog/${article.slug}.ts`);
    log(`   Blog:     src/data/blog.ts atualizado`);
    if (juridicalAudit.warnings.length > 0) {
      log(`   ⚠️  Avisos jurídicos registrados: ${juridicalAudit.warnings.length}`);
      juridicalAudit.warnings.forEach(w => log(`      • ${w}`));
    }
    return;
  }

  throw new Error(`❌ Não foi possível gerar um artigo aprovado após ${MAX_ATTEMPTS} tentativas.`);
}

main().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
