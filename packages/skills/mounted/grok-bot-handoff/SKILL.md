---
name: grok-bot-handoff
description: >
  Entrega el pedido en el chat de M5. M5 es el canal hacia los otros agentes de Grok Bot.
  Rö no pega la respuesta y no entra a cada bot.
  Use when: "toma el control con el bot m5", "comunicate con techlead",
  "preguntales a los bots teach lead y po", "bot prospecto hablalre",
  "comunicate con m5 y w11 así como i115", "pegaselo en el chat de w11",
  "mandale ese pedido a w11", "cibnectate con grok en w11", "habla con m5",
  "monitorea al bot de grok m5", "agente bot grok m5 y po tech lead",
  "m5 bot, puede leerlo desde su maquina", /grok-bot-handoff.
user-invocable: true
origin: learn
---

# Grok Bot handoff

1. Esto no es `/m5-vn`. Esa skill es atajos locales del stack M5. No la uses para este pedido.
2. Esto no es la fila de vn-agent "M5, atajos, smoke local, /ops".
3. No spawnees un subagente en este TUI como sustituto.
4. La sección Grok Bot de mcp-vn es solo settings. No te detengas ahí.
5. El canal de I15, I11, Mbot, CA, Prospecto, PO y Tech Lead es el agente M5. IDs de agentes: ver vault `00-sistema/MAQUINAS-Y-MODELOS.md`. La orden se escribe en M5 y nombra a ese agente. No hagas clic en esa fila. W11 no usa este canal.
6. Rö no pega. Este TUI pega. Con Grok Bot al frente y la etiqueta del compositor en M5: pegar, Return (código 36). Un clic en enviar no manda. Cmd+K abre M5 si otro chat está adelante. Después de las 18:00 America/Santiago no se le escribe a M5.
7. Si Grok Bot no está al frente, no robes el foco y no pegues. Decí qué agente nombra la orden y que no salió. No dejes un bloque para que Rö lo pegue.
8. W11 es la terminal de la torre, no Grok Bot. El Mac no abre shell en la torre. Cada comando es una sesión nueva por SSH, sin ControlMaster y sin túnel. Si la torre no abre el SSH, la orden no salió: decilo. Host, IPs, Tailscale y la puerta del iPhone: ver vault `00-sistema/MAQUINAS-Y-MODELOS.md`.
