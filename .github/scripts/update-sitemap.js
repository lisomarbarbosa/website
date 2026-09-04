/**
 * Script para gerar sitemap.xml automaticamente
 * 
 * Este script lê os arquivos de artigos em src/content/blog/
 * e gera um sitemap.xml válido com URLs canonicas em /artigos/{slug}
 * 
 * Uso: node .github/scripts/update-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '../../src/content/blog');
const SITEMAP_PATH = path.join(__dirname, '../../public/sitemap.xml');
const BASE_URL = 'https://www.lisomarbarbosa.adv.br';

/**
 * Lê todos os arquivos .ts da pasta de blog e extrai os slugs
 */
function getValidSlugs() {
  const files = fs.readdirSync(BLOG_DIR);
  const slugs = files
    .filter(file => file.endsWith('.ts'))
    .map(file => file.replace('.ts', ''))
    .sort();
  
  console.log(`✓ Encontrados ${slugs.length} artigos válidos em src/content/blog/`);
  return slugs;
}

/**
 * Gera o conteúdo do sitemap.xml
 */
function generateSitemap(slugs) {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Página inicial -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Página de listagem do blog -->
  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Artigos -->
`;

  for (const slug of slugs) {
    xml += `  <url>
    <loc>${BASE_URL}/artigos/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

`;
  }

  xml += `</urlset>
`;
  
  return xml;
}

/**
 * Funcao principal
 */
function main() {
  console.log('🔍 Lendo artigos em src/content/blog/...');
  
  const slugs = getValidSlugs();
  const sitemapXml = generateSitemap(slugs);
  
  console.log('💾 Salvando sitemap.xml em public/...');
  fs.writeFileSync(SITEMAP_PATH, sitemapXml, 'utf-8');
  
  console.log(`✅ Sitemap gerado com sucesso!`);
  console.log(`   - Total de URLs: ${slugs.length + 2} (homepage + blog + ${slugs.length} artigos)`);
  console.log(`   - Arquivo: ${SITEMAP_PATH}`);
}

main();
