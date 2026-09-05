import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://www.lisomarbarbosa.adv.br';
const BLOG_FILE = path.resolve('src/data/blog.ts');
const RSS_FILE = path.resolve('public/rss.xml');

const escapeXml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const unescapeTs = (value = '') =>
  value.replace(/\\'/g, "'").replace(/\\"/g, '"');

const source = fs.readFileSync(BLOG_FILE, 'utf8');

const posts = [
  ...source.matchAll(
    /\{\s*slug:\s*'([^']+)'[\s\S]*?title:\s*'((?:\\'|[^'])*)',[\s\S]*?excerpt:\s*'((?:\\'|[^'])*)',[\s\S]*?date:\s*'([^']+)'[\s\S]*?readTime:\s*'([^']+)'[\s\S]*?category:\s*'([^']+)'[\s\S]*?image:\s*'([^']+)'/g
  ),
]
  .map(([, slug, title, excerpt, date, readTime, category, image]) => ({
    slug,
    title: unescapeTs(title),
    excerpt: unescapeTs(excerpt),
    date,
    readTime,
    category,
    image,
  }))
  .filter(
    (post) =>
      post.slug &&
      post.title &&
      post.excerpt &&
      post.date &&
      post.image
  )
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 100);

if (posts.length === 0) {
  throw new Error(
    'Nenhum artigo foi encontrado em src/data/blog.ts. RSS não foi sobrescrito.'
  );
}

const items = posts
  .map((post) => {
    const link = `${SITE_URL}/artigos/${post.slug}`;
    const pubDate = new Date(`${post.date}T12:00:00-03:00`).toUTCString();

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <media:content url="${escapeXml(post.image)}" medium="image" />
    </item>`;
  })
  .join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Lisomar Barbosa Advocacia — Direito Digital</title>
    <link>${SITE_URL}/</link>
    <description>Conteúdos jurídicos sobre Direito Digital, LGPD, privacidade, tecnologia e direitos online.</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

fs.mkdirSync(path.dirname(RSS_FILE), { recursive: true });
fs.writeFileSync(RSS_FILE, rss, 'utf8');

console.log(`✅ RSS gerado com ${posts.length} artigos em public/rss.xml`);