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
5. El canal de I15, I11, Mbot, CA, Prospecto, PO y Tech Lead es el agente M5 (`976b5cbe-3a6f-46ef-9ba5-d5c1b2347d98`). La orden se escribe en M5 y nombra a ese agente. No hagas clic en esa fila. Prospecto es `f6996eb1-2192-43f0-979e-567ae890db1b`. W11 no usa este canal.
6. Rö no pega. Este TUI pega. Con Grok Bot al frente y la etiqueta del compositor en M5: pegar, Return (código 36). Un clic en enviar no manda. Cmd+K abre M5 si otro chat está adelante. Después de las 18:00 America/Santiago no se le escribe a M5.
7. Si Grok Bot no está al frente, no robes el foco y no pegues. Decí qué agente nombra la orden y que no salió. No dejes un bloque para que Rö lo pegue.
8. W11 es la terminal de la torre, no Grok Bot. El Mac no abre shell en la torre. Cada comando es una sesión nueva, `ssh -4`, sin ControlMaster y sin túnel. `MacBook-Pro-de-Ro.local` resuelve a IPv6 y falla la llave. El puerto 22 de la torre no es el canal. Si la torre no abre el SSH, la orden no salió: decí la IPv4 medida.
   - En casa, si `en0` está en `192.168.100.0/24`, la torre entra a esa IPv4.
   - Fuera de casa, `en0` no sirve. La torre entra a la IPv4 Tailscale del Mac (`tailscale ip -4`). Medido el 2026-10-19: Mac `100.108.15.17`, torre `user` `100.94.6.83`. El `en0` de cafetería `192.168.1.86` no es la entrada.
   - Telegram `@VientonorteRo_bot` es la puerta del iPhone. La firma es `vn-telegram-say m5` o `vn-telegram-say w11`. No reemplaza este SSH. Un segundo proceso con el mismo token echa el long-poll.
