---
name: github-analyze
version: 1.0
visibility: public
layer: general
activation: on request
description: >
  Analyze a GitHub repository: stack, health, activity, contributors, issues.
  Use when el usuario runs /gh-analyze or asks for a repo health report.
---

# github-analyze

## Activation

- Slash command `/gh-analyze` (Claude)
- Intent: “analiza el repo X”, “salud del repositorio”, “stack y issues de …”

## Runtime

```bash
python3 ~/.claude/skills/github-analyze/scripts/analyze_repo.py <owner/repo> [options]
```

Options (script):

- `--push-notebooklm`
- `--output FILE`

## Output

Markdown analysis card: stack, activity, contributors, open issues / health signals.

## Related

- Claude command: `~/.claude/commands/gh-analyze.md`
- `catalog`, `notebooklm`

---

Maintained in: ro-skills (general layer)
