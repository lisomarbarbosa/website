import { useEffect } from 'react';

interface StructuredDataArticle {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  image: string;
  url: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  datePublished: string;
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
  };
}

interface StructuredDataOrganization {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
}

interface StructuredDataBreadcrumb {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Hook para injetar JSON-LD structured data
 * @param article - Dados do artigo para schema Article (opcional)
 * @param breadcrumb - Dados de breadcrumb (opcional)
 */
export function useStructuredData(params: {
  article?: {
    headline: string;
    description: string;
    image: string;
    url: string;
    datePublished?: string;
  };
  breadcrumb?: {
    items: Array<{
      name: string;
      item: string;
    }>;
  };
}) {
  useEffect(() => {
    const baseUrl = 'https://www.lisomarbarbosa.adv.br';

    // Schema Organization (sempre presente)
    const organizationSchema: StructuredDataOrganization = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'Lisomar Barbosa Adv',
      url: baseUrl,
      logo: `${baseUrl}/favicon.png`,
      sameAs: [
        `${baseUrl}/artigos`,
      ],
    };

    // Schema Article (se houver dados do artigo)
    let articleSchema: StructuredDataArticle | null = null;
    if (params.article) {
      articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: params.article.headline,
        description: params.article.description,
        image: params.article.image.startsWith('http') 
          ? params.article.image 
          : `${baseUrl}${params.article.image}`,
        url: params.article.url,
        author: {
          '@type': 'Person',
          name: 'Lisomar Barbosa',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Lisomar Barbosa Adv',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/favicon.png`,
          },
        },
        datePublished: params.article.datePublished || new Date().toISOString().split('T')[0],
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': params.article.url,
        },
      };
    }

    // Schema BreadcrumbList (se houver breadcrumb)
    let breadcrumbSchema: StructuredDataBreadcrumb | null = null;
    if (params.breadcrumb) {
      breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: params.breadcrumb.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.item,
        })),
      };
    }

    // Criar script tag para Organization
    let orgScript = document.getElementById('structured-data-organization') as HTMLScriptElement;
    if (!orgScript) {
      orgScript = document.createElement('script');
      orgScript.id = 'structured-data-organization';
      orgScript.type = 'application/ld+json';
      document.head.appendChild(orgScript);
    }
    orgScript.textContent = JSON.stringify(organizationSchema);

    // Criar/atualizar script tag para Article
    if (articleSchema) {
      let articleScript = document.getElementById('structured-data-article') as HTMLScriptElement;
      if (!articleScript) {
        articleScript = document.createElement('script');
        articleScript.id = 'structured-data-article';
        articleScript.type = 'application/ld+json';
        document.head.appendChild(articleScript);
      }
      articleScript.textContent = JSON.stringify(articleSchema);
    }

    // Criar/atualizar script tag para Breadcrumb
    if (breadcrumbSchema) {
      let breadcrumbScript = document.getElementById('structured-data-breadcrumb') as HTMLScriptElement;
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = 'structured-data-breadcrumb';
        breadcrumbScript.type = 'application/ld+json';
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    }

    // Limpeza ao desmontar (opcional - remover schemas específicos)
    return () => {
      if (articleSchema) {
        const articleScript = document.getElementById('structured-data-article');
        if (articleScript) {
          articleScript.remove();
        }
      }
      if (breadcrumbSchema) {
        const breadcrumbScript = document.getElementById('structured-data-breadcrumb');
        if (breadcrumbScript) {
          breadcrumbScript.remove();
        }
      }
    };
  }, [params.article, params.breadcrumb]);
}
