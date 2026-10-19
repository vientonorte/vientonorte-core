# Local test matrix · onboarding ≥ 100 checks

**Base:** `http://localhost:3000` (HashRouter: `/#/...` · Vite `server.port`)  
**Repo:** iCloud `mi-portafolio` only.

Cada fila = 1 check. Scripts agregan más variantes (locale, viewport, UTM).

## A. Shell & rutas (20)

| # | Check |
|---|--------|
| 1 | `/` carga |
| 2 | `/#/` carga |
| 3 | `/#/consultoria` carga |
| 4 | `/#/contacto` carga |
| 5 | `/#/design-system` carga |
| 6 | `/#/proyectos` carga |
| 7 | `/#/auditoria` carga (no confundir con free a11y) |
| 8–12 | 404 / rutas basura no rompen shell |
| 13–20 | Navegación home ↔ consultoria ↔ contacto sin crash |

## B. SEO head en consultoria (15)

| # | Check |
|---|--------|
| 21 | title contiene Consultoría o Viento Norte |
| 22 | description no empieza con “Radar” como lead (Diagnóstico/accesibilidad) |
| 23 | existe canonical o lógica SEOHead |
| 24 | un H1 visible “Tecnología para empresas” (ES) |
| 25 | titleAccent “Elige tu alcance” |
| 26–30 | no H1 duplicado en above-the-fold |
| 31–35 | EN swap actualiza title/description sin mezcla |

## C. Hero CTAs (15)

| # | Check |
|---|--------|
| 36 | Primary **Hablemos** visible |
| 37 | Free **Gratis · accesibilidad** visible |
| 38 | Secondary **Ver opciones** visible |
| 39 | Free no navega a `/auditoria` |
| 40 | Free abre contacto / assistant con intent consulting |
| 41 | Prefill menciona accesibilidad o flujo |
| 42 | Hablemos scrollea o arma onboarding |
| 43 | Ver opciones → `#modalidades` |
| 44–50 | 4 path cards presentes y clickeables |

## D. Onboarding / embudo (25)

| # | Check |
|---|--------|
| 51 | SEM `#modalidades` existe |
| 52 | SEM `#consultoria-onboarding` existe |
| 53 | SEM **no** monta `#metodo-n2n` (Decide 16 ago · funnel 01–03) |
| 54 | **Home** `#consultoria-demo` (no SEM) |
| 55 | SEM `#contacto` existe |
| 56–60 | ProcessNavigation chips 01–03 en SEM (no 04–05) |
| 61–65 | Dock funnel: Empezar / Contacto anclas |
| 66–70 | Contact surface consulting (sin Oportunidad laboral primero) |
| 71–75 | Pack Empezar preselect onboarding |

## E. Free a11y path (15)

| # | Check |
|---|--------|
| 76 | free-radar-entry message ES a11y-oriented |
| 77 | free-radar-entry message EN a11y-oriented |
| 78 | packageId radar en draft (técnico) |
| 79 | intent consulting |
| 80–90 | free strip packs CTA mismo helper |

## F. Crawler orgánico + piloto Ads (no producto)

Producto UI = `/#/consultoria`. Orgánico = `/servicios/*`. `/s/consultoria` = **página de redirección** (200, meta refresh a `../../servicios/#consultoria-ux`). Salida a clientes = `/servicios/` (+UTM, ancla opcional).

| # | Check |
|---|--------|
| 91a | `/s/` 200 y OG 1200×630 (hub leftover; **no** en sitemap; **no** IA) |
| 91b | `/s/consultoria/` 200 = redirección: meta refresh `../../servicios/#consultoria-ux`, canonical `https://vientonorte.io/servicios/`, `location.replace` con query + hash, GTM-PM5LBQRP, sin gtag paralelo · **no 301** · nunca salida |
| 91c | crawler orgánico = `/servicios/` (las `/servicios/<slug>/` son páginas de redirección desde #279; no Helmet / no `/s/servicios`) |
| 91d | sitemap tiene `/` + `/servicios/`; omite `/s/consultoria/` (redirección) y loc `/s/` hub |

## G. Ads / UTM smoke (10)

| # | Check |
|---|--------|
| 91 | `/#/consultoria?utm_source=google` monta |
| 92 | utm_medium=cpc no rompe |
| 93–100 | variantes utm_campaign no rompen CTAs |

## Contar hasta 100+

El script `local-onboarding-smoke.sh` multiplica: cada URL × (status, title snippet, marker strings, h1 markers) y reporta `TOTAL_CHECKS`. Si `< 100`, el agente **no** emite recomendaciones (solo pide re-run).
