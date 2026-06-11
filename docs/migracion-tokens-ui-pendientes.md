# Checklist de migración — `table-ro` y `Contra-Archivo` a `@vientonorte/tokens` + `@vientonorte/ui`

**Estado:** Pendiente · Fecha: 2026-06-11
**Contexto:** Fase 1-2 ya completas en `mi-portafolio` y `dashfin` (shadcn eliminado, `@vientonorte/tokens@0.1.0` y `@vientonorte/ui@0.3.1` consumidos). Este doc cierra la Fase 1-2 para los 2 repos restantes con archivo de tokens propio.

> Ejecutar este checklist **dentro de cada repo** (`table-ro`, `antropologia-corrupcion`/Contra-Archivo), no en `vientonorte-core`. Un PR por repo, ≤400 líneas útiles.

---

## 0 · Pre-requisitos (ambos repos)

- [ ] `.npmrc` con `@vientonorte:registry=https://npm.pkg.github.com` y `NODE_AUTH_TOKEN` configurado en CI/local
- [ ] `pnpm add @vientonorte/tokens@^0.1.0 @vientonorte/ui@^0.3.1 @vientonorte/a11y@^0.1.1`
- [ ] Build limpio post-install (`pnpm build`) antes de tocar estilos

---

## 1 · `table-ro`

Archivo de tokens: `table-ro/css/styles.css` (~25 vars, dark + colores personales).

### Mapeo de tokens (de `docs/audit-duplicacion.md`)

| Token actual | → Token `@vn/*` |
|---|---|
| `--bg: #0D0D1A` | `--vn-azul-noche` |
| `--s1: #131325` | `--vn-surface-1` (derivado) |
| `--txt: #E2E8F0` | `--vn-marfil` |
| `--mut` (ya corregido a `#94A3B8` en Fase 3) | `--vn-pizarra` — **verificar contraste tras migrar**, no perder el fix de a11y |
| `--ro: #7C3AED` | mantener como **acento de proyecto** (no mapea 1:1 a paleta vn) — definir override local |
| `--camila: #10B981` | `--vn-success` |
| `--warn: #FB923C` | `--vn-amarillo` |
| `--ok: #10B981` | `--vn-success` |
| `--err: #F87171` | `--vn-rojo` |
| `--bd: rgba(255,255,255,.08)` | `--vn-border` (derivado) |

### Pasos

- [ ] Importar `@vientonorte/tokens/css` en el entrypoint de estilos
- [ ] Reemplazar vars `--bg/--s1/--txt/--mut/--warn/--ok/--err/--bd` por equivalentes `--vn-*` (mapeo arriba)
- [ ] Mantener `--ro` y `--camila` como overrides locales declarados *después* del import de `@vn/tokens` (no eliminar identidad de proyecto)
- [ ] Tipografía: ya usa **Chillax** → aplicar override de ADR 0003 (`--vn-font-ui: var(--vn-font-optional)`), no migrar a Inter
- [ ] Espaciado: convertir `(ad hoc)` a escala `--vn-space-N` (base 4px) donde sea directo; no forzar en layouts ya ajustados
- [ ] Radios: `--r: 12px` → `--vn-radius-lg` (12px coincide exacto)
- [ ] Sombras: `--sh` único → mapear a `--vn-shadow-md` como base, agregar `sm/lg` solo si se usan
- [ ] **Re-correr pa11y** y confirmar que el fix de Fase 3 (53→0 violaciones) **no regresiona** tras el cambio de tokens — esto es lo más riesgoso del PR
- [ ] Si hay componentes shadcn/custom equivalentes a `@vn/ui` (Button, Card, Badge, Tabs, etc.), evaluar reemplazo — opcional, puede ir en PR separado

---

## 2 · `Contra-Archivo` (`antropologia-corrupcion`)

Archivo de tokens: `antropologia-corrupcion/styles/shared.css` (~100 vars, dark theme editorial).

### Mapeo de tokens

| Token actual | → Token `@vn/*` |
|---|---|
| `--bg: #0c0c0c` | `--vn-azul-noche` — ⚠️ contraste cambia, revisar legibilidad de imágenes/overlays editoriales |
| `--s1: #131313` | `--vn-surface-1` (derivado) |
| `--text: #e2e2e2` | `--vn-marfil` |
| `--muted: #888` | `--vn-pizarra` — **bloquea Fase 3b de a11y** (53 violaciones de contraste pendientes, ver `docs/baseline-a11y.md`). Este token DEBE resolver el contraste ≥4.5:1, candidato previo: `#afafaf` |
| `--etica: #c8a96e`, `--inst: #4a7fa5`, `--crit: #c85f4a` | Colores semánticos editoriales **propios** — no mapean a paleta vn. Definir como overrides locales y validar contraste sobre `--vn-azul-noche` (no sobre `#0c0c0c` original) |
| `--warn: #e8b84b` | `--vn-amarillo` |
| `--border: rgba(255,255,255,.07)` | `--vn-border` (derivado) |

### Pasos

- [ ] Importar `@vientonorte/tokens/css`
- [ ] **Resolver Fase 3b primero o en simultáneo**: al migrar `--muted`/`--text`/`--bg` a `--vn-*`, validar las 53 violaciones de contraste contra los nuevos valores — puede que la migración misma resuelva varias
- [ ] Reemplazar `--bg/--text/--border/--warn` por `--vn-*` (mapeo arriba)
- [ ] Mantener `--etica`, `--inst`, `--crit`, `--mat` como overrides locales editoriales; recalcular contraste de cada uno sobre `--vn-azul-noche`
- [ ] Tipografía: actualmente system (`-apple-system`) → adoptar **DM Serif Display + Inter** (es uno de los repos listados como objetivo en ADR 0003, sin excepción Chillax)
- [ ] Espaciado: `--sp-1..8` (base 4px) → renombrar a `--vn-space-N`, escala compatible
- [ ] Radios: `--r: 8px`, `--r-lg: 12px` → `--vn-radius-sm` / `--vn-radius-lg` (coinciden)
- [ ] Sombras: `--shadow-sm/md/lg` → `--vn-shadow-sm/md/lg` (renombrado directo)
- [ ] Transiciones: `cubic-bezier(.4,0,.2,1)` + `--dur/--dur-slow` → `--vn-ease-out` + `--vn-duration-base/slow` (valores ya compatibles)
- [ ] **No tocar el grafo force-directed** ni su lógica — solo tokens visuales (regla CLAUDE.md: lógica de negocio queda fuera del core)
- [ ] Re-correr pa11y al final, actualizar `docs/baseline-a11y.md` en `vientonorte-core` con el resultado (53 → objetivo 0)

---

## 3 · Cierre

- [ ] Actualizar `docs/audit-duplicacion.md` y `docs/baseline-a11y.md` en `vientonorte-core` con resultados finales
- [ ] Marcar Fase 1-2 como ✅ completa para **todos** los repos LIVE en `CLAUDE.md`
- [ ] ADR nuevo si surge alguna decisión no cubierta (p.ej. tratamiento de colores semánticos editoriales de Contra-Archivo)
