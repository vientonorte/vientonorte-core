# ADR 0003 — Chillax como fuente override opcional per-proyecto

**Estado:** Aceptado
**Fecha:** 2026-04-23
**Autores:** Rodrigo Gaete Gaona, Claude Code

---

## Contexto

`mi-portafolio` y `table-ro` usan Chillax (Fontshare) como fuente principal.
El colectivo vientonorte define como fuentes objetivo: DM Serif Display (display) + Inter (UI).
El usuario decidió: prioridad **a11y > design > security**.

## Decisión

El token `--vn-font-optional: 'Chillax', sans-serif` está declarado en `@vientonorte/tokens` como fallback explícito. Los proyectos que usen Chillax pueden referenciarlo como override local sin salir del sistema de tokens.

Patrón de uso recomendado en proyectos con Chillax:
```css
:root {
  /* Override: este proyecto usa Chillax como fuente UI */
  --vn-font-ui: var(--vn-font-optional);  /* Chillax → Inter en core */
}
```

Las fuentes **DM Serif Display + Inter** son las que usarán:
- `@vientonorte/ui` (todos los componentes del core)
- Proyectos nuevos scaffoldeados con el CLI
- `dashfin`, `Contra-Archivo` en sus migraciones futuras

## Alternativas descartadas

**A) Forzar migración inmediata**: rompe la identidad visual de `mi-portafolio` y `table-ro` sin beneficio funcional. La prioridad es a11y, no uniformidad tipográfica.

**B) Eliminar Chillax del token system**: ignora una fuente que ya está en producción en 2 proyectos LIVE. El token `--vn-font-optional` documenta que existe sin normalizarla.

## Consecuencias

✅ Cero breaking change visual en los 2 proyectos LIVE que usan Chillax.
✅ El core y los proyectos nuevos usan la tipografía objetivo del colectivo.
✅ El override está documentado y es visible en los tokens (no hardcoded).
ℹ️ En Fase 5 (CLI), el scaffold usará DM Serif Display + Inter por defecto.
