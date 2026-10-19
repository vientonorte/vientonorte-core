import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const catalog = JSON.parse(
  readFileSync(new URL("./catalog.json", import.meta.url), "utf8")
);

test("lists public MCP skills", () => {
  assert.ok(catalog.skills.length >= 10);
  const agent = catalog.skills.find((s) => s.id === "vn-agent");
  assert.ok(agent?.hosted?.includes("/ops/skills/vn-agent"));
});

test("Método Ro hours are Calendar 18 ago", () => {
  assert.deepEqual(catalog.metodo_ro.hours, {
    m1: 5.5,
    vn: 1.5,
    post: 0.75,
    algonova: 3.5,
  });
  assert.ok(catalog.metodo_ro.no.includes("80/10/10"));
});

test("cierre DoD requires Retro deploy + VN branding", () => {
  assert.equal(catalog.metodo_ro.contact, "contacto@vientonorte.io");
  assert.match(catalog.metodo_ro.cierre_mail, /Retro deploy/);
});

test("vn-agent body is mounted in the package", () => {
  const agent = catalog.skills.find((s) => s.id === "vn-agent");
  assert.equal(agent.local, "mounted/vn-agent/SKILL.md");
  const body = readFileSync(new URL("../mounted/vn-agent/SKILL.md", import.meta.url), "utf8");
  assert.match(body, /Agente Viento Norte/);
});

void fileURLToPath;

test("on-demand ids stay out of the public catalog", () => {
  const extra = JSON.parse(readFileSync(new URL("./on-demand.json", import.meta.url), "utf8"));
  const publicIds = new Set(catalog.skills.map((s) => s.id));
  assert.equal(extra.public, false);
  assert.ok(extra.skills.length >= 20);
  for (const skill of extra.skills) {
    assert.equal(skill.public, false);
    assert.equal(publicIds.has(skill.id), false);
    if (skill.body === "machine") assert.equal(skill.local, undefined);
    if (skill.body === "mounted") {
      const body = readFileSync(new URL("../" + skill.local, import.meta.url), "utf8");
      assert.match(body, /^---/);
    }
  }
  assert.ok(extra.skills.some((s) => s.id === "prospecto-local"));
  assert.ok(extra.skills.some((s) => s.id === "ollama"));
});

test("connectors are addressable and cuda stays oauth", () => {
  const reg = JSON.parse(readFileSync(new URL("./connectors.json", import.meta.url), "utf8"));
  const ids = reg.connectors.map((c) => c.id);
  assert.ok(ids.includes("github"));
  assert.ok(ids.includes("vn"));
  const cuda = reg.connectors.find((c) => c.id === "nvidia-cuda-docs");
  assert.equal(cuda.auth, "oauth");
  const server = readFileSync(new URL("../mcp/vn/server.mjs", import.meta.url), "utf8");
  assert.match(server, /vn_health/);
  assert.doesNotMatch(server, /VN_API_KEY|Bearer |_authToken/);
});
