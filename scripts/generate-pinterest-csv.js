/**
 * Script para gerar CSV de artigos para Pinterest (vers�o simples sem depend�ncias)
 * Uso: node scripts/generate-pinterest-csv.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BLOG_DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'blog.ts');
const OUTPUT_FILE = path.join(__dirname, '..', 'pinterest-articles.csv');

function extractArticles() {
  const source = fs.readFileSync(BLOG_DATA_FILE, 'utf-8');
  const articlePattern = /\{\s*slug:\s*'([^']+)',\s*title:\s*'([^']*)',\s*excerpt:\s*'([^']*)',\s*date:\s*'([^']+)'/g;
  const articles = [];
  let match;

  while ((match = articlePattern.exec(source)) !== null) {
    const [, slug, title, description, date] = match;
    articles.push({ title, description, date, keywords: [], slug });
  }

  return articles;
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
