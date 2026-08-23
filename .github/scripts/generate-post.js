import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = process.cwd();

const BLOG_FILE    = join(ROOT, "src/data/blog.ts");
const SITEMAP_FILE = join(ROOT, "public/sitemap.xml");
const APP_FILE     = join(ROOT, "src/App.tsx");
const ARTICLES_DIR = join(ROOT, "src/pages/articles");
const GENERATED_SLUG_FILE = join(ROOT, ".generated_slug");

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const UNSPLASH_URL   = "https://api.unsplash.com/photos/random";

/**
 * Número máximo de tentativas do loop curadoria → geração → auditoria.
 */
const MAX_ATTEMPTS = 10;

const MODELS = [
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
  "openai/gpt-oss-120b:free",
  "openai/gpt-oss-20b:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "poolside/laguna-s-2.1:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
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

/**
 * Converte slug "meu-artigo-incrivel" → "MeuArtigoIncrivel"
 * para uso como nome do componente React.
 */
function slugToComponentName(slug) {
  return slug
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
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

/**
 * Retorna o número de dias completos desde 2024-01-01 (época fixa).
 * Garante progressão contínua entre meses e anos, sem repetir o mesmo
 * índice no mesmo dia de meses diferentes.
 */
function absoluteDayIndex() {
  const EPOCH = Date.UTC(2024, 0, 1); // 2024-01-01
  const now   = Date.now();
  return Math.floor((now - EPOCH) / 86_400_000);
}

/**
 * Escolhe o tema do artigo de forma determinística mas única por execução.
 *
 * - Slot 1: índice = dias absolutos desde 2024-01-01
 * - Slot 2: índice = dias absolutos + metade do array (garante tema diferente do slot 1)
 * - CUSTOM_TOPIC: sempre tem precedência
 *
 * O índice é baseado em dias absolutos (não apenas getUTCDate), então o tema
 * avança a cada dia e nunca repete no mesmo dia de meses/anos diferentes.
 */
function chooseTopic(slot = 1) {
  if (process.env.CUSTOM_TOPIC && process.env.CUSTOM_TOPIC.trim()) {
    return process.env.CUSTOM_TOPIC.trim();
  }
  const base   = absoluteDayIndex();
  const half   = Math.floor(TOPICS.length / 2);
  const offset = slot === 2 ? half : 0;
  return TOPICS[(base + offset) % TOPICS.length];
}

function cleanMarkdown(text) {
  let value = normalizeText(text);
  value = value
    .replace(/^```(?:markdown|md)?/i, "")
    .replace(/```$/i, "")
    .trim();
  return value;
}

// ─── Extração de JSON ─────────────────────────────────────────────────────────

function extractJson(text) {
  const cleaned = normalizeText(text);
  try { return JSON.parse(cleaned); } catch (_) {}
  const fenced = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) {
    try { return JSON.parse(fenced[1].trim()); } catch (_) {}
  }
  const balanced = extractBalancedJson(cleaned);
  if (balanced !== null) {
    try { return JSON.parse(balanced); } catch (_) {}
    try {
      const sanitized = sanitizeContentField(balanced);
      return JSON.parse(sanitized);
    } catch (_) {}
  }
  try { return reconstructJsonWithContent(cleaned); } catch (_) {}
  throw new Error("A IA não retornou um JSON válido.");
}

function extractBalancedJson(text) {
  const start = text.indexOf("{");
  if (start === -1) return null;
  let depth = 0, inString = false, escape = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}") { depth--; if (depth === 0) return text.slice(start, i + 1); }
  }
  return null;
}

function sanitizeContentField(jsonStr) {
  const contentKeyMatch = jsonStr.match(/"content"\s*:\s*"/);
  if (!contentKeyMatch) return jsonStr;
  const valueStart = jsonStr.indexOf(contentKeyMatch[0]) + contentKeyMatch[0].length;
  let i = valueStart, escape = false;
  while (i < jsonStr.length) {
    const ch = jsonStr[i];
    if (escape) { escape = false; i++; continue; }
    if (ch === "\\") { escape = true; i++; continue; }
    if (ch === '"') break;
    i++;
  }
  const rawValue = jsonStr.slice(valueStart, i);
  const safeValue = rawValue
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
  return jsonStr.slice(0, valueStart) + safeValue + jsonStr.slice(i);
}

function reconstructJsonWithContent(text) {
  let src = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  const fields = ["title", "excerpt", "slug", "category", "content",
                  "status", "issues", "verified_claims", "unverified_claims",
                  "topic", "legal_basis", "jurisprudence", "consumer_law",
                  "civil_law", "criminal_law", "digital_law",
                  "constitutional_basis", "unverified_information", "warnings"];
  const result = {};
  for (const field of fields) {
    const strMatch = src.match(
      new RegExp(`"${field}"\\s*:\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)"`, "s")
    );
    if (strMatch) {
      try { result[field] = JSON.parse(`"${strMatch[1]}"`); } catch (_) { result[field] = strMatch[1]; }
      continue;
    }
    const arrObjMatch = src.match(new RegExp(`"${field}"\\s*:\\s*([\\[{])`));
    if (arrObjMatch) {
      const opener = arrObjMatch[1];
      const closer = opener === "[" ? "]" : "}";
      const startIdx = src.indexOf(arrObjMatch[0]) + arrObjMatch[0].length - 1;
      const extracted = extractBalancedBracket(src, startIdx, opener, closer);
      if (extracted !== null) {
        try { result[field] = JSON.parse(extracted); } catch (_) { result[field] = []; }
      }
      continue;
    }
  }
  if (Object.keys(result).length === 0) throw new Error("Nenhum campo identificado na reconstrução.");
  return result;
}

function extractBalancedBracket(text, startIdx, opener, closer) {
  let depth = 0, inString = false, escape = false;
  for (let i = startIdx; i < text.length; i++) {
    const ch = text[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === opener) depth++;
    else if (ch === closer) { depth--; if (depth === 0) return text.slice(startIdx, i + 1); }
  }
  return null;
}

// ─── API OpenRouter ───────────────────────────────────────────────────────────

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
    if (!response.ok) { log(`⚠️ Não foi possível listar modelos: HTTP ${response.status}`); return; }
    const data = await response.json();
    const available  = (data.data || []).map(m => m.id);
    const configured = MODELS.filter(m => available.includes(m));
    const missing    = MODELS.filter(m => !available.includes(m));
    if (configured.length > 0) log(`✅ Modelos disponíveis: ${configured.join(", ")}`);
    if (missing.length > 0)    log(`⚠️ Modelos INDISPONÍVEIS (serão pulados): ${missing.join(", ")}`);
    return configured;
  } catch (err) {
    log(`⚠️ Erro ao verificar modelos: ${err.message}`);
  }
}

async function callModel(messages, model, temperature = 0.2) {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://www.lisomarbarbosa.adv.br",
      "X-Title": "Lisomar Barbosa Advogados - Direito Digital"
    },
    body: JSON.stringify({ model, temperature, messages })
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter HTTP ${response.status}: ${errorText}`);
  }
  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenRouter não retornou conteúdo.");
  return content;
}

async function callOpenRouter(messages, temperature = 0.2) {
  const chain = [...MODELS];
  if (process.env.CUSTOM_MODEL) {
    const customModel = process.env.CUSTOM_MODEL.trim();
    log(`🤖 Modelo customizado: ${customModel} (com fallback automático)`);
    if (!chain.includes(customModel)) chain.unshift(customModel);
    else { const idx = chain.indexOf(customModel); chain.splice(idx, 1); chain.unshift(customModel); }
  }
  let lastError;
  for (let i = 0; i < chain.length; i++) {
    const model = chain[i];
    try {
      log(`🤖 [${i + 1}/${chain.length}] Tentando: ${model}`);
      const result = await callModel(messages, model, temperature);
      log(`✅ Sucesso: ${model}`);
      return result;
    } catch (error) {
      log(`⚠️ ${model} falhou: ${error.message.slice(0, 120)}`);
      lastError = error;
    }
  }
  throw new Error(`Todos os ${chain.length} modelos falharam. Último erro: ${lastError?.message}`);
}

// ─── Pesquisa / Curadoria ─────────────────────────────────────────────────────

async function fetchUrl(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; LisomarBarbosaLegalResearchBot/1.0)" }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} ao acessar ${url}`);
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
      .replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"').replace(/&#39;/gi, "'")
      .replace(/\s+/g, " ")
  );
}

async function searchJusbrasil(topic) {
  log("🔎 Pesquisando Jusbrasil...");
  const query = encodeURIComponent(topic);
  const url = `https://www.jusbrasil.com.br/busca?q=${query}`;
  try {
    const html = await fetchUrl(url);
    const text = stripHtml(html);
    return { source: "Jusbrasil", url, content: text.slice(0, 30000) };
  } catch (error) {
    log(`⚠️ Não foi possível consultar diretamente o Jusbrasil: ${error.message}`);
    return {
      source: "Jusbrasil", url,
      content: "Consulta ao Jusbrasil falhou. NÃO presumir resultados, jurisprudência ou decisões."
    };
  }
}

function buildLegalResearchInstructions(topic) {
  return `
Você está realizando uma CURADORIA JURÍDICA MÍNIMA para subsidiar a produção de um
artigo editorial do escritório Lisomar Barbosa Advogados.

TEMA: ${topic}

OBJETIVO DA CURADORIA:
Identificar apenas os dispositivos legais CENTRAIS e indiscutíveis do tema.
Não é necessário listar muitos artigos — prefira qualidade e certeza a quantidade.
A jurisprudência é OPCIONAL: inclua somente se houver decisão clara e verificável.
O foco do artigo final será na produção textual, não na listagem de normas.

FONTES PRIORITÁRIAS (apenas o essencial):
1. Constituição Federal do Brasil — somente se diretamente aplicável.
2. Legislação brasileira central do tema (1 a 3 leis no máximo).
3. Código Civil, Penal ou CDC — somente os artigos diretamente relevantes.
4. Marco Civil da Internet / LGPD — se o tema envolver ambiente digital.

REGRAS ABSOLUTAS — PROIBIDO:
- Inventar lei, artigo, inciso ou parágrafo.
- Inventar número de processo judicial.
- Inventar tribunal, magistrado, relator ou ementa.
- Atribuir decisão a tribunal sem fonte verificável.
- Transformar hipótese em fato jurídico.
- Tratar interpretação doutrinária como texto legal.
- Criar jurisprudência para tornar o artigo mais convincente.

Se uma informação não puder ser confirmada, marque como:
"INFORMAÇÃO NÃO CONFIRMADA - NÃO PUBLICAR".
`;
}

async function createResearch(topic) {
  const jusbrasil = await searchJusbrasil(topic);
  const system = `
Você é um pesquisador jurídico criterioso e conservador.
Sua função é fazer uma curadoria MÍNIMA e FACTUAL antes da produção de um artigo sobre Direito Digital.
Você NÃO deve escrever o artigo — apenas separar os dispositivos legais centrais e verificáveis.
Não invente absolutamente nenhuma informação.
A jurisprudência é opcional — só inclua se houver decisão clara e verificável no material fornecido.
Quando houver dúvida, marque como não confirmado ou omita.
${buildLegalResearchInstructions(topic)}
`;
  const user = `
Realize a curadoria preliminar MÍNIMA sobre:
${topic}

Material obtido do Jusbrasil:
FONTE: ${jusbrasil.url}
CONTEÚDO: ${jusbrasil.content}

Retorne exclusivamente JSON válido com apenas o essencial verificável:
{
  "topic": "...",
  "legal_basis": [{"name":"...","reference":"...","explanation":"...","source":"..."}],
  "jurisprudence": [],
  "consumer_law": [],
  "civil_law": [],
  "criminal_law": [],
  "digital_law": [],
  "constitutional_basis": [],
  "unverified_information": [],
  "warnings": []
}
IMPORTANTE: Prefira "legal_basis" com 2 a 4 itens sólidos. "jurisprudence" deve permanecer [] salvo decisão verificável no material fornecido.
`;
  return extractJson(
    await callOpenRouter([{ role: "system", content: system }, { role: "user", content: user }], 0.1)
  );
}

// ─── Geração do artigo ────────────────────────────────────────────────────────

function buildArticleSystemPrompt() {
  return `
Você é o redator principal do escritório Lisomar Barbosa Advogados, especializado em Direito Digital.
SITE: https://www.lisomarbarbosa.adv.br

Seu objetivo é produzir um artigo jurídico de alta qualidade textual — bem escrito, fluido,
acessível ao público leigo sem perder o rigor jurídico.

PRIORIDADE MÁXIMA: QUALIDADE DA ESCRITA.
O artigo deve ter introdução envolvente, desenvolvimento claro com raciocínio bem construído,
exemplos práticos do cotidiano digital, linguagem acessível e conclusão orientadora.
Evite listas longas de artigos de lei. Prefira explicar o direito em forma de texto corrido.
Use no máximo 3 referências legais ao longo do artigo — cite-as naturalmente no texto, sem
transformar o artigo em um catálogo de normas.
Não mencione jurisprudência, a menos que já conste da curadoria fornecida.

REGRA MAIS IMPORTANTE: NÃO INVENTAR.
Não invente leis, artigos, incisos, jurisprudência, números de processos, decisões,
tribunais, nomes de magistrados, datas de julgamentos, súmulas, precedentes,
obrigações não previstas em lei, direitos juridicamente insustentáveis.

ESTRUTURA ESPERADA DO ARTIGO:
1. Introdução — contextualiza o tema com situação do cotidiano digital do leitor.
2. O que diz o direito — explica em texto corrido o enquadramento jurídico central (sem listar artigos em sequência).
3. Desenvolvimento — aprofunda com subseções temáticas, exemplos práticos, distinções importantes.
4. O que o leitor pode fazer — orientações práticas e preventivas.
5. Conclusão — encerra com reflexão e convite à consulta profissional.

REGRA DE FORMATAÇÃO CRÍTICA:
O campo "content" deve conter APENAS texto Markdown simples.
NÃO use blocos de código (sem \`\`\` em nenhum momento dentro do content).
NÃO use aspas duplas literais dentro do content sem escapá-las com \\.
Use apenas # ## ### para títulos, * para itálico, ** para negrito, - para listas.
`;
}

function buildArticleUserPrompt(topic, research) {
  return `
Escreva um artigo completo e bem redigido para o blog:
https://www.lisomarbarbosa.adv.br

TEMA: ${topic}

DIRETRIZES DE ESCRITA:
- Foque na QUALIDADE TEXTUAL: texto fluido, bem articulado, envolvente.
- Explique o direito em prosa — evite enumerar artigos de lei em sequência.
- Use exemplos práticos e situações do cotidiano digital para ilustrar os conceitos.
- Escreva para o público leigo: quem lê é a pessoa que sofreu ou teme sofrer o problema, não um jurista.
- Mencione no máximo 2 ou 3 dispositivos legais ao longo de todo o artigo, sempre em contexto.
- Não inclua listas de jurisprudência. Se a curadoria trouxer alguma decisão verificável, mencione-a
  de forma integrada ao texto, não em tópico separado.
- O artigo precisa ter NO MÍNIMO ${MIN_WORDS} palavras — alcance isso com profundidade textual, não com listas.

Retorne exclusivamente JSON válido:
{
  "title": "...",
  "excerpt": "...",
  "slug": "...",
  "category": "Direito Digital",
  "content": "..."
}

REGRAS DO CAMPO content:
- Markdown puro, SEM blocos de código (sem \`\`\`).
- Newlines como \\n dentro da string JSON.
- Aspas duplas escapadas como \\".
- NÃO inclua o JSON dentro de bloco de código.

BASE DA CURADORIA JURÍDICA (use como referência mínima, não como roteiro):
${JSON.stringify(research, null, 2)}
`;
}

async function generateArticle(topic, research) {
  log("🤖 Gerando artigo jurídico...");
  return extractJson(
    await callOpenRouter(
      [{ role: "system", content: buildArticleSystemPrompt() }, { role: "user", content: buildArticleUserPrompt(topic, research) }],
      0.45
    )
  );
}

async function expandArticle(article, research) {
  log("🤖 Artigo abaixo do mínimo — solicitando expansão...");
  const prompt = `
O artigo abaixo possui menos de ${MIN_WORDS} palavras.
Amplie-o com mais profundidade textual: desenvolva melhor os argumentos, adicione
exemplos práticos do cotidiano digital, explore nuances e situações concretas.
Não inclua novas leis ou jurisprudência além das já presentes.
Não invente novas leis, decisões ou processos.
A expansão deve enriquecer a narrativa e a clareza, não aumentar listas de normas.

Base de pesquisa (apenas referência):
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
REGRAS DO CAMPO content:
- Markdown puro, SEM blocos de código (sem \`\`\`).
- Newlines como \\n.
- Aspas duplas escapadas como \\".
`;
  return extractJson(
    await callOpenRouter(
      [{ role: "system", content: buildArticleSystemPrompt() }, { role: "user", content: prompt }],
      0.35
    )
  );
}

// ─── Auditoria jurídica ───────────────────────────────────────────────────────

async function auditArticle(article, research) {
  log("⚖️ Iniciando auditoria jurídica independente...");
  const prompt = `
Você é o revisor jurídico responsável por impedir a publicação de informações jurídicas falsas.

Analise o artigo abaixo com máximo rigor.

ARTIGO:
${JSON.stringify(article, null, 2)}

PESQUISA DE BASE:
${JSON.stringify(research, null, 2)}

CRITÉRIOS DE REPROVAÇÃO (status: "FAIL"):
- Qualquer lei, artigo ou inciso inventado ou não verificável.
- Qualquer número de processo judicial inventado.
- Qualquer decisão atribuída a tribunal sem fonte verificável.
- Qualquer afirmação categórica sobre resultado judicial ("sempre gera indenização", etc.).
- Qualquer informação que contradiga a base de pesquisa fornecida.
- Qualquer jurisprudência que não possa ser verificada.

OBSERVAÇÃO: É ESPERADO que o artigo cite poucas leis e pouca jurisprudência.
Isso NÃO é motivo de reprovação — é o estilo editorial adotado.
Aprove artigos que sejam factualmente corretos mesmo que sejam mais textuais e menos técnico-legais.

Retorne exclusivamente JSON:
{
  "status": "PASS" ou "FAIL",
  "issues": [{"severity": "critical", "text": "...", "location": "..."}],
  "verified_claims": [],
  "unverified_claims": []
}
`;
  return extractJson(
    await callOpenRouter(
      [{ role: "system", content: "Você é um auditor jurídico criterioso. Reprove apenas o que for factualmente incorreto. Artigos com poucas citações legais são aceitáveis se o conteúdo for correto." }, { role: "user", content: prompt }],
      0.05
    )
  );
}

// ─── Verificação de links ─────────────────────────────────────────────────────

async function verifyLinks(content) {
  const urls = content.match(/https?:\/\/[^\s)"'>]+/g) || [];
  const uniqueUrls = [...new Set(urls)];
  if (!uniqueUrls.length) return [];
  log(`🔗 Verificando ${uniqueUrls.length} link(s)...`);
  const results = [];
  for (const url of uniqueUrls) {
    try {
      const response = await fetch(url, {
        method: "HEAD", redirect: "follow",
        headers: { "User-Agent": "Mozilla/5.0 LisomarBarbosaLegalBot" }
      });
      results.push({ url, status: response.status, ok: response.ok });
    } catch (error) {
      results.push({ url, status: null, ok: false, error: error.message });
    }
  }
  return results;
}

// ─── Validação estrutural ─────────────────────────────────────────────────────

function validateArticleStructure(article) {
  if (!article || typeof article !== "object") throw new Error("Objeto de artigo inválido.");
  const required = ["title", "excerpt", "slug", "category", "content"];
  for (const field of required) {
    if (!article[field] || typeof article[field] !== "string")
      throw new Error(`Campo obrigatório ausente ou inválido: ${field}`);
  }
  const words = countWords(article.content);
  if (words < MIN_WORDS)
    throw new Error(`Artigo possui apenas ${words} palavras. Mínimo: ${MIN_WORDS}.`);
  if (!/^Direito Digital$/i.test(article.category)) article.category = "Direito Digital";
  return words;
}

// ─── Gerador de arquivo .tsx ──────────────────────────────────────────────────

/**
 * Converte o conteúdo Markdown do artigo em JSX inline (parágrafo por parágrafo)
 * para ser embutido diretamente no componente React — sem necessidade de biblioteca
 * de parsing de Markdown em runtime.
 */
function markdownToJsx(markdown) {
  const lines = markdown.split(/\n/).map(l => l.trimEnd());
  const jsxLines = [];
  let listOpen = false;

  const escapeJsx = str =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\{/g, "&#123;")
      .replace(/\}/g, "&#125;")
      .replace(/"/g, "&quot;");

  const inlineFormat = str => {
    let s = escapeJsx(str);
    // **bold**
    s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // *italic*
    s = s.replace(/\*(.+?)\*/g, "<em>$1</em>");
    // `code`
    s = s.replace(/`(.+?)`/g, "<code>$1</code>");
    return s;
  };

  for (const line of lines) {
    if (line === "") {
      if (listOpen) { jsxLines.push("</ul>"); listOpen = false; }
      continue;
    }

    // Headings
    const h3 = line.match(/^### (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h1 = line.match(/^# (.+)/);

    if (h1) {
      if (listOpen) { jsxLines.push("</ul>"); listOpen = false; }
      jsxLines.push(`<h2 className="text-3xl font-bold mt-12 mb-6">${inlineFormat(h1[1])}</h2>`);
      continue;
    }
    if (h2) {
      if (listOpen) { jsxLines.push("</ul>"); listOpen = false; }
      jsxLines.push(`<h2 className="text-3xl font-bold mt-12 mb-6">${inlineFormat(h2[1])}</h2>`);
      continue;
    }
    if (h3) {
      if (listOpen) { jsxLines.push("</ul>"); listOpen = false; }
      jsxLines.push(`<h3 className="text-xl font-bold mt-8 mb-4">${inlineFormat(h3[1])}</h3>`);
      continue;
    }

    // List items
    const li = line.match(/^[-*] (.+)/);
    if (li) {
      if (!listOpen) { jsxLines.push('<ul className="list-disc pl-6 mb-6 space-y-2">'); listOpen = true; }
      jsxLines.push(`  <li className="text-foreground/80">${inlineFormat(li[1])}</li>`);
      continue;
    }

    // Regular paragraph
    if (listOpen) { jsxLines.push("</ul>"); listOpen = false; }
    jsxLines.push(`<p className="text-foreground/80 mb-6 leading-relaxed">${inlineFormat(line)}</p>`);
  }

  if (listOpen) jsxLines.push("</ul>");
  return jsxLines.join("\n                  ");
}

/**
 * Gera o conteúdo completo do arquivo .tsx para um artigo.
 * Segue o mesmo padrão visual dos artigos já existentes.
 */
function generateTsxContent(article, imageUrl, slug, date, words) {
  const componentName = slugToComponentName(slug);
  const readTime = calculateReadTime(words);
  const canonicalUrl = `https://www.lisomarbarbosa.adv.br/artigos/${slug}`;
  const jsxBody = markdownToJsx(article.content);

  // Formata a data em português (ex: "22 Ago 2026")
  const dateObj = new Date(date + "T12:00:00Z");
  const formattedDate = dateObj.toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric", timeZone: "UTC"
  }).replace(".", "").replace(/(\d{2}) (\w{3}) (\d{4})/, (_, d, m, y) =>
    `${d} ${m.charAt(0).toUpperCase() + m.slice(1)} ${y}`
  );

  const safeTitle   = article.title.replace(/"/g, "&quot;").replace(/'/g, "\\'");
  const safeExcerpt = article.excerpt.replace(/"/g, "&quot;").replace(/'/g, "\\'");
  const safeImage   = imageUrl.replace(/"/g, "&quot;");

  return `import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ${componentName} = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>${safeTitle} | Lisomar Barbosa | Direito Digital</title>
        <meta name="description" content="${safeExcerpt}" />
        <link rel="canonical" href="${canonicalUrl}" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        <meta property="og:site_name" content="Lisomar Barbosa | Direito Digital" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="${canonicalUrl}" />
        <meta property="og:image" content="${safeImage}" />
        <meta property="og:title" content="${safeTitle} | Lisomar Barbosa | Direito Digital" />
        <meta property="og:description" content="${safeExcerpt}" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${safeTitle} | Lisomar Barbosa | Direito Digital" />
        <meta name="twitter:description" content="${safeExcerpt}" />
        <meta name="twitter:image" content="${safeImage}" />
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
                    ${safeTitle}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                    <span>${formattedDate}</span>
                    <span>•</span>
                    <span>${readTime} de leitura</span>
                  </div>
                  <img
                    src="${safeImage}"
                    alt="${safeTitle}"
                    className="w-full h-[400px] object-cover rounded-lg mb-8"
                  />
                </header>

                <div className="prose prose-lg max-w-none">
                  ${jsxBody}
                  <p className="text-sm text-foreground/50 italic mt-12">
                    Este artigo tem caráter informativo e não substitui consulta a advogado especializado para análise do caso concreto.
                  </p>
                </div>

                <div className="mt-16 p-8 rounded-2xl gradient-cyber border border-primary/20 text-center">
                  <h3 className="text-2xl font-bold mb-4">Precisa de Orientação Jurídica?</h3>
                  <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                    Nossa equipe especializada em Direito Digital está pronta para analisar o seu caso e orientar as melhores estratégias jurídicas.
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

// ─── Escrita do arquivo .tsx ──────────────────────────────────────────────────

async function writeArticleTsx(article, imageUrl, slug, date, words) {
  await mkdir(ARTICLES_DIR, { recursive: true });
  const componentName = slugToComponentName(slug);
  const filePath = join(ARTICLES_DIR, `${componentName}.tsx`);
  const content = generateTsxContent(article, imageUrl, slug, date, words);
  await writeFile(filePath, content, "utf8");
  log(`✅ Arquivo gerado: src/pages/articles/${componentName}.tsx`);
  return componentName;
}

// ─── Registro da rota no App.tsx ──────────────────────────────────────────────

/**
 * Insere o import e a rota do novo artigo no App.tsx.
 */
async function registerRouteInApp(slug, componentName) {
  log("🗺️  Registrando rota no App.tsx...");
  const original = await readFile(APP_FILE, "utf8");

  const importLine = `import ${componentName} from "./pages/articles/${componentName}";`;
  const routeLine  = `            <Route path="/artigos/${slug}" element={<${componentName} />} />`;

  if (original.includes(importLine)) {
    log(`⚠️ Rota para "${slug}" já existe no App.tsx. Sem duplicação.`);
    return;
  }

  let updated = original;

  const notFoundImport = 'import NotFound from "./pages/NotFound";';
  if (updated.includes(notFoundImport)) {
    updated = updated.replace(notFoundImport, `${notFoundImport}\n${importLine}`);
  } else {
    const lastImportMatch = [...updated.matchAll(/^import .+;$/gm)].pop();
    if (lastImportMatch) {
      const pos = lastImportMatch.index + lastImportMatch[0].length;
      updated = updated.slice(0, pos) + "\n" + importLine + updated.slice(pos);
    }
  }

  const notFoundComment = "{/* Rota padrão (404) */}";
  if (updated.includes(notFoundComment)) {
    updated = updated.replace(notFoundComment, `${routeLine}\n            ${notFoundComment}`);
  } else {
    const wildcardRoute = '<Route path="*"';
    if (updated.includes(wildcardRoute)) {
      updated = updated.replace(wildcardRoute, `${routeLine}\n            ${wildcardRoute}`);
    }
  }

  await writeFile(APP_FILE, updated, "utf8");
  log(`✅ App.tsx atualizado — rota "/artigos/${slug}" registrada.`);
}

// ─── Blog e Sitemap ───────────────────────────────────────────────────────────

function slugAlreadyExists(blogContent, slug) {
  const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`slug:\\s*['"]${escaped}['"]`, "i").test(blogContent);
}

function buildPostObject(article, imageUrl, date) {
  const words = countWords(article.content);
  const safeContent  = escapeTypeScriptString(article.content);
  const safeTitle    = escapeTypeScriptString(article.title);
  const safeExcerpt  = escapeTypeScriptString(article.excerpt);
  const safeSlug     = escapeTypeScriptString(slugify(article.slug || article.title));
  const safeCategory = escapeTypeScriptString(article.category || "Direito Digital");
  const safeImage    = escapeTypeScriptString(imageUrl);
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

  if (slugAlreadyExists(original, slug)) {
    log(`⚠️ Slug "${slug}" já existe no blog.ts. Sem duplicação.`);
    return false;
  }

  const post = buildPostObject(article, imageUrl, date);
  const arrayStart = original.indexOf("[");
  if (arrayStart === -1) throw new Error("Início do array blogPosts não encontrado.");
  const updated = original.slice(0, arrayStart + 1) + post + original.slice(arrayStart + 1);
  await writeFile(BLOG_FILE, updated, "utf8");
  log("✅ blog.ts atualizado.");
  return true;
}

async function updateSitemap(slug, date, blogTsContent) {
  log("🗺️ Atualizando sitemap.xml...");
  const original = await readFile(SITEMAP_FILE, "utf8");
  const postUrl = `https://www.lisomarbarbosa.adv.br/artigos/${slug}`;

  const urlExistsInSitemap = original.includes(`<loc>${postUrl}</loc>`);
  const postExistsInBlog   = blogTsContent.includes(`slug: '${slug}'`);

  if (urlExistsInSitemap && postExistsInBlog) {
    log("⚠️ Post já existe no sitemap e no blog.ts. Sem duplicação.");
    return;
  }

  if (!urlExistsInSitemap) {
    const entry = `
  <url>
    <loc>${postUrl}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    const closingTag = "</urlset>";
    const index = original.lastIndexOf(closingTag);
    if (index === -1) throw new Error("Tag </urlset> não encontrada no sitemap.");
    const updated = original.slice(0, index) + entry + original.slice(index);
    await writeFile(SITEMAP_FILE, updated, "utf8");
    log("✅ sitemap.xml atualizado.");
  } else {
    log("ℹ️ URL já existia no sitemap — mantida sem alteração.");
  }

  if (!postExistsInBlog) {
    log("⚠️ Atenção: URL no sitemap mas slug ausente no blog.ts — verifique manualmente.");
  }
}

async function getUnsplashImage(topic) {
  log("🖼️ Buscando imagem no Unsplash...");
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    log("⚠️ UNSPLASH_ACCESS_KEY ausente. Usando fallback.");
    return FALLBACK_IMAGE;
  }
  const query = encodeURIComponent(`${topic} law technology digital`);
  const url = `${UNSPLASH_URL}?query=${query}&orientation=landscape&content_filter=high`;
  try {
    const response = await fetch(url, {
      headers: { "Authorization": `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
    });
    if (!response.ok) throw new Error(`Unsplash HTTP ${response.status}`);
    const data = await response.json();
    if (data?.urls?.regular) return data.urls.regular;
    throw new Error("Unsplash não retornou urls.regular.");
  } catch (error) {
    log(`⚠️ Unsplash falhou: ${error.message}`);
    return FALLBACK_IMAGE;
  }
}

// ─── Loop principal ───────────────────────────────────────────────────────────

async function runArticleLoop(baseTopic, slot) {
  let attempt = 0;
  let lastRejectionReasons = [];

  while (attempt < MAX_ATTEMPTS) {
    attempt++;

    const topic = attempt === 1
      ? baseTopic
      : TOPICS[(TOPICS.indexOf(baseTopic) + attempt) % TOPICS.length];

    log("");
    log(`${"=".repeat(50)}`);
    log(`🔄 SLOT ${slot} | TENTATIVA ${attempt}/${MAX_ATTEMPTS}`);
    log(`🎯 Tema: ${topic}`);
    if (lastRejectionReasons.length > 0) {
      log(`📋 Motivos da reprovação anterior:`);
      lastRejectionReasons.forEach(r => log(`   • ${r}`));
    }
    log(`${"=".repeat(50)}`);

    try {
      log(`\n📚 [${attempt}/${MAX_ATTEMPTS}] Etapa 1/4 — Curadoria jurídica...`);
      const research = await createResearch(topic);

      if (research.warnings && research.warnings.length > 0) {
        log(`⚠️ Avisos da curadoria: ${research.warnings.join("; ")}`);
      }
      log(`✅ Curadoria concluída. Bases legais: ${(research.legal_basis || []).length}`);

      log(`\n✍️  [${attempt}/${MAX_ATTEMPTS}] Etapa 2/4 — Geração do artigo...`);
      let article = await generateArticle(topic, research);
      let words = countWords(article.content || "");
      log(`📊 Palavras geradas: ${words}`);

      if (words < MIN_WORDS) {
        log(`\n📏 [${attempt}/${MAX_ATTEMPTS}] Etapa 3/4 — Expandindo artigo (${words} < ${MIN_WORDS})...`);
        article = await expandArticle(article, research);
        words = countWords(article.content || "");
        log(`📊 Palavras após expansão: ${words}`);
      } else {
        log(`✅ Etapa 3/4 — Expansão não necessária (${words} palavras).`);
      }

      try {
        validateArticleStructure(article);
      } catch (structErr) {
        log(`❌ Estrutura inválida: ${structErr.message}`);
        lastRejectionReasons = [`Estrutura inválida: ${structErr.message}`];
        log(`🔄 Reiniciando ciclo completo do zero (tentativa ${attempt + 1}/${MAX_ATTEMPTS})...\n`);
        continue;
      }

      log(`\n⚖️  [${attempt}/${MAX_ATTEMPTS}] Etapa 4/4 — Auditoria jurídica...`);
      const audit = await auditArticle(article, research);

      if (!audit || audit.status !== "PASS") {
        const issues = (audit?.issues || []).map(i => i.text || JSON.stringify(i));
        log(`❌ Auditoria REPROVADA.`);
        issues.forEach(issue => log(`   ↳ ${issue}`));
        lastRejectionReasons = issues.length > 0 ? issues : ["Auditoria retornou FAIL sem detalhar motivos."];
        log(`🔄 Reiniciando ciclo completo do zero (tentativa ${attempt + 1}/${MAX_ATTEMPTS})...\n`);
        continue;
      }
      log(`✅ Auditoria APROVADA.`);

      const links = await verifyLinks(article.content);
      const brokenLinks = links.filter(item => !item.ok);
      if (brokenLinks.length > 0) {
        const reasons = brokenLinks.map(l => `Link quebrado: ${l.url}`);
        log(`❌ ${reasons.length} link(s) quebrado(s).`);
        reasons.forEach(r => log(`   ↳ ${r}`));
        lastRejectionReasons = reasons;
        log(`🔄 Reiniciando ciclo completo do zero (tentativa ${attempt + 1}/${MAX_ATTEMPTS})...\n`);
        continue;
      }

      log(`\n🎉 Artigo APROVADO após ${attempt} tentativa(s)!`);
      log(`📌 Título: ${article.title}`);
      log(`📊 Palavras: ${words}`);

      const image = await getUnsplashImage(topic);
      const slug  = slugify(article.slug || article.title);

      return { article, imageUrl: image, slug, words, attempts: attempt };

    } catch (err) {
      log(`💥 Erro inesperado na tentativa ${attempt}: ${err.message}`);
      lastRejectionReasons = [`Erro inesperado: ${err.message}`];
      if (attempt < MAX_ATTEMPTS) {
        log(`🔄 Reiniciando ciclo completo do zero (tentativa ${attempt + 1}/${MAX_ATTEMPTS})...\n`);
      }
    }
  }

  throw new Error(
    `Slot ${slot}: artigo rejeitado após ${MAX_ATTEMPTS} tentativas. ` +
    `Últimos motivos: ${lastRejectionReasons.join(" | ")}`
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  let originalBlog    = null;
  let originalSitemap = null;
  let originalApp     = null;

  try {
    log("==========================================");
    log("⚖️  LISOMAR BARBOSA ADVOGADOS");
    log("💻 GERADOR DE CONTEÚDO — DIREITO DIGITAL");
    log("==========================================");

    const date  = getToday();
    const slot  = parseInt(process.env.ARTICLE_SLOT || "1", 10);
    const topic = chooseTopic(slot);

    log(`📅 Data: ${date}`);
    log(`🎰 Slot: ${slot}`);
    log(`🎯 Tema base: ${topic}`);
    log(`🔁 Máx. tentativas por artigo: ${MAX_ATTEMPTS}`);
    log(`📋 Loop: reprovar → regenerar do zero → nova curadoria → nova auditoria → repetir até passar`);

    await checkApiKey();

    // Backups para rollback
    originalBlog    = await readFile(BLOG_FILE,    "utf8");
    originalSitemap = await readFile(SITEMAP_FILE, "utf8");
    originalApp     = await readFile(APP_FILE,     "utf8");

    const { article, imageUrl, slug, words, attempts } =
      await runArticleLoop(topic, slot);

    // ─── Persiste o slug gerado para uso pelo workflow ───────────────────────
    await writeFile(GENERATED_SLUG_FILE, slug, "utf8");
    log(`✅ Slug gravado em .generated_slug: ${slug}`);

    // 1. Gera o arquivo .tsx do artigo
    log("\n📄 Gerando arquivo de página do artigo...");
    const componentName = await writeArticleTsx(article, imageUrl, slug, date, words);

    // 2. Registra a rota no App.tsx
    await registerRouteInApp(slug, componentName);

    // 3. Atualiza blog.ts
    await updateBlogFile(article, imageUrl, date);

    // 4. Atualiza sitemap
    const updatedBlogContent = await readFile(BLOG_FILE, "utf8");
    await updateSitemap(slug, date, updatedBlogContent);

    log("");
    log("==========================================");
    log("✅ PROCESSO CONCLUÍDO COM SUCESSO");
    log(`🎰 Slot: ${slot}`);
    log(`📌 Título: ${article.title}`);
    log(`🔗 Slug: ${slug}`);
    log(`🧩 Componente: ${componentName}.tsx`);
    log(`🛣️  Rota: /artigos/${slug}`);
    log(`📊 Palavras: ${words}`);
    log(`🔁 Tentativas necessárias: ${attempts}`);
    log("==========================================");

  } catch (error) {
    log("");
    log("==========================================");
    log("❌ ERRO NO WORKFLOW");
    log("==========================================");
    console.error(error);

    // Rollback de segurança
    try {
      if (originalBlog    !== null) await writeFile(BLOG_FILE,    originalBlog,    "utf8");
      if (originalSitemap !== null) await writeFile(SITEMAP_FILE, originalSitemap, "utf8");
      if (originalApp     !== null) await writeFile(APP_FILE,     originalApp,     "utf8");
      log("↩️ Rollback de segurança realizado (blog.ts, sitemap.xml e App.tsx restaurados).");
    } catch (rollbackError) {
      console.error("❌ Falha no rollback:", rollbackError);
    }

    process.exit(1);
  }
}

main();
