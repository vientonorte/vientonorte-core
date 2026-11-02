---
name: vn-improve
description: >
  Algoritmo de mejora VN: mide hechos live, puntúa gaps en el workflow
  (Método Ro / Calendar 18 ago), verifica el top. Workflow never auto-runs wrangler.
  Use when: /vn-improve, $ live stale, MCP sin list_skills, after cierre,
  after vn-design-ops Test, o /vn-agent upgrade.
---

# /vn-improve

**Fuente:** workflow `~/.grok/workflows/vn-improve.rhai` (no reimplementar el score en el agente).

```text
/vn-improve
/workflow vn-improve {"apply":false}
```

## Algoritmo (en el script)

1. **Measure** — 5 probes en paralelo. Solo hechos (`http_ok`, `updated`, `hours_*`, `has_list_skills`, `elements_healthy`, `cuda_healthy`).
2. **Rank** — Rhai, no el LLM:

| id | score | bucket | acción |
|----|------:|--------|--------|
| `finanzas-stale` | 100 | P0 | Worker finanzas — solo humano, por orden del TL: `cd worker && npm ci && npx --no-install wrangler deploy --keep-vars` |
| `finanzas-unreachable` | 90 | P0 | re-curl; no wrangler |
| `api-health` | 80 | P0 | check contact worker |
| `mcp-skills-missing` | 70 | P1 | merge FO#202 + deploy Worker contact — solo con OK de Rö + orden TL (humano) |
| `nvidia-cuda-oauth` | 50 | P2 | si doctor falla: re-OAuth NVIDIA (`mcp_credentials.json`) |
| `nvidia-elements-down` | 45 | P2 | `nve mcp` / `grok mcp doctor nvidia-elements` |
| `ops-skills-hours` | 40 | P2 | hard refresh (docs en main) |

Stale `$` = `updated` < `args.calendar` (default `2026-08-27`) **o** hours ≠ 0 / 1.5 / 0.75 **o** `split_policy` ≠ `algo40_lv_m1_park` **o** tarifa Algonova ≠ la del vault (ver vault; sin cifras aquí). Hub PR #91 merged; git-proxy lee `main`. Workflow never auto-runs wrangler. If $ stale, surface P0 deploy (solo humano, por orden del TL: `cd worker && npm ci && npx --no-install wrangler deploy --keep-vars`); the agent never merges or deploys.

Loop token-out (0 LLM, sí dejar corriendo): `vn-watch-ab` / `vn-m5 watch`. Search ENABLED no.

3. **Improve** — un agente re-curl (o re-doctor) el top. `confirmed=true` solo con snippet. `curl (7)` largo (~287 s) en `contact.vientonorte.io` **no** confirma caída: re-curl `--connect-timeout 5 --max-time 8`. Si `apply=true` → `await_user`. Workflow never auto-runs wrangler. If $ stale, surface P0 deploy (solo humano, por orden del TL: `cd worker && npm ci && npx --no-install wrangler deploy --keep-vars`); the agent never merges or deploys. CUDA timeout = PARK (canon).

Padre loop: `/vn-agent`. Después de un Test de `vn-design-ops`, correr esto antes de `/CierreVNHOY`.

## Horas

Método Ro (canon). Este run es tramo **VN 1.5h**. No gastar Ads. M1 está en 0, PARK.

Si el pedido es un upload Penji y dice "aplica dodo y metodo ro para upload", "homologa con metodo ro y aplica dodo para upload", o "/vn-improve aplica metodo ro para todo", aplicá Método Ro a ese upload (ticket → pieza → ZIP DoD). No uses este canon de horas para miniaturas de YouTube.

Padre: `/vn-agent`.
