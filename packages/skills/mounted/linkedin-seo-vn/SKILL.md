---
name: linkedin-seo-vn
description: >
  Orgánico LinkedIn Viento Norte (no pauta): posts semanales en página empresa
  + newsletter mensual (covers vault SEM/news-covers; sin hop /s/news).
  Cola JSON, Calendar mié 08:15, Safari abre compose, publish humano.
  Use when: /linkedin-seo-vn, LinkedIn weekly, newsletter VN, SEO LinkedIn,
  tráfico orgánico vientonorte, o /vn-agent pide LinkedIn público.
---

# /linkedin-seo-vn · orgánico + news

Padre: `/vn-agent`. Paths: `~/.grok/skills/vn-agent/references/canon.md`.  
Página empresa: vault `Resources/SEM/2026-08-26 LinkedIn config PAUSED.md` L1.  
Voz: vault `Writing/Voice y benchmarks.md`.  
News data (copy/ediciones): FO `src/data/news-editions.json` (no vault duplicado).  
Cubiertas: vault `Resources/SEM/news-covers/` (attach en LinkedIn).

**Esto no es pauta.** Campaign Manager sigue **PAUSED**. $0 LinkedIn Ads.

## Superficies (SSOT I11/I15 2026-09-09)

| | Semanal | Newsletter mensual |
|--|---------|---------------------|
| Dónde | Página empresa **Vientonorte** org `135136519` | Perfil `/in/rodrigo-gaete-ux/` |
| SSOT | vault `linkedin-weekly-queue.json` | FO `news-editions.json` + covers vault |
| Reloj | Mié **08:15–09:00** CL · Post 0.75 | Primer mié del mes, mismo slot |
| Apply | `vn-linkedin-weekly` | `vn-linkedin-news --clipboard --open-safari` |
| Publicar | Humano en admin drafts | Humano pega en compose Safari |

Temas: **Privacidad · Automatización · Accesibilidad** (empresas).

**CTA weekly (Decider 2026-09-09 · único correcto):**  
CTA por cluster: a11y → `https://vientonorte.io/servicios/?utm_source=linkedin&utm_medium=organic&utm_campaign=weekly_seo&utm_content=a11y#revision-gratis`; automation/privacy/ley21719 → `https://vientonorte.io/servicios/?utm_source=linkedin&utm_medium=organic&utm_campaign=weekly_seo&utm_content=<cluster>`

**Canon CTA:** `https://vientonorte.io/servicios/` (UTM en query, antes del ancla; ancla opcional `#web-pymes` | `#revision-gratis` | `#consultoria-ux`). `/servicios/<slug>/` redirigen (#279): no usar.

**Leads fríos (InMail/DM, no el post semanal):** los borradores a prospectos enlazan solo a `https://vientonorte.io/servicios/` (+UTM, ancla opcional). Las demos de `src/data/linkedin-cold-demos.json` (rutas hash internas) no van en ningún InMail.  
No van en el hero ni en mensajes las rutas internas `/#/`. CTA weekly usa `/servicios/` (+UTM, ancla opcional).

**Muertos / no usar en LI organic:** `/s/news`, `/s/news/*`, `/news/` (404), y `/s/consultoria` como CTA weekly.  
`/s/consultoria` deprecado.

Paid: **PAUSED**. Covers: vault `news-covers` OK (Figma News exports).

No pisa citas 09–13 ni Algonova 17–21.

## Automatización (0 tokens al aplicar)

1. Calendar dispara el slot.
2. Script lee JSON y pega clipboard. **No LLM.**
3. `--open-safari` abre compose. **No click Publicar** por default (ToS 8.2: bots que crean posts).
4. Humano Publicar · marcar `published` en JSON + stamp KPI `comms`.

Figma: cubiertas en file News (MCP al **crear** la pieza). Apply **no** llama Figma ni Grok.

`--build-hops` está **deprecated** (no regenerar `public/s/news/**`; FO purga orphan).

No Insight Tag unpublished → live. No ACTIVE Campaign Manager.

## Cola

```bash
vn-linkedin-weekly                 # post semana ISO · company
vn-linkedin-news                   # edición del mes · perfil
vn-linkedin-news --slug accesibilidad-transvip --clipboard --open-safari
# vn-linkedin-news --build-hops   # DEPRECATED — no-op / no regen /s/news
```

Weekly rotación `% len`: a11y · automation · privacy.  
UTM content: `a11y` · `automatizacion` · `ley21719`.

## Copy

- Weekly company: habla **Viento Norte**, no rostro.
- News perfil: trayectoria de casos OK; CTA sigue VN → **consultoria** UTMs.
- Headline = Diagnóstico / a11y de un flujo / Ley 21.719 / automatización del trámite. **No** «Radar».
- KPI solo si ya está en hub público (`/empresa/transvip`, `/empresa/sura-investments`). Havas/Claro = upcoming, sin cifra.
- Contra-archivo = método vs skills; **no** nombres de causa.
- Hashtags ≤5, ES. CTA: **Gratis · un flujo WCAG** o **Agendar 30 min**.

## Output

```markdown
## LinkedIn SEO
- Superficie: company weekly | news perfil
- SSOT URL: `https://vientonorte.io/servicios/` con UTM en query (a11y: `#revision-gratis` después de la query); nunca `/s/`, `/#/`, `/news/` ni `/servicios/<slug>/` en orgánico
- Post/edición: (pegar)
- Safari: compose abierto · Publicar = humano
- Paid: PAUSED
```

## Anti-patterns

- Safari click-Publicar desatendido
- UTM `medium=cpc` en orgánico
- Activar pauta LI
- Inventar seguidores / impresiones / CPC
- Inventar demanda o cédula como “caso”
- CTA weekly a `/s/news` o `#/news`

## Slash

`/linkedin-seo-vn` — post semanal o news del mes.
