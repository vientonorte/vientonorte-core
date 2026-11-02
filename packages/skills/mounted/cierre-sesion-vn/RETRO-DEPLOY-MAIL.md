# Regla de oro · Retro deploy en mails de cierre

**Obligatorio** en el mail de cierre. Por defecto es borrador (`gmail__create_draft` / DraftExternalMessage). Única excepción: envío solo a los 2 correos personales de Rö (ver vault), tras QA humano y visto bueno de Rö. To: canon. Workflow: `~/.grok/workflows/cierre-vn-hoy.rhai`.

## Plantilla (pegar en el body del mail)

```markdown
## Retro deploy

| | |
|--|--|
| **Canonical live** | https://finanzas.vientonorte.io/ |
| **Qué se desplegó** | … |
| **DoD pedido vs real** | ✓ / parcial / ✗ — URL pedida vs lo que smokea live |
| **Smoke** | MTD · split · header `x-vn-finanzas` o NO DATO |
| **Bloqueos** | Pages outage · DNS grey · secret · ninguno |
| **P0 mañana (deploy)** | 1 acción |
| **No usar** | apex GH stale · jsDelivr @commit · … |
```

## Reglas

1. Si no hubo deploy: `Qué se desplegó: ninguno` + smoke del canónico actual.
2. Nunca marcar como live una URL que falle smoke.
3. El mismo bloque va en chat de cierre **y** en el mail (no solo en uno).
4. Opcional: copiar a `Sessions/YYYY-MM-DD.md` bajo `## Retro deploy`.
5. **Si `finanzas.vientonorte.io/ledger.json` (`updated` / plantilla / split) ≠ Calendar Método Ro o el ledger del repo:** no está shipped. **P0 deploy =** Worker finanzas, solo humano, por orden del TL: `cd worker && npm ci && npx --no-install wrangler deploy --keep-vars` (no Pages). No sustituir por smoke FO ni por “mañana H2”.

## Skills

- `/cierre-sesion-vn`
- `/CierreVNHOY` (`cierre-vn-hoy`)
- Canon: `Resources/Estandar log dia y ops.md` · `00-sistema/METODO-RO-AGENT.md`

## Board P0–P2

Tras el smoke del mail, si hay gap de pipeline, linkear:

- https://raw.githubusercontent.com/vientonorte/vientonorte.github.io/main/ops/DEPLOY-ROADMAP.md
- P0 default si no hay deploy hoy: **E1 Worker repo permanente** (o el primer `todo` del board)
