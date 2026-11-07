---
name: auditoria-previa-ssot
description: 'Use this before starting any VN / el usuario task that touches Figma, assets, MCPs, local models or other bots: SSOT-first preflight learned from the Grok TUI audit (card sort + /learn, 2026-10-12).'
---
# Preflight SSOT antes de actuar

Sale de la auditoría del Grok de la terminal del 2026-10-12 (card sort de Figma + /learn). Fuente: `/workspace/vn-docs/AUDITORIA-TUI-2026-10-12.md` y `tui-learn-20261012/`.

## 1. Partir desde la SSOT
- Para cualquier cosa de marca, marketing o Figma, la única puerta de entrada es el archivo Figma **VN · Marketing SSOT**. Cada dato tiene un solo hogar.
- FO, Penji y SURA no comparten SSOT con VN. No los mezcles.
- Solo la pila «VN vivo» entra en /vn-agent. Las pilas Portafolio, Entregas/Penji, SURA y el DS del usuario quedan fuera.

## 2. No clasificar por nombre de archivo
- No vuelvas a clasificar archivos por el nombre ("Untitled", prototipos). Abre el archivo o pregunta.
- El card sorting va después del diagnóstico y antes del UI kit (método Valuesite / Método Ro).
- Una tarjeta por archivo, con clave, tipo y nodo de prototipo. Si un archivo tiene varios clientes, se listan en la misma tarjeta. Un link de prototipo es un nodo dentro de su tarjeta, no una tarjeta propia.
- Las asignaciones de dueño ya hechas viven en la memoria del TUI (`topics/figma-card-sort.md`). Léelas antes de reasignar.

## 3. Delegar al ejecutor correcto
- Pide la tarea en el chat del bot dueño (PO, Tech Lead, I15, Mbot, CA, Prospecto, Sysadmin, W11). el usuario no hace de mensajero. Respeta la línea de mando VN: M5 solo habla con el Tech Lead.
- Si el usuario dice «modelos locales», «Hermes» o «no quemar tokens», usa Ollama local (qwen ligero, o hermes3:8b si hay RAM): un modelo a la vez, descargado al terminar y nunca en paralelo con Playwright.
- Antes de improvisar con Gmail o un navegador, usa los MCP ya configurados (Cloudflare, Vercel, Figma, GitHub).

## 4. No borrar ni desactivar sin preguntar
- Los MCP, plugins, skills y workflows sin uso se listan y se le preguntan al usuario. Nada se borra solo.
- Lo único que se puede borrar sin preguntar son las copias duplicadas exactas de una skill, y aun así se avisa.

## 5. Checklist rápido
1. ¿El dato vive en la SSOT? Si sí, léelo de ahí.
2. ¿Es VN vivo o de otro cliente?
3. ¿Quién es el dueño (bot o persona)? Deriva la tarea allá.
4. ¿Hay un MCP o un modelo local que lo resuelva sin gastar tokens de la nube?
5. ¿Hay algo destructivo? Entonces pregunta antes.
