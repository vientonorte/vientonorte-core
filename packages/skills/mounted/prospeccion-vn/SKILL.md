---
name: prospeccion-vn
description: Use this when running the weekly Viento Norte prospecting round (find SMBs with weak websites or hiring junior design/UX talent, audit their sites, score them, classify each into one of the 3 VN offers, write fichas and unsent drafts).
---
# Prospección VN semanal

Esto corre en el turno PM del sprint VN, que va de domingo a domingo. Toma unas 2 horas y termina con 5 leads nuevos, sus fichas y los borradores. Nada se envía: el usuario revisa y decide.

## Reglas duras
- Solo datos públicos de empresas. No guardar datos personales: ni RUT, ni teléfonos o correos de personas.
- Nada de scraping de Google o Maps, nada de logins y nunca intentar pasar un anti-bot o captcha. Si no se puede medir, se marca NO DATO.
- Maps solo se usa a través de la API oficial de Places (Text Search o Nearby Search con un FieldMask mínimo), dentro del tope de cuota aprobado. Las empresas sin sitio (categoría 1) salen solo de ahí, sin scraping. Si no hay clave, se busca con WebSearch.
- No se contacta a nadie y no se crean borradores en Gmail. Los borradores van en markdown. **Ningún envío sin el OK explícito del usuario.**
- Links en los borradores: solo `https://vientonorte.io/servicios/` con la UTM de su categoría y el ancla `#revision-gratis`, `#consultoria-ux` o `#web-pymes`. Nunca `/s/`, `/#/`, `/news/` ni `/servicios/<slug>/`, porque redirigen. Antes de cerrar, confirmar que `/servicios/` responde 200.
- **Solo M5 envía correos, por orden del Tech Lead, y eso incluye las pruebas al usuario** (regla del PO del 2026-10-09). Nadie más envía: ni con el send-as de contacto@ en el Gmail personal del usuario ni con ningún conector de Gmail. Si el usuario pide una prueba, se le avisa al PO, que la pasa al Tech Lead. Motivo: las pruebas salían con DKIM de gmail.com, fallaban DMARC y iCloud las rechazaba (HM08), lo que daña la reputación del dominio.
- Descartar agencias, consultoras de marketing o tecnología (son competencia), corporaciones grandes con equipo UX propio y ofertas de más de 30 días.

## Clasificación obligatoria (antes de escribir cualquier correo)
Cada empresa cae en **una sola** categoría. Responde en orden:
1. **¿Tiene sitio web propio?** No → **categoría 1**. Sí → pregunta 2.
2. **¿El hallazgo principal verificado rompe un flujo concreto (agendar, cotizar, contactar, reservar o comprar: carga lenta, CLS, pasos que se pierden) o es de accesibilidad/legibilidad (contraste, zoom bloqueado, lector de pantalla, alt) sin romper el flujo?** Flujo → **categoría 2**. Accesibilidad → **categoría 3**.

| Cat. | Situación | Oferta (textos de /servicios/, sin inventar) | Ancla / utm_campaign | CTA único |
|---|---|---|---|---|
| 1 | Sin sitio, operativa en Google Maps | Web para Pymes: una página con su marca, adaptada al celular e integraciones básicas (WhatsApp, mapa, formulario). Precio: el que diga /servicios/#web-pymes; si el PO o el usuario no lo confirmaron, el correo va sin precio y sin «gratis» | `#web-pymes` / `web-pymes` | «Quiero mi web» |
| 2 | Tiene sitio, flujo roto | Consultoría UX para Pymes: mejorar **ese** flujo (nombrarlo) con las herramientas que ya usa; diagnóstico, prototipo, proceso; kickoff de 30 min. Sin precio (no figura en /servicios/). Nunca «página nueva» ni «web nueva» | `#consultoria-ux` / `consultoria-ux` | «Conversar mi caso» |
| 3 | Tiene sitio, problema de accesibilidad | Revisión gratis de un flujo: WCAG 2.2 AA de un flujo crítico (contacto, reserva o pago), lista priorizada y conversación de 30 min, sin compromiso. Es la puerta de entrada para empresas con sitio. Antes de usarla, confirmar en vivo que existe `id="revision-gratis"` en /servicios/; si no existe, no se usa y se marca como bloqueante | `#revision-gratis` / `revision-gratis` | «Pedir revisión gratis» |

- Link (siempre con la UTM **antes** del ancla): `https://vientonorte.io/servicios/?utm_source=email&utm_medium=outreach&utm_campaign=<campaña>&utm_content=<slug-empresa>#<ancla>`. El slug va en minúsculas, con guiones y sin tildes.
- **Un solo llamado por correo:** el botón y, como mucho, un texto corto en la oferta («ver la revisión», etc.) apuntan al mismo link. No se muestra la URL larga en el HTML y en el texto plano va una sola vez.
- **No hablar de reemplazar herramientas:** se mejora el flujo con lo que la empresa ya usa (WhatsApp, su formulario, su tienda). Nunca «reemplazar», ni proponer cambiar WhatsApp por otra herramienta.
- **Google Calendar y el agendamiento con Google no se mencionan en ningún correo.** Se ofrecen solo en la conversación uno a uno. «Agendar» se puede usar solo para describir el flujo que ya existe en el sitio de la empresa.
- «Gratis» solo en la categoría 3 (porque /servicios/ la ofrece gratis). Nunca «web gratis» ni «página gratis». En las categorías 2 y 3, nunca «página web», «web nueva» ni el precio de la web.
- Cada correo lleva el remitente `Viento Norte <<PUBLIC_EMAIL>>` y la línea de baja: «Si no quieres recibir más correos de Viento Norte, responde "baja" y no te volvemos a escribir.»
- La clasificación se anota en la ficha con su porqué y su evidencia (URL, Lighthouse o curl, y fecha).

Señal B (ofertas junior o de práctica en diseño/UX/web): sirve para encontrar leads, pero la empresa igual se clasifica con las preguntas 1 y 2.

## Pasos
1. **Señales B (15 min).** Correr la API pública de Get on Board (`gob.py`) y estas búsquedas web fijas, con el mes y año actuales:
   - `práctica diseño UX Providencia OR "Las Condes" OR "Santiago Centro" <mes> <año>`
   - `trainee OR junior marketing digital diseño web Las Condes <mes> <año>`
   - `site:chiletrabajos.cl práctica diseño Providencia`
   - `mercadolaboral.udd.cl práctica diseño Las Condes`

   Verificar cada oferta con WebFetch: fecha, empresa y funciones.
2. **Señales con y sin sitio (15 min).** Rotar 2 rubros por semana en las 3 comunas (Santiago Centro, Providencia y Las Condes). Por ejemplo: dental y ópticas; restaurantes y veterinarias; estudios jurídicos o contables y ferreterías. Si hay clave de Places, usar Text Search o Nearby Search:
   - con `websiteUri` pasa a la auditoría (categoría 2 o 3, según el hallazgo);
   - sin sitio, en estado OPERATIONAL y con muchas reseñas, es categoría 1;
   - cualquier otro estado se descarta.
3. **Auditoría (30 min).** `audit.py <dominio> <slug>` (curl y HTML) para todos los candidatos. `lh.sh <slug> <url>` (Lighthouse móvil) para los 6 a 8 con más señales. Resumir con `lhsum.py`.
4. **Puntaje de 1 a 5.** Hallazgo en el camino de conversión: +2. Fallo WCAG A/AA inequívoco: +1. Pyme local sin equipo UX: +1. Señal fresca (oferta de 30 días o menos, sitio abandonado): +1. Corporación grande u oferta vencida: −1.
5. **Clasificar y escribir (30 min).** Elegir 5 leads mezclando categorías. Clasificar cada uno con la sección «Clasificación obligatoria» antes de redactar. Agregarlos a `build.py` y correrlo; eso regenera `leads.csv`, `fichas/` y `borradores.md`. Cada borrador abre con el hallazgo concreto en una línea y sigue con la oferta de su categoría, en tono sobrio.
6. **Control (15 min).** Volver a medir el dato citado en cada borrador, porque Lighthouse varía entre corridas. Deduplicar contra `historico.csv` (dominio o place_id, con fecha; se re-audita cada 90 días). Revisar que no queden links prohibidos con `rg "/s/|/#/|/news/|/servicios/[a-z]"`. Pasar también `rg -i "calendar|web gratis|página gratis|reemplaz"` (tiene que dar cero) y `rg -i "agend"` (revisar a mano: solo vale como flujo existente de la empresa). Comprobar que la categoría calza con la oferta, el ancla, la campaña y el CTA.
7. **Entrega.** Resumen corto con los 5 leads (categoría y su porqué, rubro, puntaje, hallazgo y oferta), rutas de archivos y lo que quedó como NO DATO. Todo queda sin enviar.

Los scripts de referencia están en la carpeta del piloto (`/workspace/prospeccion-piloto-2026-09-27/`: audit.py, lh.sh, lhsum.py, lhdetail.py, gob.py, build.py y metodo.md). Cada semana se trabaja en una carpeta nueva `prospeccion-<fecha>/` que usa esos scripts.
