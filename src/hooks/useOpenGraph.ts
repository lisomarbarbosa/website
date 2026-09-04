import { useEffect } from 'react';

interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
}

/**
 * Hook para atualizar Open Graph tags (Facebook, LinkedIn, WhatsApp)
 * @param data - Dados OG (title, description, image, url)
 */
export function useOpenGraph(data: OpenGraphData) {
  useEffect(() => {
    const baseUrl = 'https://www.lisomarbarbosa.adv.br';
    
    // Funçª£o auxiliar para criar/atualizar meta tag
    const setMeta = (property: string, content: string, nameAttr = 'property') => {
      let meta = document.querySelector(`meta[${nameAttr}="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(nameAttr, property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Open Graph tags
    setMeta('og:title', data.title);
    setMeta('og:description', data.description);
    setMeta('og:image', data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`);
    setMeta('og:url', data.url);
    setMeta('og:type', data.type || 'article');
    setMeta('og:site_name', 'Lisomar Barbosa Adv');

    // Twitter Card tags
    setMeta('twitter:title', data.title, 'name');
    setMeta('twitter:description', data.description, 'name');
    setMeta('twitter:image', data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`, 'name');
    setMeta('twitter:card', 'summary_large_image', 'name');
  }, [data.title, data.description, data.image, data.url, data.type]);
}
