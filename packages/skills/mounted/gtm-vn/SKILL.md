---
name: gtm-vn
description: >
  GTM / Tag Assistant / conversiones Viento Norte: Preview, generate_lead,
  book_call, cobertura /servicios/ vs SPA. No hay MCP GTM. Use when: GTM, Tag Assistant,
  Preview, generate_lead, book_call, cobertura de etiqueta, /gtm-vn, o
  "publicar v3" en el contenedor vientonorte.io.
---

# GTM · Viento Norte

Padre: `/vn-agent`. URLs: `references/canon.md` del padre. Receta UI humana: FO `docs/GTM-KICKOFF.md`. **Esta skill gana** si el kickoff contradice un hecho live.

Landing / message match / UTM → `/google-ads-vn`. Acá solo el **contenedor** y Preview.

**$0 Ads** hasta Tag Assistant muestre `generate_lead` **y** `book_call` en **Etiquetas activadas**. Decider publica spend.

Lock 24 ago: Preview **Gratis · accesibilidad** → `GA4 · generate_lead` activado. **28 ago 12:53 UI: no activado** (solo Google tag). `book_call` PASS 20 ago (Agendar). Luego Decider *activar campañas*. UTM/Vite = `/google-ads-vn`.

## Contenedor (20 ago)

| | |
|--|--|
| Cuenta | Vientonorte `6365610691` |
| Contenedor Web | `vientonorte.io` · `GTM-PM5LBQRP` · `258073653` |
| GA4 | `G-G7JXJKGCDV` · también `GT-P8VJH8TQ` |
| UI | [workspace](https://tagmanager.google.com/#/container/accounts/6365610691/containers/258073653/workspaces) |

Tags live (versión **4** `GA4 · book_call` · 20 ago 17:29 · workspace post-publish cambios 0):

| Tag | Tipo | Activador | Estado |
|-----|------|-----------|--------|
| `GA4 · vientonorte.io` | Etiqueta de Google | Initialization - All Pages | sí |
| `GA4 · generate_lead` | GA4 Event `generate_lead` | `CE · generate_lead` | sí (20 ago) |
| `GA4 · book_call` | GA4 Event `book_call` | `CE · book_call` | sí (20 ago 17:24) |

SPA `dataLayer` sí emite ambos. `book_call` vive en chunk lazy `assets/vn-booking-*.js`. GA4 `collect` sin tag Event = solo `en=page_view`.

## Browser

Canon visual = Safari. **GTM Preview = Chrome logueado** (cuenta Rodrigo Gaete).

Safari + AdGuard Mini (content blockers Privacy/General): `google_tag_manager === undefined`, Tag Assistant `connection__timeout`. No diagnosticar “GTM caído” en Safari con AdGuard.

Chrome DevTools MCP usa `~/.cache/chrome-devtools-mcp/chrome-profile` — **sin** login Google. AppleScript `execute javascript` en Chrome está off hasta **Visualización → Opciones para desarrolladores → Permitir JavaScript para eventos de Apple**. No matar el Chrome de Rö para “arreglar” MCP.

No MCP GTM. `gcloud` token = `cloud-platform`, **no** `tagmanager.*`. Crear tags = UI.

## Preview

1. Chrome (no MCP): Tag Manager → **Vista previa** → URL `https://vientonorte.io/servicios/?gtm_debug#revision-gratis` (query antes del ancla).
2. Si “ventana de depuración cerrada” → **Reabrir**.
3. Clics:
   - **Gratis · accesibilidad** → `generate_lead` (`free_a11y`, `radar`) + a menudo `book_call` (`radar-free`) + Calendar `calendar.app.google/NvXgpHrpSnJ2186X7` + `POST /api/booking`.
   - **Agendar 30 min** (pack o Empezar; el del radio Diagnóstico está disabled hasta elegir pack) → `generate_lead` (`kickoff`) + `book_call`.
4. PASS: esos eventos en Capa de datos **y** tags Event en **Etiquetas activadas**.
5. “Etiquetas no activadas: Ninguna” con solo la Etiqueta de Google = **no hay tags Event**, no es que fallaron.

## Cobertura GTM (diagnóstico)

Busca `gtm.js` / `GTM-PM5LBQRP`, no gtag suelto.

| URL | Cobertura | Hecho live |
|-----|-----------|------------|
| `/` | Etiquetada | SPA `initGTM` (no está en el HTML) |
| `/servicios/` | GTM-PM5LBQRP | Hub servicios = única URL final (anclas `#web-pymes` | `#revision-gratis` | `#consultoria-ux`). HTML estático. |
| `/servicios/<slug>/` | GTM-PM5LBQRP | Páginas de redirección (#279). Nunca URL final. |
| `/s/`, `/s/consultoria/` | GTM-PM5LBQRP (legado) | Redirección/noindex (`/s/consultoria/` → `/servicios/#consultoria-ux`). Nunca enlazar. |
| `/mi-portafolio/` | Sin etiquetar | Path legado / soft-404. No landing. |

Tarea GTM “segundo admin” = humano, no código. `/u` `/uxto` en cobertura = truncados del crawler (404 live). Probe: `vn_gtm_coverage` en `/mcp-vn`.

`/servicios/` · **solo GTM-PM5LBQRP**. No gtag paralelo. Preview de salida = `https://vientonorte.io/servicios/?gtm_debug#revision-gratis`. Tareas “segundo admin” y “compras Ads Beta” ≠ este flujo.

## Alta de un Event (UI)

Etiquetas → Nueva → **Google Analytics** (lista izquierda, no galería “Añadir a espacio de trabajo”) → **evento de GA4** → ID `G-G7JXJKGCDV` (reusa la Etiqueta de Google) → nombre evento = `generate_lead` o `book_call` → activador Evento personalizado **mismo nombre** → diálogo “Debe dar un nombre” → `GA4 · <evento>` → Guardar → Enviar → Publicar. Resumen “0 cambios” = workspace **nuevo** post-publish, no “no hay tags”.

P0: Preview Chrome 20 ago · Agendar → `GA4 · book_call` **Activado 1 vez** (v4).

**28 ago 12:53 Tag Assistant (UI Rö):** Activadas = `GA4 · vientonorte.io` 1×. `GA4 · generate_lead` y `GA4 · book_call` **no activadas** (page_view). Collect `en=generate_lead` 13:26 = `gtag("event")` del SPA, **no** prueba de la etiqueta Event. TA “No conectado” / timeout = extensión. `submit_contact_form` aún sin tag.

## Anti-patterns

- Preview en Safari con AdGuard y concluir que GTM no carga
- Usar el Chrome MCP para Tag Manager
- Pegar gtag.js en `/servicios/` (duplica `page_view` con GTM)
- $ spend porque dataLayer tiene el evento (falta el tag GA4 Event)
- Inventar CPC / “v3 publicado” sin lista de tags + cambios 0 o versión en UI

## Slash

`/gtm-vn` — Preview y tags de conversión VN.
