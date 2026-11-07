---
name: vn-agent
description: Use when the user mentions VN, Viento Norte, /vn-agent, vn-local, skills, Figma, SSOT, or orchestration across local and shared skills.
---
# VN · router completo

1. Consultar el catálogo de **todas** las skills disponibles por nombre + descripción; cargar el cuerpo de una primaria y, si hace falta, una secundaria. `CATALOG.md` enumera las compartidas; el catálogo local agrega las privadas. No cargar todos los cuerpos al contexto ni limitar el inventario a Grok.
2. Preflight `auditoria-previa-ssot`. Cada cliente conserva su SSOT; disponer de una skill no mezcla VN, Portafolio, SURA, Penji ni tesis.
3. **Local primero:** OpenCode + Ollama en el Mac o torre disponible, usando `agente-vn-local-w11` y `ollama`. Un modelo a la vez, localhost, descargarlo al terminar. Verificar herramientas y recursos, no asumir conexión. Si no alcanza, explicar por qué antes de cloud; datos personales, tesis y FRUTA no salen a cloud.
4. Figma también empieza local si el MCP está disponible. Nunca saltar su guard de SSOT; sin MCP/permisos, detenerse y comunicar el bloqueo.

| Pedido | Cargar en orden |
|---|---|
| Figma, SSOT, láminas, frames | `ssot-figma-editar-sin-romper` → `figma-use` y la skill Figma específica (diseño, FigJam, Slides, motion), si están instaladas |
| finanzas de negocio | `finanzas-vn` |
| prospectos, cola | `prospeccion-vn` o `prospecto-local` según descripción |
| Supabase | `supabase-vn` → skill Supabase instalada |
| auditoría VN | `auditor-a-vn` |
| accesibilidad | `wcag22-audit`; pipeline de leads: `lead-a11y-vn` |
| copy, SEO, pauta, tracking | `ux-writing-vn`, `seo-vn`, `linkedin-seo-vn`, `google-ads-vn` o `gtm-vn` |
| código, QA, cierre | `check-work`, `preprod-qa` o cierre específico por descripción |
| otro tema | buscar en el catálogo completo; no improvisar una skill inexistente |

## Todas las compartidas
`agente-vn-local-w11`, `ask-before-advancing`, `auditor-a-vn`, `auditoria-previa-ssot`, `canva-safari`, `catalog`, `check-safety`, `check-safety-thresholds`, `check-work`, `chequeo-energia-previo`, `ciclo-de-aprendizaje-post-ship`, `cierre-de-oleada`, `cierre-sesion-vn`, `cierre-vn`, `cierre-vn-hoy`, `design-sprint-vn`, `docs-vn`, `finanzas-vn`, `github-analyze`, `google-ads-vn`, `grok-bot-handoff`, `gtm-vn`, `kpi-vn`, `lead-a11y-vn`, `lectura-escaneable`, `linkedin-seo-vn`, `m5-vn`, `mail-session-result`, `mcp-vn`, `notebooklm`, `ollama`, `org-hygiene`, `perfil-ux-en-herramientas`, `planificacion-por-oleadas`, `poema-revision`, `pr-babysit`, `preprod-qa`, `prospeccion-vn`, `prospecto-local`, `seo-vn`, `ssot-figma-editar-sin-romper`, `streaming-obs-windows`, `supabase-vn`, `ux-writing-vn`, `vn-agent`, `vn-borrador`, `vn-improve`, `vn-orquesta`, `wcag22-audit`, `yt-to-notebooklm`.

## Solo locales
Cargar **localmente por descripción**, sin copiar cuerpos ni datos a repos compartidos o cloud: `an-lisis-financiero-hogar`, `bujo-ro`, `ca-index-drive-link`, `ca-local-sin-cloud`, `cierre-penji`, `contadur-a-y-gesti-n-sii`, `daily`, `desk-dualboot`, `ficha-contra-archivo`, `integrar-evidencia-etnogr-fica-a-la-tesis`, `job-hunt-ro`, `lectura-clave-b`, `micro1-cierre`, `micro1-delivery`, `micro1-pipeline`, `penji`, `penji-youtube-thumb`, `postulaciones-calendario`, `research-personas-empresas`, `ritual-semanal-bujo-obsidian`. Consultar su catálogo privado local; si falta una, reportar pendiente, no simularla.

## Gates
- Sin envío, publicación, merge, push a main ni deploy sin OK explícito del usuario en este chat. Producción requiere además orden del TL. Gmail: borrador para revisión; solo Mbot edita Calendar.
- Contraseñas/secrets los ingresal usuario; nunca chat, skills o repo. Datos personales en Obsidian privado; no ofrecer otra bóveda.
- Canon de marca desde la SSOT. No inventar KPIs ni declarar ship sin SHA/PR/URL. No activar workflows masivos salvo pedido explícito.
- Este catálogo no sincroniza máquinas, no instala plugins ni habilita permisos. Mac pendiente de escaneo.
- Salida corta en español: skill elegida, evidencia, resultado y siguiente paso/bloqueo.
