---
name: auditor-a-vn
description: Use when Decider asks for Auditoría VN / UNI (Viento Norte live FO health) — curl+node evidence pack, no Cloud Agent, no prod ship.
---
# Auditoría VN (vientonorte.io / FO)

## When
Use when Decider/BuJo says «auditoría VN», «auditoría UNI» (alias Decider 2026-09-13 = VN), or weekly FO health without Cloud Agents.

## Scope
Public evidence only for:
- https://vientonorte.io/
- https://vientonorte.io/servicios/ (hub servicios = única URL final a clientes; anclas #web-pymes, #revision-gratis, #consultoria-ux)
- https://vientonorte.io/servicios/diagnostico-accesibilidad-wcag/ y https://vientonorte.io/servicios/consultoria-ux-pymes/ (páginas de redirección desde #279: verificar 200 + meta refresh a /servicios/#…; nunca link final)
- https://vientonorte.io/s/polijuego-privacy/ (única excepción /s/: privacidad Play Store, fuera del sitemap, keep en legacy-redirects.json; no comercial)
- https://vientonorte.io/antropologia-corrupcion/
- https://vientonorte.github.io/antropologia-corrupcion/ (expect 301 → custom domain)

**Canon URLs a clientes (Decider 2026-09-27, supera la regla del 25-sep):** ads, CTAs, links finales y borradores usan solo `https://vientonorte.io/servicios/` (+UTM antes del ancla; ancla opcional `#web-pymes` | `#revision-gratis` | `#consultoria-ux`; campaña a11y_gratis_pymes → `?<utm>#revision-gratis`). Nunca `/s/...`, `/#/...` (tampoco `/#/consultoria` ni `/#/digitalizacion`), `/news/` ni `/servicios/<slug>/` (redirigen desde #279). Única excepción `/s/`: `/s/polijuego-privacy/` (privacidad Play Store, fuera del sitemap, keep en `legacy-redirects.json`; no es superficie comercial).

**Deprecated:** `/s/consultoria/` (redirección a `/servicios/#consultoria-ux`), `/s/web-express/`, `/s/news` y `/news/` (404), `/#/consultoria`, `/#/digitalizacion`, `/#/sobre-mi` y `/servicios/<slug>/` como enlace a clientes — never treat as canonical or as final URL. Flag as P1 any live nav/footer/CTA/sitemap/canonical/ad/draft still pointing to them.

## Steps
1. curl -sI / -sL sample: status, final URL, title, og:title, og:url, link rel=canonical.
2. Confirm `/s/news` and `/news/` are 404. Confirm `/s/consultoria/` = 200 con meta refresh a `../../servicios/#consultoria-ux` y canonical `https://vientonorte.io/servicios/` (no 301). List any live links to `/s/...` (salvo `/s/polijuego-privacy/`), `/#/...` or `/servicios/<slug>/`.
3. From checkout `antropologia-corrupcion` if present: `node scripts/qa-live.mjs --base=https://vientonorte.io/antropologia-corrupcion` and `qa-links.mjs` same base.
4. Emit dated `/workspace/vn-audit-YYYY-MM-DD.json` + `.md` with pass/fail table and P0 list.
5. WCAG/Lighthouse = NO DATO unless axe/LH available on the machine.
6. Never `vercel --prod`. Never invent leads. Report to Decider + I15 if Self Radar BOT2.
7. Si la auditoría propone un fix en `mi-portafolio`: antes de que el usuario haga merge de `mi-portafolio`, correr `npm run smoke:cierre` contra `http://localhost:3000/` (dev local: Vite `server.port` 3000, base `/`; gemma4 descargado en el Mac). Es un check, no un merge nuestro.

## Known P0 pattern (2026-09-13)
- Antro custom domain still advertising github.io in canonical/og:url
- Unpushed pages (e.g. tesis-spine.html) linked from live → 404 until PR merges
