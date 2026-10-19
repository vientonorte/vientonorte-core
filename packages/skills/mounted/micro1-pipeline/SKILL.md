---
name: micro1-pipeline
description: >
  Orchestrates Micro1 / Expedition Strike capture pipeline so Rö only uploads to Realm.
  Every ~10 min tick: validate 6 output files, stage UPLOAD card, maintain claim pool (max 3),
  draft LOG lines. Does NOT play the game or auto-submit to Realm.
  Use when: /micro1-pipeline, /m1-tick, "pipeline m1", "cada 10 min", "solo subir",
  "tick captura", "ola automática", claim Realm Micro1, outbox UPLOAD_LATEST, GWin pipeline.
---

# /micro1-pipeline · conductor 10 min → tú solo subes

## Objetivo

Separar roles:

| Quién | Hace |
|-------|------|
| **Rö** | Jugar 10 min orgánico + mic · F7 start/stop · **solo Upload+Submit** en Realm |
| **Tick (script W11)** | Validar 6 files · escribir `UPLOAD_LATEST.md` + línea LOG |
| **GWin / esta skill** | Orquestar pool de claims · leer outbox · actualizar LOG · decir “sube esto” |

**No automatizable aquí:** gameplay, F7 del mod, click Submit en Realm (tú lo haces a propósito).

## Frases de activación

```text
/micro1-pipeline
m1 tick
pipeline m1 cada 10 min
solo quiero subir
tengo 1 claim en realm
```

## Estado canónico

```text
Documents/MICRO 1/03-software/pipeline/STATE.md
Documents/MICRO 1/03-software/pipeline/m1-tick.ps1
Documents/MICRO 1/03-software/pipeline/outbox/UPLOAD_LATEST.md
Documents/MICRO 1/LOG.md
Documents/MICRO 1/00-canon/PROMPT-MAESTRO-MICRO1-STRIKE1-SSOT.md
```

Portal: https://realm.micro1.ai/  
Max claims activos: **3** · pool recomendado: **2–3**.  
**Estado:** `claims_open = 0`. Sin claim **no** hay F7. Next claim = STATE.md / Calendar, not a hardcoded 21 ago date. claims_open=0 until Rö claims.

## Flujo (modo upload-only)

```text
0. PREP (una vez / bloque)
   Hubstaff Play personal · CAPTURE MODE · juego READY · settings 1080p60
   Realm: tener 1–3 claims del MISMO juego (si tienes 1, OK; puedes claimar hasta 3)

1. PLAY (Rö · 10:00 exactos)
   F7 → free roam + mic → F7
   Sin menús/mapa a mitad · sin Discord overlay

2. TICK (automático o 1 comando)
   m1-tick.ps1  →  outbox/UPLOAD_LATEST.md
   Status READY_UPLOAD | BLOCKED

3. UPLOAD (solo Rö)
   Abrir card · subir los 6 paths listados · Submit for Review

4. LOG
   GWin pega línea desde outbox/LOG_LINE_LATEST.txt → LOG.md
   Actualizar STATE.md claims_open

5. LEDGER $
   m1-ledger-sync (LOG → ledger.json → ops/finanzas)
   Mac: `m1-ledger-sync` o `python3 …/07-pagos/dashboard/m1-ledger-sync.py`
   W11: `.\m1-ledger-sync.ps1`

6. NEXT
   Si claims_open < 2 y vas a seguir: claim 1 más (tope 3)
   Volver a 1
```

## Qué hace el agente al invocar la skill

1. **Leer** `pipeline/outbox/UPLOAD_LATEST.md` si existe (iCloud).  
2. **Leer** `pipeline/STATE.md` y `LOG.md` (últimas líneas).  
3. **Reportar en 6 líneas:**
   - claims_open /3  
   - último card status (READY_UPLOAD / BLOCKED / missing)  
   - juego  
   - qué archivos faltan (si BLOCKED)  
   - instrucción exacta: “Sube estos N paths en Realm claim X”  
   - siguiente acción (jugar 10 min / claim más / parar)  
4. Si Rö dice **tick done** o **subido**:
   - append LOG línea  
   - bajar claims_open mental/STATE  
   - **correr `m1-ledger-sync`** (ledger.json + mirror ops/finanzas)  
   - reportar MTD tasks / USD desde outbox `LEDGER_LATEST.md`  
   - proponer siguiente 10 min  
5. **Nunca** inventar submit OK sin evidencia.  
6. **Nunca** pedir 10 claims; respetar max 3.

## Pool de claims (`claims_open = 0`)

| claims_open | Acción |
|-------------|--------|
| **0** | **21 ago 09:00.** Claim 1–3 del juego READY **antes** de F7. El 20 ago no hay captura. |
| 1 | Grabar ese claim → tick → upload → claim otro si sigues |
| 2–3 | Ideal ola: grabar en serie sin re-claim a mitad |
| 3 | **No claim más** hasta Submit de al menos 1 |

## Script W11 (Rö debe correrlo en la torre)

```powershell
# Path típico iCloud Windows:
cd $env:USERPROFILE\iCloudDrive\Documents\MICRO 1\03-software\pipeline

# Después de cada F7 stop (recomendado):
powershell -ExecutionPolicy Bypass -File .\m1-tick.ps1 -Game "Dishonored 2" -ClaimId "ID_REALM"

# Validación cada 10 min en background (no graba por ti):
powershell -ExecutionPolicy Bypass -File .\m1-tick.ps1 -Watch -IntervalSec 600
```

Si iCloud path distinto, buscar carpeta `MICRO 1\03-software\pipeline`.

### Atajo Desktop (opcional)

Crear `m1-tick.bat` en Desktop:

```bat
@echo off
powershell -ExecutionPolicy Bypass -File "%USERPROFILE%\iCloudDrive\Documents\MICRO 1\03-software\pipeline\m1-tick.ps1" %*
pause
```

## Timer 10 min (humano)

No dependas solo del watch: usa timer teléfono/Hubstaff **10:00** al F7 start.  
Al sonar: F7 stop → `m1-tick` → subir card.

## Integración GWin chat

Al inicio de bloque:

```text
/micro1-pipeline
claims: 0
juego: (claim primero)
```

Cada submit:

```text
m1 tick done · claim 12345 · submit OK
```

## DoD de una unidad (1 tarea $)

```
□ 10 min grabados
□ tick READY_UPLOAD
□ 6 files en Realm
□ Submit for Review
□ 1 línea LOG.md
□ claims_open actualizado
□ m1-ledger-sync (dashboard $ actualizado)
```

## Dashboard $

```text
Documents/MICRO 1/07-pagos/dashboard/index.html
Documents/MICRO 1/07-pagos/dashboard/ledger.json
Documents/MICRO 1/07-pagos/dashboard/m1-ledger-sync.py
https://vientonorte.io/ops/finanzas/
```

## Referencias

- SSOT: `Documents/MICRO 1/00-canon/PROMPT-MAESTRO-MICRO1-STRIKE1-SSOT.md`
- 6 files: `Documents/MICRO 1/02-guidelines/verify-submit-realm.md`
- Pace $: `Documents/MICRO 1/00-canon/TRAINER-PACE-PLAN.md`
