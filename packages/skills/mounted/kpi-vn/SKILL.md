---
name: kpi-vn
description: >
  Log KPI data-driven de cada interacción de trabajo Rö↔Grok: proceso, valor,
  desviación roadmap, aprendizaje, evidencia. Escribe Sessions/KPI + ledger.
  Use when: every work message from Rö, /kpi-vn, "stamp kpi", medir proceso,
  aprendizaje, desviación roadmap, valor; also after shipping or closing.
---

# /kpi-vn · stamp por interacción

Padre: `/vn-agent`. Paths: `~/.grok/skills/vn-agent/references/canon.md`. Tras trabajo de cualquier hija VN (no chitchat), stamp.

**Horas:** Método Ro (canon) — M1 0 PARK · VN 1.5 · Post 0.75 · Algonova 4º. Este stamp mide proceso; no reasigna Calendar.

## Regla dura

**Después de cada mensaje de trabajo de Rö** (no chitchat: “ok”, “jajaja”, “dale”):

```bash
vn-kpi-stamp \
  --intent "<1 línea: qué pidió / qué se resolvió>" \
  --proceso <build|design|ops|docs|cierre|research|infra|comms|otro> \
  --valor <shipped|blocked|learning|infra|decision|waste|NO_DATO> \
  --desv <on_plan|ahead|delayed|scope_creep|unplanned|parked|NO_DATO> \
  --aprendizaje "<1 frase o NO_DATO>" \
  --evidencia "<PR#|hash|path|URL|NO_DATO>" \
  --roadmap "<DS|FO día|PASOS-A-PRODUCCION|NO_DATO>"
```

Script: `/Users/ro/bin/vn-kpi-stamp`  
Definiciones: `Resources/KPI proceso aprendizaje valor.md`

## DATA DRIVEN

- Sin scores 1–10.
- Sin inventar `shipped` / `on_plan`.
- Si falta evidencia → `NO_DATO` en ese campo.

## Cuándo no stamp

- “ok”, “gracias”, “buenas noches” sin pedido nuevo
- Mensajes solo de confirmación

## Cuándo sí (ejemplos)

| Intent Rö | proceso | valor | desv típico |
|-----------|---------|-------|-------------|
| ship / PR / fix | build | shipped o blocked | on_plan / unplanned |
| usabilidad / copy | design | learning o decision | on_plan |
| dominio / CF | ops | shipped o infra | unplanned o on_plan |
| /CierreVNHOY | cierre | infra o decision | on_plan |
| “mide KPI / pipeline Session” | docs o infra | infra | unplanned o on_plan |

## Al cierre del día

1. `vn-cierre-hoy` (ya existente)
2. Opcional: una línea KPI `cierre` con evidencia `Sessions/YYYY-MM-DD.md`
3. Session.app: título **CierreVNHOY** · notes = brief (rutas/días) — el **ledger KPI no vive en Session**, vive en Obsidian `Sessions/KPI/`
4. **Regla de oro:** todo **mail de cierre enviado** lleva **`## Retro deploy`**. Draft no cierra. Workflow: `cierre-vn-hoy`.

## Output al usuario (si pide KPI)

```markdown
## KPI stamp
- tabla: Sessions/KPI/YYYY-MM-DD.md
- ledger: Sessions/KPI/_ledger.jsonl
- fila: | hora | proceso | valor | desv | intent | …
```

## Slash

`/kpi-vn` — forzar stamp de la interacción actual.
