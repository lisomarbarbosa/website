import { useEffect } from 'react';

/**
 * Hook para inserir canonical tag dinamicamente
 * @param url - URL canonica completa (ex: https://www.lisomarbarbosa.adv.br/artigos/compliance-lgpd)
 */
export function useCanonical(url: string) {
  useEffect(() => {
    // Criar ou atualizar tag link[rel="canonical"]
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    
    canonical.href = url;
    
    // Limpeza ao desmontar componente
    return () => {
      canonical?.remove();
    };
  }, [url]);
}
