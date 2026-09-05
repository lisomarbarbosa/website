// update-sitemap.js - Gera sitemap.xml dinamicamente
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.lisomarbarbosa.adv.br';
const SITEMAP_PATH = './public/sitemap.xml';
const BLOG_DIR = './src/content/blog';

// Lê todos os arquivos .ts do diret ório de blog
const blogFiles = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.ts'))
  .map(file => file.replace('.ts', ''));

// Gera URLs
const urls = [
  BASE_URL,
  `${BASE_URL}/artigos`,
  ...blogFiles.map(slug => `${BASE_URL}/artigos/${slug}`)
];

// Cria sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

// Salva sitemap
fs.writeFileSync(SITEMAP_PATH, sitemap);

console.log(`✅ Sitemap gerado com ${urls.length} URLs`);
