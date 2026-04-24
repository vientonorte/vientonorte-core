# Changelog — @vientonorte/cli

Todos los cambios notables se documentan en este archivo.
Formato: [Keep a Changelog](https://keepachangelog.com/es/1.0.0/)
Versioning: [SemVer](https://semver.org/lang/es/)

---

## [0.1.0] — 2026-04-23

### Added

- **`vientonorte init <nombre>`** — comando principal de scaffolding.
- **Flags soportados**:
  - `--template=vanilla|react|react-ts` (default: `react-ts`)
  - `--with-auth` — agrega `@vientonorte/security` a las dependencias
  - `--with-analytics` — agrega `@vientonorte/analytics` a las dependencias
- **Banner ASCII** del colectivo al iniciar.
- **Validación de nombre** — solo letras minúsculas, números y guiones.
- **`createProject(options)`** — lógica de scaffolding exportada para uso programático.
- **`templates/base/`**:
  - `CLAUDE.md` — con placeholders `PROYECTO_NAME` y `PROYECTO_TEMPLATE`
  - `package.json` — template con scripts básicos
  - `.github/workflows/ci.yml` — CI con lint, typecheck, build, test
- **git init** automático con primer commit `chore: scaffold inicial`.
- **Next steps** mostrados al finalizar, incluyendo instrucciones de auth si se usó `--with-auth`.
