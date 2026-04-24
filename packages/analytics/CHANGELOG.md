# Changelog — @vientonorte/analytics

Todos los cambios notables se documentan en este archivo.
Formato: [Keep a Changelog](https://keepachangelog.com/es/1.0.0/)
Versioning: [SemVer](https://semver.org/lang/es/)

---

## [0.1.0] — 2026-04-23

### Added

- **`types.ts`** — `VNProject` (5 proyectos del colectivo), `VNResult` (start/success/error/cancel/view), `VNEvent`, `AnalyticsConfig`.
- **Naming convention** — `{project}_{feature}_{step}_{result}` aplicada automáticamente. Guiones → underscores para compatibilidad GA4.
- **`VNTracker`** — Clase principal con:
  - `track(event)` — envía a GTM dataLayer + GA4 gtag
  - `page(path, title)` — page_view a GA4
  - `ui(feature, step, result, props?)` — shortcut para interacciones UI
  - `navigation(from, to)` — shortcut para navegación entre rutas
  - `form(formName, step, result)` — shortcut para formularios
  - Modo debug (console.table sin enviar a producción)
  - `enabled: false` en desarrollo por defecto
- **`initGTM(gtmId)`** — Inyecta script GTM en `<head>` con noscript fallback en body.
- **`pushDataLayer(data)`** — Encola eventos en `window.dataLayer` aunque GTM no esté inicializado aún.
- **`AnalyticsProvider`** — React context provider con `useMemo` para evitar re-instanciación.
- **`useAnalytics()`** — Hook React con error descriptivo si se usa fuera del provider.
