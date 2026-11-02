---
name: preprod-qa
description: >
  Orquesta gate técnico FO + revisión multi-agente antes de prod (GO/NO-GO).
  Use when: before merge to main / ship FO, /preprod-qa. After ship, hand off to /cierre-vn-hoy. Prefer local M5.
---

# /preprod-qa

**Fuente:** workflow `~/.grok/workflows/preprod-qa.rhai`  
Script técnico: `mi-portafolio/scripts/preprod-gate.sh`

```text
/preprod-qa
```

Human Test path (H2, favicon, HU-01 title, HU-02 canonical, SEM $0) **no** lo cierra el agente.

## Horas

Método Ro (canon). Este gate es el tramo **VN 1.5h**. No gastar Ads.

Verdict: **GO / NO-GO** con evidencia de comando. Sin script → `NO DATO`.

## Improve (fase 4)

Tras el verdict, un agente **solo mide** ledger/MCP/health. El script puntúa:

| id | score | acción |
|----|------:|--------|
| `finanzas-stale` | 100 | Solo humano, por orden del TL: `cd worker && npm ci && npx --no-install wrangler deploy --keep-vars` |
| `finanzas-unreachable` | 90 | re-curl; no wrangler |
| `api-health` | 80 | check contact worker |
| `mcp-skills-missing` | 70 | merge FO#202 + wrangler contact |

`args.improve=false` salta la fase. Nunca wrangler desde el workflow. Human Test path sigue abierto.
