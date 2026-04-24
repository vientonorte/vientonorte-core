# ADR 0001 — Prefijo `--vn-*` para design tokens del colectivo

**Estado:** Aceptado
**Fecha:** 2026-04-23
**Autores:** Rodrigo Gaete Gaona, Claude Code

---

## Contexto

El colectivo vientonorte tiene 5 proyectos LIVE con sus propias variables CSS sin convención común:
- `--bg`, `--text`, `--muted` (Contra-Archivo)
- `--navy`, `--cyan` (uxtools — paleta SURA cliente)
- `--background`, `--foreground`, `--primary` (mi-portafolio — convención shadcn/ui)
- `--ro`, `--camila`, `--fin` (table-ro — colores semánticos personales)
- Sin archivo de tokens (dashfin — Tailwind inline)

Se necesita introducir tokens compartidos sin romper los 5 proyectos LIVE durante la migración.

## Decisión

Todos los tokens compartidos del core usarán el prefijo **`--vn-`**.

Ejemplos:
- `--vn-azul-noche` (no `--azul-noche` ni `--color-dark`)
- `--vn-space-4` (no `--space-4` ni `--spacing-4`)
- `--vn-radius-md` (no `--radius-md`)

Los tokens de proyecto (sin prefijo o con otro prefijo) quedan como overrides locales y pueden mapear a tokens VN en su archivo de estilos.

## Alternativas descartadas

**A) Sin prefijo** (`--azul-noche`, `--marfil`): colisiona con vars existentes en los proyectos (uxtools tiene `--cyan`, table-ro tiene `--bg`). Riesgo alto de cascada involuntaria.

**B) Prefijo largo** (`--vientonorte-azul-noche`): legible pero verboso. Los proyectos tienen muchos componentes con var() inline — el autocompletado se vuelve difícil.

**C) Scope por paquete** (`--tokens-color-brand`, `--tokens-space-4`): rompe el modelo mental de Atomic Design. No hay relación evidente con "vientonorte".

## Consecuencias

✅ Cero colisiones garantizadas con vars de proyecto existentes.
✅ Autocompletado consistente: `--vn-` activa todas las opciones del core.
✅ Grep limpio en cualquier repo: `grep --vn-` muestra solo dependencias del core.
⚠️ Verbosidad moderada en CSS: aceptable dado que los tokens se usan por alias locales en cada proyecto.
