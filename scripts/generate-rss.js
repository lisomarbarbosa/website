/* Gerador isolado do RSS do Pinterest.
 * Usa o CSV já produzido pelo fluxo do blog/Pinterest e gera somente public/rss.xml.
 */
const fs = require('node:fs');
const path = require('node:path');

const SITE_URL = 'https://www.lisomarbarbosa.adv.br';
const input = path.resolve(process.cwd(), 'pinterest-articles.csv');
const output = path.resolve(process.cwd(), 'public/rss.xml');

const escapeXml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') { cell += '"'; i += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === ',' && !quoted) { row.push(cell); cell = ''; continue; }
    if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(cell);
      if (row.some((value) => value.trim())) rows.push(row);
      row = []; cell = ''; continue;
    }
    cell += char;
  }
  row.push(cell);
  if (row.some((value) => value.trim())) rows.push(row);
  const [headers = [], ...data] = rows;
  return data.map((values) => Object.fromEntries(headers.map((header, index) => [header.trim().toLowerCase(), (values[index] || '').trim()])));
}

function url(value) {
  if (!value) return '';
  try { return new URL(value, SITE_URL).href; } catch { return ''; }
}

const csv = fs.readFileSync(input, 'utf8').replace(/^\uFEFF/, '');
const articles = parseCsv(csv)
  .map((item) => {
    const link = url(item.link || item.url || item.destination_url || item.destination || item.website || item.post_url);
    const image = url(item.image || item.image_url || item.media_url || item.pin_image || item.featured_image);
    const title = item.title || item.pin_title || item.name || '';
    const description = item.description || item.pin_description || item.summary || item.excerpt || title;
    const date = item.pubdate || item.date || item.published_at || item.published || new Date().toUTCString();
    return { title, description, link, image, date };
  })
  .filter((item) => item.title && item.link && item.image)
  .slice(0, 100);

const items = articles.map((item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
      <pubDate>${escapeXml(new Date(item.date).toUTCString())}</pubDate>
      <description>${escapeXml(item.description)}</description>
      <media:content url="${escapeXml(item.image)}" medium="image" />
    </item>`).join('\n');

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

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, rss, 'utf8');
console.log(`RSS atualizado com ${articles.length} artigo(s): public/rss.xml`);
