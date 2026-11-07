---
name: yt-to-notebooklm
version: 1.0
visibility: public
layer: general
activation: on request
description: >
  Search YouTube, push top videos into NotebookLM, and optionally query the notebook.
  Use when el usuario runs /yt-research or asks to research a topic via YouTube → NotebookLM.
---

# yt-to-notebooklm

## Activation

- Slash command `/yt-research` (Claude)
- Intent: “busca en YouTube y manda a NotebookLM”, “research YT sobre …”

## Runtime

```bash
python3 ~/.claude/skills/yt-to-notebooklm/scripts/yt_to_notebooklm.py "<topic>" [options]
```

Common options:

- `--count N`
- `--months N`
- `--notebook "Name"`
- `--query "Question?"`
- `--no-date-filter`

Requires: `yt-dlp`, local `notebooklm` CLI where configured.

## Related

- `notebooklm`
- Claude command: `~/.claude/commands/yt-research.md`
- Setup note (legacy): GitHub root `yt-search-skill-setup.md`

---

Maintained in: ro-skills (general layer)
