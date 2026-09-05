/**
 * Script para gerar CSV de artigos para Pinterest (vers�o simples sem depend�ncias)
 * Uso: node scripts/generate-pinterest-csv.js
 */

const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '..', 'src', 'content', 'articles');
const OUTPUT_FILE = path.join(__dirname, '..', 'pinterest-articles.csv');

function extractArticles() {
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));
  
  return files.map(file => {
    const filePath = path.join(ARTICLES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extrair frontmatter manualmente
    const titleMatch = content.match(/^title:\s*["']([^"']+)["']/m);
    const descMatch = content.match(/^description:\s*["']([^"']+)["']/m);
    const dateMatch = content.match(/^date:\s*["']([^"']+)["']/m);
    const keywordsMatch = content.match(/^keywords:\s*\[([^\]]+)\]/m);
    
    const slug = file.replace('.md', '');
    
    return {
      title: titleMatch ? titleMatch[1] : slug,
      description: descMatch ? descMatch[1] : '',
      date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
      keywords: keywordsMatch ? keywordsMatch[1].replace(/["']/g, '').split(',').map(k => k.trim()) : [],
      slug
    };
  });
}

function escapeCSV(text) {
  if (!text) return '';
  const escaped = text.replace(/"/g, '""');
  return escaped.includes(',') || escaped.includes('"') || escaped.includes('\n') 
    ? `"${escaped}"` 
    : escaped;
}

function generateCSV(articles) {
  const header = 'Title,Media URL,Pinterest board,Thumbnail,Description,Link,Publish date,Keywords';
  
  const rows = articles.map(article => {
    const title = escapeCSV(article.title);
    const mediaUrl = 'https://lisomarbarbosa.adv.br/og-image.png';
    const board = 'Direito Digital';
    const thumbnail = '';
    const description = escapeCSV(article.description.substring(0, 500));
    const link = `https://lisomarbarbosa.adv.br/artigos/${article.slug}`;
    const publishDate = article.date;
    const keywords = escapeCSV(article.keywords.join(', '));
    
    return `${title},${mediaUrl},${board},${thumbnail},${description},${link},${publishDate},${keywords}`;
  });
  
  return [header, ...rows].join('\n');
}

function main() {
  console.log('📌 Extraindo artigos...');
  const articles = extractArticles();
  console.log(`✓ ${articles.length} artigos encontrados`);
  
  console.log('📝 Gerando CSV...');
  const csv = generateCSV(articles);
  
  console.log('💾 Salvando arquivo...');
  fs.writeFileSync(OUTPUT_FILE, csv, 'utf-8');
  
  console.log(`✅ CSV gerado: ${OUTPUT_FILE}`);
  console.log(`📊 Total: ${articles.length} Pins`);
}

main();
