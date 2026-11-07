---
name: finanzas-vn
description: 'Use when /vn-agent or the user asks about Viento Norte business finances: the private finanzas SSOT ledger, the finanzas worker, income/expense summaries, or finance deploy gates. Not for household finances.'
---
# Finanzas VN (ledger SSOT)

Read-only by default. Local first. Never show financial amounts, ledger bodies or tokens in chat; summarize at the level the user asked for and point to the file path.

## 1. Context first (cheap)
1. Ask local Ollama on the Mac (e.g. qwen9-agente) against the Obsidian vault and the finanzas repo before spending cloud tokens.
2. Source of truth = the private finanzas SSOT repo on main (read with `gh`, authenticated; never anonymous curl). The worker only serves it.

## 2. Reading / summaries
- Read the ledger through an approved remote read-only tool (`gh api` for a narrow lookup); broader repository work goes to the cloud agent. Never clone.
- Report totals or trends only as requested; never paste raw rows into chat or public repos.
- Household money goes to the household-finance bot, not here.

## 3. Changes to the ledger
- Only through a branch + draft PR, with the diff shown to the decider. No direct pushes to main, no merge without explicit OK in chat.

## 4. Worker deploy gate (all required, in order)
1. Endpoint protection verified: Cloudflare Access (or in-worker auth) covering every hostname and route; unauthenticated request returns 302/403. If not, BLOCK and report.
2. main SHA + CI green + tests.
3. Wrangler pinned to the repo lock (`npm ci && npx --no-install wrangler ...`); never pull latest; resolve any lock-vs-team-rule version mismatch first.
4. Secrets: the human types them on their own machine (`wrangler secret put`); least-privilege token scoped to this repo; never in chat or files.
5. Explicit OK from the decider in this chat, then `deploy --keep-vars`.
6. Smoke: no session = blocked; authenticated read = 200; report version id + SHA, never response bodies.

## 5. Report
Short Spanish summary: what was read, result, gates pending, next human step.
