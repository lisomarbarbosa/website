// .github/scripts/auditoria-integridade.mjs
// Camada 1 — Auditoria técnica de integridade dos artigos gerados
// Verifica: import/rota no App.tsx, canonical, og:tags, twitter:card,
//           export default, window.scrollTo e rotas órfãs

import { readFileSync, readdirSync } from "fs";
import { join, basename } from "path";

const ROOT = process.cwd();
const ARTICLES_DIR = join(ROOT, "src/pages/articles");
const APP_TSX      = join(ROOT, "src/App.tsx");

let errors   = 0;
let warnings = 0;

const erro  = (msg) => { console.error(`❌ ERRO: ${msg}`);  errors++;   };
const aviso = (msg) => { console.warn(`⚠️  AVISO: ${msg}`); warnings++; };
const ok    = (msg) => { console.log(`✅ ${msg}`); };

// ── Leitura base ──────────────────────────────────────────────────────────────
const arquivos   = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".tsx"));
const appContent = readFileSync(APP_TSX, "utf-8");

console.log(`\n📂 Artigos em src/pages/articles: ${arquivos.length}\n`);

// ── 1. Verificar cada artigo ──────────────────────────────────────────────────
for (const arquivo of arquivos) {
  const nome     = basename(arquivo, ".tsx");
  const conteudo = readFileSync(join(ARTICLES_DIR, arquivo), "utf-8");

  console.log(`\n── ${arquivo}`);

  // 1.1 Import no App.tsx
  const importOk = new RegExp(`import\\s+${nome}\\s+from\\s+["'].*${nome}["']`).test(appContent);
  importOk ? ok("Import no App.tsx") : erro(`${arquivo} NÃO está importado no App.tsx`);

  // 1.2 Rota no App.tsx
  const rotaOk = new RegExp(`<Route[^>]*element=\\{<${nome}`).test(appContent);
  rotaOk ? ok("Rota no App.tsx") : erro(`${arquivo} NÃO tem rota no App.tsx`);

  // 1.3 export default
  conteudo.includes(`export default ${nome}`)
    ? ok("export default correto")
    : erro(`${arquivo} não possui "export default ${nome}"`);

  // 1.4 canonical
  const canonical = conteudo.match(/rel="canonical"[^>]*href="([^"]+)"/);
  canonical
    ? ok(`Canonical: ${canonical[1]}`)
    : aviso(`${arquivo} sem link canonical`);

  // 1.5 og:title
  conteudo.includes('property="og:title"')
    ? ok("og:title presente")
    : aviso(`${arquivo} sem og:title`);

  // 1.6 og:description
  conteudo.includes('property="og:description"')
    ? ok("og:description presente")
    : aviso(`${arquivo} sem og:description`);

  // 1.7 og:image
  conteudo.includes('property="og:image"')
    ? ok("og:image presente")
    : aviso(`${arquivo} sem og:image`);

  // 1.8 twitter:card
  conteudo.includes('name="twitter:card"')
    ? ok("twitter:card presente")
    : aviso(`${arquivo} sem twitter:card`);

  // 1.9 window.scrollTo
  conteudo.includes("window.scrollTo")
    ? ok("window.scrollTo presente")
    : aviso(`${arquivo} sem window.scrollTo`);
}

// ── 2. Rotas órfãs no App.tsx ─────────────────────────────────────────────────
console.log("\n── Rotas órfãs no App.tsx...");
const imports = [...appContent.matchAll(/import\s+(\w+)\s+from\s+["'].*\/articles\//g)];
for (const m of imports) {
  const comp     = m[1];
  const esperado = `${comp}.tsx`;
  arquivos.includes(esperado)
    ? ok(`${comp} → arquivo existe`)
    : erro(`App.tsx importa "${comp}" mas src/pages/articles/${esperado} NÃO existe`);
}

// ── Resumo ────────────────────────────────────────────────────────────────────
console.log("\n════════════════════════════════════════");
console.log(`📊 RESUMO`);
console.log(`   Artigos  : ${arquivos.length}`);
console.log(`   Erros    : ${errors}`);
console.log(`   Avisos   : ${warnings}`);
console.log("════════════════════════════════════════\n");

if (errors > 0) {
  console.error(`❌ ${errors} erro(s) crítico(s). Corrija antes do deploy.`);
  process.exit(1);
} else {
  console.log("✅ Auditoria de integridade concluída sem erros críticos!");
  process.exit(0);
}
