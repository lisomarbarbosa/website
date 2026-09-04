/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output padrão (compatvel com Cloudflare Pages + rotas dinmicas)
  // output: 'export', // Removido: requer generateStaticParams() para rotas dinmicas
  
  // Imagens otimizadas
  images: {
    unoptimized: false, // Cloudflare Pages suporta Image Optimization
  },
  
  // SWC compiler (mais rpido que Babel)
  swcMinify: true,
  
  // Source maps apenas em dev
  productionBrowserSourceMaps: false,
  
  // Experimental: cache filesystem (Next.js 14+)
  experimental: {
    // cacheLife: 'default', // Perfis de cache: 'default', 'frequent', 'infrequent'
  },
};

module.exports = nextConfig;
