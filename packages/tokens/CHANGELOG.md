# @vientonorte/tokens — Changelog

## 0.2.0 — 2026-06-11

### Modo oscuro opt-in · desbloquea migración de `table-ro` y `Contra-Archivo`

**Added:**
- Bloque dark `.dark` / `[data-vn-theme="dark"]` que remapea los tokens semánticos:
  `--vn-color-surface` → azul-noche, `--vn-color-on-surface` → marfil,
  `--vn-color-muted` → pizarra-claro, bordes con tinte marfil
- `--vn-primitive-pizarra-claro: #94a3b8` — muted legible sobre azul-noche (6.6:1,
  mismo valor del fix de contraste aplicado a table-ro en Fase 3)
- `--vn-color-surface-1` — superficie elevada (light: marfil + 4% azul-noche;
  dark: azul-noche + 5% marfil). Cubre los `--s1` de table-ro y Contra-Archivo
- Tailwind preset: color `vn-surface-1`

**Decisiones:**
- Opt-in por clase, **sin** `prefers-color-scheme` automático: los consumidores
  actuales (mi-portafolio, dashfin) no cambian de apariencia al actualizar.
  Proyectos que quieran seguir al SO pueden togglear `.dark` via `matchMedia`.
- Contrastes verificados sobre azul-noche (WCAG 2.2 AA): marfil 15.2:1 ·
  pizarra-claro 6.6:1 · azul-evo 4.8:1 · success 4.7:1 · amarillo 9.6:1

## 0.1.0 — 2026-04-23

### Lanzamiento inicial · Fase 1 del colectivo

**Contenido:**
- Paleta primitiva vientonorte: `--vn-primitive-{azul-noche|marfil|pizarra|rojo|azul-evo|amarillo|success}`
- Paleta semántica (light mode): `--vn-color-{brand|brand-dark|accent|warning|success|surface|on-surface|muted}`
- Bordes derivados: `--vn-border-{subtle|medium|strong}`
- Tipografía: `--vn-font-{display|ui|mono|optional}` + escala `--vn-text-{xs…5xl}` + pesos + leading
- Espaciado base 4px: `--vn-space-{1…12}` (4px → 96px)
- Radios: `--vn-radius-{xs|sm|md|lg|xl|pill}`
- Sombras con tinte azul-noche: `--vn-shadow-{sm|md|lg|glow}`
- Motion: `--vn-ease-{out|in|inout|spring}` + `--vn-duration-{fast|base|slow}`
- Z-index explícito: `--vn-z-{dropdown|sticky|overlay|drawer|nav|toast|modal}`
- Touch targets WCAG 2.2: `--vn-touch-min: 44px`, `--vn-touch-comfort: 48px`
- Breakpoints de referencia: `--vn-bp-{xs|sm|md|lg|xl|2xl}` (desde 360px)
- Clases a11y base: `.vn-skip-link` (WCAG 2.4.1)
- `@media (prefers-reduced-motion: reduce)` que resetea durations

**Integrado en:**
- `mi-portafolio` vía copia local (`src/styles/vn-tokens.css`)
  - `--color-noche|pizarra|marfil|grid` mapeados a tokens VN (backward compat Footer.tsx)
  - Skip-link `.skip-link` migrado a usar `--vn-*` vars internamente

**ADRs relacionados:**
- [0001 — Prefijo --vn-*](../../docs/adr/0001-tokens-prefix-vn.md)
- [0002 — GitHub Packages privado](../../docs/adr/0002-github-packages-privado.md)
- [0003 — Chillax como override opcional](../../docs/adr/0003-chillax-font-override-opcional.md)

**Pendiente Fase 2:**
- Tailwind preset (`dist/tailwind-preset.js`) para dashfin y nuevos proyectos
- Tokens en modo oscuro (`prefers-color-scheme: dark` + clase `.dark`)
- Publicación en GitHub Packages (por ahora: copia local)
- TypeScript types export (`dist/tokens.ts`)
