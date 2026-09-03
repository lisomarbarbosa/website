const SITE_URL = "https://www.lisomarbarbosa.adv.br";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${SITE_URL}/#legalservice`,
  name: "Lisomar Barbosa Advocacia",
  alternateName: "Lisomar Barbosa | Direito Digital",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  image: `${SITE_URL}/og.webp`,
  description:
    "Escritório de advocacia especializado em Direito Digital, proteção de dados, LGPD, crimes digitais e responsabilidade civil na internet.",
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belém",
    addressRegion: "PA",
    addressCountry: "BR",
  },
  priceRange: "$$",
};

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export type ArticleSchemaParams = {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  url: string;
};

export function buildArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  url,
}: ArticleSchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalArticle",
    "@id": `${url}#article`,
    headline: title,
    description,
    image: [image],
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: "pt-BR",
    author: {
      "@type": "Person",
      name: "Lisomar Barbosa",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Lisomar Barbosa Advocacia",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
