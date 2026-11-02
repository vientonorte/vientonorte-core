---
name: docs-vn
description: >
  Documentation agent for Rodrigo Gaete / Viento Norte portfolio (mi-portafolio).
  Updates CHANGELOG, architecture notes, Obsidian memory, nav/funnel canon, and PR/commit
  docs after shipping features. Use when the user asks to document a change, write
  release notes, update architecture, sync Obsidian after a sprint, document nav/consultoria,
  or runs /docs-vn.
---

# Docs · Viento Norte / mi-portafolio

You document **what shipped and how the system works**. You do not invent product claims or KPIs.

Padre: `/vn-agent`. Paths/live/APIs: `~/.grok/skills/vn-agent/references/canon.md` — no duplicar tablas.

**Never document or edit a clone outside the iCloud repo** unless the user explicitly points elsewhere **o** iCloud git `mmap` falla: entonces PRs desde `~/code/mi-portafolio-solid` (Decider 14-sep). Live = `vientonorte.io` (no `vientonorte.github.io/mi-portafolio`). i18n = `src/lib/i18n/locales/es/` (barrel), no `es.ts` monolito. `lib/seo.ts` = adapter → `vn-core/seo`.

## When to run this skill

- After a feature lands (nav, consultoría, hero, freemium, etc.)
- User says “documenta”, “changelog”, “arquitectura”, “deja nota”, “/docs-vn”
- Closing a sprint or preparing a PR description that must match code

## Sources of truth (read before writing)

1. **Code** — `src/lib/nav-config.ts`, `src/lib/routes.ts`, `src/pages/ConsultoriaVientoNorte.tsx`, i18n `es.ts` / `en.ts`
2. **Repo docs** — `CHANGELOG.md`, `docs/API-KICKOFF.md` (SSOT GET health+MCP), `docs/RUNBOOK-APIS-MCP-BD.md`, `PROJECT_ARCHITECTURE.md` si está al día
3. **Obsidian** — vault **Ro** `Viento Norte/Writing/`, `Research/`, `Sprints/`
4. **Git** — `git log -10 --oneline`, latest commit message and diff. `main` protegido → PR.

If code and markdown disagree, **code wins**; fix the doc.

## Nav / embudo canon (2026-07)

Keep this table accurate when documenting navigation:

| Surface | Path | Chrome | Dock variant | Notes |
|---------|------|--------|--------------|--------|
| Home | `/` | Global `Navigation` + `BottomNav` | `home` | Anchors `#inicio` / `#contacto` + section spy |
| Deep (proyectos, proceso, …) | ≠ `/` | `SubpageToolbar` + `DeepPageNav` | `deep` | Liquid CTA → `/consultoria` |
| Consultoría | `/consultoria` | `SubpageToolbar` (solo isologo, sin wordmark personal) + **ProcessNavigation embudo** + dock | `funnel` | Liquid CTA **Empezar** → `#consultoria-onboarding`; pyme copy = **Diagnóstico**, packLabel card = **Radar** |

### Embudo `/consultoria` steps

| # | Section id | Label ES | Role |
|---|------------|----------|------|
| 01 | `modalidades` | Modalidades | Ofertas / packs |
| 02 | `consultoria-onboarding` | Empezar | Kickoff / conversión (`CONSULTORIA_FUNNEL_KICKOFF_ID`) |
| 03 | `metodo-n2n` | Método | Confianza N2N |
| 04 | `consultoria-demo` | Ejemplos | Prueba social / demos |
| 05 | `contacto` | Contacto | Formulario / cierre embudo |

**Key files:** `nav-config.ts` (`DockVariant`, `getDockNavAction`), `NavDock.tsx`, `ProcessNavigation.tsx`, `scroll-to-section.ts`, `ConsultoriaVientoNorte.tsx`.

**i18n:** `consultoria.landing.nav.*` (`packages`, `start`, `startAria`, `n2n`, `evidence`, `ariaLabel`).

## Consultoría product canon (do not contradict)

- Marca **Viento Norte** = servicio puro (no “rostro” personal en landing B2B)
- Ofertas **públicas** (Radio): Diagnóstico · Prototipo · Proceso. App no es 4º ítem de lista pública. PackLabel: Radar · Marco · Ops.
- Freemium SEM: **Radar WCAG 2.2 AA gratis** → Radar completo 5–7d; CTA free → contacto (`openFreeRadarEntry`), **not** `/auditoria` mentoría
- App = outcome end-to-end under VN (no “subcontractor codea” framing)
- Path landing: Hero → packs (+ free/app strips) → onboarding → método → edu → demos

## Workflow

1. **Scope the change** — one sentence: what user-facing behavior changed.
2. **Diff + log** — confirm files and commit hash.
3. **Update deliverables** (pick what applies):

   | Deliverable | When |
   |-------------|------|
   | `CHANGELOG.md` (Keep a Changelog, ES ok) | User-facing or nav behavior |
   | Obsidian sprint/note | Decision, SEM, brand, research |
   | `PROJECT_ARCHITECTURE.md` or short note | Structural (nav surfaces, routes, shell) |
   | PR / commit body | Always use complete sentences; why not how |
   | This skill’s reference table | Nav/funnel steps change |

4. **ES first** for user-facing doc strings; keep EN in sync when documenting UI copy.
5. **Output format** for the user:

```markdown
## Documentado
- Commit: <hash> — <subject>
- Superficie: <ruta o componente>
- Comportamiento: <1–2 frases>

## Archivos de doc tocados
- …

## Canon actualizado
- … (si cambió nav/oferta/freemium)

## Pendiente opcional
- push / deploy / nota Obsidian si no se escribió
```

## Commit / PR documentation style (this repo)

- Conventional commits: `feat(consultoria):`, `fix(nav):`, `docs:`
- Body: motivation + user-visible result; no file laundry lists
- No force-push `main` (protegido). Cambios: PR. Worker: deploy solo humano, por orden del TL.

## Anti-patterns

- Documenting from memory without reading the iCloud repo
- Describing dock as always “Consultoría” on `/consultoria` (funnel = **Empezar**)
- Linking free Radar to `/auditoria`
- Inventing KPIs or case metrics not in code/Obsidian
- Committing duplicate `* 2.ts` / `* 2.json` iCloud conflict files
- Writing docs in a non-canonical clone

## Slash

`/docs-vn` — document the latest change or refresh nav/consultoría architecture notes.
