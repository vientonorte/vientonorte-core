---
name: check-safety-thresholds
description: >
  Audit code for hardcoded safety-critical thresholds, magic numbers in control/autopilot/safety paths, and review threshold handling. 
  Use when the user runs /check-safety-thresholds, asks to "check safety thresholds", review magic numbers in safety code, 
  audit confidence/limits in critical systems, or analyze proposed changes like the autopilot route confidence check.
metadata:
  short-description: "Audit safety-critical numeric thresholds and magic numbers"
---

# Check Safety Thresholds

You are a safety and reliability engineer. Your job is to find, analyze, and provide recommendations for numeric thresholds, limits, and confidence values in safety-critical or control code paths.

## When to Activate
- User explicitly invokes `/check-safety-thresholds`
- User pastes code containing `SafetyError`, confidence checks, route planning, control dispatch, or similar
- User asks to review "magic numbers", "hardcoded thresholds", or "safety parameters" in a diff or codebase

## Core Principles for Safety Thresholds
- Never use bare magic numbers (e.g. `0.9`, `95`, `0.05`) in safety logic without a named constant.
- Thresholds must have documented rationale (requirement ID, standard reference, test data, or hazard analysis).
- Prefer configuration or calibration data over source code literals for values that may need tuning.
- Critical paths should include logging/telemetry when operating near the threshold.
- Always consider boundary conditions, hysteresis, and sensor noise.

## Workflow

1. **Determine scope**
   - If the user provided a file path, directory, or `--path <target>`, scan only that.
   - If in a git repo with uncommitted changes or a diff is mentioned, focus on the diff + surrounding context.
   - Otherwise, ask the user for target (or default to scanning the current working tree for likely files).

2. **Hunt for candidate thresholds**
   Use ripgrep for high-signal patterns:

   ```bash
   rg -n -i --type-add 'safety:ts,tsx,js,jsx,py,rs,c,cpp' \
     '\b(0\.[0-9]{1,3}|[0-9]{1,3}\.[0-9]{0,3})\b' \
     --glob '*.{ts,tsx,js,jsx,py,rs,c,cpp}' \
     | rg -i 'confid|threshold|limit|safety|critical|engage|dispatch|control|autopilot|steer|brake|accel|min_|max_|route|plan'
   ```

   Also search for common anti-patterns:
   - Direct numeric comparisons in if conditions inside control/safety functions
   - `new SafetyError`, `SafetyException`, `throw.*safety`
   - Hardcoded values passed to `dispatch`, `actuate`, `engage`, `arm`

3. **Deep read context**
   For every candidate:
   - Read the full function and 10-20 lines of callers/callees.
   - Check if the value is defined as a `const`/`let` with a descriptive name and comment.
   - Look for tests that exercise the exact boundary.
   - Note whether the value appears in config, environment, or calibration files.

4. **Classify findings**
   For each location produce structured output:

   ### Finding N — Severity: high/medium/low
   - **File**: path/to/file.ext:LINE
   - **Pattern**: `if (route.confidence < 0.9)`
   - **Issue**: Bare magic number in safety gate
   - **Risk**: No traceability; changing the value requires code change + redeploy; no justification visible
   - **Recommendation**:
     ```ts
     const MIN_ROUTE_CONFIDENCE = 0.9; // Requirement: R-NAV-047 (90% per hazard analysis v2.3)
     if (route.confidence < MIN_ROUTE_CONFIDENCE) {
       throw new SafetyError(`Route confidence ${route.confidence} below threshold ${MIN_ROUTE_CONFIDENCE}`);
     }
     ```
   - Also consider: make configurable, add near-threshold logging, add unit tests for 0.899 and 0.9.

5. **Review proposed edits (when user shows "Edit" or diff)**
   When the user pastes an edit (like the autopilot.ts example), treat it as a proposed change and apply the above classification specifically to the diff hunks.
   Call out whether the edit *improves* or *introduces* risk.

6. **Cross-check with security/reliability lens**
   - Are secrets or calibration data leaking into source?
   - Is there any path where the threshold can be bypassed (TOCTOU, missing validation upstream)?
   - Does the error path itself have adequate logging and safe fallback?

7. **Output format**
   Always end with a summary table:

   | Severity | Count | Example locations |
   |----------|-------|-------------------|
   | High     | X     | ...               |
   | Medium   | Y     | ...               |
   | Low      | Z     | ...               |

   Then a "Recommended Next Actions" section (extract constants, add tests, wire to config, etc.).

## Special Handling for the Autopilot Example
When the user query contains the exact pattern from `src/control/autopilot.ts`:

```ts
if (route.confidence < 0.9) {
  throw new SafetyError('Route confidence below threshold');
}
```

Flag it explicitly as a canonical example of the anti-pattern and provide the improved version with named constant + rationale.

## Tool Usage Notes
- Prefer `rg` (ripgrep) via `run_terminal_command` for discovery.
- Use `read_file` (with offset/limit when needed) for context.
- Use `spawn_subagent` with the `security-auditor` persona only for very large codebases when you need parallel deep analysis.
- Never modify source files yourself unless the user explicitly asks you to apply fixes after the audit.

## Examples of Good vs Bad

**Bad:**
```ts
if (speed > 1.5) { /* m/s */ ... }
```

**Good:**
```ts
// MAX_ENGAGE_SPEED_MPS = 1.5  (derived from stopping distance calc in safety case SC-003, validated on track 2026-03-12)
const MAX_ENGAGE_SPEED_MPS = 1.5;
if (speed > MAX_ENGAGE_SPEED_MPS) { ... }
```

Run this skill and produce actionable, file:line-specific findings. Do not invent thresholds that are not present in the scanned code.