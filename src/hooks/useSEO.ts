import { useEffect } from 'react';

interface SEOData {
  title: string;
  description: string;
  canonical?: string;
}

/**
 * Hook para atualizar titulo, meta description e canonical tag
 * @param data - Dados de SEO (title, description, canonical)
 */
export function useSEO(data: SEOData) {
  useEffect(() => {
    // Atualizar document.title
    const originalTitle = document.title;
    document.title = data.title;

    // Atualizar ou criar meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = data.description;

    // Atualizar ou criar canonical tag
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    if (data.canonical) {
      canonical.href = data.canonical;
    }

    // Limpeza ao desmontar
    return () => {
      document.title = originalTitle;
    };
  }, [data.title, data.description, data.canonical]);
}
