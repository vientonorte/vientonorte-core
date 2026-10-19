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
