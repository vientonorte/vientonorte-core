import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const built = new URL("../dist/index.js", import.meta.url);

test("built ESM JSON imports declare type json", () => {
  const source = readFileSync(built, "utf8");
  for (const file of ["catalog.json", "connectors.json", "on-demand.json"]) {
    assert.match(
      source,
      new RegExp(`from ['"]\\./${file}['"] with \\{ type: ['"]json['"] \\}`)
    );
  }
});

test("Node imports the built package entry", async () => {
  const mod = await import(built.href);
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(mod.catalog.version, pkg.version);
  assert.equal(typeof mod.listSkills, "function");
  assert.ok(mod.listSkills().length >= 10);
  const skill = mod.getSkill("check-safety-thresholds");
  assert.equal(skill?.local, "mounted/check-safety-thresholds/SKILL.md");
  assert.equal(mod.getSkill("check-safety"), undefined);
});
