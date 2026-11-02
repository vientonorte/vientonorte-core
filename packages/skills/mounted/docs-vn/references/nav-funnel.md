# Nav funnel reference · mi-portafolio

Last aligned with commit introducing `DockVariant = "funnel"` (consultoría embudo).

## Dock variants (`src/lib/nav-config.ts`)

```ts
type DockVariant = "home" | "deep" | "funnel";
```

| Variant | When | Center slot (`DOCK_CENTER_ID` = consultoria) |
|---------|------|-----------------------------------------------|
| `home` | `path === /` | Route → `/consultoria` |
| `deep` | other deep pages | Route → `/consultoria` |
| `funnel` | `path === /consultoria` | Anchor `#consultoria-onboarding` + `homeRoute: /consultoria` |

`executeNavAction` for `kind: "anchor"` uses `action.homeRoute` (default `/`): if already on that route, scroll; else navigate then pending scroll.

## ProcessNavigation embudo

- Component: `src/components/molecules/ProcessNavigation.tsx`
- Spy: `src/hooks/useProcessSectionSpy.ts`
- Mobile: sticky chips under `.subpage-toolbar`
- Desktop xl+: fixed right TOC with visited checks

Consultoría sections wired in `ConsultoriaVientoNorte.tsx`:

1. `modalidades`
2. `consultoria-onboarding` (`CONSULTORIA_FUNNEL_KICKOFF_ID`)
3. `contacto` (`Contact` organism, same as home)

Tour de módulos: `/consultoria/modulos/:id` (no está en el TOC SEM).

## Scroll offset

`scroll-to-section.ts` adds:

- subpage: `.subpage-toolbar` height (or `--header-height`)
- visible `.process-nav-mobile` height when not `display: none`

## i18n keys

`consultoria.landing.nav`:

- `packages`, `start`, `startAria`, `n2n`, `evidence`, `ariaLabel`
- legacy keys may remain: `private`, `education`, `practices`, `fit`

## Tests

`src/__tests__/lib/nav-config.test.ts` — funnel actions + 3-slot dock.
