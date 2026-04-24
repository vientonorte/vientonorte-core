# CLAUDE.md — PROYECTO_NAME

> Auto-contenido. Pegar al inicio de cada sesión en este repo.
> Generado por @vientonorte/cli — template: PROYECTO_TEMPLATE

## Proyecto
**PROYECTO_NAME** — parte del colectivo vientonorte.

## Rol
Desarrollador del proyecto PROYECTO_NAME.
Referencia de arquitectura compartida: `vientonorte-core`.

## Reglas innegociables
1. No rompas producción — el proyecto debe desplegarse en GitHub Pages en todo momento.
2. Migra en fases — un commit = un cambio reversible; un PR ≤ 400 líneas útiles.
3. Verifica antes de afirmar — "ya funciona" requiere build limpio + URL visitada + consola limpia.
4. Baseline-first — sin medición previa no se declaran cifras de mejora.
5. Pregunta antes de asumir — 3 alternativas → consulta al usuario.

## Prioridades de diseño
**a11y > design > security** (decisión vientonorte 2026-04-23)

## Principios rectores
- **Seguro**: STRIDE antes de tocar auth/datos/storage.
- **Accesible**: WCAG 2.2 AA mínimo. Sin `div onClick`, contraste ≥ 4.5:1, foco visible, touch ≥ 44px.
- **Mobile-first**: breakpoints desde 360 px; desktop es enhancement.
- **Usabilidad**: revisar `@vientonorte/ui` antes de crear componente nuevo.

## Paleta vientonorte
```
--vn-azul-noche:  #0d1b3d   (bg principal)
--vn-marfil:      #f7f2e7   (superficie, texto sobre oscuro)
--vn-pizarra:     #4a5568   (texto muted)
--vn-rojo:        #E8401C   (acento / error)
--vn-azul-evo:    #1A8FDC   (brand / CTA)
--vn-amarillo:    #F5B945   (warning / highlight)
```
Tipografía: **DM Serif Display** (display) + **Inter** (UI) + **DM Mono** (código).

## Stack
- Node ≥ 20.10, **pnpm**
- TS strict: `noImplicitAny`, `strictNullChecks`, `exactOptionalPropertyTypes`
- Commits: Conventional Commits
- Registry: GitHub Packages (`@vientonorte`)

## Definition of Done
- [ ] `pnpm typecheck` limpio
- [ ] Test unitario (Vitest)
- [ ] Axe-core sin violaciones AA
- [ ] Navegable solo con teclado
- [ ] VoiceOver/NVDA verificado
- [ ] Render en 360 px sin scroll horizontal
- [ ] Entrada en changelog

## Paquetes del core disponibles
- `@vientonorte/tokens` — design tokens CSS
- `@vientonorte/ui` — componentes React
- `@vientonorte/a11y` — helpers accesibilidad
- `@vientonorte/security` — auth multi-factor (si `--with-auth`)
- `@vientonorte/analytics` — GTM+GA4 wrapper (si `--with-analytics`)
