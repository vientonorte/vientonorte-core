# Entornos de máquinas

Medido el 2026-10-19 en America/Santiago. El detalle operativo del día vive en el vault, `Resources/PIPELINE Design Ops SSOT.md`, y en `VN-link/CONECTAR.md`.

## Qué máquina entra por dónde

| Máquina | Entrada | Queda fuera |
|---------|---------|-------------|
| M5 | IPv4 de Tailscale, `tailscale ip -4`. Ese día era `100.108.15.17`. El sshd del sistema escucha ahí. | `en0` cuando no está en `192.168.100.0/24`. En la cafetería era `192.168.1.86`. |
| W11, hostname `user` | La torre abre `ssh -4 ro@<Tailscale del Mac>`. Peer `100.94.6.83`. | Puertos 22, 3389, 5985, 11434 y 4000 de la torre. El Mac no abre shell ahí. |
| iPhone | El bot `@VientonorteRo_bot`. El QA manual apunta a `https://vientonorte.io/qa/`. Cada terminal firma con `vn-telegram-say m5` o `vn-telegram-say w11`. | Un segundo proceso con el mismo token. El gateway de Hermes. |

Cada comando SSH es una sesión nueva, con `-4`, sin ControlMaster y sin túnel. `MacBook-Pro-de-Ro.local` resuelve a IPv6 y falla la llave.

## Entornos que ya cierran

- Node del repo: `.nvmrc` es 22. En el Mac estaba v22.23.3. No se sube a 24 para enganchar un MCP de Telegram.
- MCP local del Mac: `~/.grok/mcp/vn/server.mjs` apunta a `packages/skills/mcp/vn/server.mjs`. Siete GET: `vn_health`, `vn_finanzas`, `vn_paid_landing`, `vn_catalog`, `vn_sitemap`, `vn_ops`, `vn_gtm_coverage`.
- MCP de producción: `https://contact.vientonorte.io/mcp`. Es otro catálogo. No es el stdio del Mac.
- Tailscale del Mac: `m5-ro`, cuenta `vientonorte@github`, DNS de Tailscale apagado. El ping a la torre ese día fue 52 ms vía `191.98.206.184:41641`.

## Prospecto

Prospecto no es una tool de ese servidor. En el Mac no están `Sprints/prospecto-cola.csv` ni `/workspace/prospeccion-vn`. La torre anota su disco en `~/vn-w11-inbox/W11-prospecto-medida-2026-10-19.md` la próxima vez que abre SSH. Hasta ese archivo no se agrega la tool y no se manda correo.

## Workflows

Los workflows Rhai (`vn-design-ops`, `vn-improve`, `preprod-qa`, `cierre-vn-hoy`) siguen en el Mac, `~/.grok/workflows/`. No son el canal entre el iPhone y las terminales, y no se disparan desde el bot.
