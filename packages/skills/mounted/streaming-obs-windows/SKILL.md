---
name: streaming-obs-windows
description: Usar cuando haya que instalar, configurar o depurar streams de coworking o gaming a Twitch con OBS Studio en un PC Windows 11 con GPU NVIDIA (escenas, transiciones, overlays propios, cambio automático por juego, NVENC y Enhanced Broadcasting), sin Streamlabs.
---

# Streaming con OBS Studio en Windows 11 (coworking + gaming)

Skill genérica para montar y operar streams **a Twitch** desde una torre Windows 11 con GPU NVIDIA RTX. Cubre dos formatos:
- **Coworking**: sesiones de foco con cámara, pantalla o temporizador Pomodoro y música segura.
- **Gaming**: captura del juego, cámara, alertas y chat, con cambio automático de escena según el juego activo.

La base es **OBS Studio + plugins gratuitos**. No se usa Streamlabs: sus overlays y scripts cerrados no se adaptan bien a cada juego y sus transiciones son poco configurables. Todo lo visual va en archivos locales HTML/CSS que controlal usuario.

Datos verificados el 2026-10-10 (ver `sources.md`). Antes de instalar, revisa otra vez las versiones: OBS y los plugins cambian seguido.

---

## 0. Reglas (obligatorias)

1. **Nada pagado sin OK explícito del usuario**: ni plugins de Patreon, ni packs de overlays, ni stingers comprados, ni música con licencia de pago, ni suscripciones. Si algo útil es de pago, propónlo con el precio y espera el OK.
2. **Nada de credenciales en archivos ni en el chat.** La clave de transmisión (stream key) entra **solo** en OBS, usando "Conectar cuenta" de Twitch o pegándola el propio usuario en *Ajustes → Emisión*. Nunca se escribe en un .md, un script, un repo, un log ni un mensaje. Lo mismo vale para la contraseña de obs-websocket y los tokens de Streamer.bot.
   - Si una clave se filtra, el usuario la regenera en la plataforma (Twitch: Panel de creador → Configuración → Transmisión → Restablecer la clave principal).
3. **Solo fuentes oficiales**: obsproject.com, GitHub del autor o el foro de OBS (obsproject.com/forum/resources), streamer.bot, nvidia.com. Nada de "OBS full" ni mirrors.
4. **No saltarse el anti-cheat.** Si un juego bloquea Game Capture, se usa Window o Display Capture. No se inyectan DLLs ni se desactivan protecciones.
5. **La GPU es compartida.** Si hay modelos locales (Ollama u otros) usando la misma GPU, se descargan antes de transmitir (ver §8).
6. Instalar software en la torre requiere que el usuario esté presente o lo haya aprobado.

---

## 1. Instalación

### 1.1 OBS Studio
- Versión estable al 2026-10-10: **OBS Studio 32.2.2** (14-ago-2026). Hay una beta 33.0 que **no** se usa para transmitir.
- Desde 32.2 el SDK de NVIDIA es el 13: **driver NVIDIA mínimo 570**. Actualiza el driver antes (NVIDIA App o nvidia.com/drivers).
- Instalación (PowerShell, usuario normal):
  ```powershell
  winget install -e --id OBSProject.OBSStudio
  # actualizar más adelante
  winget upgrade -e --id OBSProject.OBSStudio
  ```
  También sirve el instalador de https://obsproject.com/download.
- Primer arranque: **cancela el asistente de autoconfiguración** (se ajusta a mano en §2) o úsalo solo como referencia.
- **obs-websocket viene incluido desde OBS 28**: *Herramientas → Ajustes del servidor WebSocket*. Actívalo solo si lo vas a usar (Streamer.bot, Stream Deck), con contraseña generada y sin exponer el puerto 4455 a internet.

### 1.2 Plugins gratuitos recomendados

| Plugin | Para qué | Versión verificada | Compatibilidad | Descarga oficial |
|---|---|---|---|---|
| **Advanced Scene Switcher** (WarmUpTill) | Macros: cambiar de escena según el proceso o ventana en foco, horarios, etc. | 1.36.1 (07-ago-2026) | Mínimo OBS 31.1.1, sirve en 32.x | github.com/WarmUpTill/SceneSwitcher/releases (`…-windows-x64-Installer.exe`) |
| **Move** (Exeldro, antes "Move Transition") | Transición Move, filtros Move Source/Value, animaciones | 3.2.1 (10-feb-2026) | Desde 3.2.0 pide OBS 31.1+ | obsproject.com/forum/resources/move.913/ |
| **Source Record** (Exeldro), opcional | Grabar una fuente o escena aparte (por ejemplo, el juego limpio sin cámara para clips) | 0.4.8 (26-mar-2026) | El foro indica OBS 26+. **No vi confirmación explícita de OBS 32**: pruébalo antes de usarlo en vivo | obsproject.com/forum/resources/source-record.1285/ |
| **obs-websocket** | Control remoto (Streamer.bot, Stream Deck) | Incluido | Incluido desde OBS 28 | Ya viene en OBS |

**StreamFX: no usar.** La última versión pública conocida (v1.0.0b682) es para OBS 31.0.1 (feb-2025). El proyecto pasó a Patreon, con binarios y código solo para suscriptores. Hoy no es gratis y no hay build pública confirmada para OBS 32. Sus efectos (blur, máscaras, sombras) se logran con Move, con filtros nativos y con CSS en las browser sources.

Instalación de plugins:
1. Cierra OBS.
2. Ejecuta el instalador del plugin; detecta `C:\Program Files\obs-studio`.
3. Abre OBS y verifica en *Herramientas* (Advanced Scene Switcher) y en el `+` de *Transiciones de escena* ("Move").
4. Si un plugin no carga tras actualizar OBS, revisa *Ayuda → Archivos de registro* y actualiza el plugin. OBS 32.2.2 corrigió un fallo de carga de plugins en el primer arranque tras actualizar.

### 1.3 Streamer.bot (opcional, gratis)
- Para comandos de chat, alertas locales, overlay de chat y control de OBS por websocket. Integra Twitch de forma nativa. Es gratis; el Patreon solo da acceso a builds alpha.
- Versión estable verificada: **v1.0.7** (06-ago-2026). Descarga en https://streamer.bot/downloads.
- Es portable: descomprime en `<HOME>\Streaming\tools\Streamer.bot\`. **No** lo pongas en carpetas sincronizadas (OneDrive, Google Drive, iCloud) ni lo ejecutes como administrador (lo indica la doc oficial).
- Conecta cada plataforma desde *Platforms* con el login oficial. No se pegan tokens a mano en ningún archivo.

### 1.4 Supresión de ruido (elige una)
- **RNNoise** (filtro nativo de OBS: *Supresión de ruido → RNNoise*). Usa CPU y nada de VRAM. **Recomendado para gaming** en GPU de 8 GB.
- **NVIDIA Broadcast** (gratis, versión 2.2.x): requiere RTX 2060 o superior y driver 570+, descarga unos 3 GB de modelos y usa Tensor cores/VRAM. Buena calidad, pero compite con el juego por la GPU. Úsalo para coworking o si sobra margen. Descarga en https://www.nvidia.com/en-us/geforce/broadcasting/broadcast-app/.
- OBS también trae el filtro "NVIDIA Noise Removal" si están instalados los NVIDIA Audio Effects SDK. Misma consideración de VRAM.

---

## 2. Encoder y salida para Twitch (RTX serie 50, NVENC de 9.ª generación)

La RTX 5060 Ti (y toda la serie RTX 50) tiene un **NVENC de 9.ª generación (Blackwell)** que codifica **H.264, HEVC y AV1**. Para Twitch lo que importa:
- **H.264 (AVC)** es el códec de ingesta normal (hasta 1080p).
- **HEVC** solo entra en juego con **Enhanced Broadcasting en 2K (1440p)**, para Partners y Affiliates.
- **AV1 no está disponible de forma general en Twitch**: no usarlo para Twitch.

NVENC usa un bloque dedicado, así que casi no le quita FPS al juego, pero **sí consume VRAM**. Con 8 GB, más un juego exigente, hay que vigilarla.

### 2.1 Base común (Ajustes → Vídeo / Salida en modo Avanzado)
- **Resolución base (lienzo)**: la del monitor (ej. 1920×1080 o 2560×1440).
- **Resolución de salida**: ver 2.2. Filtro de escalado: **Lanczos** o **Área**.
- **FPS**: 60 para gaming; 30 basta para coworking (menos carga y bitrate).
- **Control de tasa: CBR** (Twitch lo recomienda explícitamente frente a VBR).
- **Intervalo de fotogramas clave: 2 s** (no dejarlo en 0/auto).
- **NVENC H.264**: preset P5 o P6 con tuning "Alta calidad"; si aparece "codificación sobrecargada", baja a P4. Multipass: "Two Passes (Quarter Resolution)". Perfil: high. B-frames: 2. *(Punto de partida sugerido, no un valor oficial de Twitch.)*
- **Audio**: AAC, 48 kHz estéreo. Twitch publica 96 kbps como referencia; 160 kbps es un valor habitual y seguro.
- **Grabación local** (VOD propio): pestaña Grabación con NVENC, formato **MP4 híbrido o MKV**, pistas 1–5 (ver §7). Aquí sí puedes usar **AV1 o HEVC** para ahorrar disco, porque es solo local.

### 2.2 Modo A: single-track clásico (siempre funciona)
Valores de las Broadcasting Guidelines de Twitch (CBR, H.264):

| Salida | Bitrate de vídeo |
|---|---|
| 1080p60 | 6000 kbps |
| 1080p30 | 4500 kbps |
| 720p60 | 3000 kbps |

- **936p60 (1664×936) a 6000 kbps**: práctica común, no oficial. Rinde más nitidez por bit en juegos con mucho movimiento (por ejemplo shooters en mundo abierto) que 1080p60 con el mismo bitrate. Para juegos lentos (isométricos, MMO en ciudad, coworking) 1080p60 o 1080p30 va bien.
- Si el canal no tiene transcodificación garantizada, los espectadores con conexión mala solo ven la "Fuente". Enhanced Broadcasting (modo B) resuelve eso generando las calidades en tu PC.

### 2.3 Modo B: Enhanced Broadcasting (multitrack, recomendado si el PC aguanta)
- **Requisitos (Twitch)**: Windows, **OBS 30.2 o superior** y GPU **NVIDIA GTX 900 o más nueva**. Una RTX 50 con OBS 32.x cumple. Driver NVIDIA al día (OBS 32.2 exige 570+).
- **Activar**: *Ajustes → Emisión → Servicio: Twitch → Conectar cuenta → marcar "Activar Enhanced Broadcasting"*. Twitch envía la configuración automáticamente (resoluciones, bitrates, número de pistas) y algunos campos de *Salida* quedan bloqueados: es normal.
- **Qué genera**: hasta unas 5 pistas (de 1080p a 160p aprox.), con un total de unos 1,5–10,5 Mbps según el hardware y la subida.
- **Novedades de 2026** (blog de Twitch, 17-jun-2026):
  - **Dual Format** (horizontal + vertical para móvil): disponible para todos los streamers.
  - **2K (1440p) en HEVC, hasta 9 Mbps**: solo **Partners y Affiliates**. En ese modo la pista 1080p H.264 puede subir hasta **7,5 Mbps**.
  - Partners y muchos Affiliates tienen además transcodificación del lado del servidor, que reduce la carga local (se revisa en *Panel de creador → Configuración → Transmisión*).
- **Límites recomendados con una GPU de 8 GB**:
  - *Máximo de pistas de vídeo*: empezar en **Auto**; si hay tirones o la VRAM pasa de unos 7 GB, fijar **3**.
  - *Ancho de banda máximo*: Auto, o como máximo la mitad de la subida medida.
  - Juegos con mucha VRAM (texturas en Ultra, ray tracing) + Enhanced Broadcasting + NVIDIA Broadcast pueden no caber en 8 GB. Primero baja texturas o desactiva el ray tracing; si no alcanza, quita NVIDIA Broadcast (usa RNNoise), y como último recurso vuelve al modo A.
- **Verificar**: durante una transmisión de prueba, revisa en **Twitch Inspector** (inspector.twitch.tv) que llegan las pistas y que no hay desconexiones.
- **Si falla**: desactiva Enhanced Broadcasting y transmite en modo A; revisa *Avanzado → Red* (optimizaciones de red / TCP pacing).

### 2.4 Conexión y clave
- Lo preferido es **"Conectar cuenta"** (OAuth de Twitch): no hay que manejar la clave y además aparecen docks de chat y actividad.
- Si se usa la clave, la pegal usuario directamente en *Ajustes → Emisión*. Nunca se pega en el chat ni en archivos (§0).
- Servidor: "Automático (recomendado)".

### 2.5 Otras plataformas (nota mínima)
YouTube acepta H.264, HEVC y AV1 con bitrates más altos, y Kick solo H.264 CBR hasta 8000 kbps. Si algún día se usan, crea un **perfil de OBS aparte** y revisa sus guías oficiales (enlazadas en `sources.md`).

## 3. Diseño de la colección de escenas

Colección: `Stream-Principal`. Convención de nombres: prefijo con tipo y `[S]` para las escenas que solo se usan anidadas.

### 3.1 Escenas compartidas (se anidan, no se transmiten solas)
- `[S] Cam` → Dispositivo de captura de vídeo (webcam) + `cam-frame.html` (marco) + filtros (recorte, corrección de color). **Se crea una sola vez**: así la cámara no se abre dos veces.
- `[S] Alertas` → browser source de alertas (Streamer.bot o HTML propio).
- `[S] Chat` → browser source del chat.
- `[S] Audio-Global` → mic, audio de escritorio y música, si prefieres manejar el audio por escena (opcional; por defecto van como fuentes globales en *Audio*).

Para anidar: *Fuentes → + → Escena → `[S] Cam`*. Moverla o escalarla en cada escena no altera el original.

### 3.2 Escenas al aire
| Escena | Contenido |
|---|---|
| `Inicio` | Fondo propio (HTML/imagen/vídeo en bucle), cuenta regresiva (`countdown.html`), música, `[S] Chat` |
| `Coworking` | Captura de pantalla o ventana del trabajo (o un fondo si es privado), `pomodoro.html`, `[S] Cam` grande, `[S] Chat`, `[S] Alertas`, texto de la tarea actual (fuente de texto que lee `tarea.txt`) |
| `Coworking - Pausa` | Fondo, Pomodoro en descanso, `[S] Cam` pequeña o apagada, música |
| `Juego - <Nombre>` (una por juego) | Game Capture del juego (§6) + `[S] Cam` en esquina + `[S] Alertas` + `[S] Chat` opcional |
| `Juego - Genérico` | Game Capture en modo "Capturar ventana en primer plano con atajo", como respaldo |
| `Pausa/BRB` | Fondo, "vuelvo enseguida", música, `[S] Chat` |
| `Fin` | Créditos o agradecimientos, redes, música |
| `Privacidad` | Pantalla tapada (para cuando aparece algo sensible); atajo dedicado |

**Privacidad en coworking**: nunca captures la pantalla completa con correos, gestores de contraseñas o chats privados. Usa Window Capture de la app concreta. Si cambias de ventana, la escena `Privacidad` tiene un atajo de una tecla.

### 3.3 Música en coworking (copyright)
- Spotify, Apple Music, YouTube Music, CDs comprados, etc. **no** dan licencia para transmitir. Twitch puede silenciar el VOD, aplicar avisos DMCA (strikes) y cerrar el canal.
- Usa música con licencia explícita para streaming en Twitch (revisa los términos de cada catálogo o artista): artistas que autorizan streams por escrito, música libre de derechos cuya licencia cubra explícitamente streaming en vivo y VOD, catálogos de pago **solo con OK del usuario**, o música propia.
- Pon la música en su **propia pista** (§7) para poder excluirla del VOD.

---

## 4. Transiciones

### 4.1 Por defecto: Move (Exeldro)
1. *Transiciones de escena → + → Move*. Nómbrala `Move 400ms`. Duración: 300–500 ms.
2. Easing: "Ease in and out", función "Cubic". Zoom: 100 % si no quieres que crezca.
3. Las fuentes con **el mismo nombre** en dos escenas (por ejemplo `[S] Cam`) se desplazan y escalan suavemente de una posición a otra. Por eso conviene anidar siempre la misma escena compartida.
4. Las fuentes que aparecen o desaparecen pueden usar otra transición (por ejemplo Fundido).

### 4.2 Stinger (para entrar o salir de juego y para pausas)
**Cómo hacer el vídeo:**
- 0,8–1,5 s, misma resolución y FPS que la salida, **con canal alfa**: WebM VP9 con alfa o MOV ProRes 4444 (para CPU baja, mejor WebM).
- Herramientas gratis: DaVinci Resolve (versión gratuita), Blender, o una animación CSS grabada con OBS sobre fondo transparente. **No comprar packs sin OK.**
- Guárdalo en `<HOME>\Streaming\transitions\`.

**Cómo configurarlo:**
1. *Transiciones → + → Stinger*. Archivo: el WebM.
2. **Punto de transición**: el instante en que el stinger tapa el 100 % de la pantalla (por ejemplo 400 ms). Ahí OBS corta a la escena nueva.
3. Opcional: **Track Matte** (vídeo con matte en negro y blanco: negro = escena actual, blanco = escena siguiente, grises = fundido). En ese modo el "punto de transición" solo afecta al audio. El matte y el stinger deben tener los mismos FPS y rango de color completo.
4. Acción de audio: "Fundido" o "Cortar al punto de transición".

### 4.3 Overrides por escena
- Clic derecho en la escena → **Transition Override** (en la UI en español: "Anular transición" o similar, según la traducción) → elige `Stinger` o `Move` y la duración.
- Esquema sugerido:
  - Coworking ↔ Coworking-Pausa: Move.
  - Cualquier escena → `Juego - *`: Stinger.
  - → `Pausa/BRB` y → `Fin`: Stinger.
  - `Inicio` → Coworking: Move.
- Advanced Scene Switcher también puede fijar una transición distinta en cada macro.

---

## 5. Overlays propios (HTML/CSS local)

### 5.1 Estructura de carpetas
```
<HOME>\Streaming\
├─ overlays\
│  ├─ css\base.css          (colores, tipografías, variables)
│  ├─ cam-frame.html
│  ├─ pomodoro.html
│  ├─ countdown.html
│  ├─ alerts.html           (si se hacen alertas propias)
│  ├─ lower-third.html
│  └─ fonts\                (solo fuentes con licencia libre: Google Fonts/OFL)
├─ backgrounds\             (imágenes/vídeos en bucle)
├─ transitions\             (stingers .webm)
├─ music\                   (solo música con licencia para stream)
├─ text\tarea.txt           (texto de la tarea actual en coworking)
├─ macros\                  (exportaciones de Advanced Scene Switcher)
├─ backups\                 (exportes de escenas y perfiles)
└─ tools\Streamer.bot\
```
Esta carpeta va **fuera** de OneDrive/iCloud si se usa Streamer.bot o grabaciones. Se respalda exportando a mano (*Colección de escenas → Exportar*).

### 5.2 Añadir un overlay
*Fuentes → + → Navegador → "Archivo local"* → elige el .html. Ancho/alto igual al tamaño del elemento. Marca "Apagar la fuente cuando no sea visible" solo si no guarda estado (el Pomodoro **no** debe apagarse).

### 5.3 Pomodoro (browser source)
`pomodoro.html` mínimo. Parámetros por URL: si lo abres como URL local, usa `file:///<HOME>/Streaming/overlays/pomodoro.html?work=50&break=10`.
```html
<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="css/base.css">
<style>
 body{margin:0;background:transparent;font-family:var(--font,system-ui);color:#fff}
 #box{display:inline-block;padding:12px 20px;border-radius:14px;background:rgba(0,0,0,.55)}
 #phase{font-size:20px;opacity:.8} #time{font-size:64px;font-variant-numeric:tabular-nums}
</style></head><body>
<div id="box"><div id="phase">Foco</div><div id="time">--:--</div></div>
<script>
 const p=new URLSearchParams(location.search);
 const W=(+p.get('work')||25)*60, B=(+p.get('break')||5)*60;
 let phase='Foco', left=W;
 const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
 function tick(){ if(left<=0){ phase = phase==='Foco'?'Pausa':'Foco'; left = phase==='Foco'?W:B; }
   document.getElementById('phase').textContent=phase;
   document.getElementById('time').textContent=fmt(left--); }
 tick(); setInterval(tick,1000);
</script></body></html>
```
Opcional: que Advanced Scene Switcher cambie a `Coworking - Pausa` cuando el temporizador entra en descanso. Para eso, el HTML escribe el estado en el título del documento y una macro usa la condición de navegador o de variable; otra opción es un atajo manual.

### 5.4 Chat en pantalla (gratis)
- **Streamer.bot**: overlay de chat personalizable, local.
- **Twitch**: popout de chat (`https://www.twitch.tv/popout/<canal>/chat`) como browser source con CSS personalizado en el campo "CSS personalizado" de OBS.
- Como dock (solo lo ves tú): *Docks → Docks de navegador personalizados* con la misma URL.

### 5.5 Alertas (sin Streamlabs)
- **Recomendado: Streamer.bot (gratis)**. Escucha los eventos de Twitch (follow, sub, raid, bits, puntos de canal) y dispara acciones: mostrar u ocultar fuentes, reproducir un sonido, o mandar datos a un `alerts.html` propio por su WebSocket. Todo el diseño queda en CSS propio.
- Patrón simple sin código: en `[S] Alertas` crea una fuente por alerta (vídeo .webm + texto) oculta, y una acción de Streamer.bot "OBS → Set Source Visibility" la muestra unos segundos.
- Alternativa en la nube gratis: StreamElements (overlays web). Sus widgets también son de terceros: úsala solo si el usuario la prefiere.

---

## 6. Configuración por juego

### 6.1 Game Capture
- Fuente **Captura de juego**, modo **"Capturar una ventana específica"**, prioridad "Coincidir con el ejecutable". Así cada escena `Juego - X` engancha solo su juego.
- DX11/DX12/Vulkan/OpenGL son compatibles. Si un juego en DX12 da tirones o se cae con OBS y tiene modo DX11, prueba DX11 (caso documentado: Fortnite).
- Marca **"Usar hook compatible con anti-cheat"** (viene activado por defecto).
- Algunos juegos piden **OBS como administrador** (documentados por OBS: Call of Duty, Valorant, Genshin Impact, Honkai: Star Rail, Zenless Zone Zero). Si hace falta, se ejecuta OBS como admin **solo para esa sesión**.
- **Juegos que bloquean el hook**: Counter-Strike 2, Destiny 2, Roblox, GTA San Andreas/SA-MP, emuladores y juegos antiguos. Pon el juego en **ventana sin bordes** y usa **Window Capture** (método "Windows 10 (1903 y posterior)") o **Display Capture**.
- **League of Legends**: una escena con Window Capture del cliente y otra con Game Capture de la partida; el Scene Switcher alterna entre ambas.
- Conflictos: RivaTuner/MSI Afterburner y otros overlays de FPS. En RTSS 7.3.2+ activa "Use Microsoft Detours API hooking".

### 6.2 Macro de Advanced Scene Switcher (plantilla)
*Herramientas → Advanced Scene Switcher → Macro → +*

```
Macro: "Auto - <Juego>"
  Condición: Process   → "<juego>.exe"  [x] is focused
  Acción:    Switch scene → "Juego - <Juego>"   transición: Stinger
  Opción:    [x] Perform actions only on condition change   (evita re-disparos)

Macro: "Auto - Salida de juego"
  Condición: Process   → "<juego>.exe"  is NOT running   (o: no está en foco durante 10 s)
  Acción:    Switch scene → "Pausa/BRB"   (o "Coworking")
```
- Si el proceso del juego y el de su launcher se llaman distinto, usa el del juego. Para verlo: Administrador de tareas → Detalles → columna "Nombre", o en PowerShell `Get-Process | Sort-Object CPU -Descending | Select -First 15 Name`.
- Para no saltar de escena en medio del coworking: añade la condición "Escena actual empieza con `Juego -`" o un interruptor global (variable `modo = gaming`).
- Exporta las macros (*Macro → Exportar*) a `Streaming\macros\` como respaldo.
- Avanzado: el plugin también tiene condiciones de ventana (título), de vídeo (detectar una imagen en pantalla, por ejemplo "pantalla de carga") y horarios.

### 6.3 Fichas por juego (verificadas el 2026-10-10)

> Los nombres de proceso son los que ve Windows (Administrador de tareas → Detalles). **Confírmalos en la máquina** antes de crear la macro: pueden cambiar con parches, con la tienda (Steam, Epic, Microsoft Store/Game Pass) o con el modo de lanzamiento.

#### Hogwarts Legacy
- **Proceso a usar en la macro**: `HogwartsLegacy.exe`. El binario real está en `<instalación>\Phoenix\Binaries\Win64\HogwartsLegacy.exe` (Unreal Engine 4.27). Como el lanzador de la raíz y el binario real pueden llamarse igual, si la macro se dispara en falso usa la opción del plugin de **comprobar la ruta del proceso** (debe contener `Phoenix\Binaries\Win64`).
- **API**: **solo DirectX 12** (WB lo indica en su FAQ oficial: no hay modo DX11 soportado). Tiene Denuvo (DRM), **no** anti-cheat.
- **Captura**: Game Capture → "Capturar una ventana específica" → `[HogwartsLegacy.exe]`. Modo de pantalla del juego: no hay pantalla completa exclusiva; usa "Windowed fullscreen" (ventana sin bordes), que es amigable con OBS.
- **Problemas conocidos**: el juego tiene tirones propios y hay reportes de OBS que se congela o pierde frames con este título, sobre todo con Display Capture. Recomendado:
  - Limitar FPS del juego a 60 (o al FPS del stream) para dejar margen a la GPU.
  - **VRAM**: el juego es muy exigente. Con 8 GB: texturas en Alto (no Ultra), ray tracing desactivado, DLSS en Calidad. Opcional: limitar el pool de texturas (`r.Streaming.PoolSize=4096` en `Engine.ini`, según PCGamingWiki).
  - Enhanced Broadcasting: empezar con un máximo de 3 pistas.
  - No interactuar con los menús contextuales de la fuente mientras está enganchada (hay reportes de cuelgues de OBS).
- **Respaldo**: Window Capture (método "Windows 10 (1903 y posterior)"). Display Capture solo como último recurso.

#### Project Zomboid
- **Proceso a usar en la macro**: `ProjectZomboid64.exe`. Es un lanzador nativo que carga la máquina virtual de Java **dentro del mismo proceso** (lee `ProjectZomboid64.json`), así que normalmente no aparece un `java.exe` aparte.
  - **Excepción**: si se arranca con `ProjectZomboid64.bat`, el proceso es `java.exe` (o `javaw.exe`) de `jre64\bin`. En ese caso la macro debe usar `java.exe` **+ condición de título de ventana** "Project Zomboid", porque `java.exe` es genérico.
- **API**: **OpenGL** (LWJGL).
- **Captura**: Game Capture con OpenGL funciona normalmente, en modo "Capturar una ventana específica" → la ventana "Project Zomboid". No tiene anti-cheat de terceros.
- **Problemas conocidos**: hay reportes de cierres del juego al engancharse `graphics-hook64.dll` (sobre todo en portátiles con dos GPU). En una torre con una sola GPU es raro; si pasa, usa el respaldo.
- **Respaldo**: Window Capture con el juego en ventana sin bordes (el juego la soporta), en lugar de Display Capture, para no mostrar el escritorio.
- **Escena sugerida**: `Juego - Project Zomboid`. Al ser isométrico y lento, **1080p60 a 6000 kbps** se ve bien, y 30 fps también es aceptable.

#### Tom Clancy's Ghost Recon Wildlands
- **Proceso a usar en la macro**: `GRW.exe` (el nombre que aparece en los logs de Game Capture de OBS). Hay también un arranque intermedio en la raíz (`rungame.exe`, según PCGamingWiki): **no** usarlo en la macro.
- **Launcher**: siempre requiere **Ubisoft Connect** (procesos `UbisoftConnect.exe` y `upc.exe`), aunque se compre en Steam o Epic. Tiene Denuvo (DRM).
- **API**: **DirectX 11**.
- **Anti-cheat**: usaba **Easy Anti-Cheat** (EAC), que históricamente bloqueó el hook de Game Capture tras algunas actualizaciones de OBS ("hook not loaded yet"). **Ubisoft quitó EAC del juego en PC el 13-ago-2026** (confirmado por PCGamingWiki/SteamDB, GamingOnLinux y la comunidad de Steam). Con la versión actual, Game Capture debería engancharse sin restricciones de anti-cheat. **Nunca** usar "bypasses" de EAC de terceros.
- **Captura**:
  1. Desactivar el **overlay de Ubisoft Connect** (*Ubisoft Connect → Configuración → General → desmarcar "Activar la superposición en el juego"*), porque es una causa común de pantalla negra.
  2. Game Capture → "Capturar una ventana específica" → `[GRW.exe]`, con el hook compatible con anti-cheat activado (por defecto).
  3. Juego en ventana sin bordes si hay problemas al hacer Alt+Tab.
- **Respaldo**: Window Capture (ventana sin bordes), y si no, Display Capture.
- **Otros**: PCGamingWiki reporta cargas muy largas o infinitas en CPUs recientes, ligadas a EAC; tras quitarlo, algunos usuarios siguen con el problema. Shooter de mundo abierto con mucho follaje: 936p60 (modo A) o Enhanced Broadcasting dan mejor imagen que 1080p60 a 6000 kbps.
- **Macro extra opcional**: cuando `UbisoftConnect.exe` está en foco y `GRW.exe` no está corriendo → escena `Pausa/BRB` o `Inicio`, para no mostrar el launcher.

#### The Elder Scrolls Online (ESO)
- **Proceso a usar en la macro**: `eso64.exe` (la ayuda oficial de ESO lo escribe `ESO64.exe`; Windows no distingue mayúsculas, pero si la condición del plugin es sensible a mayúsculas usa una expresión regular insensible, por ejemplo `(?i)eso64\.exe`). Ruta por defecto: `C:\Program Files (x86)\Zenimax Online\The Elder Scrolls Online\game\client\eso64.exe`.
- **Launcher**: `Bethesda.net_Launcher.exe` (sigue llamándose así aunque ahora es el "ESO Launcher"). Rutas típicas: `...\Zenimax Online\Launcher\` (versión independiente), `...\steamapps\common\Zenimax Online\Launcher\` (Steam) o `...\Epic Games\TheElderScrollsOnline\Launcher\` (Epic). El launcher solo actualiza e inicia `eso64.exe`: **la macro debe apuntar al juego, no al launcher**. Opcional: macro "launcher en foco" → `Inicio` o `Pausa/BRB`.
- **API**: **DirectX 11** en PC (DX12 solo está anunciado como "futuro"; existe en Xbox Series).
- **Anti-cheat**: no hay un anti-cheat de terceros documentado tipo EAC o BattlEye (no verificado al 100 %; ver la sección de no verificados). Game Capture en DX11 engancha normalmente.
- **Captura**: Game Capture → "Capturar una ventana específica" → `[eso64.exe]`. Recomendado jugar en "Ventana a pantalla completa" para Alt+Tab sin perder la imagen.
- **Problemas conocidos**: los addons de UI (por ejemplo los que cambian el límite de FPS) no afectan a OBS. ESO limita a 100 FPS por defecto. Es un MMO con interfaz densa: **1080p60** se lee mejor que 936p.
- **Respaldo**: Window Capture.

### 6.4 Tabla resumen (rellenar al probar en la máquina)
| Juego | Proceso para la macro | Launcher (no usar en la macro) | API | Anti-cheat | Captura principal | Respaldo | Admin OBS | Escena | Macro | Probado |
|---|---|---|---|---|---|---|---|---|---|---|
| Hogwarts Legacy | `HogwartsLegacy.exe` (ruta `Phoenix\Binaries\Win64`) | Steam/Epic | DX12 | No (Denuvo DRM) | Game Capture | Window Capture | No debería | `Juego - Hogwarts Legacy` | ☐ | ☐ |
| Project Zomboid | `ProjectZomboid64.exe` (o `java.exe` + título si se usa .bat) | Steam/GOG | OpenGL | No | Game Capture | Window Capture | No | `Juego - Project Zomboid` | ☐ | ☐ |
| Ghost Recon Wildlands | `GRW.exe` | Ubisoft Connect (`UbisoftConnect.exe`, `upc.exe`) | DX11 | EAC **removido** 13-ago-2026 | Game Capture (overlay de Ubisoft desactivado) | Window, luego Display | Probar sin admin | `Juego - Ghost Recon Wildlands` | ☐ | ☐ |
| The Elder Scrolls Online | `eso64.exe` | `Bethesda.net_Launcher.exe` | DX11 | Ninguno de terceros conocido | Game Capture | Window Capture | No debería | `Juego - ESO` | ☐ | ☐ |
| _(otro juego)_ | | | | | | | | `Juego - …` | ☐ | ☐ |

Antes de llenar una fila nueva: preguntar al usuario el juego y la tienda, abrir el juego, mirar el proceso en el Administrador de tareas (o con `Get-Process | Sort-Object CPU -Descending | Select -First 15 Name,Path` en PowerShell), y revisar la guía de Game Capture de OBS por si el juego tiene problemas conocidos.

## 7. Audio

### 7.1 Pistas separadas (para el VOD)
*Ajustes → Salida → Grabación → Pistas de audio 1–5* y *Propiedades avanzadas de audio* (en el mezclador):

| Pista | Contenido | Va al stream | Va al VOD/grabación |
|---|---|---|---|
| 1 | Mezcla completa | Sí (pista de streaming = 1) | Sí |
| 2 | Juego | – | Sí |
| 3 | Micrófono | – | Sí |
| 4 | Música | – | Sí (o excluida para el VOD seguro) |
| 5 | Discord/voz de terceros | – | Sí |

- Separa las fuentes con **Captura de audio de aplicación** (juego.exe, Discord.exe, el reproductor de música) en vez de un solo "Audio del escritorio".
- **VOD de Twitch sin música**: en *Salida → Emisión → Pista de audio del VOD de Twitch* elige una pista que **no** incluya la música (por ejemplo una mezcla 6 con todo menos la música).
- Monitoreo: usa audífonos para que el mic no recoja el juego.

### 7.2 Cadena de filtros del micrófono (orden)
1. Supresión de ruido: **RNNoise** (gaming) o NVIDIA Broadcast/NVIDIA Noise Removal (si hay margen de VRAM).
2. Puerta de ruido (umbral de cierre unos −40 dB, apertura unos −30 dB; ajustar).
3. Compresor (ratio 4:1, umbral unos −18 dB).
4. Limitador (−1 dB).
Picos de voz entre −12 y −6 dB en el mezclador; juego y música unos 10–15 dB por debajo de la voz.

### 7.3 Copyright
Ver §3.3. Regla corta: la música sin licencia de streaming no va al aire. La música del juego suele estar permitida dentro del propio juego, pero algunas bandas sonoras licenciadas (radios en juegos, música con licencia de terceros) generan claims: revisa la política del editor y apágalas si hace falta.

---

## 8. Checklist antes de salir en vivo

**GPU y sistema**
- [ ] **Descargar modelos locales de IA** de la GPU compartida:
      `ollama ps` (ver qué está cargado) → `ollama stop <modelo>` en cada uno. Si hay tareas que podrían volver a cargarlo, pausa esas tareas o el servicio durante el stream.
- [ ] VRAM libre razonable (en el Administrador de tareas o con `nvidia-smi`). Con 8 GB: el juego + OBS + NVENC no deberían pasar de unos 7 GB.
- [ ] Driver NVIDIA 570 o superior. Modo de juego de Windows activado. Programación de GPU acelerada por hardware: probar con y sin si hay tirones.
- [ ] Cerrar navegadores pesados, descargas, sincronización en la nube y overlays de FPS.

**Red**
- [ ] **Cable Ethernet** (1 GbE), no Wi-Fi, para transmitir.
- [ ] Velocidad de subida medida ≥ 2× el bitrate total (con Enhanced Broadcasting, ≥ 2× el ancho de banda máximo configurado).

**OBS**
- [ ] Perfil `Twitch` (modo A o B según §2) y colección `Stream-Principal`.
- [ ] La cuenta está conectada o la clave ya está en OBS (no se pega en ningún otro lugar).
- [ ] Título, categoría (el juego) y etiquetas actualizados en Twitch.
- [ ] Prueba de 10–30 s grabando: audio en las 5 pistas, cámara, captura del juego visible.
- [ ] Barra de estado: 0 % de frames perdidos (red), 0 de "omitidos por codificación" y "por renderizado".
- [ ] Advanced Scene Switcher activo (o pausado si el stream es solo coworking).
- [ ] Streamer.bot abierto y conectado (si se usa); alerta de prueba.
- [ ] La escena `Privacidad` tiene su atajo asignado.
- [ ] Música: solo de fuente con licencia; pista de VOD correcta.
- [ ] Empezar en `Inicio` y cambiar a la escena principal tras la cuenta regresiva.

**Al terminar**
- [ ] Escena `Fin` → detener transmisión → detener grabación.
- [ ] Exportar la colección de escenas o el perfil si hubo cambios (`Streaming\backups\`).
- [ ] Reactivar las tareas de IA local si se pausaron.

---

## 9. Solución de problemas

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| **Frames perdidos (red)** en rojo | Subida insuficiente o inestable, Wi-Fi, ruta mala al servidor | Usar cable; bajar el bitrate 1000 kbps a la vez; en *Avanzado → Red* probar "Activar optimizaciones de red" o el TCP pacing; cambiar de servidor de ingesta; con Enhanced Broadcasting, bajar el ancho de banda máximo o desactivarlo para probar |
| **"Codificación sobrecargada" / omitidos por codificación** | NVENC saturado (varias pistas, preset alto, 1440p+) o VRAM llena | Preset P6→P4, quitar Multipass, bajar a 1080p o 936p, limitar las pistas de Enhanced Broadcasting, **descargar modelos de IA de la GPU**, cerrar NVIDIA Broadcast |
| **Omitidos por renderizado** (lag de render) | GPU al 100 % por el juego | Limitar FPS del juego (por ejemplo a 120 o 141), bajar gráficos un poco, ejecutar OBS como admin (le da prioridad de GPU), reducir browser sources animadas |
| **Game Capture en negro** | Juego en pantalla completa minimizado, anti-cheat bloqueando, overlay en conflicto, ejecutable equivocado | Verificar con una grabación; OBS como admin; quitar RTSS u overlays; ventana sin bordes + Window Capture; revisar el modo "ventana específica" y el .exe |
| **Window Capture en negro** | Método de captura | Cambiar el método a "Windows 10 (1903 y posterior)" o probar BitBlt |
| **Punto rojo / tamaño raro** | Transformación atascada | Clic derecho → Transformar → Restablecer (Ctrl+R) y Ajustar a pantalla (Ctrl+F) |
| **Enhanced Broadcasting se desconecta o da tirones** | VRAM llena o demasiadas pistas | Limitar las pistas a 2–3 o el ancho de banda; si sigue, volver al modo A (§2.2) |
| **Plugin desaparece tras actualizar OBS** | Versión mínima o ABI | Actualizar el plugin desde su página oficial; revisar el log |
| **Eco o voz duplicada** | Mic capturado dos veces (Discord + OBS) o monitoreo activo | Revisar *Propiedades avanzadas de audio*: monitoreo desactivado; Discord por captura de aplicación |
| **Tirones al abrir un modelo de IA durante el stream** | Compiten por VRAM y cómputo | No usar IA local en la GPU mientras se transmite (§0.5 y §8) |

Logs: *Ayuda → Archivos de registro → Subir el archivo de registro actual* genera un enlace público. **Antes de compartirlo, revisa que no tenga rutas personales sensibles**, y nunca lo publiques sin OK del usuario. Para analizarlo localmente basta con abrir el archivo en `%APPDATA%\obs-studio\logs`.

---

## 10. Pendientes al aplicar esta skill
- Preguntar al usuario: si es Partner/Affiliate en Twitch (habilita 2K/HEVC y la transcodificación del servidor), juegos adicionales (§6.4), cámara y micrófono, y si quiere grabación local.
- Probar en la máquina cada ficha de §6.3 (proceso real, enganche de Game Capture) y marcar "Probado".
- Confirmar en la máquina: versión del driver NVIDIA, VRAM libre en reposo y velocidad de subida por cable.
- Volver a verificar las versiones de OBS y plugins en sus páginas oficiales antes de instalar.
