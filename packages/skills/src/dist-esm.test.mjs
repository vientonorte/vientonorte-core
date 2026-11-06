import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const distUrl = new URL("../dist/index.js", import.meta.url);

test("built ESM entry loads JSON modules on Node 22", async () => {
  const source = readFileSync(distUrl, "utf8");
  for (const file of ["catalog.json", "connectors.json", "on-demand.json"]) {
    assert.match(
      source,
      new RegExp(`from ["']\\./${file}["'] with \\{ type: ["']json["'] \\}`)
    );
  }

  const mod = await import(distUrl.href);
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(mod.catalog.version, pkg.version);
  assert.equal(typeof mod.listSkills, "function");
  const ids = mod.listSkills().map((skill) => skill.id);
  assert.ok(ids.includes("check-safety-thresholds"));
  assert.equal(ids.includes("check-safety"), false);
  assert.equal(
    mod.getSkill("check-safety-thresholds")?.local,
    "mounted/check-safety-thresholds/SKILL.md"
  );
});
