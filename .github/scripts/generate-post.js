import { readFile, writeFile, readdir } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = process.cwd();

const CONTENT_DIR = join(ROOT, "src/content/blog");
const BLOG_DATA_FILE = join(ROOT, "src/data/blog.ts");
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
  "nvidia/llama-nemotron-rerank-vl-1b-v2:free",
  "dots-studio/dots-3-note-preview:free",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
  "thinkingmachines/inkling:free",
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
 * Escapa caracteres especiais para uso em template literals TypeScript.
 * Escapa: backslashes, backticks e ${} para evitar interpolação indesejada.
 */
function escapeTypeScriptString(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function calculateReadTime(words) {
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Escapa uma string para ser inserida com segurança dentro de aspas simples
 * em um arquivo TypeScript (ex.: dentro de um objeto literal).
 */
function escapeForSingleQuote(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}

// ─── Curadoria de temas ───────────────────────────────────────────────────────

/**
 * Lê os slugs já publicados em src/content/blog/*.ts
 */
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

/**
 * Embaralha um array usando Fisher-Yates (in-place).
 */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Escolhe um tema de forma aleatória, evitando temas já publicados.
 *
 * - CUSTOM_TOPIC sempre tem precedência.
 * - Embaralha TOPICS a cada execução (aleatoriedade real).
 * - Remove temas cujo slugify é similar a algum slug já publicado.
 * - Se todos já foram usados, sorteia de todos (começa novo ciclo).
 * - usedTopicSlugs: lista de slugs já sorteados NA MESMA execução
 *   (para que posts do mesmo workflow nunca recebam o mesmo tema)
 */
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

// ─── Markdown / texto ────────────────────────────────────────────────────────

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
  throw new Error(`Não foi possível extrair JSON da resposta: ${cleaned.slice(0, 200)}`);
}

function extractBalancedJson(text) {
  const start = text.indexOf("{");
  if (start === -1) return null;
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\" && inString) { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

function sanitizeContentField(jsonStr) {
  return jsonStr.replace(
    /"content"\s*:\s*"([\s\S]*?)(?=",\s*"[a-z]|\s*\}$)/,
    (_, inner) => `"content": "${inner.replace(/\n/g, "\\n").replace(/"/g, '\\"')}"`
  );
}

// ─── Imagem (Unsplash) ────────────────────────────────────────────────────────

async function fetchImage(topic) {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) {
    log("⚠️  UNSPLASH_ACCESS_KEY não configurada — usando fallback.");
    return FALLBACK_IMAGE;
  }
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
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 4096,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenRouter HTTP ${res.status}: ${body}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Resposta vazia do modelo.");
  return content;
}

// ─── Geração do artigo ───────────────────────────────────────────────────────

/**
 * Gera o artigo em Markdown puro.
 * Retorna { title, slug, markdown, wordCount }
 */
async function generateArticle(topic, modelIndex = 0) {
  log(`✍️  Gerando artigo sobre: "${topic}"`);

  const systemPrompt = `Você é Lisomar Barbosa, advogada especialista em Direito Digital.\nEscreva artigos jurídicos informativos, acessíveis e bem fundamentados em português do Brasil.\nUse linguagem clara, evite jargão desnecessário, cite legislação e jurisprudência relevantes.\nNunca use markdown de code block (sem \`\`\`). Use apenas formatação Markdown padrão (##, ###, **, *).\nAo final, adicione a linha: *Este artigo tem caráter informativo e não substitui consulta jurídica individualizada.*`;

  const userPrompt = `Escreva um artigo completo e aprofundado sobre o tema: "${topic}".\n\nRequisitos:\n- Mínimo de ${MIN_WORDS} palavras\n- Título claro e informativo (linha 1, iniciando com #)\n- Estrutura com subtítulos (##, ###)\n- Parágrafos bem desenvolvidos\n- Exemplos práticos quando cabível\n- Referências a leis, decretos ou jurisprudência brasileira relevantes\n- Conclusão ou considerações finais\n- Linguagem acessível ao público leigo interessado em seus direitos\n\nRetorne APENAS o texto do artigo em Markdown. Não inclua JSON, frontmatter ou metadados.`;

  const raw = await callOpenRouter(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    modelIndex
  );

  const markdown = cleanMarkdown(raw);
  const wordCount = countWords(markdown);

  // Extrai o título da primeira linha H1
  const titleMatch = markdown.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1].trim() : topic;
  const slug = slugify(title);

  log(`📝 Artigo gerado: "${title}" (${wordCount} palavras)`);

  return { title, slug, markdown, wordCount };
}

// ─── Geração do excerpt via IA ────────────────────────────────────────────────

/**
 * Gera um excerpt (resumo de até 200 caracteres) para o artigo.
 * Retorna a string do excerpt.
 */
async function generateExcerpt(title, markdown, modelIndex = 0) {
  log(`📋 Gerando excerpt para: "${title}"`);

  const prompt = `Leia o artigo jurídico abaixo e escreva um resumo em português do Brasil com no máximo 200 caracteres. O resumo deve ser atrativo, informativo e adequado como descrição de blog. Retorne APENAS o texto do resumo, sem aspas, sem prefixo.\n\nTítulo: ${title}\n\nArtigo:\n${markdown.slice(0, 2000)}`;

  try {
    const raw = await callOpenRouter(
      [{ role: "user", content: prompt }],
      modelIndex
    );
    const excerpt = normalizeText(raw).slice(0, 200);
    log(`📋 Excerpt gerado: "${excerpt}"`);
    return excerpt;
  } catch (err) {
    log(`⚠️  Falha ao gerar excerpt (${err.message}) — usando fallback.`);
    return title.slice(0, 200);
  }
}

// ─── Auditoria ────────────────────────────────────────────────────────────────

/**
 * Audita o artigo gerado verificando qualidade mínima.
 * Retorna { ok, reason }
 */
async function auditArticle(title, markdown, modelIndex = 0) {
  log(`🔍 Auditando artigo: "${title}"`);

  const prompt = `Você é um editor jurídico sênior. Avalie o artigo abaixo e retorne JSON com:\n{\n  "approved": true/false,\n  "reason": "motivo breve se reprovado"\n}\n\nReprove se:\n- Conteúdo genérico demais, sem referências jurídicas concretas\n- Menos de 800 palavras\n- Título não condiz com o conteúdo\n- Conteúdo claramente incorreto juridicamente\n\nArtigo:\n---\n${markdown.slice(0, 3000)}\n---\n\nRetorne APENAS o JSON.`;

  try {
    const raw = await callOpenRouter(
      [{ role: "user", content: prompt }],
      modelIndex
    );
    const result = extractJson(raw);
    log(`✅ Auditoria: ${result.approved ? "APROVADO" : `REPROVADO — ${result.reason}`}`);
    return { ok: !!result.approved, reason: result.reason || "" };
  } catch (err) {
    log(`⚠️  Auditoria falhou (${err.message}) — aprovando por padrão.`);
    return { ok: true, reason: "" };
  }
}

// ─── Escrita dos arquivos ─────────────────────────────────────────────────────

/**
 * Escreve src/content/blog/[slug].ts com o formato da nova arquitetura:
 *
 *   export const content = `
 *   # Título
 *   ...
 *   `;
 */
async function writeContentFile(slug, markdown) {
  const filePath = join(CONTENT_DIR, `${slug}.ts`);
  const escaped = escapeTypeScriptString(markdown);
  const fileContent = `export const content = \`\n${escaped}\n\`;\n`;
  await writeFile(filePath, fileContent, "utf8");
  log(`💾 Arquivo salvo: src/content/blog/${slug}.ts`);
  return filePath;
}

/**
 * Insere uma nova entrada no array blogPosts em src/data/blog.ts.
 * Adiciona o novo post no início do array (mais recente primeiro).
 */
async function updateBlogData({ slug, title, excerpt, date, readTime, category, image }) {
  const source = await readFile(BLOG_DATA_FILE, "utf8");

  // Detecta o marcador de início do array
  const arrayStart = source.indexOf("export const blogPosts: BlogPost[] = [");
  if (arrayStart === -1) {
    throw new Error("Não foi possível localizar o array blogPosts em src/data/blog.ts");
  }

  const insertAt = source.indexOf("[", arrayStart) + 1;

  const safeTitle    = escapeForSingleQuote(title);
  const safeExcerpt  = escapeForSingleQuote(excerpt);
  const safeImage    = escapeForSingleQuote(image);
  const safeCategory = escapeForSingleQuote(category);

  const newEntry = `
  {
    slug: '${slug}',
    title: '${safeTitle}',
    excerpt: '${safeExcerpt}',
    date: '${date}',
    readTime: '${readTime}',
    category: '${safeCategory}',
    image: '${safeImage}',
  },`;

  const updated = source.slice(0, insertAt) + newEntry + source.slice(insertAt);
  await writeFile(BLOG_DATA_FILE, updated, "utf8");
  log(`📚 blogPosts atualizado: entrada '${slug}' inserida em src/data/blog.ts`);
}

/**
 * Salva o slug gerado em .generated_slug para que o workflow do GitHub Actions
 * possa criar o commit e abrir o PR com o nome correto.
 */
async function saveGeneratedSlug(slug) {
  await writeFile(GENERATED_SLUG_FILE, slug, "utf8");
  log(`🏷️  Slug salvo em .generated_slug: ${slug}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  log("🚀 Iniciando geração de artigo...");

  const usedSlugs = [];
  let attempt = 0;

  while (attempt < MAX_ATTEMPTS) {
    attempt++;
    log(`\n🔄 Tentativa ${attempt}/${MAX_ATTEMPTS}`);

    // 1. Escolhe tema
    const topic = await chooseTopic(usedSlugs);
    const candidateSlug = slugify(topic);
    usedSlugs.push(candidateSlug);

    // 2. Verifica se o arquivo já existe
    const existingFiles = await getPublishedSlugs();
    if (existingFiles.includes(candidateSlug)) {
      log(`⏩ Slug "${candidateSlug}" já existe — pulando.`);
      continue;
    }

    // 3. Gera artigo
    let article;
    try {
      article = await generateArticle(topic, attempt - 1);
    } catch (err) {
      log(`❌ Falha na geração: ${err.message}`);
      continue;
    }

    // 4. Verifica contagem mínima de palavras
    if (article.wordCount < MIN_WORDS) {
      log(`⚠️  Artigo muito curto (${article.wordCount} palavras, mínimo ${MIN_WORDS}) — tentando novamente.`);
      continue;
    }

    // 5. Auditoria de qualidade
    const audit = await auditArticle(article.title, article.markdown, attempt - 1);
    if (!audit.ok) {
      log(`🔁 Artigo reprovado na auditoria — tentando novamente.`);
      continue;
    }

    // 6. Verifica colisão de slug após normalização do título real
    if (existingFiles.includes(article.slug)) {
      log(`⏩ Slug final "${article.slug}" já existe — pulando.`);
      continue;
    }

    // 7. Busca imagem e gera excerpt
    const [image, excerpt] = await Promise.all([
      fetchImage(topic),
      generateExcerpt(article.title, article.markdown, attempt - 1),
    ]);

    const date     = getToday();
    const readTime = calculateReadTime(article.wordCount);
    const category = "Direito Digital";

    // 8. Salva os arquivos
    try {
      await writeContentFile(article.slug, article.markdown);
      await updateBlogData({
        slug: article.slug,
        title: article.title,
        excerpt,
        date,
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
    return;
  }

  throw new Error(`❌ Não foi possível gerar um artigo aprovado após ${MAX_ATTEMPTS} tentativas.`);
}

main().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
