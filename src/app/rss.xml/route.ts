import { blogPosts } from '../data/blog';

const BASE_URL = 'https://lisomarbarbosa.adv.br';

export async function GET() {
  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lisomar Barbosa | Direito Digital</title>
    <link>${BASE_URL}</link>
    <description>Artigos jurídicos sobre Direito Digital, responsabilidade civil, proteção de dados, crimes digitais e legislação da internet.</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    
    ${blogPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/artigos/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/artigos/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>Lisomar Barbosa</author>
      ${post.image ? `<enclosure url="${post.image}" type="image/jpeg" />` : ''}
      <category>${post.category || 'Direito Digital'}</category>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}
