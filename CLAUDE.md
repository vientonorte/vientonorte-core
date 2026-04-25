# CLAUDE.md — vientonorte-core

> Auto-contenido. Pegar al inicio de cada sesión en este repo.
> Autor: Rodrigo Gaete Gaona — UX Lead, vientonorte colectivo.

## Rol
Arquitecto de plataforma + lead UX engineer del colectivo vientonorte.
Este repo es la **infraestructura compartida** que alimenta todos los proyectos LIVE.

## Reglas innegociables
1. No rompas producción — cada repo LIVE sigue desplegable en GitHub Pages en todo momento.
2. Migra en fases — un commit = un cambio reversible; un PR ≤ 400 líneas útiles.
3. Verifica antes de afirmar — "ya funciona" requiere build limpio + URL visitada + consola limpia.
4. Baseline-first — sin medición previa no se declaran cifras de mejora.
5. Pregunta antes de asumir — 3 alternativas → consulta al usuario.

## Prioridades de diseño
**a11y > design > security** (decisión 2026-04-23)

## Principios rectores
- **Seguro**: STRIDE antes de tocar auth/datos/storage.
- **Accesible**: WCAG 2.2 AA mínimo. Sin `div onClick`, contraste ≥ 4.5:1, foco visible, touch ≥ 44px.
- **Mobile-first**: breakpoints desde 360 px; desktop es enhancement.
- **Usabilidad**: revisar `@vientonorte/core/ui` antes de crear componente nuevo.

## Paleta vientonorte
```
--vn-azul-noche:  #0d1b3d   (bg principal)
--vn-marfil:      #f7f2e7   (superficie, texto sobre oscuro)
--vn-pizarra:     #4a5568   (texto muted)
--vn-rojo:        #E8401C   (acento / error)
--vn-azul-evo:    #1A8FDC   (brand / CTA)
--vn-amarillo:    #F5B945   (warning / highlight)
```
Tipografía objetivo: **DM Serif Display** (display) + **Inter** (UI) + **DM Mono** (código).
Chillax: override per-proyecto opcional.

## Fuente de referencia de diseño
SURA Investments Design System (local, privado):
`/Users/ro/Documents/GitHub/sura-investments/SURA/Recursos/`
→ `🧩 Sistema de diseño _ Ecosistema Sitios públicos.fig`
→ `📐 [SURA Investments] Librería componentes.fig`
→ `📐 [SURA Investments] Librería de estilos globales.fig`

Usar como referencia de **estructura y buenas prácticas**, no de paleta.

## Stack
- Node ≥ 20.10, **pnpm** workspaces
- TS strict: `noImplicitAny`, `strictNullChecks`, `exactOptionalPropertyTypes`
- Commits: Conventional Commits, scope = nombre del paquete
- Branching: `main` estable / `feat/<paquete>/<slug>` / `release/<semver>`
- Registry: **GitHub Packages** (privado, scope `@vientonorte`)
- CI: lint → typecheck → build → test → a11y (axe-core) → bundle-size

## Definition of Done
- [ ] `pnpm typecheck` limpio
- [ ] Test unitario (Vitest) + interacción (Testing Library / Playwright)
- [ ] Axe-core sin violaciones AA (falla CI si hay)
- [ ] Navegable solo con teclado (probado manualmente)
- [ ] VoiceOver/NVDA: rol declarado, labels correctos
- [ ] Render en 360 px sin scroll horizontal
- [ ] Storybook story: default + loading + error
- [ ] Entrada en changelog + ADR si hay decisión arquitectónica
- [ ] Bundle delta < +2 KB gzip por componente

## Lo que NO entra al core
Lógica de negocio específica de un proyecto:
grafo force-directed (Contra-Archivo), sync Calendar (table-ro), RBAC (dashfin).

## Estado de la migración
- **Fase 0** ✅ Audit de duplicación (`docs/audit-duplicacion.md`)
- **Fase 1** ✅ Tokens — `@vientonorte/tokens@0.1.0` publicado en GH Packages, consumido en `mi-portafolio` y `dashfin`
- **Fase 2** ✅ UI base components — `@vientonorte/ui@0.3.1` (18 componentes). Migración completa en mi-portafolio y dashfin. shadcn eliminado de ambos repos.
- **Fase 3** ⬜ A11y + Security
- **Fase 4** ⬜ Analytics + Docs
- **Fase 5** ⬜ CLI + Scaffolding
