# Publish @vientonorte/* → GitHub Packages

PDF automaciones P3 · design system live · 2026-07-26

## Source of truth (marca / DS visual)

| Capa | Dónde |
|------|--------|
| **Marca + DS visual (Figma Sites)** | https://dot-wool-76997229.figma.site |
| **Código tokens/ui/a11y/security** | este monorepo `packages/*` |
| **Consumo producto** | mi-portafolio (y apps VN) vía `npm.pkg.github.com` |

El sitio Figma es la **referencia de marca**. Los paquetes npm son la **implementación** (`@vientonorte/tokens`, `ui`, `a11y`, `security`).

## Packages (source monorepo)

| Package | private | version | registry access |
|---------|---------|---------|-----------------|
| `@vientonorte/ui` | no | 0.3.2 | public |
| `@vientonorte/tokens` | no | 0.2.0 | public |
| `@vientonorte/a11y` | no | 0.1.1 | public |
| `@vientonorte/security` | no | 0.1.1 | public |
| `@vientonorte/analytics` | yes | — | no publish |
| `@vientonorte/cli` | yes | — | no publish |

## Auth (una vez)

### A) Ampliar `gh` local (inventario + publish local)

```bash
# scopes correctos (delete:packages en plural)
gh auth refresh -h github.com -s read:packages,write:packages,delete:packages
gh auth status   # debe listar read:packages / write:packages
gh api user/packages?package_type=npm
```

### B) Secret CI `VN_PACKAGES_TOKEN` (si GITHUB_TOKEN da 403)

1. GitHub → Settings → Developer settings → **Personal access tokens (classic)**
2. Generate: scopes **`write:packages`**, **`read:packages`**, **`repo`**
3. Repo `vientonorte-core` → Settings → Secrets → Actions → New: **`VN_PACKAGES_TOKEN`** = el PAT
4. En cada package de https://github.com/vientonorte?tab=packages → Package settings → **Connect repository** → `vientonorte-core` (role Write)

### C) Publicar

```bash
gh workflow run "Publish (GitHub Packages)" --repo vientonorte/vientonorte-core
gh run watch --repo vientonorte/vientonorte-core
```

O Actions UI → **Publish (GitHub Packages)** → Run workflow.

## Blocker histórico (2026-06-11)

`403 write_package` al PUT `@vientonorte/a11y` — suele ser package huérfano sin repo link, o token sin `write:packages`. Arregla B) + Connect repository.

## Consumir desde mi-portafolio (después de publish verde)

`.npmrc`:

```
@vientonorte:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

```json
"dependencies": {
  "@vientonorte/tokens": "0.2.0",
  "@vientonorte/ui": "0.3.2"
}
```

No forzar consumo hasta que `pnpm -r publish` pase en CI.

## Links

- DS Figma Sites: https://dot-wool-76997229.figma.site
- Packages tab: https://github.com/vientonorte?tab=packages
- Workflow: `.github/workflows/publish.yml`
