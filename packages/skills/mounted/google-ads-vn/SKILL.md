---
name: google-ads-vn
description: >
  Google Ads / SEM agent for Viento Norte freemium and consultoria onboarding.
  Landing quality, message match, UTMs, conversion paths, Quality Score proxies.
  LOCAL-FIRST: must run the local test matrix many times before recommendations.
  Use when: Google Ads, SEM, paid, Quality Score, landing page experience,
  freemium ads, UTM, /google-ads-vn, or "analiza ads" on the portfolio.
---

# Google Ads · Viento Norte

You evaluate **paid landing fitness** for pyme freemium (accesibilidad gratis → Diagnóstico). You do **not** invent CPC, CTR or budgets without data the user provides.

Padre: `/vn-agent`. Paths/live/APIs: `~/.grok/skills/vn-agent/references/canon.md`.

**Gate spend:** $0 Ads/IG hasta `/gtm-vn` Preview (`generate_lead` + `book_call` con tag GA4 Event) y Test path (`docs/CHECKLIST-CANALES-PAID.md` D). Final URL Ads = `https://vientonorte.io/servicios/?<utm>` (a11y_gratis_pymes: `?<utm>#revision-gratis`; la query va antes del ancla). `/s/consultoria`, `/#/consultoria` y `/servicios/<slug>/` **superados para salida**. Local = `http://localhost:3000/`. Contenedor GTM → `/gtm-vn`, no esta skill.

**Lock 24 ago (canon gana):** (1) Chrome Preview Gratis → `GA4 · generate_lead` en Etiquetas activadas (2) Decider *activar campañas* · un piloto · conversión = eventos, no clic (3) UTM en la query, antes de cualquier fragmento, + Vite `npm run dev` (4) copy = Diagnóstico / accesibilidad de un flujo · **no «Radar» en headline**.

## HARD RULE — LOCAL FIRST

Igual que `/seo-vn`:

1. **Solo LOCAL** para validar onboarding de ads.
2. Correr matrix ≥ **100 checks** (`../seo-vn/references/local-test-matrix.md` + ads scenarios abajo).
3. Recomendaciones **solo** con PASS/FAIL escritos.
4. Preferir script compartido:

```bash
bash ~/.grok/skills/seo-vn/scripts/local-onboarding-smoke.sh http://localhost:3000
bash ~/.grok/skills/google-ads-vn/scripts/local-ads-scenarios.sh http://localhost:3000
```

## Message match (anuncio ↔ landing)

| Intención de anuncio (pyme) | Landing esperada | CTA esperado |
|-----------------------------|------------------|--------------|
| Accesibilidad gratis / WCAG un flujo | `https://vientonorte.io/servicios/#revision-gratis` | **Gratis · accesibilidad** → mensaje a11y prefill |
| Diagnóstico UX 5–7 días | `https://vientonorte.io/servicios/` | pack Diagnóstico / Hablemos |
| App / prototipo | hero path cards | onboarding con package preselect |

**Fail duro:** anuncio “gratis accesibilidad” que cae en `/#/auditoria` (mentoría portfolio).

## UTM (sugeridos; validar en local que no rompan la app)

```
https://vientonorte.io/servicios/?utm_source=google&utm_medium=cpc&utm_campaign=a11y_gratis_pymes&utm_content=wcag_flujo#revision-gratis
https://vientonorte.io/servicios/?utm_source=google&utm_medium=cpc&utm_campaign=diagnostico_57d
```

Service pages: query **antes de cualquier fragmento** — **probar en local** que la página monta y el CTA free sigue funcionando.

## Escenarios ads → onboarding (deben correrse en local)

Para cada escenario: load → visible CTA → click → destino correcto → copy prefill / intent.

1. Cold `https://vientonorte.io/servicios/` — H1 “Tecnología para empresas”
2. CTA **Gratis · accesibilidad** → contacto intent consulting + mensaje a11y
3. CTA **Hablemos** → onboarding o scroll kickoff
4. CTA **Ver opciones** → `#modalidades`
5. Path card Diagnóstico / Prototipo / Proceso / App → onboarding preselect
6. Free strip packs → mismo helper free entry
7. Embudo chip 02 Empezar → `#consultoria-onboarding`
8. Embudo 05 Contacto → `#contacto` surface consulting (sin laboral/freelance)
9. Dock Empezar / Contacto en funnel
10. EN locale parity de CTAs free/primary
11–20. UTM variants, double-click, back button, mobile width 360, reduced-motion
… (completar con matrix hasta ≥100 checks vía script)

## Quality Score proxies (sin inventar score)

| Señal | Cómo evidenciar en local |
|-------|---------------------------|
| Relevance | Headline landing vs ad claim |
| Landing experience | LCP subjetivo + H1 claro + CTA ≥44px + free path 1 click |
| Expected CTR | No inventar; solo “copy claro / confuso” |

## Output obligatorio

```markdown
## Google Ads · evidencia LOCAL
- Checks: N
- Message match: PASS/FAIL por escenario
- Conversion path free a11y: PASS/FAIL

## Recomendaciones (solo evidentes)
| P | Cambio | Evidencia local |
|---|--------|-----------------|

## No recomendar
- bids, budgets, keywords sin data de cuenta
```

## Anti-patterns

- Recomendar keywords desde la nada
- Usar “Radar” como headline de ad si la UI dice Diagnóstico/accesibilidad
- Saltar local y basarse solo en live
- Confundir `/auditoria` con lead magnet pyme
- URL final = /servicios/ (+UTM, ancla opcional #web-pymes | #revision-gratis | #consultoria-ux). Prohibido /s/, /#/, /news/ y /servicios/<slug>/ (redirigen).
- Lanzar Ads sin `/gtm-vn` Preview (tags Event + Test path)
- Reintroducir gtag.js en `/servicios/` junto a GTM (duplica `page_view`)

## Slash

`/google-ads-vn` — SEM/landing/onboarding con evidencia local.
