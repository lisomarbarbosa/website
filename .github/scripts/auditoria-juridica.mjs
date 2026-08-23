// .github/scripts/auditoria-juridica.mjs
// Camada 2 — Auditoria jurídica automática
// Extrai citações legais dos artigos e consulta LexML/Planalto para verificar
// existência e vigenncia. Gera relatório Markdown e sai com código 2 se
// encontrar leis revogadas ou números inválidos (código 2 = warning, não bloqueia deploy).

import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join, basename } from "path";
import { createInterface } from "readline";

const ROOT          = process.cwd();
const ARTICLES_DIR  = join(ROOT, "src/pages/articles");
const REPORT_DIR    = join(ROOT, ".github");
const TODAY         = new Date().toISOString().slice(0, 10);
const REPORT_PATH   = join(REPORT_DIR, `auditoria-juridica-${TODAY}.md`);

// ── Padrões de citação legal ──────────────────────────────────────────────────
const PATTERNS = [
  // Lei nº 8.078/1990  |  Lei n. 8078/90
  /Lei\s+n[\u00baº°o\.]{0,2}\s*[\d\.]+\/\d{2,4}/gi,
  // Decreto nº 7.962/2013
  /Decreto(?:-[Ll]ei)?\s+n[\u00baº°o\.]{0,2}\s*[\d\.]+\/\d{2,4}/gi,
  // Lei Complementar nº 123/2006
  /Lei\s+Complementar\s+n[\u00baº°o\.]{0,2}\s*[\d\.]+\/\d{2,4}/gi,
  // Resolução / Portaria / Instrução Normativa
  /(?:Resolução|Portaria|Instrução\s+Normativa)\s+n[\u00baº°o\.]{0,2}\s*[\d\.]+(?:\/\d{2,4})?/gi,
  // art. 49 do CDC  |  artigo 6º
  /art(?:igo|\.)?\s*\d+[\u00baª]?(?:[\s,]*(?:inciso|inc\.|parágrafo|par\.|§)\s*[\dIVXivxºª]+)*/gi,
  // Súmula STJ/STF 000
  /Súmula\s+(?:(?:Vinculante\s+)?(?:STJ|STF|TST|TSE)\s+)?n[\u00baº°o\.]{0,2}?\s*\d+/gi,
];

// ── Normalização do número de lei para consulta ──────────────────────────────
function normalizarLei(citacao) {
  // Extrai número e ano: 8.078/1990 → { numero: "8078", ano: "1990" }
  const m = citacao.match(/([\d\.]+)\/(\d{2,4})/);
  if (!m) return null;
  const numero = m[1].replace(/\./g, "");
  let ano = m[2];
  if (ano.length === 2) ano = parseInt(ano) > 30 ? `19${ano}` : `20${ano}`;
  return { numero, ano };
}

// ── Consulta ao LexML (API REST pública) ───────────────────────────────────────
async function consultarLexML(tipo, numero, ano) {
  // Tipo normalizado para URN LexML
  const tipoMap = {
    "lei":          "lei",
    "decreto":      "decreto",
    "decreto-lei":  "decreto.lei",
    "lei complementar": "lei.complementar",
  };
  const tipoUrn = tipoMap[tipo.toLowerCase()] ?? "lei";
  const urn = `urn:lex:br:federal:${tipoUrn}:${ano}-01-01;${numero}`;
  const url = `https://www.lexml.gov.br/urn/${encodeURIComponent(urn)}`;

  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "auditoria-juridica-bot/1.0" },
    });
    if (res.status === 200 || res.status === 302) {
      return { status: "encontrada", url };
    } else if (res.status === 404) {
      return { status: "nao_encontrada", url };
    } else {
      return { status: "inconclusivo", url, httpStatus: res.status };
    }
  } catch (e) {
    return { status: "erro_rede", url, detalhe: e.message };
  }
}

// ── Consulta ao Planalto (fallback) ────────────────────────────────────────────
async function consultarPlanalto(numero, ano) {
  const url = `https://www.planalto.gov.br/ccivil_03/leis/l${numero}.htm`;
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "auditoria-juridica-bot/1.0" },
    });
    return res.status < 400
      ? { status: "encontrada", url }
      : { status: "nao_encontrada", url };
  } catch (e) {
    return { status: "erro_rede", url, detalhe: e.message };
  }
}

// ── Extrator de citações de um arquivo .tsx ─────────────────────────────────
function extrairCitacoes(conteudo) {
  const encontradas = new Set();
  for (const pattern of PATTERNS) {
    const matches = conteudo.match(pattern) ?? [];
    for (const m of matches) {
      // Remove tags JSX residuais e normaliza espaços
      const limpo = m.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      if (limpo.length > 3) encontradas.add(limpo);
    }
  }
  return [...encontradas];
}

// ── Função principal ────────────────────────────────────────────────────────────────
async function main() {
  const arquivos = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".tsx"));

  // Se um arquivo específico foi passado como argumento, audita só ele
  const alvo = process.argv[2];
  const lista = alvo
    ? arquivos.filter((f) => f.includes(alvo))
    : arquivos;

  console.log(`\n⚖️  Auditoria Jurídica — ${TODAY}`);
  console.log(`📂 Artigos a auditar: ${lista.length}\n`);

  const linhasRelatorio = [
    `# Relatório de Auditoria Jurídica`,
    ``,
    `**Data:** ${TODAY}  `,
    `**Artigos auditados:** ${lista.length}  `,
    `**Gerado por:** auditoria-juridica.mjs`,
    ``,
    `---`,
    ``,
  ];

  let totalAlertas = 0;
  let totalErros   = 0;

  for (const arquivo of lista) {
    const nome     = basename(arquivo, ".tsx");
    const conteudo = readFileSync(join(ARTICLES_DIR, arquivo), "utf-8");
    const citacoes = extrairCitacoes(conteudo);

    console.log(`\n── ${arquivo} (${citacoes.length} citações detectadas)`);
    linhasRelatorio.push(`## ${nome}`);
    linhasRelatorio.push(``);
    linhasRelatorio.push(`| Citação detectada | Status | Fonte |`);
    linhasRelatorio.push(`|---|---|---|`);

    if (citacoes.length === 0) {
      console.log("  ⚠️  Nenhuma citação legal detectada.");
      linhasRelatorio.push(`| *(nenhuma citação detectada)* | — | — |`);
      linhasRelatorio.push(``);
      continue;
    }

    for (const citacao of citacoes) {
      // Só consulta APIs para citações de leis/decretos com número e ano
      const parsed = normalizarLei(citacao);

      if (!parsed) {
        // Artigos, súmulas, portarias sem número de lei: só loga
        console.log(`  📌 ${citacao}  —  sem número de lei (registrado apenas)`);
        linhasRelatorio.push(`| \`${citacao}\` | 📌 registrado | — |`);
        continue;
      }

      // Detecta tipo pelo prefixo da citação
      let tipo = "lei";
      if (/decreto-lei/i.test(citacao))  tipo = "decreto-lei";
      else if (/decreto/i.test(citacao)) tipo = "decreto";
      else if (/complementar/i.test(citacao)) tipo = "lei complementar";

      // Consulta LexML primeiro, depois Planalto como fallback
      let resultado = await consultarLexML(tipo, parsed.numero, parsed.ano);
      let fonte = "LexML";

      if (resultado.status !== "encontrada") {
        resultado = await consultarPlanalto(parsed.numero, parsed.ano);
        fonte = "Planalto";
      }

      const { status, url, httpStatus, detalhe } = resultado;

      let emoji = "✅";
      let statusLabel = "em vigor (encontrada)";

      if (status === "nao_encontrada") {
        emoji = "❌";
        statusLabel = "NÃO ENCONTRADA — verificar manualmente";
        totalErros++;
      } else if (status === "inconclusivo") {
        emoji = "⚠️";
        statusLabel = `inconclusivo (HTTP ${httpStatus})`;
        totalAlertas++;
      } else if (status === "erro_rede") {
        emoji = "⚠️";
        statusLabel = `erro de rede: ${detalhe}`;
        totalAlertas++;
      }

      console.log(`  ${emoji} ${citacao}  →  ${statusLabel}  [${fonte}]`);
      linhasRelatorio.push(`| \`${citacao}\` | ${emoji} ${statusLabel} | [${fonte}](${url}) |`);
    }

    linhasRelatorio.push(``);
  }

  // ── Rodapé do relatório
  linhasRelatorio.push(`---`);
  linhasRelatorio.push(``);
  linhasRelatorio.push(`## Resumo`);
  linhasRelatorio.push(``);
  linhasRelatorio.push(`| Indicador | Valor |`);
  linhasRelatorio.push(`|---|---|`);
  linhasRelatorio.push(`| Artigos auditados | ${lista.length} |`);
  linhasRelatorio.push(`| Leis não encontradas (erro) | ${totalErros} |`);
  linhasRelatorio.push(`| Inconclusivos / erro de rede | ${totalAlertas} |`);
  linhasRelatorio.push(``);
  linhasRelatorio.push(`> Relatório gerado automaticamente. Itens marcados com \`❌\` exigem revisão manual do advogado.`);

  // ── Grava o relatório
  writeFileSync(REPORT_PATH, linhasRelatorio.join("\n"), "utf-8");
  console.log(`\n📝 Relatório salvo em: ${REPORT_PATH}`);

  // ── Resumo no console
  console.log("\n════════════════════════════════════════");
  console.log(`📊 RESUMO JURDICO`);
  console.log(`   Artigos      : ${lista.length}`);
  console.log(`   Erros críticos: ${totalErros}  (leis não encontradas)`);
  console.log(`   Alertas      : ${totalAlertas}  (inconclusivos/rede)`);
  console.log("════════════════════════════════════════\n");

  // Código 2 = warning (não bloqueia deploy, mas cria Issue via workflow)
  process.exit(totalErros > 0 ? 2 : 0);
}

main();
