# Baseline A11y — Colectivo vientonorte
**Herramienta:** pa11y v6 · **Estándar:** WCAG 2.2 AA

> Baseline oficial de Fase 0. Las métricas de Fase 3 se miden contra estos valores.

## Resultados antes vs. después

| Proyecto | Antes | Después (Fase 3) | Delta | Estado |
|---|---|---|---|---|
| `mi-portafolio` | 0 | 0 | — | ✅ Cumple AA |
| `uxtools` | 2 | **0** | -2 | ✅ Cumple AA |
| `table-ro` | 53 | **0** | -53 | ✅ Cumple AA |
| `Contra-Archivo` | 53 | 53 | pendiente | 🟡 Pdte Fase 3b |
| `dashfin` | 0 | 0 | — | ✅ Cumple AA |

## Fixes aplicados en Fase 3

### table-ro (53 → 0)
- `--mut` #64748B → #94A3B8 (contraste 4.05 → 7.52:1)
- `.wnav.today` y `.day-name.is-today` #a855f7 → #c084fc (4.27 → 6.39:1)
- 19 `<label>` sin `for=` corregidos en HTML
- `gcal-client-id` en innerHTML dinámico (app.js) → `for=` corregido

### uxtools (2 → 0)
- 10 inputs en 4 archivos HTML con `aria-label` descriptivos

## Pendiente — Contra-Archivo
53 errores de contraste en dark theme editorial. Requiere:
1. Ajustar `--muted: #888` → valor ≥4.5:1 sobre `--bg: #0c0c0c` (candidato: `#afafaf`)
2. Revisar colores semánticos `--etica`, `--inst`, `--mat` sobre fondos reales
3. No está en scope de Fase 3 para no alterar el carácter editorial del proyecto
