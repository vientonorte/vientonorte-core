# Changelog — @vientonorte/security

Todos los cambios notables se documentan en este archivo.
Formato: [Keep a Changelog](https://keepachangelog.com/es/1.0.0/)
Versioning: [SemVer](https://semver.org/lang/es/)

---

## [0.1.0] — 2026-04-23

### Added

- **`types.ts`** — Tipos base: `FactorType`, `AuthLevel` (0–3), `AuthFactor`, `SessionState`, `FactorRequirement`, `StepUpResult`.
- **`FactorRegistry`** — Registro central de factores verificados (patrón Microsoft Identity Platform). Métodos: `register`, `unregister`, `get`, `getAll`, `getHighestLevel`, `hasLevel`, `toJSON`, `FactorRegistry.fromJSON`.
- **`SessionManager`** — Gestión de sesión con timeout configurable (default 30 min), step-up auth via `requireLevel`, device fingerprint básico sin PII (djb2 hash de userAgent + screen + timezone), persistencia en `sessionStorage` (decisión de seguridad: no `localStorage`). Métodos: `getState`, `updateActivity`, `isExpired`, `requireLevel`, `save`, `SessionManager.restore`, `clear`.
- **`requireFactor`** — Helper funcional para step-up sin instanciar clase. Wrapper sobre `SessionManager.requireLevel`.
- **`buildCSP`** — Construye string Content-Security-Policy desde configuración estructurada.
- **`injectCSPMeta`** — Inyecta meta tag CSP en `<head>` para SPAs sin servidor (GitHub Pages).
- **`vientonorteCSP`** — Preset CSP seguro para proyectos vientonorte en GitHub Pages.
- **`docs/factor-registry-guide.md`** — Guía de integración con Supabase Auth, ejemplos de step-up con TOTP y passkey, integración React, configuración CSP.

### Security decisions
- `sessionStorage` en lugar de `localStorage` para limitar el scope de sesión a la pestaña activa.
- Device fingerprint sin PII (hash djb2, no tracking).
- `getState()` retorna copia frozen para prevenir mutación accidental.
- `toJSON()` excluye credenciales y tokens.
