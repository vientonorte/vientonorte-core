---
name: ssot-figma-editar-sin-romper
description: Use before any edit to a Figma SSOT, its linked slides (Figma or Google Slides) or its Drive/iCloud copies, so settled rules, style and figures are not broken or re-asked.
---
# Editar una SSOT de Figma sin romper lo ya establecido

## 0. Antes de tocar nada
1. Lee el archivo de estado del proyecto, la memoria (RecallMemory) y el changelog del índice. Lo que ya está decidido no se vuelve a preguntar.
2. Revisa quién está editando ahora. Un solo bot edita una página a la vez; el otro hace la QA cruzada.
3. Las cifras vigentes salen de su fuente medida, citada con n y fuente. No uses cifras que otro bot reportó si no están verificadas, ni cifras de un PR sin deploy ni de un fixture. Si no está verificado: «por confirmar».

## 1. Estilo (lo primero que se rompe)
- Toma el estilo de la plantilla del equipo y de las láminas buenas ya aprobadas. Nunca edites la plantilla.
- Usa siempre los estilos y variables vinculados de texto, color y efecto. No pongas a mano fuente, tamaño ni hex.
- Al editar texto, conserva el estilo vinculado. Si el texto pierde la fuente, vuelve a vincular el estilo; no la escribas a mano.
- Frames cortos, una idea por bloque, auto-layout. No hagas frames largos.
- «Ya no vigente» o «versión anterior»: usa el estilo secundario existente de la SSOT, no un gris inventado.
- Cierra cada edición con captura antes y después, y compárala con la plantilla.

## 2. Contenido
- No borres nada. Mueve o respalda en la página de respaldos antes de cada edición.
- Solo una versión vigente por dato. No dejes dos cortes «vigentes» a la vez; el viejo se marca «ya no vigente».
- Mantén la observación (OBS) separada de la inferencia (INF).
- Si falta un dato: «—». Los participantes van solo con código, sin datos personales.

## 3. Cierre obligatorio
1. Actualiza el índice y cada página afectada.
2. Agrega una línea al changelog.
3. Revisa todos los enlaces del índice.
4. Pide la QA cruzada a otro bot con los node ids. El que editó no se aprueba a sí mismo.
5. Propaga el mismo cambio a las slides, Drive e iCloud, o déjalo anotado como pendiente. No dejes dos versiones distintas.
6. Al usuario dale solo el resultado final, corto y con una idea por línea. No le pases el ida y vuelta entre bots.
