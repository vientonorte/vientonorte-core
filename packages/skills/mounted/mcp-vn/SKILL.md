---
name: mcp-vn
description: >
  MCP Viento Norte: qué servidores tener, stdio mcp-vn (live GET probes),
  y GitHub MCP (PRs/issues/CI org vientonorte).
  Use when: /mcp-vn, MCP VN, contact.vientonorte.io/mcp, "qué MCP", develop mcp-vn,
  GitHub MCP, PRs vientonorte, issues, Dependabot, CI Actions.
---

# /mcp-vn

Padre: `/vn-agent`. Canon: `~/.grok/skills/vn-agent/references/canon.md`.

**Ya existe prod:** `GET https://contact.vientonorte.io/mcp` (catálogo + write con `VN_API_KEY`). Grok **no** lo handshakea como streamable HTTP.

**Stdio (este skill):** `node ~/.grok/mcp/vn/server.mjs` · config `[mcp_servers.vn]`.  
Transporte: **NDJSON** (una línea JSON-RPC). No Content-Length. Gate: `grok mcp doctor vn` healthy. Tras editar config: `/mcps` → `r`.

## Tools (GET only)

| Tool | URL |
|------|-----|
| `vn_health` | `GET /api/health` (nunca HEAD) |
| `vn_finanzas` | `GET finanzas…/__ssot` |
| `vn_paid_landing` | `GET /servicios/` GTM — URL final Ads |
| `vn_catalog` | `GET /mcp` discovery |
| `vn_sitemap` | `GET /sitemap.xml` |
| `vn_ops` | `GET /ops/` + `ops/finanzas/ledger.json` |
| `vn_gtm_coverage` | GET `/` `/servicios/` · GTM-PM5LBQRP |

No PII. No wrangler. No Ads.

## Orden de MCPs (no reinventar)

1. **Usar** los que ya handshakean: github, gmail, google_calendar, google_drive, tasks, figma, chrome-devtools (Preview ≠ este Chrome), cloudflare + docs/bindings/builds/observability, nvidia-elements.
2. **stdio mcp-vn** (ops live · `grok mcp doctor vn` healthy). Con el TUI abierto, `/model ollama-qwen-light` lee y redacta y no publica `main`. Si el binario está cerrado, `grok -m ollama-qwen-light` y `ollmcp` no reemplazan las skills. Corre `/Users/ro/bin/vn-night-local.sh --now` o `--work`. Esa corrida no toca QA de `/servicios/`, Figma, GitHub, correo, DNS ni un ship.
3. **Más tarde:** conteo leads en Worker (API key, sin dump). No es un segundo proceso: tool extra en este server.
4. **Nunca MCP propio** para GTM Preview, Ads ENABLED, LinkedIn 2FA, GSC. PARK: wix, aws-*, graphos, nvidia-cuda-docs (OAuth OK, no trabajo).

## GitHub MCP (plugin · no stdio)

Plugin `github` → `https://api.githubcopilot.com/mcp/`. Auth: login **`vientonorte`**. No añadir `[mcp_servers.github]` (duplica tools).

Default salvo que el pedido nombre otro: `owner=vientonorte` · `repo=mi-portafolio`.

| Pedido | Tool |
|--------|------|
| quién soy | `github__get_me` |
| PRs abiertos org | `github__search_pull_requests` query `org:vientonorte is:open` |
| PRs de un repo | `github__list_pull_requests` |
| CI / checks de un PR | `github__pull_request_read` `method=get_status` |
| diff / files / commits PR | `github__pull_request_read` `get_diff` / `get_files` / `get_commits` |
| branches | `github__list_branches` |
| Actions | `github__actions_list` |
| comment issue/PR | `github__add_issue_comment` |
| crear PR | `github__create_pull_request` (`base=main`) |

Hygiene semanal: workflow `/org-hygiene` (este MCP). `main` protegido → PR, no force-push.

**GitHub MCP** `create_pull_request` / merge a menudo **403**. Entonces **`gh` CLI** como org `vientonorte` (no duplicar el server en config). **No:** `create_pull_request_with_copilot` salvo pedido explícito. **No:** inventar CI.

`vn_sitemap`: 12 locs live (14-sep) incluyendo `/servicios/`; `/s/consultoria/` es redirección y queda fuera del sitemap. GSC no hay MCP — pegar sitemap es humano. Descubierta ≠ indexada.

## Grok Bot (app `com.anysphere.sand`)

Settings locales: `~/.grokbot/settings.json`. Zona `America/Santiago`. Plugin FO (id `4073206`) lleva el playbook GitHub de arriba.

En la app: **Settings → Plugins → Marketplace → GitHub** (auth en browser). Bot FO: **View conversation details → Agent settings** y pegar el mismo default `owner=vientonorte` / `repo=mi-portafolio`. Routine hygiene: weekday 8:00 CL, solo reportar PRs/CI; merge = Decider. `@` connector GitHub en el chat.

## Slash

`/mcp-vn`
