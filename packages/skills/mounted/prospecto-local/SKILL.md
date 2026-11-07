---
name: prospecto-local
description: >
  Agrega prospectos nuevos con las mismas categorías y la misma plantilla de
  Prospecto, en local o en el M5. Use when: el usuario pide sumar prospectos, armar
  la cola, clasificar por categoría, o correr /prospecto-local. No envía correo.
---

# Prospecto local

Copia operable de Prospecto para Ollama en esta torre o en el M5. La caja `/workspace/prospeccion-vn` no está montada aquí. `render.py`, `receptores.csv` y el HTML de `plantillas/render/` siguen solo ahí. Esta skill no los reescribe y no manda correos.

El plan de fechas es `iCloudDrive/iCloud~md~obsidian/<VAULT>/Viento Norte/Sprints/Prospecto-plan-2026-10-09-a-2026-12-10 2.md`. La salida sigue frenada hasta un mensaje recibido con `dmarc=pass` y el OK del usuario.

## Quién corre el paso

- Clasificar y completar la fila: `local-llm` en LM Studio de esta máquina. En la torre, `qwen2.5-7b-instruct` si la VRAM usada está bajo 4000 MiB. En el M5 de día, `qwen2.5-1.5b-instruct`, y solo si `ollama ps` está vacío. Al terminar, `lms ps` queda vacío. No arranques el daemon de Ollama en la torre.
- La medida de la compuerta la escribe `<HOME>\bin\vn-agente-local.py`. No envía.
- El modelo no redacta el cuerpo del correo. El cuerpo lo genera `render.py` cuando la caja esté en disco.
- El modelo no inventa empresa, correo, sitio ni hallazgo. Si falta uno, la fila queda incompleta y no entra a la cola.

## Categoría

Una sola, por este orden:

| Señal | Ancla | Cuándo |
|---|---|---|
| No hay sitio | `web-pymes` | El negocio no tiene web propia |
| Hay sitio y un defecto concreto de esa página | `revision-gratis` | Zoom, contraste, botón, tiempo de carga, lector de pantalla, nombre en Google |
| Hay sitio y el pedido es el flujo comercial, no un defecto de pantalla | `consultoria-ux` | Como Revalora: que Cotizar se vea |

`casos-vn` es ancla permitida del canon y no se usa para un prospecto nuevo.

El rubro va solo en `utm_campaign`, en minúsculas y con guiones (`clinica-dental`, `estudio-juridico`). No es una ruta.

## Plantilla, tal cual

CTA, el de los 17 ya renderizados:

`https://vientonorte.io/servicios/?utm_source=email&utm_medium=prospeccion&utm_campaign=<rubro>#<ancla>`

Host `https://vientonorte.io`. Ruta `/servicios/` o, si el rubro es uno de estos tres, `/servicios/web-dental/`, `/servicios/web-contable/`, `/servicios/web-juridico/`.

Prohibido en el href y en el texto: `/s/` (salvo que ya exista `/s/polijuego-privacy/` y no sea el CTA), `/#/`, `/news/`, `/qa/`, `/mi-portafolio/`, `/servicios/diagnostico-accesibilidad-wcag/`, `/servicios/consultoria-ux-pymes/`, `/servicios/<otro-slug>/`.

Sin botón de pago. Firma `mailto:<PUBLIC_EMAIL>`. El logo `icon-512x512.png` no es el CTA.

## Fila que se agrega

Archivo: `iCloudDrive/iCloud~md~obsidian/<VAULT>/Viento Norte/Sprints/prospecto-cola.csv`

Cabecera, igual al lote:

`empresa,destinatario,asunto,rubro,ancla,cta,estado`

- `asunto`: la frase del hallazgo que dio el usuario. Vacío si no la dio.
- `cta`: la URL de arriba.
- `estado`: `PENDIENTE`.
- Una fila por empresa. No se duplica un `destinatario` que ya esté en el archivo.

Al terminar, mostrar la fila y cuántas `PENDIENTE` hay. No crear borrador de Gmail. No enviar.
