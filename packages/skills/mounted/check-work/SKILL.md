---
name: check-work
description: >
  Check your work with a verification pass that reviews diffs, runs builds
  and tests, and evaluates correctness.
  Use when: asked to "check work", "verify changes", "self-verify",
  "/check-work", "/check", "/verify", or "/self-verify".
---

# /check-work

Verify what just changed. Do not re-implement the feature.

## Scope

- Uncommitted diff if present.
- Else the named branch, PR, or files the user pointed at.
- VN FO: prefer iCloud `Documents/GitHub/mi-portafolio`, not a stale `~/code` clone unless the user said so.

## Pass

1. `git status` + `git diff` (and `git log -5 --oneline`).
2. Read the changed files. Confirm the request is actually done.
3. Run the smallest existing check: project test/lint/build script if it exists. Do not invent a new test harness.
4. Hunt regressions in the same surfaces (routes, copy, vault path, CI).
5. Report only evidence. If a check did not run → `NO DATO`.

## Output

```markdown
## Check
- Scope: …
- PASS / FAIL / PARTIAL
- Evidence: command or hash
- Gaps: …
```

Do not merge, push, or "fix while checking" unless the user asked to apply fixes.
