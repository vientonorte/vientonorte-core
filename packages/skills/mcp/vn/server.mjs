#!/usr/bin/env node
/**
 * mcp-vn · stdio NDJSON · GET-only live probes for Viento Norte.
 * MCP spec stdio = one JSON-RPC object per line (no Content-Length).
 * No PII. No wrangler. No Ads. GET /api/health — never HEAD.
 */
const PROTOCOL_FALLBACK = "2025-03-26";
const SUPPORTED = new Set(["2024-11-05", "2025-03-26", "2025-06-18"]);
const SERVER = { name: "mcp-vn", version: "0.3.0" };
const UA = "mcp-vn/0.3";

const TOOLS = [
  {
    name: "vn_health",
    description: "GET contact.vientonorte.io/api/health (not HEAD).",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "vn_finanzas",
    description: "GET finanzas.vientonorte.io/__ssot — MTD, updated, worker.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "vn_paid_landing",
    description: "GET /s/consultoria/ (piloto Ads, no producto) — status + GTM-PM5LBQRP present.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "vn_catalog",
    description: "GET contact.vientonorte.io/mcp discovery (tool names).",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "vn_sitemap",
    description: "GET vientonorte.io/sitemap.xml loc list.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "vn_ops",
    description: "GET vientonorte.io/ops/ and ops/finanzas/ledger.json status.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "vn_gtm_coverage",
    description:
      "GET / /s/ /s/consultoria/ /s/proceso/ — GTM-PM5LBQRP vs gtag.js paralelo.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
];

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

function textResult(obj, isError = false) {
  const out = {
    content: [{ type: "text", text: JSON.stringify(obj, null, 2) }],
  };
  if (isError) out.isError = true;
  return out;
}

async function getText(url, timeoutMs = 8000) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "user-agent": UA, accept: "application/json, text/html, */*" },
      signal: ac.signal,
      redirect: "follow",
    });
    const body = await res.text();
    return { ok: res.ok, status: res.status, body };
  } finally {
    clearTimeout(t);
  }
}

function parseJson(body) {
  try {
    return JSON.parse(body);
  } catch {
    return { raw: String(body).slice(0, 400) };
  }
}

async function callTool(name) {
  if (name === "vn_health") {
    const r = await getText("https://contact.vientonorte.io/api/health");
    return textResult({ method: "GET", status: r.status, json: parseJson(r.body) });
  }
  if (name === "vn_finanzas") {
    const r = await getText("https://finanzas.vientonorte.io/__ssot");
    const json = parseJson(r.body);
    return textResult({
      method: "GET",
      status: r.status,
      updated: json?.updated ?? "NO_DATO",
      algonova_usd_per_hour: json?.algonova_usd_per_hour ?? null,
      summary_mtd_usd: json?.summary_mtd_usd ?? null,
      worker: json?.worker ?? null,
      json,
    });
  }
  if (name === "vn_paid_landing") {
    const r = await getText("https://vientonorte.io/s/consultoria/");
    const gtm = [...new Set(r.body.match(/GTM-[A-Z0-9]+/g) || [])];
    return textResult({
      status: r.status,
      gtm,
      gtag_js_parallel: /googletagmanager\.com\/gtag\/js/.test(r.body),
      has_gratis: /Gratis/i.test(r.body),
      has_accesibilidad: /accesibilidad/i.test(r.body),
      has_radar_headline: /<h1[^>]*>[^<]*Radar/i.test(r.body),
    });
  }
  if (name === "vn_catalog") {
    const r = await getText("https://contact.vientonorte.io/mcp");
    return textResult({ status: r.status, json: parseJson(r.body) });
  }
  if (name === "vn_sitemap") {
    const r = await getText("https://vientonorte.io/sitemap.xml");
    const locs = [...r.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    return textResult({ status: r.status, locs });
  }
  if (name === "vn_gtm_coverage") {
    const urls = [
      "https://vientonorte.io/",
      "https://vientonorte.io/s/",
      "https://vientonorte.io/s/consultoria/",
      "https://vientonorte.io/s/proceso/",
    ];
    const pages = [];
    for (const url of urls) {
      const r = await getText(url);
      const gtm = [...new Set(r.body.match(/GTM-[A-Z0-9]+/g) || [])];
      pages.push({
        url,
        status: r.status,
        gtm,
        gtm_js: /googletagmanager\.com\/gtm\.js/.test(r.body),
        gtag_js_parallel: /googletagmanager\.com\/gtag\/js/.test(r.body),
        tagged: gtm.includes("GTM-PM5LBQRP") || /googletagmanager\.com\/gtm\.js/.test(r.body),
      });
    }
    return textResult({
      container: "GTM-PM5LBQRP",
      ga4: "G-G7JXJKGCDV",
      note: "SPA / HTML sin gtm.js en el source sigue pudiendo etiquetarse via initGTM. Coverage GTM lee HTML /s/.",
      pages,
    });
  }
  if (name === "vn_ops") {
    const page = await getText("https://vientonorte.io/ops/");
    const ledger = await getText("https://vientonorte.io/ops/finanzas/ledger.json");
    return textResult({
      ops: { status: page.status },
      ledger: { status: ledger.status, json: ledger.ok ? parseJson(ledger.body) : null },
    });
  }
  throw new Error("unknown tool: " + name);
}

function handle(msg) {
  if (Array.isArray(msg)) {
    for (const m of msg) handle(m);
    return;
  }
  const id = Object.prototype.hasOwnProperty.call(msg, "id") ? msg.id : undefined;
  const method = msg.method;
  const reply = (result) => {
    if (id === undefined) return;
    send({ jsonrpc: "2.0", id, result });
  };
  const fail = (code, message) => {
    if (id === undefined) return;
    send({ jsonrpc: "2.0", id, error: { code, message } });
  };

  if (method === "initialize") {
    const asked = msg.params?.protocolVersion;
    const protocolVersion = SUPPORTED.has(asked) ? asked : PROTOCOL_FALLBACK;
    reply({
      protocolVersion,
      capabilities: { tools: { listChanged: false } },
      serverInfo: SERVER,
    });
    return;
  }
  if (method === "notifications/initialized" || method === "notifications/cancelled") {
    return;
  }
  if (method === "tools/list") {
    reply({ tools: TOOLS });
    return;
  }
  if (method === "resources/list") {
    reply({ resources: [] });
    return;
  }
  if (method === "prompts/list") {
    reply({ prompts: [] });
    return;
  }
  if (method === "ping") {
    reply({});
    return;
  }
  if (method === "logging/setLevel") {
    reply({});
    return;
  }
  if (method === "tools/call") {
    const name = msg.params?.name;
    callTool(name)
      .then((result) => reply(result))
      .catch((err) => reply(textResult({ error: String(err.message || err) }, true)));
    return;
  }
  if (id !== undefined) fail(-32601, "Method not found: " + method);
}

let buf = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buf += chunk;
  let nl;
  while ((nl = buf.indexOf("\n")) !== -1) {
    const line = buf.slice(0, nl).replace(/\r$/, "").trim();
    buf = buf.slice(nl + 1);
    if (!line) continue;
    try {
      handle(JSON.parse(line));
    } catch (e) {
      send({
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: String(e.message || e) },
      });
    }
  }
});
process.stdin.on("end", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
process.on("SIGINT", () => process.exit(0));
