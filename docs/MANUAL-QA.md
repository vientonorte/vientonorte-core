<!-- Viento Norte Manual QA v1.0.0 · 2026-07-20 · colectivo -->

# Manual QA — vientonorte-core

**App/lib:** Monorepo del colectivo — tokens, UI, a11y, security, analytics, CLI + Storybook  
**Repo:** https://github.com/vientonorte/vientonorte-core  
**Versión checklist:** 1.0.0 · 2026-07-20

Este manual es **de biblioteca + Storybook**, no de una sola UI de producto.  
Corre **antes** de publicar packages o de consumir un bump en `mi-portafolio` / otras apps.

---

## Mapa de unidades

| Unidad | Path | Tipo |
|--------|------|------|
| Storybook | `apps/storybook` | app de catálogo |
| UI | `packages/ui` | lib componentes |
| Tokens | `packages/tokens` | lib design tokens |
| A11y | `packages/a11y` | lib utilidades |
| Security | `packages/security` | lib |
| Analytics | `packages/analytics` | lib |
| CLI | `packages/cli` | tool |
| ADRs | `docs/adr` | docs |

Stories conocidas: Alert, Badge, Button, Card, Dialog, FormControls, Input, Tabs.

---

## A · Smoke monorepo (8 min) — **obligatorio**

En local (o CI verde como proxy):

- [ ] **A1** `pnpm install` sin error (o lockfile actualizado)
- [ ] **A2** `pnpm build` PASS en packages del release
- [ ] **A3** `pnpm typecheck` PASS (si script existe)
- [ ] **A4** `pnpm test` PASS o suite vacía documentada
- [ ] **A5** `pnpm lint` sin errores nuevos del scope

**Resultado A:** PASS / FAIL

---

## B · Storybook visual (12 min) — **crítico en release UI/tokens**

- [ ] **B1** `pnpm storybook` (o `storybook:build`) levanta / build OK
- [ ] **B2** Cada story lista en sidebar carga sin crash:
  - [ ] Button
  - [ ] Input
  - [ ] Badge
  - [ ] Card
  - [ ] Alert
  - [ ] Dialog
  - [ ] Tabs
  - [ ] FormControls
- [ ] **B3** Controles (args) cambian UI de forma predecible
- [ ] **B4** Dark/light (si existe) no rompe contraste obvio
- [ ] **B5** Dialog: open/close, focus trap, Escape

**Resultado B:** PASS / FAIL / N/A

---

## C · Tokens (8 min)

- [ ] **C1** Package tokens build emite CSS vars / JS tokens esperados
- [ ] **C2** Spot-check: color primary, neutral scale, spacing existen
- [ ] **C3** Docs `docs/` de migración tokens (si hay pendientes) no contradicen build
- [ ] **C4** Consumidor smoke (opcional): una app del colectivo con bump no “explota” en home

**Resultado C:** PASS / FAIL / N/A

---

## D · Packages no-UI (6 min)

- [ ] **D1** `@…/a11y` — export principal importable; helpers no throw en uso trivial
- [ ] **D2** `@…/security` — API documentada; sin side-effects peligrosos al import
- [ ] **D3** `@…/analytics` — track no-op o env-gated en dev
- [ ] **D4** `@…/cli` — `--help` o comando de smoke funciona

**Resultado D:** PASS / FAIL / N/A

---

## E · ADRs y docs (3 min)

- [ ] **E1** Índice ADR en `docs/adr` legible
- [ ] **E2** README root describe install/build/release (changeset)
- [ ] **E3** Changelog/changeset del release no vacío si hay publish

**Resultado E:** PASS / FAIL / N/A

---

## F · Publish gate (solo si hay release npm)

- [ ] **F1** Version bump coherente (changeset)
- [ ] **F2** CI `publish.yml` / `ci.yml` verde
- [ ] **F3** Package names y exports `package.json` correctos (no publicar basura accidental)
- [ ] **F4** Tag/release notes en GitHub

**Resultado F:** PASS / FAIL / N/A

---

## Z · A11y en Storybook (8 min)

- [ ] **Z1** Button/Input: focus visible
- [ ] **Z2** Dialog: focus trap + restore focus al cerrar
- [ ] **Z3** Tabs: flechas o tab pattern usable
- [ ] **Z4** FormControls: label asociado
- [ ] **Z5** Alert: rol/aria adecuado (spot)
- [ ] **Z6** Contraste tokens light/dark spot-check

**Resultado Z:** PASS / FAIL

---

## Go / No-Go

| Check | OK |
|-------|-----|
| Build/typecheck A PASS | [ ] |
| Storybook B PASS si UI/tokens en scope | [ ] |
| Publish F PASS o N/A | [ ] |
| Cero S0/S1 | [ ] |

**Decisión:** GO publish / GO merge only / NO-GO  
**Executor:** ___________ **Fecha:** ___________ **SHA:** ___________  
**Packages en scope:** ___________

---

## Protocolo colectivo (extracto)

Severidades: **S0** crash/security (bloquea) · **S1** feature crítica (bloquea) · **S2** UX material · **S3** cosmético.

Gate: Smoke A PASS + 0× S0/S1 = GO. Registrar sesión en issue/PR o archivo de log local.

A11y mínimo (sección Z): tab order, focus visible, Escape en modales, contraste spot, reduced-motion.

Fuente del paquete: workflow Viento Norte · Manual QA 1.0.0
