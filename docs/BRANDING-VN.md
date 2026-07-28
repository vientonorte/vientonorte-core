# Branding Viento Norte · vía `@vientonorte/*`

**Canon de marca:** Viento Norte (colectivo / org `vientonorte`)  
**Source of truth visual:** packages en este monorepo + Figma DS  
**No copiar CSS de marca a mano entre repos.**

## Qué es “branding desde core”

| Capa | Package | Rol |
|------|---------|-----|
| **Tokens** | `@vientonorte/tokens` | `--vn-*` color, tipo, espacio, motion |
| **UI** | `@vientonorte/ui` | átomos/moléculas (Button, Card…) |
| **A11y** | `@vientonorte/a11y` | skip link, focus trap, live region |
| **CLI** | `@vientonorte/cli` | `vientonorte init` scaffold |

Nombre de producto en UI/copy: **Viento Norte** (no “VN” solo en superficies de cliente; “VN” ok en ops internos).

## Repos target (rollout)

| Repo | Prioridad | Tokens | UI | Notas |
|------|-----------|--------|-----|--------|
| mi-portafolio | P0 | ✅ 0.2.0 | ✅ 0.3.2 | Landing + embudo |
| table-ro | P0 | ✅ 0.2.0 | — | Pin exacto |
| vientonorte.github.io | P1 | wire hub CSS | — | ops + hub |
| uxtools | P1 | añadir | opcional | multi-html |
| aruma | P2 | añadir | opcional | Next |
| dashfin | P2 | añadir | opcional | |

## Contrato mínimo por repo

### 1. `.npmrc`

```
@vientonorte:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

### 2. Deps pin (prod)

```json
"@vientonorte/tokens": "0.2.0"
```

(Apps con componentes: `ui` `0.3.2`, `a11y` `0.1.1`.)

### 3. Entrada CSS

```css
@import "@vientonorte/tokens/css";
/* o en JS: import '@vientonorte/tokens/css' */
```

### 4. Uso semántico

```css
/* ✅ */
color: var(--vn-color-on-surface);
background: var(--vn-color-surface);
/* ❌ no hardcode #1A8FDC / #E8401C salvo en tokens */
```

### 5. Wordmark

- Texto: **Viento Norte**  
- Logo monogram: solo assets oficiales (portafolio / Figma DS)  
- No inventar logos por repo  

## Checklist “repo branded”

- [ ] `.npmrc` scope `@vientonorte`  
- [ ] secret `VN_PACKAGES_TOKEN` en Actions  
- [ ] pin tokens (y ui si aplica)  
- [ ] import tokens en entry CSS/JS  
- [ ] 0 hex brand sueltos en layouts principales  
- [ ] título/document title usa “Viento Norte” donde sea producto VN  

## Anti-patrones

- Duplicar paleta en cada `index.css`  
- `file:../vientonorte-core` en prod  
- `latest` / `*` en package.json  
- Rebrand parcial (un repo “VN”, otro “Agencia Maraña” en UI cliente)

## Siguiente publish

Tras ampliar tokens (brand wordmark vars, gradiente oficial):

```bash
# en vientonorte-core
pnpm -r build
# Actions → Publish (GitHub Packages)
# bump pins en consumidores
```

Ver: [PACKAGES-CORE.md](./PACKAGES-CORE.md)
