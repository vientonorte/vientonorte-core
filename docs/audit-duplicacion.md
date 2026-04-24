# Audit de duplicación — Fase 0
**Colectivo vientonorte** · Fecha: 2026-04-23 · Autor: Claude Code (Rodrigo Gaete Gaona)

> Baseline para la migración a `@vientonorte/tokens`. Sin esta tabla, no se declara ninguna mejora posterior.

---

## 1 · Inventario de archivos de tokens

| Proyecto | Archivo | Tipo | Líneas |
|---|---|---|---|
| Contra-Archivo | `antropologia-corrupcion/styles/shared.css` | CSS custom props · dark theme editorial | ~100 vars |
| uxtools | `uxtools/css/tokens.css` | CSS custom props · tema SURA (navy/cyan) | ~60 vars |
| mi-portafolio | `mi-portafolio/src/styles/design-system.css` | CSS custom props · mínimo (4 vars) | 4 vars |
| mi-portafolio | `mi-portafolio/src/styles/globals.css` | CSS custom props · brand completo Tailwind | ~50 vars |
| table-ro | `table-ro/css/styles.css` | CSS custom props · dark + colores personales | ~25 vars |
| dashfin | *(sin archivo de tokens propio)* | Tailwind utilities inline | — |

---

## 2 · Tabla de duplicación por categoría

### 2.1 Paleta de color — estado actual vs. vientonorte objetivo

| Token semántico | Contra-Archivo | uxtools (SURA) | mi-portafolio | table-ro | **Objetivo @vn/tokens** |
|---|---|---|---|---|---|
| Fondo principal | `--bg: #0c0c0c` | `--navy: #001A72` | `--background: #ffffff` | `--bg: #0D0D1A` | `--vn-azul-noche: #0d1b3d` |
| Superficie 1 | `--s1: #131313` | `--surface-glass` | `--card: #ffffff` | `--s1: #131325` | `--vn-surface-1` (derivar) |
| Texto principal | `--text: #e2e2e2` | `--white: #FFFFFF` | `--foreground: #171717` | `--txt: #E2E8F0` | `--vn-marfil: #f7f2e7` |
| Texto muted | `--muted: #888` | `--muted: #8E99B0` | `--muted-foreground: #737373` | `--mut: #64748B` | `--vn-pizarra: #4a5568` |
| Acento principal | `--etica: #c8a96e` | `--cyan: #00B5E2` | `--primary: #FF1D25` | `--ro: #7C3AED` | `--vn-azul-evo: #1A8FDC` |
| Acento secundario | `--inst: #4a7fa5` | `--navy-2: #0033A0` | `--brand-gradient` | `--camila: #10B981` | `--vn-rojo: #E8401C` |
| Warning | `--warn: #e8b84b` | `--warning: #FF8C00` | *(Tailwind)* | `--warn: #FB923C` | `--vn-amarillo: #F5B945` |
| Error/destructive | `--crit: #c85f4a` | `--score-lo: #CC4444` | `--destructive: #d4183d` | `--err: #F87171` | `--vn-rojo: #E8401C` |
| Success | *(ninguno)* | `--success: #3DBA6F` | *(Tailwind)* | `--ok: #10B981` | `--vn-success` (definir) |
| Border | `--border: rgba(255,255,255,.07)` | `--border: rgba(0,26,114,0.12)` | `--border: #e5e5e5` | `--bd: rgba(255,255,255,.08)` | `--vn-border` (derivar) |

**% similitud semántica:** 85 % — todas las categorías existen; los valores son completamente distintos.
**Decisión requerida:** La paleta `@vientonorte/tokens` es **nueva** (no es mezcla de ninguna existente). Cada proyecto deberá migrar en su totalidad. Sin excepción.

---

### 2.2 Tipografía — fragmentación crítica

| Proyecto | Display font | UI/body font | Mono |
|---|---|---|---|
| Contra-Archivo | `-apple-system` (system) | `-apple-system` | `SF Mono / Fira Code` |
| uxtools | `Space Grotesk` | `Inter` | `DM Mono` |
| mi-portafolio | `Chillax` (Fontshare) | `Chillax` | — |
| table-ro | `Chillax` (Fontshare) | `Chillax` | — |
| dashfin | *(Tailwind defaults)* | *(Tailwind defaults)* | — |
| **Objetivo vn** | **DM Serif Display** | **Inter** | `DM Mono` |

**Hallazgo crítico:** `Chillax` aparece en 2 proyectos LIVE (`mi-portafolio`, `table-ro`) pero **no es la fuente objetivo** del colectivo. Requiere decisión explícita: ¿se migra o se mantiene como excepción per-proyecto?

---

### 2.3 Espaciado — convergencia alta ✓

| Patrón | Contra-Archivo | uxtools | table-ro | mi-portafolio |
|---|---|---|---|---|
| Base 4 px | `--sp-1: 4px … --sp-8: 32px` | `--space-1: 4px … --space-12: 96px` | *(ad hoc)* | `--grid: 8px` |
| Nomenclatura | `--sp-N` | `--space-N` | ausente | `--grid` |

**Coincidencia:** base 4 px en 3/4 proyectos. Solo difiere la nomenclatura → **migración de bajo riesgo**.
**Objetivo:** unificar a `--vn-space-N` con escala `--space-1: 4px … --space-12: 96px` (tomada de uxtools como más completa).

---

### 2.4 Radios — divergencia media

| Proyecto | Valores | Nomenclatura |
|---|---|---|
| Contra-Archivo | `--r: 8px`, `--r-lg: 12px` | `--r-{talla}` |
| uxtools | `8px / 12px / 16px / 20px / 100px` | `--radius-{sm/md/lg/xl/pill}` |
| table-ro | `--r: 12px` | `--r` (solo uno) |
| **Objetivo** | `8px / 12px / 16px / 20px / 100px` | `--vn-radius-{sm/md/lg/xl/pill}` |

---

### 2.5 Sombras — convergencia media

| Proyecto | Capas | Nomenclatura |
|---|---|---|
| Contra-Archivo | `--shadow-sm/md/lg` con rgba negros | `--shadow-{talla}` |
| uxtools | `--shadow-sm/md/lg + --shadow-glow` | `--shadow-{talla}` |
| table-ro | `--sh: 0 4px 24px rgba(0,0,0,.5)` | `--sh` (uno solo) |
| **Objetivo** | 3 capas + glow opcional | `--vn-shadow-{sm/md/lg/glow}` |

---

### 2.6 Transiciones y motion — convergencia alta ✓

| Proyecto | Ease curve | Duración | Nomenclatura |
|---|---|---|---|
| Contra-Archivo | `cubic-bezier(.4,0,.2,1)` | `--dur: .2s`, `--dur-slow: .3s` | `--dur / --ease` |
| uxtools | `cubic-bezier(0.25,0.46,0.45,0.94)` + spring | `0.15s / 0.25s / 0.4s` | `--ease-out / --ease-spring / --duration-*` |
| table-ro | *(ad hoc inline)* | — | — |
| **Objetivo** | ease-out `cubic-bezier(.4,0,.2,1)` + spring | `fast:150ms / base:250ms / slow:400ms` | `--vn-ease-* / --vn-duration-*` |

---

### 2.7 Z-index — solo Contra-Archivo lo sistematizó ✓

Contra-Archivo tiene escala completa (`--z-dropdown:10 … --z-nav:100`). Los demás usan valores hardcoded.
→ Adoptar la escala de Contra-Archivo como base del token.

---

### 2.8 Touch targets — solo Contra-Archivo · `--touch-min: 44px`

WCAG 2.2 SC 2.5.5 requiere 44×44 px. Solo Contra-Archivo lo tiene definido.
→ Incluir en `@vientonorte/tokens` como token normativo.

---

## 3 · Componentes duplicados (UI)

| Componente | Contra-Archivo | uxtools | mi-portafolio | table-ro | dashfin | % similitud |
|---|---|---|---|---|---|---|
| Button | `.btn` | `.btn` | `<Button>` React (shadcn) | `.btn-icon` | `<Button>` Tailwind | 70 % — misma semántica, estilos divergen |
| Input / Search | `.search-box` | *(sin form UX)* | `<Input>` React | `.modal-input` | `<Input>` Tailwind | 55 % |
| Modal / Dialog | `.modal-overlay + .modal` | `.modal-*` | `<Dialog>` (radix) | `.modal-*` | `<Dialog>` Tailwind | 65 % |
| Card | `.card` | *(listas)* | `<Card>` React | *(eventos como cards)* | `<Card>` Tailwind | 60 % |
| Toast / Alert | *(ninguno)* | `.alert-*` | `<Toast>` (sonner) | *(ninguno)* | `<Toast>` | 30 % |
| Skip link | `.skip-link` en design-system.css | *(ninguno)* | `.skip-link` en design-system.css | *(ninguno)* | *(ninguno)* | 100 % — idéntico en 2 proyectos |
| Focus ring | `outline: 2px` en shared.css | parcial | Tailwind focus-visible | `outline: 2px` en styles.css | Tailwind | 60 % |

**Candidatos prioritarios para @vientonorte/ui (Fase 2):** Button → Input → Dialog → SkipLink (ya es idéntico en 2 proyectos).

---

## 4 · Helpers JS duplicados

| Helper | Contra-Archivo | uxtools | mi-portafolio | table-ro |
|---|---|---|---|---|
| Focus trap | *(manual, ad hoc)* | *(ninguno)* | *(Radix lo maneja)* | *(ninguno)* |
| Live region / aria-live | *(manual)* | *(ninguno)* | `useAnnouncer` hook | *(ninguno)* |
| localStorage wrapper | *(ninguno)* | `StorageManager` | *(ninguno)* | `storage.js` |
| debounce/throttle | *(inline)* | *(inline)* | `useDebounce` hook | *(inline)* |

→ `focus trap` y `live region` van a `@vientonorte/a11y`. `localStorage wrapper` y `debounce` van a `@vientonorte/utils`.

---

## 5 · Hallazgos bloqueantes (requieren decisión antes de Fase 1)

### 🔴 B1 — Ningún proyecto usa la paleta vientonorte definida en el master prompt
Todos tienen paletas propias. La migración no es "extraer tokens existentes" sino **introducir una paleta nueva** y migrar cada proyecto. Propuesta: piloto en `mi-portafolio` primero (React + Tailwind = más fácil de migrar).

### 🔴 B2 — Fuente `Chillax` en 2 proyectos LIVE (`mi-portafolio`, `table-ro`)
No es la fuente objetivo. Opciones:
- (a) Migrar a DM Serif Display + Inter en ambos (breaking visual change)
- (b) Declarar Chillax como excepción per-proyecto y solo usar DM Serif Display + Inter en el core y en nuevos proyectos
- (c) Incluir Chillax como alias temporal en el token de tipografía hasta migración completa

### 🟡 B3 — `uxtools` tiene paleta SURA (cliente), no vientonorte
`uxtools/css/tokens.css` es el archivo más estructurado, pero usa navy/cyan de SURA Investments. Es la referencia de **estructura**, no de **valores**. Al refactorizarlo como `@vientonorte/core/docs` habrá que reemplazar la paleta.

### 🟡 B4 — `dashfin` no tiene archivo de tokens — usa Tailwind utilities inline
No hay `theme.extend` claro. Para adoptar `@vientonorte/tokens` necesitará un `tailwind.config.ts` con el preset del core. Riesgo: romper el look actual si no se mapean correctamente las clases.

---

## 6 · Estructura propuesta para `@vientonorte/tokens`

Basada en la estructura del Sistema de Diseño SURA (referencia en `sura-investments/SURA/Recursos/`) como best practice de producción:

```
packages/tokens/
├─ src/
│  ├─ color.ts          # paleta primitiva + semántica vientonorte
│  ├─ typography.ts     # DM Serif Display + Inter + DM Mono + escala
│  ├─ spacing.ts        # escala 4px (--vn-space-1 … --vn-space-12)
│  ├─ radius.ts         # sm/md/lg/xl/pill
│  ├─ shadow.ts         # sm/md/lg/glow
│  ├─ motion.ts         # ease curves + durations
│  ├─ z-index.ts        # dropdown → nav (10 → 100)
│  └─ touch.ts          # --vn-touch-min: 44px (WCAG 2.2)
├─ dist/
│  ├─ tokens.css        # :root { --vn-* }
│  ├─ tokens.json       # Figma/Style Dictionary format
│  └─ tailwind-preset.ts # export default { theme: { extend: {...} } }
└─ index.ts             # re-export everything
```

---

## 7 · Próximos pasos recomendados (antes de Fase 1)

1. **Responder B1:** ¿Piloto de paleta nueva en `mi-portafolio` primero? (recomendado ✓)
2. **Responder B2:** ¿Chillax queda o migra? (necesito tu decisión)
3. Correr baseline de a11y: `npx axe-cli <URL>` en los 5 LIVE → guardar en `docs/baseline-a11y.md`
4. Correr Lighthouse en los 5 LIVE → guardar en `docs/baseline-perf.md`
5. Crear repo `vientonorte-core` con estructura de paquetes vacía → listo para Fase 1

---

*Este documento es el baseline oficial de la Fase 0. Cualquier mejora posterior se mide contra estos datos.*
