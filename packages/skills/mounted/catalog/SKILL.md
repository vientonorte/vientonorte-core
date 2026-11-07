---
name: catalog
version: 1.0
visibility: public
layer: research
activation: on request
description: >
  Universal research catalog — add and organize GitHub repos, YouTube videos,
  Figma files, PDFs, and URLs into a local index. Use when el usuario runs /catalog or
  asks to catalog a source for research.
---

# catalog

## Activation

- Slash command `/catalog` (Claude)
- Intent: “cataloga este repo/URL”, “organiza fuentes”, “índice de research”

## Runtime

```bash
python3 ~/.claude/skills/catalog/scripts/catalog.py $ARGUMENTS
```

After bootstrap pull, script lives at:

```text
skills/research/catalog/scripts/catalog.py
```

Synced path on machine: `~/.claude/skills/catalog/scripts/catalog.py`

## Commands

| Args | Effect |
|------|--------|
| `add <source> [--tag X] [--project Y] [--push-notebooklm]` | Analiza y guarda card |
| `list [--type TYPE] [--project Y] [--tag X]` | Lista |
| `search <query>` | Busca |
| `export [--project Y] [--push-notebooklm]` | Exporta |
| `report [--project Y]` | Reporte |

Index file: `~/.claude/catalog/index.json`

## Related

- `yt-to-notebooklm`, `notebooklm`, `github-analyze`
- Claude command: `~/.claude/commands/catalog.md`

---

Maintained in: ro-skills (research layer)
