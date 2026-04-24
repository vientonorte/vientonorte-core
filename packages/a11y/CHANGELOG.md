# Changelog — @vientonorte/a11y

Todos los cambios notables se documentan en este archivo.
Formato: [Keep a Changelog](https://keepachangelog.com/es/1.0.0/)
Versioning: [SemVer](https://semver.org/lang/es/)

---

## [0.1.0] — 2026-04-23

### Added

- **`useFocusTrap(ref, active)`** — React hook que atrapa el foco dentro de un contenedor al activarse. Escucha `keydown` Tab/Shift+Tab, cicla entre primer y último elemento focusable, restaura foco al elemento previo al desactivar.
- **`createFocusTrap(element)`** — Versión vanilla JS del focus trap. Retorna `{ activate, deactivate }`. Útil en proyectos sin React o en web components.
- **`useLiveRegion(politeness?)`** — Hook React que crea un `aria-live` region en el DOM. `announce(message)` vacía y re-inyecta el texto con 100 ms de delay para forzar re-anuncio en todos los screen readers. Conforme a WCAG 2.2 AA — Status Messages (4.1.3).
- **`useAnnouncer()`** — Wrapper simplificado sobre `useLiveRegion`. Retorna `{ announce, clear }` para mensajes de estado transitorios.
- **`SkipLink`** — Componente React. Visible solo al recibir foco. Conforme a WCAG 2.2 AA — Bypass Blocks (2.4.1). Props: `href` (default `#main`), `label` (default `"Saltar al contenido principal"`).
- **`getFocusableElements(container)`** — Retorna todos los `HTMLElement` focusables visibles dentro de un contenedor, filtrando elementos ocultos, `aria-hidden`, `inert` y `disabled`.
- **`isFocusable(el)`** — Predicado que determina si un elemento puede recibir foco (visible, no oculto, no inert, no disabled).

### Compliance
- WCAG 2.2 AA: 2.1.1 Keyboard, 2.1.2 No Keyboard Trap, 2.4.1 Bypass Blocks, 2.4.3 Focus Order, 2.4.11 Focus Appearance, 4.1.3 Status Messages
