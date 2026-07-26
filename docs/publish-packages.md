# Publish @vientonorte/* → GitHub Packages

PDF automaciones P3 · 2026-07-26

## Packages (source monorepo)

| Package | private | version |
|---------|---------|---------|
| @vientonorte/ui | no | 0.3.2 |
| @vientonorte/tokens | no | 0.2.0 |
| @vientonorte/a11y | no | 0.1.1 |
| @vientonorte/security | no | 0.1.1 |
| @vientonorte/analytics | yes | — |
| @vientonorte/cli | yes | — |

## Blocker (last run 2026-06-11)

`403 write_package` on PUT `@vientonorte/a11y` — GITHUB_TOKEN cannot write if package was created outside this repo or ownership mismatch.

## Fix (manual once)

1. Local: `gh auth refresh -s read:packages,write:packages,delete:packages`
2. Create PAT classic with `write:packages` + `read:packages` → secret name **`VN_PACKAGES_TOKEN`** on `vientonorte-core`
3. In each package settings on github.com/vientonorte?tab=packages: **Connect repository** → `vientonorte-core` and grant write
4. Actions → **Publish (GitHub Packages)** → Run workflow

## Consume from mi-portafolio (after publish)

```npmrc
@vientonorte:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

```json
"dependencies": {
  "@vientonorte/tokens": "0.2.0",
  "@vientonorte/ui": "0.3.2"
}
```

Do not force-consume until publish is green.
