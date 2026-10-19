# Canon VN · una casa por hecho

Leer esto antes de editar skills `*-vn` o el agente `vn-agent`. No duplicar tablas de URLs en cada skill.

## Paths

| Rol | Path |
|-----|------|
| Repo FO | `/Users/ro/Library/Mobile Documents/com~apple~CloudDocs/Documents/GitHub/mi-portafolio` |
| Obsidian | `/Users/ro/Library/Mobile Documents/iCloud~md~obsidian/Documents/Ro/Viento Norte/` |
| Live FO | `https://vientonorte.io/` |
| **UI interna / QA** | `https://vientonorte.io/#/consultoria` (HashRouter · `ConsultoriaVientoNorte`). Solo ruta técnica; nunca salida a clientes. |
| **POC Apple (PR #130)** | `https://vientonorte.io/#/consultoria/modulos/dashboard` (`PocProductOnboarding`). No es el embudo. `/#/poc/product-onboarding` redirige al embudo. |
| **Orgánico crawler** | `https://vientonorte.io/servicios/` **sin `/s/`** (Decider 14-sep). Hops `/s/servicios/*` = noindex. **No 301** las locs ya en GSC. |
| **Ads / producto** | Final URL = `https://vientonorte.io/servicios/?<utm>` (a11y_gratis_pymes: `?<utm>#revision-gratis`; la query va antes del ancla). `/servicios/<slug>/` redirigen (#279), `/s/consultoria/` y `/#/consultoria` no son URLs de salida. |
| CMS | `https://vientonorte.io/#/admin` · `#/admin/fotos` |
| APIs + MCP | `https://contact.vientonorte.io` |
| Ops | `https://vientonorte.io/ops/` |
| QA única | `https://vientonorte.io/qa/` (`noindex`). Una página para las pruebas del `main` publicado. |
| Local Vite | `http://localhost:3000/` (Vite `server.port` 3000; base `/`). `127.0.0.1:5173/mi-portafolio` obsoleto. Gate `npm run smoke:cierre` contra localhost:3000 antes de que Rö haga merge (check, no merge nuestro). |
| Contacto | `contacto@vientonorte.io` |
| Cierre mail | Borrador, nunca envío → `gaete.gaona@icloud.com` **y** `gaete.gaona@gmail.com`. Body `## Retro deploy`. Workflow `cierre-vn-hoy`. Rö envía. |

Nunca documentar clones fuera de iCloud salvo que Rö lo pida.

## Regla de URLs a clientes (2026-09-27)

Para ads, CTAs, correos, borradores, propuestas y links finales, usar únicamente `https://vientonorte.io/servicios/` (+UTM antes del ancla; ancla opcional `#web-pymes` | `#revision-gratis` | `#consultoria-ux`; a11y gratis → `#revision-gratis`, consultoría → `#consultoria-ux`). `/servicios/diagnostico-accesibilidad-wcag/` y `/servicios/consultoria-ux-pymes/` son páginas de redirección desde #279: nunca link final. Nunca usar `/s/`, `/#/` ni `/news/` (404). Única excepción `/s/`: `/s/polijuego-privacy/` (privacidad Play Store, fuera del sitemap, keep en `legacy-redirects.json`; no es superficie comercial). Las reglas anteriores quedan superadas.

**Browser humano / OAuth / smoke visual:** **Safari** (`open -a Safari <url>`).  
**GTM Preview / Tag Assistant:** **Chrome logueado** (no el perfil MCP). Safari + AdGuard Mini deja `google_tag_manager` undefined — skill `/gtm-vn`. Chrome MCP = `~/.cache/chrome-devtools-mcp` · sin login Google.

## Producto

- Marca B2B: **Viento Norte** (no rostro). Headline sitio: *Diseño que reduce el ruido.*
- Oferta: Diagnóstico · Prototipo · Proceso · App. PackLabel: Radar · Marco · Ops.
- Gratis = a11y de **un** flujo (WCAG 2.2 AA). Nunca `/#/auditoria` ni `/poc#/auditoria` como freemium.
- **`/poc` y `/poc#/auditoria` deprecados** → redirect técnico a `/#/consultoria` (interno; salida a clientes = `https://vientonorte.io/servicios/#consultoria-ux`). `/#/auditoria` = mentoría (muestra, noIndex).
- Producto UI interno (QA, nunca salida a clientes): **`/#/consultoria`**. POC Apple: **`/#/consultoria/modulos/dashboard`**. Orgánico: **`/servicios/*`**.  
- Paid final URL = **`https://vientonorte.io/servicios/?<utm>`** (a11y_gratis_pymes: `?<utm>#revision-gratis`). `/servicios/<slug>/`, `/s/consultoria/` y `/#/consultoria` quedan superados como salida a clientes. Gate $0 hasta GTM Preview `generate_lead` **y** `book_call` (`/gtm-vn` · `docs/CHECKLIST-CANALES-PAID.md` D).

## APIs (GET live)

Contrato: `docs/API-KICKOFF.md`

- `GET /api/health` → `{ok, service: vientonorte-api, kv: true, time}`
- `GET /mcp` → discovery · 6 tools · protocol `2024-11-05`
- `POST /mcp` → JSON-RPC. Write tools: `VN_API_KEY` (aún no en secrets).
- BD: KV `ADMIN_KV` + R2. Visor: `#/admin`. No es Postgres.

## MCP (Grok)

Config: `~/.grok/config.toml`. CLI Elements: `nve` (`@nvidia-elements/cli`).

| Server | Transporte | Estado |
|--------|------------|--------|
| `nvidia-elements` | stdio `nve mcp` | 18 tools · handshake OK |
| `nvidia-cuda-docs` | HTTP `https://api.copilot.nsight.ngc.nvidia.com/mcp/cuda-docs` | Doctor 2026-10-07: `OAuth client not configured`. **PARK**. Elements sano. |
| `vn` | stdio `node ~/.grok/mcp/vn/server.mjs` | GET live probes · skill `/mcp-vn` · no PII |
| `github` | plugin HTTP `https://api.githubcopilot.com/mcp/` | handshake OK · login `vientonorte` · FO `mi-portafolio` · playbook `/mcp-vn` |

PRs / issues / CI / Dependabot: **GitHub MCP** (`github__*`), no `gh` CLI. `owner=vientonorte`. Repo FO = `mi-portafolio`. No duplicar el server en `[mcp_servers]`. Copilot coding agent solo si Rö lo pide.

**Ollama (M5):** `ollama serve` en `127.0.0.1:11434`. Apertura y skill sin cuota: `vn-agent/SKILL.md`, sección «Tokens xAI = 0». Un modelo a la vez. No cargar `gemma4` junto a Chrome. Cron A+B **no** usa LLM. Cierre: `vn-tokens-saved --since today` (local vs cloud; no inventar $). Sprint y noche de Hermes: `vn-agent/SKILL.md`, sección «Dos modos de Hermes».

DS prod **sigue** `@vientonorte/*`. Elements no reemplaza tokens/UI VN.

## GTM

Skill `/gtm-vn`. Contenedor `GTM-PM5LBQRP` · GA4 `G-G7JXJKGCDV`. Versión 4 (20 ago): Event `generate_lead` **y** `book_call` live. `submit_contact_form` no. No MCP GTM.

Preview Chrome (no Safari+AdGuard, no Chrome MCP): `book_call` PASS 20 ago (Agendar). **`generate_lead` Tag Assistant 28 ago 12:53: NO activado** (solo `GA4 · vientonorte.io`). Collect `en=` no sustituye Etiquetas activadas. `dataLayer` solo no basta.

## SEM / SEO · orden lock (24 ago · Decider)

No saltar. Skills: `/gtm-vn` → `/google-ads-vn` → `/seo-vn`.

1. **P0 humano:** Tag Assistant Preview → `https://vientonorte.io/servicios/#revision-gratis` → **Gratis · accesibilidad** → `GA4 · generate_lead` **en Etiquetas activadas**. 12:53: aún no (solo Google tag).
2. **P0 spend:** si Preview PASS, Decider dice *activar campañas*. Final URL = `https://vientonorte.io/servicios/?<utm>` (a11y_gratis_pymes: `?<utm>#revision-gratis`). Las rutas `/s/consultoria`, `/#/consultoria` y `/servicios/<slug>/` quedan superadas como salida. Conversión = eventos, **no** clic de página. `$0` hasta entonces.
3. **Luego QA:** UTM **después del hash** + Vite de verdad (`npm run dev`) + `bash ~/.grok/skills/google-ads-vn/scripts/local-ads-scenarios.sh http://localhost:3000`.
4. **Regla de copy:** anuncio = **Diagnóstico / accesibilidad de un flujo**. No «Radar» en headline. Free ≠ `/#/auditoria`.

SEO orgánico: crawler lee **HTTP** (`/servicios/*`, no hash, no `/s/` como producto). `/s/consultoria/` = página de redirección (200, noindex, meta refresh a `../../servicios/#consultoria-ux`, canonical `/servicios/`); nunca salida a clientes. Sitemap live 12 locs (14-sep · descubiertas ≠ indexadas; 4 «descubierta sin indexar»). Canonical = HTML `rel=canonical`, **no** dentro del XML. Vite: `/servicios/foo/` debe servir `public/servicios/foo/index.html`, no el shell SPA. **No** crear `https://vientonorte.io/consultoria/` estática. Curso SEO Austral no desbloquea Ads.

**No mezclar silos:** FO (`mi-portafolio`, `/servicios`) ≠ Contra-Archivo (tesis). Bot CA: `antropologia-corrupcion/docs/GROK-BOT-CA.md`. Prosa Drive ≠ figs (v18 Drive / v20 `.docx` 11 MB). Pegar INDEX a GDoc **mata** láminas. Etnografía = método, no anexo. C1 sin voz.

**Git FO:** `main` protegido → PR. iCloud git puede `mmap` fail → PRs desde clone `~/code/mi-portafolio-solid`. GitHub MCP `create_pull_request` a menudo **403** → `gh` CLI como `vientonorte`. `fix/qa-hash-ui` sucio: no mezclar SOLID/SEO ahí.

## Micro1 (W11 / GWin)

- Portal Realm: `https://realm.micro1.ai/`
- **`claims_open = 0` · PARK 27 ago** (Decider M5). Sin captura / sin F7 hasta nuevo aviso.
- MTD **59 · $90.86** (`__ssot` 19 ago · worker v21 git-proxy). Skill `/micro1-pipeline`. STATE: `MICRO 1/03-software/pipeline/STATE.md`.

## Algonova

- **P0 ingreso:** bienvenida 28 ago (pegada; **no** en Gmail Personal). Contrato **Deel** + cédula (humano). Coordinador: **Mario Villaseñor**. Telegram + reunión mensual obligatoria.
- **Carga mín. contrato: 15 h/sem.** $4 ind. / $6 grupal. Pago mensual días 5–10. Franjas ops: L–V **15:00–19:00 CDMX** (= 17:00–21:00 CL ago; 18:00–22:00 post-DST) + **finde mañana**.
- **Calendar 28 ago:** L–V 17:00–21:00 CL (15–19 CDMX) = 20 h · S–D 10:00–13:00 = +6 · cupo **26 h**. Piso 15 h = **$60/sem**. Cupo L–V = **$80/sem** ($16/día). Cupo 26 = **$104/sem**. 40 h SUPERSEDED. Arranque **lun 31**. Vie 28 EXDATE. Dom 30 EXDATE.
- **Onboarding:** M1 avisado 21 ago (no reenviar). Safari `https://learn.alg.academy/`. Lesson 29616 pendiente login. $0 hasta clases + Deel.
- One-shot Camila/vida → **saltar**. Comms: vault `Resources/ALGONOVA-COMUNICACION.md`.

Design Ops unificado: workflow `~/.grok/workflows/vn-design-ops.rhai` (Design Thinking = DS). `/design-sprint-vn` es el marco; el workflow orquesta LLM. MCP chrome/elements **pueden no existir en hijos** — evidencia = curl + FO.

Un turno, una skill. `vn-design-ops` y `vn-improve` solo si Rö escribe el nombre. Ver `vn-agent/SKILL.md`.  
SSOT: `Viento Norte/Resources/PIPELINE Design Ops SSOT.md`.  
Inventario tools/AI: `Viento Norte/Resources/BLUEPRINT VN AI agentes.md`.  
Benchmark Ilógica / Modyo / Multiplica, 17 oct 2026: `Viento Norte/Research/Benchmark Ilógica Modyo Multiplica 2026-10-17.md`. Lo usa `/ux-writing-vn`. Lista pyme aparte: `Research/Benchmark precios Radar Marco Ops 2026-08-13.md`.

## Skills hijas (13)

| # | Skill | Para qué |
|---|-------|----------|
| 1 | `docs-vn` | Changelog, arquitectura, canon nav |
| 2 | `seo-vn` | SEO / onboarding local-first |
| 3 | `google-ads-vn` | SEM / message match · final `https://vientonorte.io/servicios/` (+UTM) |
| 4 | `gtm-vn` | Tag Assistant, Preview, tags `generate_lead`/`book_call` |
| 5 | `ux-writing-vn` | Copy marca |
| 6 | `lead-a11y-vn` | Pipeline Radar gratis (Gmail/Drive/Calendar) |
| 7 | `kpi-vn` | Stamp proceso/valor |
| 8 | `design-sprint-vn` | Marco DS |
| 9 | `cierre-sesion-vn` | Cierre de sesión |
| 10 | `cierre-vn-hoy` | Cierre del día → Session |
| 11 | `m5-vn` | Atajos locales /ops |
| 12 | `vn-bdp` | Botones de pago · Fintoc / X\|CMS cobro |
| 13 | `linkedin-seo-vn` | Orgánico LinkedIn: weekly company + news perfil (no pauta; no `/s/`) |

## Horas (Método Ro)

SSOT: vault `00-sistema/CALENDAR-SESSION-UNIFICADO.md` · `00-sistema/METODO-RO-AGENT.md`.  
**No 80/10/10 ni 80/20.** Decider **2026-08-28** (plantilla Calendar).

L–V: **Algonova 4.0** (cupo 20 h/sem; +6 finde = 26) · **Post 0.75** · **VN citas 09–13** + **OPS 14:00–15:30** · **CIPER 15:30–16:15** · **M1 0 PARK**. Un stamp `✓ SESSION` en Personal.
Audit horas: vault `00-sistema/CALENDAR-SESSION-UNIFICADO.md` **2026-08-28**.

**Penji (Rö, 2026-10-06):** el turno es L–V **09:00–17:00** America/Santiago. Ese bloque es empleo Penji. No entra en el cupo Método Ro (M1, VN, Post, Algonova): Penji ya no ocupa el tiempo de Rö. Fuera de 09:00–17:00 no hay ticket, Figma ni cierre Penji.

Ledger $: `MICRO 1/07-pagos/dashboard/ledger.json` · live `https://finanzas.vientonorte.io/` (puede ir atrasado vs plantilla).

## Decider

Rö. Ship prod y spend: solo con ok explícito.
