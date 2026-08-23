// .github/scripts/auditoria-juridica.mjs
// Camada 2 — Auditoria jurídica automática
// Extrai citações legais dos artigos e consulta fontes oficiais para verificar
// existência e indícios de vigência. Gera relatório Markdown e sai com código 2 se
// encontrar normas revogadas, não localizadas ou situações que exijam revisão manual.

import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join, basename } from "path";

const ROOT          = process.cwd();
const ARTICLES_DIR  = join(ROOT, "src/pages/articles");
const REPORT_DIR    = join(ROOT, ".github");
const TODAY         = new Date().toISOString().slice(0, 10);
const REPORT_PATH   = join(REPORT_DIR, `auditoria-juridica-${TODAY}.md`);

const PATTERNS = [
  /Lei\s+n[\u00baº°o\.]{0,2}\s*[\d\.]+\/\d{2,4}/gi,
  /Decreto(?:-[Ll]ei)?\s+n[\u00baº°o\.]{0,2}\s*[\d\.]+\/\d{2,4}/gi,
  /Lei\s+Complementar\s+n[\u00baº°o\.]{0,2}\s*[\d\.]+\/\d{2,4}/gi,
  /(?:Resolução|Portaria|Instrução\s+Normativa)\s+n[\u00baº°o\.]{0,2}\s*[\d\.]+(?:\/\d{2,4})?/gi,
  /art(?:igo|\.)?\s*\d+[\u00baª]?(?:[\s,]*(?:inciso|inc\.|parágrafo|par\.|§)\s*[\dIVXivxºª]+)*/gi,
  /Súmula\s+(?:(?:Vinculante\s+)?(?:STJ|STF|TST|TSE)\s+)?n[\u00baº°o\.]{0,2}?\s*\d+/gi,
];

function normalizarLei(citacao) {
  const m = citacao.match(/([\d\.]+)\/(\d{2,4})/);
  if (!m) return null;
  const numero = m[1].replace(/\./g, "");
  let ano = m[2];
  if (ano.length === 2) ano = parseInt(ano, 10) > 30 ? `19${ano}` : `20${ano}`;
  return { numero, ano };
}

function detectarTipo(citacao) {
  if (/decreto-lei/i.test(citacao)) return "decreto-lei";
  if (/decreto/i.test(citacao)) return "decreto";
  if (/complementar/i.test(citacao)) return "lei complementar";
  return "lei";
}

function escapeMd(texto) {
  return String(texto).replace(/\|/g, "\\|").replace(/\n/g, " ").trim();
}

async function headOuGet(url) {
  try {
    let res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "auditoria-juridica-bot/1.1" },
      redirect: "follow",
    });

    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, {
        method: "GET",
        signal: AbortSignal.timeout(8000),
        headers: { "User-Agent": "auditoria-juridica-bot/1.1" },
        redirect: "follow",
      });
    }

    return res;
  } catch (e) {
    return { ok: false, status: 0, erro: e.message };
  }
}

async function consultarLexML(tipo, numero, ano) {
  const tipoMap = {
    "lei": "lei",
    "decreto": "decreto",
    "decreto-lei": "decreto.lei",
    "lei complementar": "lei.complementar",
  };
  const tipoUrn = tipoMap[tipo.toLowerCase()] ?? "lei";
  const urn = `urn:lex:br:federal:${tipoUrn}:${ano}-01-01;${numero}`;
  const url = `https://www.lexml.gov.br/urn/${encodeURIComponent(urn)}`;

  const res = await headOuGet(url);

  if (res.erro) return { status: "erro_rede", url, detalhe: res.erro };
  if (res.status === 200 || res.status === 302) return { status: "encontrada", url };
  if (res.status === 404) return { status: "nao_encontrada", url };
  return { status: "inconclusivo", url, httpStatus: res.status };
}

function montarUrlsPlanalto(tipo, numero) {
  const n = numero.replace(/^0+/, "");
  if (tipo === "lei complementar") {
    return [
      `https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp${n}.htm`,
      `https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp${n}.html`,
    ];
  }
  if (tipo === "decreto") {
    return [
      `https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d${n}.htm`,
      `https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d${n}.html`,
      `https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d${n}.htm`,
      `https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/decreto/d${n}.htm`,
      `https://www.planalto.gov.br/ccivil_03/decreto/d${n}.htm`,
    ];
  }
  return [
    `https://www.planalto.gov.br/ccivil_03/leis/l${n}.htm`,
    `https://www.planalto.gov.br/ccivil_03/leis/l${n}.html`,
  ];
}

async function consultarPlanalto(tipo, numero) {
  const urls = montarUrlsPlanalto(tipo, numero);

  for (const url of urls) {
    const res = await headOuGet(url);
    if (!res.erro && res.status > 0 && res.status < 400) {
      return { status: "encontrada", url };
    }
  }

  return { status: "nao_encontrada", url: urls[0] };
}

async function extrairTextoPagina(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "auditoria-juridica-bot/1.1" },
      redirect: "follow",
    });

    if (!res.ok) {
      return { ok: false, status: res.status, texto: "" };
    }

    const html = await res.text();
    const texto = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();

    return { ok: true, status: res.status, texto };
  } catch (e) {
    return { ok: false, status: 0, texto: "", erro: e.message };
  }
}

function analisarVigencia(texto) {
  const t = texto.toLowerCase();

  const sinaisRevogacao = [
    /\brevogad[ao]s?\b/,
    /\brevogam-se\b/,
    /\bato revogado\b/,
    /\btexto revogado\b/,
  ];

  const sinaisVigencia = [
    /\bentra em vigor\b/,
    /\bem vigor\b/,
    /\besta lei entra em vigor\b/,
    /\beste decreto entra em vigor\b/,
    /\bproduz efeitos\b/,
    /\bvigência\b/,
  ];

  if (sinaisRevogacao.some((r) => r.test(t))) {
    return { vigencia: "revogada", detalhe: "há indício textual de revogação na fonte oficial" };
  }

  if (sinaisVigencia.some((r) => r.test(t))) {
    return { vigencia: "indicio_vigencia", detalhe: "há cláusula de vigência ou menção a vigência" };
  }

  return { vigencia: "nao_confirmada", detalhe: "fonte localizada, mas sem indício textual suficiente de vigência" };
}

function extrairCitacoes(conteudo) {
  const encontradas = new Set();
  for (const pattern of PATTERNS) {
    const matches = conteudo.match(pattern) ?? [];
    for (const m of matches) {
      const limpo = m.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      if (limpo.length > 3) encontradas.add(limpo);
    }
  }
  return [...encontradas];
}

async function verificarNorma(citacao) {
  const parsed = normalizarLei(citacao);
  if (!parsed) {
    return {
      tipoResultado: "registro",
      citacao,
      statusLabel: "📌 registrado (sem base suficiente para consulta automática)",
      fonte: "—",
      url: "",
      severidade: "info",
    };
  }

  const tipo = detectarTipo(citacao);

  let consulta = await consultarLexML(tipo, parsed.numero, parsed.ano);
  let fonte = "LexML";

  if (consulta.status !== "encontrada") {
    consulta = await consultarPlanalto(tipo, parsed.numero);
    fonte = "Planalto";
  }

  if (consulta.status === "nao_encontrada") {
    return {
      tipoResultado: "erro",
      citacao,
      statusLabel: "❌ não localizada em fonte oficial",
      fonte,
      url: consulta.url,
      severidade: "erro",
    };
  }

  if (consulta.status === "inconclusivo") {
    return {
      tipoResultado: "alerta",
      citacao,
      statusLabel: `⚠️ consulta inconclusiva (HTTP ${consulta.httpStatus})`,
      fonte,
      url: consulta.url,
      severidade: "alerta",
    };
  }

  if (consulta.status === "erro_rede") {
    return {
      tipoResultado: "alerta",
      citacao,
      statusLabel: `⚠️ erro de rede: ${consulta.detalhe}`,
      fonte,
      url: consulta.url,
      severidade: "alerta",
    };
  }

  const pagina = await extrairTextoPagina(consulta.url);

  if (!pagina.ok) {
    return {
      tipoResultado: "alerta",
      citacao,
      statusLabel: "⚠️ norma localizada, mas não foi possível analisar a vigência",
      fonte,
      url: consulta.url,
      severidade: "alerta",
    };
  }

  const vigencia = analisarVigencia(pagina.texto);

  if (vigencia.vigencia === "revogada") {
    return {
      tipoResultado: "erro",
      citacao,
      statusLabel: `❌ revogada — ${vigencia.detalhe}`,
      fonte,
      url: consulta.url,
      severidade: "erro",
    };
  }

  if (vigencia.vigencia === "indicio_vigencia") {
    return {
      tipoResultado: "ok",
      citacao,
      statusLabel: `✅ localizada; com indício textual de vigência`,
      fonte,
      url: consulta.url,
      severidade: "ok",
    };
  }

  return {
    tipoResultado: "alerta",
    citacao,
    statusLabel: `⚠️ localizada; vigência não confirmada automaticamente`,
    fonte,
    url: consulta.url,
    severidade: "alerta",
  };
}

async function main() {
  const arquivos = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".tsx"));
  const alvo = process.argv[2];
  const lista = alvo ? arquivos.filter((f) => f.includes(alvo)) : arquivos;

  console.log(`\n⚖️  Auditoria Jurídica — ${TODAY}`);
  console.log(`📂 Artigos a auditar: ${lista.length}\n`);

  const linhasRelatorio = [
    `# Relatório de Auditoria Jurídica`,
    ``,
    `**Data:** ${TODAY}  `,
    `**Artigos auditados:** ${lista.length}  `,
    `**Gerado por:** auditoria-juridica.mjs`,
    ``,
    `> Esta auditoria valida localização da norma em fonte oficial e busca indícios textuais de vigência/revogação. Casos parcialmente revogados ou com alteração complexa exigem revisão humana.`,
    ``,
    `---`,
    ``,
  ];

  let totalAlertas = 0;
  let totalErros = 0;

  for (const arquivo of lista) {
    const nome = basename(arquivo, ".tsx");
    const conteudo = readFileSync(join(ARTICLES_DIR, arquivo), "utf-8");
    const citacoes = extrairCitacoes(conteudo);

    console.log(`\n── ${arquivo} (${citacoes.length} citações detectadas)`);
    linhasRelatorio.push(`## ${nome}`);
    linhasRelatorio.push(``);
    linhasRelatorio.push(`| Citação detectada | Status | Fonte |`);
    linhasRelatorio.push(`|---|---|---|`);

    if (citacoes.length === 0) {
      console.log("  ⚠️ Nenhuma citação legal detectada.");
      linhasRelatorio.push(`| *(nenhuma citação detectada)* | — | — |`);
      linhasRelatorio.push(``);
      continue;
    }

    for (const citacao of citacoes) {
      const resultado = await verificarNorma(citacao);

      if (resultado.severidade === "erro") totalErros++;
      if (resultado.severidade === "alerta") totalAlertas++;

      console.log(`  ${resultado.statusLabel} → ${citacao}`);
      const fonteMd = resultado.url ? `[${resultado.fonte}](${resultado.url})` : resultado.fonte;
      linhasRelatorio.push(`| \`${escapeMd(citacao)}\` | ${escapeMd(resultado.statusLabel)} | ${fonteMd} |`);
    }

    linhasRelatorio.push(``);
  }

  linhasRelatorio.push(`---`);
  linhasRelatorio.push(``);
  linhasRelatorio.push(`## Resumo`);
  linhasRelatorio.push(``);
  linhasRelatorio.push(`| Indicador | Valor |`);
  linhasRelatorio.push(`|---|---|`);
  linhasRelatorio.push(`| Artigos auditados | ${lista.length} |`);
  linhasRelatorio.push(`| Erros críticos | ${totalErros} |`);
  linhasRelatorio.push(`| Alertas | ${totalAlertas} |`);
  linhasRelatorio.push(``);
  linhasRelatorio.push(`> Itens com \`❌\` ou \`⚠️\` exigem revisão manual do advogado antes da publicação.`);

  writeFileSync(REPORT_PATH, linhasRelatorio.join("\n"), "utf-8");
  console.log(`\n📝 Relatório salvo em: ${REPORT_PATH}`);

  console.log("\n════════════════════════════════════════");
  console.log("📊 RESUMO JURÍDICO");
  console.log(`   Artigos       : ${lista.length}`);
  console.log(`   Erros críticos: ${totalErros}`);
  console.log(`   Alertas       : ${totalAlertas}`);
  console.log("════════════════════════════════════════\n");

  process.exit(totalErros > 0 || totalAlertas > 0 ? 2 : 0);
}

main();
