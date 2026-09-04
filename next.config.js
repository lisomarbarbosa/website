/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build caching para rebuilds mais rápidos
  cache: {
    type: 'filesystem',
    maxMemoryCacheSize: 1024 * 1024 * 1024, // 1GB
  },
  
  // Output para Cloudflare Pages
  output: 'export',
  
  // Imagens otimizadas
  images: {
    unoptimized: true,
  },
  
  // SWC compiler (mais rápido que Babel)
  swcMinify: true,
  
  // Source maps apenas em dev
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
