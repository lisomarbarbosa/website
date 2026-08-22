#!/usr/bin/env node
/**
 * generate-post.js
 * Generates a new Digital Law article as a TSX component,
 * registers the route in src/App.tsx and adds it to public/sitemap.xml.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ─── CONFIG ────────────────────────────────────────────────────────────────

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const CUSTOM_TOPIC = process.env.CUSTOM_TOPIC || '';
const CUSTOM_MODEL = process.env.CUSTOM_MODEL || 'google/gemma-3-27b-it:free';

const SITE_URL = 'https://www.lisomarbarbosa.adv.br';
const ARTICLES_DIR = path.resolve('src/pages/articles');
const APP_TSX = path.resolve('src/App.tsx');
const SITEMAP = path.resolve('public/sitemap.xml');

// ─── TOPICS POOL ───────────────────────────────────────────────────────────

const TOPIC_POOL = [
  { topic: 'Crimes contra a honra na internet: calúnia, injúria e difamação digital', slug: 'crimes-honra-internet', tag: 'Crimes Digitais' },
  { topic: 'Responsabilidade civil das plataformas digitais por conteúdo de terceiros', slug: 'responsabilidade-plataformas-digitais', tag: 'Direito Digital' },
  { topic: 'Proteção de dados de menores na internet e obrigações das empresas', slug: 'protecao-dados-menores-internet', tag: 'LGPD' },
  { topic: 'Contratos inteligentes (smart contracts) e validade jurídica no Brasil', slug: 'contratos-inteligentes-smart-contracts', tag: 'Blockchain' },
  { topic: 'Deepfake e responsabilidade penal e civil no direito brasileiro', slug: 'deepfake-responsabilidade-juridica', tag: 'Crimes Digitais' },
  { topic: 'ANPD: poderes, sanções e fiscalização na proteção de dados', slug: 'anpd-sancoes-fiscalizacao', tag: 'LGPD' },
  { topic: 'Cyberstalking e perseguição digital: como a lei protege as vítimas', slug: 'cyberstalking-perseguicao-digital', tag: 'Crimes Digitais' },
  { topic: 'Privacidade no trabalho remoto: monitoramento de colaboradores e LGPD', slug: 'privacidade-trabalho-remoto-lgpd', tag: 'LGPD' },
  { topic: 'NFTs e direitos autorais: o que muda com os tokens não fungíveis', slug: 'nfts-direitos-autorais', tag: 'Blockchain' },
  { topic: 'Golpes em marketplaces: direitos do consumidor e reparação de danos', slug: 'golpes-marketplaces-consumidor', tag: 'Direito Digital' },
  { topic: 'Inteligência artificial e responsabilidade civil: quem responde pelos danos?', slug: 'inteligencia-artificial-responsabilidade-civil', tag: 'Direito Digital' },
  { topic: 'Proteção de marcas e domínios na internet: como agir juridicamente', slug: 'marcas-dominios-internet', tag: 'Direito Digital' },
  { topic: 'Extorsão digital (ransomware): aspectos penais e obrigações das empresas', slug: 'extorsao-digital-ransomware', tag: 'Crimes Digitais' },
  { topic: 'Regulação de criptomoedas no Brasil: avanços e desafios em 2025', slug: 'regulacao-criptomoedas-brasil-2025', tag: 'Blockchain' },
  { topic: 'Vazamento de dados: o que fazer quando sua empresa sofre um incidente', slug: 'vazamento-dados-incidente-resposta', tag: 'LGPD' },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────

function slugToComponentName(slug) {
  return slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
             .replace(/^([a-z])/, c => c.toUpperCase());
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function todayHuman() {
  const d = new Date();
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function httpsPost(url, headers, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const urlObj = new URL(url);
    const opts = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
    };
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('JSON parse error: ' + data)); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function httpsGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const opts = { hostname: urlObj.hostname, path: urlObj.pathname + urlObj.search, headers };
    https.get(opts, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('JSON parse error: ' + data)); }
      });
    }).on('error', reject);
  });
}

// ─── SELECT TOPIC ──────────────────────────────────────────────────────────

function selectTopic() {
  if (CUSTOM_TOPIC) {
    const rawSlug = CUSTOM_TOPIC.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return { topic: CUSTOM_TOPIC, slug: rawSlug, tag: 'Direito Digital' };
  }

  // avoid re-using existing slugs
  const existing = fs.readdirSync(ARTICLES_DIR).map(f => f.replace('.tsx', '').toLowerCase());
  const available = TOPIC_POOL.filter(t => !existing.includes(t.slug));

  if (available.length === 0) {
    console.log('⚠️  Todos os tópicos já foram usados. Reutilizando aleatoriamente.');
    return TOPIC_POOL[Math.floor(Math.random() * TOPIC_POOL.length)];
  }

  // deterministic pick based on day-of-year so re-runs on same day produce same article
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return available[dayOfYear % available.length];
}

// ─── FETCH IMAGE ───────────────────────────────────────────────────────────

async function fetchImage(query) {
  const FALLBACK = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80';

  if (!UNSPLASH_ACCESS_KEY) {
    console.log('ℹ️  Sem UNSPLASH_ACCESS_KEY, usando imagem fallback.');
    return { url: FALLBACK, alt: query };
  }

  try {
    const q = encodeURIComponent(query + ' law digital technology');
    const data = await httpsGet(
      `https://api.unsplash.com/search/photos?query=${q}&per_page=5&orientation=landscape`,
      { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
    );
    const results = data?.results || [];
    if (results.length === 0) return { url: FALLBACK, alt: query };
    const pick = results[Math.floor(Math.random() * results.length)];
    return {
      url: pick.urls.regular + '&w=1200&auto=format&fit=crop&q=80',
      alt: pick.alt_description || query,
    };
  } catch (e) {
    console.warn('⚠️  Unsplash error:', e.message, '- usando fallback.');
    return { url: FALLBACK, alt: query };
  }
}

// ─── GENERATE ARTICLE VIA OPENROUTER ───────────────────────────────────────

async function generateArticle(topic) {
  const prompt = `Você é um advogado especialista em Direito Digital no Brasil. Escreva um artigo completo, didático e com autoridade jurídica sobre o seguinte tema:\n\n"${topic}"\n\nO artigo deve:\n- Ter no mínimo 800 palavras de conteúdo real\n- Incluir 3 a 5 seções com subtítulos (H2)\n- Referenciar legislação brasileira atual (LGPD, Marco Civil da Internet, Código Penal, etc.)\n- Ser escrito em português do Brasil\n- Ter linguagem acessível mas técnica\n- Incluir uma conclusão com chamada para consulta jurídica\n\nResponda APENAS com um objeto JSON válido com a seguinte estrutura exata, sem markdown ao redor:\n{\n  "titulo": "string - título SEO-friendly com até 70 caracteres",\n  "descricao": "string - meta description com até 160 caracteres",\n  "tempo_leitura": "string - ex: 8 min de leitura",\n  "intro": "string - parágrafo introdutório (2-3 frases)",\n  "secoes": [\n    {\n      "titulo": "string - título da seção",\n      "conteudo": "string - HTML limpo da seção (pode usar <ul><li><strong> mas sem tags de bloco extras)"\n    }\n  ],\n  "conclusao": "string - parágrafo de conclusão"\n}`;

  const model = CUSTOM_MODEL || 'google/gemma-3-27b-it:free';
  console.log(`🤖 Gerando artigo com modelo: ${model}`);

  const res = await httpsPost(
    'https://openrouter.ai/api/v1/chat/completions',
    { Authorization: `Bearer ${OPENROUTER_API_KEY}`, 'HTTP-Referer': SITE_URL, 'X-Title': 'Lisomar Barbosa - Direito Digital' },
    {
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 3000,
    }
  );

  const raw = res?.choices?.[0]?.message?.content;
  if (!raw) throw new Error('OpenRouter retornou resposta vazia.');

  // strip potential markdown code fences
  const clean = raw.replace(/^```json?\n?/i, '').replace(/```$/m, '').trim();

  try {
    return JSON.parse(clean);
  } catch (e) {
    console.error('❌ Falha ao parsear JSON da IA. Resposta bruta:\n', raw);
    throw new Error('JSON inválido da IA.');
  }
}

// ─── BUILD TSX COMPONENT ───────────────────────────────────────────────────

function buildTSX({ componentName, slug, tag, data, image, dateStr }) {
  const { titulo, descricao, tempo_leitura, intro, secoes, conclusao } = data;
  const canonicalUrl = `${SITE_URL}/artigos/${slug}`;

  const sectionsJSX = secoes.map(s => {
    const safeContent = s.conteudo
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');
    return `
              <h2 className="text-3xl font-bold mt-12 mb-6">${s.titulo}</h2>
              <div className="text-foreground/80 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: \`${safeContent}\` }} />`;
  }).join('');

  return `import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const ${componentName} = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>${titulo} | Lisomar Barbosa | Direito Digital e Proteção de Dados</title>
        <meta name="description" content="${descricao}" />
        <link rel="canonical" href="${canonicalUrl}" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        <meta property="og:site_name" content="Lisomar Barbosa | Direito Digital" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="${canonicalUrl}" />
        <meta property="og:image" content="${image.url}" />
        <meta property="og:title" content="${titulo} | Lisomar Barbosa | Direito Digital e Proteção de Dados" />
        <meta property="og:description" content="${descricao}" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${titulo} | Lisomar Barbosa | Direito Digital e Proteção de Dados" />
        <meta name="twitter:description" content="${descricao}" />
        <meta name="twitter:image" content="${image.url}" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <article className="py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link to="/#artigos">
                <Button variant="ghost" className="mb-8">
                  <ArrowLeft className="mr-2" size={18} />
                  Voltar para Artigos
                </Button>
              </Link>

              {/* Header */}
              <div className="mb-12">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  ${tag}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  ${titulo}
                </h1>
                <div className="flex items-center gap-6 text-foreground/60">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>${dateStr}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>${tempo_leitura}</span>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative h-96 rounded-2xl overflow-hidden mb-12 shadow-cyber">
                <img
                  src="${image.url}"
                  alt="${image.alt}"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                  ${intro}
                </p>
${sectionsJSX}

                <h2 className="text-3xl font-bold mt-12 mb-6">Conclusão</h2>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  ${conclusao}
                </p>
              </div>

              <div className="mt-16 p-8 rounded-2xl gradient-cyber border border-primary/20 text-center">
                <h3 className="text-2xl font-bold mb-4">Precisa de Assessoria em Direito Digital?</h3>
                <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                  Nossa equipe especializada pode ajudar você ou sua empresa a navegar com segurança no ambiente digital.
                </p>
                <Link to="/#contato">
                  <Button size="lg" className="bg-gradient-accent text-background font-semibold shadow-cyber">
                    Fale Conosco
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

export default ${componentName};
`;
}

// ─── UPDATE App.tsx ────────────────────────────────────────────────────────

function updateAppTsx(componentName, slug) {
  let content = fs.readFileSync(APP_TSX, 'utf8');

  const importLine = `import ${componentName} from "./pages/articles/${componentName}";`;
  const routeLine = `            <Route path="/artigos/${slug}" element={<${componentName} />} />`;

  if (content.includes(importLine)) {
    console.log(`ℹ️  ${componentName} já está registrado em App.tsx`);
    return;
  }

  // Insert import before the blank line that precedes `const queryClient`
  content = content.replace(
    /(import [A-Z][\w]+ from "\.\/(pages|components)[^"]+";)(\n\nconst queryClient)/,
    (_, last, _2, rest) => last + '\n' + importLine + rest
  );

  // Insert route before the 404 fallback comment
  content = content.replace(
    '            {/* Rota padrão (404) */}',
    `${routeLine}\n            {/* Rota padrão (404) */}`
  );

  fs.writeFileSync(APP_TSX, content, 'utf8');
  console.log(`✅ App.tsx atualizado com rota /artigos/${slug}`);
}

// ─── UPDATE SITEMAP ────────────────────────────────────────────────────────

function updateSitemap(slug) {
  let content = fs.readFileSync(SITEMAP, 'utf8');
  const url = `${SITE_URL}/artigos/${slug}`;

  if (content.includes(url)) {
    console.log(`ℹ️  ${url} já está no sitemap.`);
    return;
  }

  const entry = `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
  content = content.replace('</urlset>', entry + '\n</urlset>');
  fs.writeFileSync(SITEMAP, content, 'utf8');
  console.log(`✅ Sitemap atualizado com ${url}`);
}

// ─── MAIN ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚀 Iniciando geração de artigo de Direito Digital...\n');

  const { topic, slug, tag } = selectTopic();
  const componentName = slugToComponentName(slug);

  console.log(`📌 Tema: ${topic}`);
  console.log(`🔗 Slug: ${slug}`);
  console.log(`🏷️  Tag: ${tag}`);
  console.log(`⚛️  Component: ${componentName}\n`);

  const [data, image] = await Promise.all([
    generateArticle(topic),
    fetchImage(tag),
  ]);

  console.log(`✅ Artigo gerado: "${data.titulo}"`);
  console.log(`🖼️  Imagem: ${image.url}\n`);

  const tsx = buildTSX({
    componentName,
    slug,
    tag,
    data,
    image,
    dateStr: todayHuman(),
  });

  const outputPath = path.join(ARTICLES_DIR, `${componentName}.tsx`);
  fs.writeFileSync(outputPath, tsx, 'utf8');
  console.log(`✅ Arquivo criado: ${outputPath}`);

  updateAppTsx(componentName, slug);
  updateSitemap(slug);

  console.log('\n✅ Pipeline concluído com sucesso.');
}

main().catch(err => {
  console.error('\n❌ Erro no pipeline:', err.message);
  process.exit(1);
});
