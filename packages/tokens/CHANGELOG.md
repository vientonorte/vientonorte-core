# @vientonorte/tokens — Changelog

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
