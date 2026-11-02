---
name: cierre-vn-hoy
description: >
  Cierre explícito del día: lee Obsidian (rutas URL + días/plan), documenta en
  Sessions, brief en clipboard para el foco CierreVNHOY. NO abre Session.app
  salvo que el humano pida "abre Session" o se pase --open-session.
  DATA DRIVEN. Use when: /CierreVNHOY, /workflow cierre-vn-hoy, "cierre vn hoy",
  "documenta lo de Obsidian para Session", resumen a mail. El modelo local redacta. Grok envía a las dos bandejas después de QA humano y del visto bueno de Rö. Sin visto bueno no hay correo. Con visto bueno, un borrador no cierra.
---

# /CierreVNHOY · Session ← Obsidian (explícito)

Padre: `/vn-agent`. Paths: `~/.grok/skills/vn-agent/references/canon.md`. Cierre rápido (git+nota, sin Session): `/cierre-sesion-vn`.

## Idea

No es “inventar el día en Session”. Es:

```text
Obsidian ya tiene el trabajo (rutas + días)
        ↓
vn-cierre-hoy extrae URLs y plan + clipboard
        ↓
(Session.app NO se abre solo)
        ↓
tú abres Session cuando quieras · título CierreVNHOY · pegas notes · Finish
        ↓
Sessions/hoy actualizado · Calendar ✓ VN LOG
```

## Política Session.app (anti-bug)

- **Default:** nunca `open -a Session` desde script ni agente.
- **Opt-in humano:** `vn-cierre-hoy --open-session` o frase explícita «abre Session».
- Agente: clipboard + nota + Calendar; **prohibido** lanzar Session sin pedido.

## Comando

```bash
vn-cierre-hoy
vn-cierre-hoy --title "HITO .io"
vn-cierre-hoy --dry-run
vn-cierre-hoy --open-session   # solo si el humano pidió abrir la app
```

## Agente al oír `/CierreVNHOY` o «Cierre» (VN)

### READ-FIRST

1. MCP Calendar: listar **hoy + semana** (eventos reales: Despertar, Postulación, `VN FO`, vida personal, `✓ VN FO · Cierre…`).
2. Leer `Sessions/hoy.md` — no pisar.
3. El plan de sprint **ya está en Calendar**; no regenerar FO en paste.

### WRITE mínimo

1. `vn-cierre-hoy --title "CierreVNHOY <arco>"` (script: append-only en Sessions; **sin** open Session; upsert `## Tokens locales vs cloud`)
2. Calendar: solo tocar `✓ VN LOG` si hace falta stamp de hora; **no** clonar plan de `✓ VN FO · Cierre`
3. `vn-kpi-stamp` con evidencia real
4. ATAJO-PASTE = puntero a paths + “ver Calendar vivo”, **no** lista FO re-sintetizada
5. Reportar: qué había en Calendar (dato) vs qué se tocó (delta)
6. **No** ejecutar `open -a Session` ni `vn-cierre-hoy --open-session` salvo pedido explícito
7. **Mail de cierre.** El modelo local redacta la nota y `## Retro deploy` y para. Grok envía con `gmail__send_message` solo después de QA humano y del visto bueno de Rö en el chat. `to: [gaete.gaona@icloud.com, gaete.gaona@gmail.com]`. Sin ese visto bueno el workflow corre con el envío apagado. Con el visto bueno, un borrador no es cierre: si el envío falla, reintentar en el mismo turno. Body **siempre** `## Retro deploy`. Links VN en el body: solo `https://vientonorte.io/servicios/` (+UTM, ancla opcional). También append en `Sessions/YYYY-MM-DD.md`.
8. **Si `$` live (`finanzas.vientonorte.io`) está stale vs plantilla Calendar:** P0 del cierre = `wrangler deploy --keep-vars` en el Worker finanzas. No es opcional frente a H2/favicon.
9. Pegar en clipboard el link SSOT Design Ops (`obsidian://open?vault=Ro&file=Viento%20Norte%2FResources%2FPIPELINE%20Design%20Ops%20SSOT`). Si hubo ciclo DS hoy, apuntar `Sprints/DS-*.md` active.
10. Si no corrió `vn-improve` hoy: decirlo. If $ stale, P0 remains wrangler deploy --keep-vars (step 8). No wrangler otherwise.

### Prohibido

- Inventar horas de foco / URLs / FO que no estén en Calendar u Obsidian/git
- Duplicar roadmap en paste + nota + 3 eventos Calendar
- Sobrescribir sin leer
- **Abrir Session.app automáticamente** (bug reportado 2026-08-02)
- **Email o resumen de cierre sin `## Retro deploy`**
- **Enviar sin QA humano y sin el visto bueno de Rö**
- **Dejar el mail en borradores después de ese visto bueno**

## En Session.app (humano, cuando quiera, 30 s)

| Paso | Acción |
|------|--------|
| 1 | Abrís Session vos (o pedís «abre Session») |
| 2 | Intención: **`CierreVNHOY`** |
| 3 | Notes: **pegar** (clipboard = rutas + días de Obsidian) |
| 4 | Finish |
| 5 | Vista **Calendar** · Personal ON |

Automation opcional: atajo `session_end` solo si title contiene `Cierre` → `vn-cierre-hoy` (sin open; evitar doble run si ya corriste el script).

## Fuentes de datos (solo lectura)

| Dato | Fuente |
|------|--------|
| Rutas / URLs | `Sessions/YYYY-MM-DD.md`, `_Index.md` |
| Días / plan | Calendar (leído) · `Sprints/*PLAN*semana*` |
| Design Ops SSOT | `Resources/PIPELINE Design Ops SSOT.md` |
| DS activo | `Sprints/DS-*.md` con `status: active` |
| Facts live | `/workflow vn-improve` (P0 `$` stale) · no inventar |
| Ship | `git log --since=midnight` |
| Foco minutos | `session-stamp.log` o **NO DATO** |
| Tokens locales vs cloud | `vn-tokens-saved --since today` (Ollama logs + Grok `usage.json`). No inventar USD. |

## Slash

`/CierreVNHOY` · `/workflow cierre-vn-hoy`
