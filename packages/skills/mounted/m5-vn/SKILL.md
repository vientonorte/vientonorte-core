---
name: m5-vn
description: >
  Atajos locales del stack M5 (Apple Silicon 16 GB) para Viento Norte: cierre,
  Session stamp/sync, sprint menu, smoke:cierre, Ollama liviano, status data-driven.
  Use when: user says M5, atajos M5, vn-m5, /m5-vn, smoke local, leverage M5,
  o pide el menú de automaciones locales del PDF M5/Google.
---

# M5 · atajos locales VN

Padre: `/vn-agent`. Paths/live: `~/.grok/skills/vn-agent/references/canon.md`.

**Fuente canónica del concepto M5:**  
`Desktop/VN-Automaciones-M5-Google-2026-07-26.pdf` · live ops PDF  
Frase guía: *upgrade M5 = matriz local + subagentes* (no inventar métricas de hardware).

## DATA DRIVEN (obligatorio)

- **Nunca inventar** horas, KPIs, “foco real”, ni estado de CI sin comando.
- Si no hay proceso/archivo/API → responder **`NO DATO`** + qué medir.
- `vn-m5 status` es la fuente de verdad de procesos/git locales.

## Comando único

```bash
vn-m5              # menú / help
vn-m5 list
vn-m5 <atajo>
```

Script: `/Users/ro/bin/vn-m5`

## Mapa de atajos

| Atajo | Acción real |
|-------|-------------|
| `close` / `cierre` | **`vn-cierre-hoy`** (= `/CierreVNHOY` continuum) |
| `sync` | payload Calendar Session (`vn-sync-session-close`) |
| `stamp` | `vn-session-stamp` (focus → Sessions) |
| `daily`…`sprint2` / `1`–`7` | scripts en `~/Developer/scripts/vientonorte-sprint/` |
| `smoke` | `npm run smoke:cierre` en `~/code/mi-portafolio` (`VN_REPO`) **si** `http://localhost:3000/` escucha (check antes de que Rö haga merge; no mergeamos). `:5173` es obsoleto |
| `audio` | `vn-audio-native`: micrófono y altavoces integrados del MacBook Pro. No desinstala NDI |
| `ollama-light` | `ollama list` (dato) + recordatorio ≤8B / 1.5b |
| `ollama-unload` | `pkill -f ollama-loop-sprint2` si existe |
| `ops` | open `https://vientonorte.io/ops/` |
| `log` | path `Sessions/YYYY-MM-DD.md` si existe |
| `status` | git HEADs + loop/vite/ollama + stamp log |
| `watch` / `ab` | `vn-watch-ab` · Algo $4/h live + Calendar M1 · 0 LLM |
| `cromatico` | `vn-cromatico` · Clave A/B + table-ro proxy |
| `board` | mapa C-suite token-out |
| `roles` | `vn-watch-ab roles` · Ollama local (`qwen2.5:1.5b`) |
| `ollama-up` | arranca Ollama.app si `:11434` caído |
| `tokens` | orquesta token-out: Ollama up + A+B + mapa + **`vn-tokens-saved`** (local vs cloud) |
| `work` | `vn-watch-ab work` · brief Ollama + Safari `WORK.html` |

## Qué hace el agente con `/m5-vn`

1. Si el usuario pide un atajo concreto → ejecutar `vn-m5 <atajo>` (no reimplementar).
2. Si pide “estado M5” → **solo** `vn-m5 status` (+ `ollama list` si pide modelos).
3. Si pide smoke y no hay `localhost:3000` → reportar NO DATO; no inventar PASS.
4. Tras `close` → enriquecer Sessions solo con **ship medible** (git log, PRs); no inventar horas de foco.
5. No lanzar gemma4/9B en paralelo con Playwright sin que el usuario lo pida (límite 16 GB del PDF).

## Apple Shortcuts / Raycast

Crear atajos que ejecuten shell:

```bash
/Users/ro/bin/vn-m5 status
/Users/ro/bin/vn-m5 close
/Users/ro/bin/vn-m5 smoke
```

Nombres sugeridos: `VN M5 Status`, `VN M5 Cierre`, `VN M5 Smoke`.

Session.app automation (`session_end`) → preferir `vn-session-stamp`, no el menú completo.

## Relación con otros skills

| Skill | Rol |
|-------|-----|
| `/cierre-sesion-vn` | Cierre día (usa mismos bins) |
| `/docs-vn` | Docs de feature (no atajo M5) |
| `/seo-vn` · `/google-ads-vn` | Detrás de `smoke:cierre` |
| `/lead-a11y-vn` | Google pipeline (P2 del PDF, no es atajo M5 local) |

## SSOT paths (2026-08-06 QA)

- **Obsidian canónico:** `iCloud~md~obsidian/Documents/Ro/Viento Norte`.  
  No escribir Sessions en vaults paralelos (`CloudDocs/Documents/Obsidian Vault`).
- **Horas:** Método Ro (canon) — M1 0 PARK · VN 1.5 · Post 0.75 · Algonova 4º. Ledger `MICRO 1/07-pagos/dashboard/ledger.json` · live puede ir atrasado vs plantilla.
- **QA única:** `https://vientonorte.io/qa/` es la página de pruebas del `main` publicado. El canvas del sprint es `https://vientonorte.io/ops/`.
- **ĀRŪḾA:** checklist `ops/ARUMA-CHECKLIST.md` · bloqueado en cuenta Google humana.

## Anti-patterns

- Estimar “llevamos X horas en el M5”
- Decir smoke PASS sin salida del script
- Confundir M5 (hardware/stack local) con carpeta Obsidian `Sessions/`
- Apuntar el smoke a otro clone sin acuerdo. Desde 2026-10-23 `vn-m5 smoke` usa `~/code/mi-portafolio`. La carpeta iCloud no se mueve. No correr git en los otros clones de Documents/GitHub
- `git pull` en iCloud con `refs/remotes/origin/*.lock` (mmap): no `reset --hard`. Stash WIP (medicinal), `git fetch origin main:refs/remotes/origin/main-tmp`, ff, `branch -u origin/main`. Tabs con SW viejo (`id-medicinal-v1`) → incógnito; live uxtools = `uxtools-suite-v5`.

## Slash

`/m5-vn` — menú o atajo M5 local data-driven.
