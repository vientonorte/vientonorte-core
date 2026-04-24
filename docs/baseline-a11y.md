# Baseline A11y — Colectivo vientonorte
**Fecha:** 2026-04-23 · **Estándar:** WCAG 2.2 AA (pa11y + axe-core)
**Herramientas:** pa11y v6, página principal de cada proyecto

> Sin este baseline no se declaran cifras de mejora posteriores.

## Resultados por proyecto

| Proyecto | Errores AA | Warnings | Top violation | Estado |
|---|---|---|---|---|
| `mi-portafolio` | **0** | 0 | — | ✅ Cumple AA |
| `uxtools` | **2** | 0 | Input sin label (×2) | 🟡 Menor |
| `table-ro` | **53** | 0 | Contraste insuficiente + inputs sin label | 🔴 Crítico |
| `Contra-Archivo` | **53** | 0 | Contraste insuficiente (dark theme) | 🔴 Crítico |
| `dashfin` | **0** | 0 | — (Radix UI accesible) | ✅ Cumple AA |

## Desglose por tipo de violación

### Contraste (WCAG 1.4.3) — tabla-ro + contra-archivo
- Ambos usan dark themes con colores personalizados que no alcanzan ratio 4.5:1
- table-ro: `--mut: #64748B` sobre `--bg: #0D0D1A` → ratio ≈ 3.8:1 ✗
- contra-archivo: `--muted: #888` sobre `--bg: #0c0c0c` → ratio ≈ 4.1:1 ✗

### Inputs sin label (WCAG 1.3.1 + 4.1.2) — table-ro + uxtools
- Campos de formulario sin `<label>` asociado ni `aria-label`
- table-ro: quickadd modal, filtros
- uxtools: buscador principal

## Target post-Fase 3
| Proyecto | Target errores | Método |
|---|---|---|
| `mi-portafolio` | 0 ✅ (mantener) | CI axe-core |
| `uxtools` | 0 | Agregar labels + aria-label |
| `table-ro` | ≤5 | Corregir contraste con --vn-* tokens + labels |
| `Contra-Archivo` | ≤10 | Ajuste de --muted para ratio ≥ 4.5:1 |
| `dashfin` | <5 | Scan pendiente + Radix UI (ya accesible) |
