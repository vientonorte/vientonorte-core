# @vientonorte/skills

Catálogo público para **MCP**, **GET /api/skills** y KV `vn:skills`.

**Hosted:** https://vientonorte.io/ops/skills/  
**MCP:** https://contact.vientonorte.io/mcp · tools `list_skills` · `get_skill`  
**API:** https://contact.vientonorte.io/api/skills  
**Local:** `mounted/<id>/SKILL.md` in this package. `getSkill(id).local` is that path. Reading the file does not call a Grok Bot. Grok reads it because `~/.grok/skills/<id>/SKILL.md` is a symlink. Without the Grok binary: `vn-skill-local <id>`.

## Método Ro (DoD)

Horas: M1 5.5 · VN 1.5 · Post 0.75 · Algonova 4º. No 80/10/10.  
Cierre VN: draft mail branding **Viento Norte** + bloque `## Retro deploy`.

```ts
import { listSkills, getSkill, cierreDod } from '@vientonorte/skills';
```

Publish: workflow `Publish (GitHub Packages)` en `vientonorte-core`.
