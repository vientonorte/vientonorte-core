import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const onDemand = JSON.parse(readFileSync(new URL("../src/on-demand.json", import.meta.url), "utf8"));
const connectors = JSON.parse(readFileSync(new URL("../src/connectors.json", import.meta.url), "utf8"));

function skillPath(entry) {
  if (entry.body === "mounted") return join(here, "..", entry.local);
  return join(homedir(), ".grok", "skills", entry.id, "SKILL.md");
}

const arg = process.argv[2];
if (arg === "--connectors") {
  for (const item of connectors.connectors) {
    console.log(`${item.id}\t${item.transport}\t${item.auth}\t${item.use}`);
  }
  process.exit(0);
}

const rows = onDemand.skills.filter((entry) => !arg || entry.id === arg || entry.slash === arg || entry.slash === `/${arg}`);
if (arg && rows.length === 0) {
  console.error(`sin id ${arg}`);
  process.exit(1);
}
for (const entry of rows) {
  const path = skillPath(entry);
  console.log(`${entry.id}\t${existsSync(path) ? "presente" : "ausente"}\t${path}`);
}
