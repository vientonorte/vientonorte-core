# Changelog — @vientonorte/ui

Todos los cambios notables se documentan en este archivo.
Formato: [Keep a Changelog](https://keepachangelog.com/es/1.0.0/)
Versioning: [SemVer](https://semver.org/lang/es/)

---

## [0.1.0] — 2026-04-23

### Added

#### Atoms

- **`Button`** — Componente React completo:
  - Variantes: `primary`, `secondary`, `ghost`, `danger`
  - Tamaños: `sm`, `md`, `lg`
  - Estados: `loading` (spinner inline + aria-busy), `disabled` (aria-disabled)
  - Touch target mínimo: `var(--vn-touch-min, 44px)` — WCAG 2.5.5
  - Usa `--vn-*` CSS vars para todos los colores y espaciados
  - **`createButton(el, options)`** — adapter vanilla JS para proyectos sin React
  - JSDoc con ejemplos Storybook-ready

- **`Input`** — Campo de texto accesible:
  - Props: `label` (siempre requerido), `error`, `hint`, `required`, + todos los atributos HTML nativos
  - `<label>` siempre asociada via `htmlFor` (useId genera IDs únicos SSR-safe)
  - `aria-describedby` apunta a error y/o hint cuando existen
  - `aria-invalid` cuando hay error
  - `role="alert"` en mensaje de error para anuncio inmediato a SR
  - Touch target mínimo 44px
  - Usa `--vn-*` CSS vars

- **`SkipLink`** — Re-export de `@vientonorte/a11y` para proyectos que solo instalen `@vientonorte/ui`

#### Molecules

- **`Dialog`** — Modal accesible:
  - `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`
  - Focus trap al abrir (via `useFocusTrap` de `@vientonorte/a11y`)
  - Retorno de foco al elemento previo al cerrar
  - Cierre con `Escape`
  - Cierre al hacer click en el overlay
  - `overflow: hidden` en body mientras está abierto
  - Botón de cierre con aria-label y touch target 44px
  - Usa `--vn-*` CSS vars

### Architecture decisions

- Estilos via inline CSS vars (`--vn-*`) en lugar de clases — sin dependencia de un sistema CSS externo, compatible con cualquier bundler.
- `Dialog` depende de `@vientonorte/a11y` para el focus trap — evita duplicar lógica.
- `SkipLink` en `ui` es un re-export de `a11y` — single source of truth.
- Vanilla adapter (`createButton`) sigue el patrón del cli/vanilla template.
