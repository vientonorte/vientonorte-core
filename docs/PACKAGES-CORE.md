# @vientonorte/* · Core compartido (GitHub Packages)

**Tab:** https://github.com/vientonorte?tab=packages  

Este registry es el **design system / core de plataforma** entre todos los repos del owner `vientonorte`.  
No copiar tokens/UI a mano entre apps: **publicar aquí y consumir por versión**.

## Source of truth

| Capa | Dónde |
|------|--------|
| Código monorepo | este repo `packages/*` |
| Registry | `https://npm.pkg.github.com` scope `@vientonorte` |
| Marca visual | https://dot-wool-76997229.figma.site |
| Publish | Actions → **Publish (GitHub Packages)** + secret `VN_PACKAGES_TOKEN` |

## Catálogo (latest)

| Package | Latest | Uso típico |
|---------|--------|------------|
| `@vientonorte/tokens` | 0.2.0 | CSS vars `--vn-*`, tipografía, motion |
| `@vientonorte/ui` | 0.3.2 | Componentes Atomic Design |
| `@vientonorte/a11y` | 0.1.1 | focus trap, skip link, live region |
| `@vientonorte/security` | 0.1.1 | Factor registry / step-up |
| `@vientonorte/cli` | 0.1.1 | scaffold `vientonorte init` |
| `@vientonorte/analytics` | 0.1.0 | GTM/GA4 naming (legacy publish) |

## Consumidores

| Repo | Estado |
|------|--------|
| **mi-portafolio** | tokens, ui, a11y, security, cli — pinned + CI |
| **table-ro** | a11y, security, tokens — pin a latest (ver PR/commits) |
| uxtools / aruma / dashfin | secret + `.npmrc` listos; añadir deps al migrar UI |

## Cómo consumir en un repo

### 1. `.npmrc` (commiteable)

```
@vientonorte:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

### 2. Secret del repo

`VN_PACKAGES_TOKEN` = PAT classic con `read:packages` (+ `repo` si hace falta).

### 3. CI (GitHub Actions)

```yaml
permissions:
  contents: read
  packages: read

- uses: actions/setup-node@v4
  with:
    node-version-file: .nvmrc
    registry-url: https://npm.pkg.github.com
    scope: '@vientonorte'
- run: npm ci
  env:
    NODE_AUTH_TOKEN: ${{ secrets.VN_PACKAGES_TOKEN || secrets.GITHUB_TOKEN }}
```

### 4. package.json (ej. stack completo app)

```json
"@vientonorte/tokens": "0.2.0",
"@vientonorte/ui": "0.3.2",
"@vientonorte/a11y": "0.1.1",
"@vientonorte/security": "0.1.1"
```

CLI global/dev:

```bash
npm i -D @vientonorte/cli@0.1.1
npx vientonorte init mi-app --template=react-ts
```

## Política de versiones

- **Pin exacto** en apps de prod (`0.2.0`, no `*`).
- Bumps vía Dependabot group o PR manual tras publish.
- Publish solo desde `vientonorte-core` main (workflow_dispatch).
- Packages `private: true` en monorepo no se publican hasta abrirlos a propósito.

## Anti-patrones

- `file:../vientonorte-core/...` en prod (solo dev local opcional)
- `*` o `latest` en package.json de apps
- Duplicar CSS tokens en cada repo
- PAT en git

Ver también: [publish-packages.md](./publish-packages.md)
