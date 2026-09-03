const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');
const BASE_URL = 'https://www.lisomarbarbosa.adv.br';

const STATIC_URLS = [
  { loc: '/', lastmod: '2025-10-13', changefreq: 'weekly', priority: '1.0' },
  { loc: '/blog', lastmod: '2025-10-13', changefreq: 'weekly', priority: '1.0' },
  { loc: '/blog/compliancelgpd', lastmod: '2025-10-13', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/crimesciberneticos', lastmod: '2025-10-13', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/custodiacriptoativos', lastmod: '2025-10-13', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/fakenewsdifamacao', lastmod: '2025-10-13', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/golpescriptomoedas', lastmod: '2025-10-13', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/instagramhackeado', lastmod: '2025-10-13', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/lgpderroscomuns', lastmod: '2025-10-13', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/protecaodadospessoais', lastmod: '2025-10-13', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/regulamentacaocriptomoedas', lastmod: '2025-10-13', changefreq: 'monthly', priority: '0.8' },
];

const ARTIGOS_URLS = [
  { loc: '/artigos/perseguicao-digital-protecao-juridica-vitima', lastmod: '2026-08-23', changefreq: 'monthly', priority: '0.8' },
  { loc: '/artigos/crimes-contra-honra-internet-guia-completo', lastmod: '2026-08-23', changefreq: 'monthly', priority: '0.8' },
  { loc: '/artigos/contratos-software-licencas-uso-direitos-deveres', lastmod: '2026-08-23', changefreq: 'monthly', priority: '0.8' },
  { loc: '/artigos/direito-anonimato-internet-limites', lastmod: '2026-08-23', changefreq: 'monthly', priority: '0.8' },
  { loc: '/artigos/direito-do-consumidor-compras-online', lastmod: '2026-08-23', changefreq: 'monthly', priority: '0.8' },
  { loc: '/artigos/ofensas-redes-sociais-consequencias-juridicas', lastmod: '2026-08-23', changefreq: 'monthly', priority: '0.8' },
  { loc: '/artigos/contratos-digitais-validade-juridica-assinaturas-direitos', lastmod: '2026-08-23', changefreq: 'monthly', priority: '0.8' },
];

function extractBlogMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.ts');
  const lastmodMatch = content.match(/lastmod:\s*['"]([^'"]+)['"]/);
  const dateMatch = content.match(/date:\s*['"]([^'"]+)['"]/);
  let lastmod = lastmodMatch ? lastmodMatch[1].split('T')[0] : (dateMatch ? dateMatch[1].split('T')[0] : new Date().toISOString().split('T')[0]);
  return { slug: fileName, lastmod, loc: `/artigos/${fileName}` };
}

function generateUrlXml(urlObj) {
  return `  <url>
    <loc>${BASE_URL}${urlObj.loc}</loc>
    <lastmod>${urlObj.lastmod}</lastmod>
    <changefreq>${urlObj.changefreq}</changefreq>
    <priority>${urlObj.priority}</priority>
  </url>`;
}

function updateSitemap() {
  const blogFiles = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.ts') && file !== 'index.ts').map(file => path.join(BLOG_DIR, file));
  const blogUrls = blogFiles.map(file => { try { return extractBlogMetadata(file); } catch (e) { console.error('Erro em ' + file + ':', e.message); return null; } }).filter(Boolean);
  blogUrls.sort((a, b) => new Date(b.lastmod) - new Date(a.lastmod));
  const allUrls = [...STATIC_URLS, ...ARTIGOS_URLS, ...blogUrls.map(blog => ({ loc: blog.loc, lastmod: blog.lastmod, changefreq: 'monthly', priority: '0.8' }))];
  const sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + allUrls.map(url => generateUrlXml(url)).join('\n') + '\n</urlset>';
  let currentSitemap = '';
  if (fs.existsSync(SITEMAP_PATH)) currentSitemap = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  if (sitemapXml.trim() === currentSitemap.trim()) { console.log('Sitemap ja atualizado'); return false; }
  fs.writeFileSync(SITEMAP_PATH, sitemapXml, 'utf-8');
  console.log('Sitemap atualizado: ' + allUrls.length + ' URLs');
  return true;
}

try { updateSitemap(); process.exit(0); } catch (e) { console.error('Erro:', e.message); process.exit(1); }
