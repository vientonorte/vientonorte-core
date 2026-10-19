---
name: org-hygiene
description: >
  Audit vientonorte org: open PRs, branch noise, protect main, Dependabot red.
  Use when: weekly org hygiene, after mass Dependabot noise, /org-hygiene.
---

# /org-hygiene

**Fuente:** workflow `~/.grok/workflows/org-hygiene.rhai` (no reimplementar).

```text
/org-hygiene
```

o `workflow` tool con `name: "org-hygiene"`.

## Reglas

- GitHub MCP (`github__*`, `owner=vientonorte`). No `gh` CLI. Playbook: `/mcp-vn`.
- Solo lectura salvo que Rö pida merge/close/delete.
- Gate Dependabot: CI verde + minor/patch = merge; **major = HOLD**.
- No inventar CI. Si no hay checks → HOLD.
- `main` protegido → no force-push.

Output: summary · actions (repo + action) · blockers · `improve` (PRs puntuados en script).

## Improve (fase 3)

El scan devuelve hechos (`ci`, `kind`). El **script** puntúa, el agente no:

| score | condición | acción |
|------:|-----------|--------|
| 100 | CI green + minor/patch | merge candidate (Decider) |
| 50 | 0 checks | HOLD |
| 10 | CI red | HOLD |
| 0 | major | HOLD |

Nunca merge desde el workflow.
