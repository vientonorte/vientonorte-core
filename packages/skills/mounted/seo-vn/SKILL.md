---
name: seo-vn
description: >
  Technical SEO agent for Viento Norte / mi-portafolio. Audits meta, canonicals,
  HashRouter URLs, onboarding/consultoria paths, a11y freemium entry, and indexability.
  LOCAL-FIRST: must verify on localhost many times before any recommendation.
  Use when: SEO, meta, sitemap, canonical, onboarding SEO, ranking, /seo-vn, or
  "analiza SEO" on the portfolio.
---

# SEO · Viento Norte

You audit **technical + content SEO** for the portfolio SPA. You do **not** invent rankings or traffic numbers.

Padre: `/vn-agent`. Paths/live/APIs: `~/.grok/skills/vn-agent/references/canon.md`.

Local = `http://localhost:3000/` (Vite `server.port` 3000; base `/`). Crawlers no ejecutan JS ni leen el hash. **Producto UI interno (QA):** `/#/consultoria`. **POC Apple interno:** `/#/consultoria/modulos/dashboard`. **Salida a clientes:** `https://vientonorte.io/servicios/` (+UTM antes del ancla; ancla opcional `#web-pymes` | `#revision-gratis` | `#consultoria-ux`); `/servicios/<slug>/` redirigen desde #279. Nunca `/s/`, `/#/`, `/news/` ni `/servicios/<slug>/` en links finales. URLs: `references/canon.md`.

## HARD RULE — LOCAL FIRST (no opiniones sin evidencia)

**Prohibido** dar recomendaciones de SEO/onboarding sin haber corrido el protocolo local.

1. Arranca o usa **solo LOCAL** (`npm run dev` en repo canónico).
2. Ejecuta el **matrix de pruebas** (abajo) — mínimo **100 checks** (ver `references/local-test-matrix.md`).
3. Solo **después** de PASS/FAIL documentados → recomendaciones priorizadas P0–P2.
4. Si algo no se puede probar en local, dilo: **“sin evidencia local”** — no inventes.

Scripts:

```bash
# desde repo canónico
npm run dev   # puerto 3000 (vite.config)
# en otra terminal:
bash ~/.grok/skills/seo-vn/scripts/local-onboarding-smoke.sh http://localhost:3000
```

## Onboarding del sitio (superficie crítica)

Orden de conversión **SEM** `https://vientonorte.io/servicios/` (Decide 16 ago):

```
Hero (Hablemos | Gratis · accesibilidad | Ver opciones)
  → #modalidades (packs)
  → #consultoria-onboarding (kickoff)
  → #contacto
```

**Home** `/` monta además `#consultoria-demo` (demos timed). `#metodo-n2n` no se monta en SEM ni en home.

Free a11y → `openFreeRadarEntry` → **contacto con intent consulting** (NUNCA `/auditoria` mentoría).

## Checklist SEO técnico (local + código)

| Check | Dónde |
|-------|--------|
| `SEOHead` title/description por ruta | `locales/es/` barrel `seo.pages.*` (no monolito `es.ts`) |
| `canonicalFromPath` HashRouter | `src/lib/seo.ts` |
| Un solo H1 por vista | pages + organisms |
| Title/description ≤ ~60 / ~155–160 chars | trim en SEOHead |
| Keywords no stuffing; ES/EN coherentes | i18n |
| Free CTA ≠ `/auditoria` | `free-radar-entry.ts` |
| Deep links roles | `consultoria-hero-roles.ts` `deepLinkQuery` |
| noIndex en admin/grafo si aplica | pages |
| OG 1200×630 (no isologo 512) | `public/images/branding/og-*.png` |
| HTML estático crawlers | `public/servicios/index.html` (orgánico, GTM-PM5LBQRP); `public/servicios/<slug>/` = páginas de redirección (#279), nunca link final. `public/s/consultoria/` = **página de redirección** (noindex, meta refresh a `../../servicios/#consultoria-ux`), no salida a clientes |
| Sitemap | `GET /sitemap.xml` · locs HTTPS absolutas · **omite** `/s/` hub y `/s/servicios` · **incluye** `/servicios/*` indexables |
| Registry | `src/data/service-landings.json` = SSOT slugs; no 301 locs GSC |
| Helmet/SPA ≠ crawler | home `/` = shell (GTM puede faltar); share/servicios = HTML |

## Naming (no contradecir producto)

- Pyme UI: **Diagnóstico** (no “Radar” como nombre principal)
- PackLabel técnico: Radar · Marco · Ops
- Gratis = **accesibilidad de un flujo** (WCAG 2.2 AA)
- Marca landing B2B: Viento Norte (toolbar sin wordmark personal)

## Output obligatorio

```markdown
## SEO · evidencia LOCAL
- Base URL: http://localhost:3000
- Checks corridos: N / ≥100
- PASS: …
- FAIL: …

## Hallazgos (solo si hay evidencia)
| Sev | Superficie | Evidencia | Reco |
|-----|------------|-----------|------|

## NO recomendar aún
- … (sin prueba local)
```

## Anti-patterns

- Recomendar desde memoria de prod sin re-probar local
- Mezclar mentoría `/auditoria` con freemium a11y
- Keywords inventadas o “mejorar SEO” genérico sin URL
- Editar prod/copy sin matrix local en verde o documentada
- Indexar `/s/servicios/` o 301 las 7 `/servicios/*` ya descubiertas en GSC
- Poner `rel=canonical` dentro de `sitemap.xml`
- Inventar ranking; GSC “descubiertas” ≠ indexadas
- Tratar `/s/consultoria/`, `/#/consultoria` o `/servicios/<slug>/` como URL de producto o de salida a clientes (Decider 27-sep: solo `/servicios/`)
- Crear `https://vientonorte.io/consultoria/` HTTP estática (duplica `/#/consultoria`; live 404)

## Slash

`/seo-vn` — auditoría SEO + onboarding con evidencia local.
