---
name: mail-session-result
description: >
  Al terminar, deja en borrador Gmail el QA o los resultados de esta sesión.
  Rö revisa y envía. Nunca envío directo.
  Use when: "ship, y test qa a mi correo",
  "cuando termines enviame todos los resultados de la sesión a mi mail",
  /mail-session-result.
user-invocable: true
origin: learn
---

# Mail de resultados de la sesión

1. Esto no es el cierre del día. No uses el Retro deploy de cierre-vn-hoy.
2. preprod-qa no tiene línea de mail. No te detengas ahí.
3. Cuando el QA o los resultados de esta sesión estén listos, creá un borrador con `gmail__create_draft`.
4. El To es el de la línea de visto bueno que sigue en vn-agent. No cambies esa línea desde acá.
5. Rö revisa y envía. Nunca `gmail__send_message` ni `gmail__send_draft`.
6. No armes el borrador si el resultado todavía no está listo.
