---
name: cierre-sesion-vn
description: >
  Cierre de sesión Viento Norte en un solo paso: snapshot git multi-device,
  nota Obsidian, stamp ops canvas, links a loops sprint/packages/multi-device.
  Use when: user says "cierra sesión", "cierre de día", "cierre sesión",
  "me voy", "hasta mañana", "/cierre-sesion-vn", or wants automated session close.
  For full continuum Obsidian+Session+Calendar prefer /CierreVNHOY (cierre-vn-hoy).
---

# Cierre de sesión · un skill

Padre: `/vn-agent`. Paths/live: `~/.grok/skills/vn-agent/references/canon.md`. Continuum día+Session: `/cierre-vn-hoy`.

**Horas:** Método Ro (canon) — M1 0 PARK · VN 1.5 · Post 0.75 · Algonova 4º. Cerrar sesión no mueve captura M1 ni Algonova.

**DoD mail:** el modelo local redacta. Grok deja borrador (`gmail__create_draft` / DraftExternalMessage). Única excepción documentada: el Retro deploy se envía solo a los 2 correos personales de Rö (ver vault), después de QA humano y del visto bueno de Rö. Voz **Viento Norte** y bloque `## Retro deploy`. Sin visto bueno no hay correo. Con visto bueno, un borrador no cierra. Cierre canónico: `/cierre-vn-hoy`.

## Comando único (humano o agente)

```bash
vn-cierre-sesion
# o con título:
vn-cierre-sesion --title "Packages core + CI verde"
```

Script: `/Users/ro/bin/vn-cierre-sesion`

## Qué hace (automático)

1. Snapshot de repos en **canon multi-device**  
   `~/Library/Mobile Documents/com~apple~CloudDocs/Documents/GitHub/{mi-portafolio,vientonorte-core,…}`
2. Escribe Obsidian **Sessions** (canónico):  
   `Viento Norte/Sessions/YYYY-MM-DD.md`  
   + espejo: `Viento Norte/Sprints/YYYY-MM-DD LOG sesion.md`
3. Append al LOG de automaciones del día si existe
4. Stamp `last_close` en hub `ops/canvas-state.json` (si hay clone)
5. Muestra links a **loops** live: https://vientonorte.io/ops/

## Qué hace el agente al invocar `/cierre-sesion-vn`

### READ-FIRST (obligatorio — no ser idiota)

1. **Leer Google Calendar** (hoy + resto semana) vía MCP **antes** de tocar nada.
2. **Leer** `Sessions/YYYY-MM-DD.md` si existe — preservar Ship / Pendiente / bloques humanos.
3. **No** inventar plan FO en un paste paralelo: el plan **ya vive** en eventos `VN FO · …` y `✓ VN FO · Cierre…`.
4. **No** sobrescribir nota del día con plantilla vacía (`Ship: - …`). Script es **append-only** si la nota ya tiene contenido.
5. **No** pisar description de un `✓ VN FO · Cierre` rico con un resumen más pobre.
6. Paste/atajo = **puntero** a Calendar + path Obsidian, no segunda copia del roadmap.

### Luego (write mínimo)

```bash
vn-cierre-sesion --title "<1 línea del arco de la sesión>"
vn-sync-session-close --title "<misma línea>"
```

Calendar:

- Si ya existe **`✓ VN FO · Cierre…`** o **`✓ VN LOG`** del día con contenido bueno → **actualizar solo si hay delta real** (ship nuevo); no reescribir plan semana desde cero.
- Si no existe LOG → crear **un** `✓ VN LOG` corto que **apunte** a Sessions y a los FO ya vivos.
- **Nunca** recrear bloques FO 28–31 si ya están en Calendar.

Payload local: `~/Library/Caches/viento-norte/session-close-calendar-*.json`  
Script: `/Users/ro/bin/vn-sync-session-close`

**Enriquecer** la nota solo con dato que falte (1 pass, sin inventar):

| Campo | Fuente |
|-------|--------|
| Ship hoy | `git log --since=midnight` + PRs merged; **merge** en sección existente, no borrar |
| Pendiente mañana | **Calendar** FO del día siguiente (leído), no lista inventada |
| Gates | Si CI main verde → marca ci_green; no inventar people_qa |

Si hay cambios en `ops/canvas-state.json` del hub:

```bash
cd "$GH_ROOT/vientonorte.github.io"   # o ~/code/…
git add ops/canvas-state.json
git commit -m "ops: last_close session stamp"
# abre PR; push/merge solo con OK de Rö
```

(Nunca `push` directo a `main`. Abre PR; push/merge solo con OK de Rö.)

## Regla de oro · mail de cierre

El modelo local no envía. Grok deja borrador (`gmail__create_draft` / DraftExternalMessage). Única excepción: el Retro deploy se envía solo a los 2 correos personales de Rö (ver vault), después de QA humano y del visto bueno de Rö. Sin visto bueno no hay envío. A cualquier otro destinatario: solo borrador. El body lleva **`## Retro deploy`**.

Aplica también si el humano dice: “manda mail”, “email resumen”, “al finalizar email”, “cierre por mail”.

Plantilla mínima del bloque (copiar en el body del mail):

```markdown
## Retro deploy
| | |
|--|--|
| **Canonical live** | <URL SoT real, ej. https://finanzas.vientonorte.io/> |
| **Qué se desplegó** | 1–2 líneas (UI / ledger / worker / FO) |
| **DoD pedido vs real** | ✓ / parcial / ✗ (URL pedida vs lo que quedó live) |
| **Smoke** | MTD · split · header o “NO DATO” |
| **Bloqueos** | Pages outage · DNS grey · secret faltante · ninguno |
| **P0 mañana (deploy)** | 1 acción max. Si `$` live stale vs plantilla Calendar → deploy Worker finanzas — solo humano, por orden del TL: `cd worker && npm ci && npx --no-install wrangler deploy --keep-vars` |
| **Tokens locales vs cloud** | salida de `vn-tokens-saved --since today` (Ahorrado). Si no corrió: **NO DATO** |
| **No usar** | URLs deprecadas (apex stale, jsDelivr @commit, …) |
```

Si **no hubo deploy** ese día: el bloque va igual con `Qué se desplegó: ninguno` y smoke de lo que siga canónico.

## Output al usuario (obligatorio)

```markdown
## Sesión cerrada
- Nota canónica: Viento Norte/Sessions/YYYY-MM-DD.md
- Espejo: Sprints/YYYY-MM-DD LOG sesion.md
- Repos: <dirty count / HEADs>
- Ops: https://vientonorte.io/ops/ (loops ①②③)
- Packages: https://github.com/vientonorte?tab=packages
- Workdir canon: Documents/GitHub/
- $ canónico: https://finanzas.vientonorte.io/

## Ship
- …

## Retro deploy
| | |
|--|--|
| **Canonical live** | … |
| **Qué se desplegó** | … |
| **DoD pedido vs real** | … |
| **Smoke** | … |
| **Bloqueos** | … |
| **P0 mañana (deploy)** | … |
| **Tokens locales vs cloud** | … |
| **No usar** | … |

## Mañana
- …
```

El **Retro deploy** va **dentro del mail enviado**. El chat no reemplaza ese mail.

## Estándar (canon)

| | |
|--|--|
| Log del día | Obsidian **`Sessions/YYYY-MM-DD.md`** (canónico) |
| Espejo | `Sprints/YYYY-MM-DD LOG sesion.md` |
| Índice | `Sessions/_Index.md` |
| Tablero + loops | https://vientonorte.io/ops/ |
| Cierre | este skill / `vn-cierre-sesion` |

Ver vault: `Resources/Estandar log dia y ops.md`

## Relación con otras piezas


| Pieza | Rol |
|-------|-----|
| `/docs-vn` | Documentar un feature concreto (no cierra sesión) |
| `canvas-sprint close` | Vault clásico `40-ops` (si existe) |
| `vn-daily` | Apertura de día |
| Loops en /ops/ | Sprint · Packages · Multi-device |

## Canon paths

```text
GH_ROOT = ~/Library/Mobile Documents/com~apple~CloudDocs/Documents/GitHub
OBS_VN  = ~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Ro/Viento Norte
PDF_OUT = ~/Library/Mobile Documents/com~apple~CloudDocs/Documents/Viento Norte/entregables-pdf
```

## Anti-patterns

- Cerrar sesión documentando desde `/Users/ro/code` sin mirar iCloud GitHub
- Inventar ship no mergeado
- Omitir nota Obsidian
- Confundir este skill con deploy (deploy ya ocurre al push main)
- **Enviar** el mail sin QA humano y sin el visto bueno de Rö, o enviarlo **sin `## Retro deploy`**
- Listar como “live” una URL que el smoke diga stale ($4.62 / split viejo / `updated` 13 ago vs plantilla 18 ago)
- Cerrar con `$` desfasado sin dejar **P0 = deploy Worker finanzas** (solo humano, por orden del TL: `cd worker && npm ci && npx --no-install wrangler deploy --keep-vars`)

## Slash

`/cierre-sesion-vn` — cierra la sesión con un solo skill.
