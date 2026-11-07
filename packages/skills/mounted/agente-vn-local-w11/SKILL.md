---
name: agente-vn-local-w11
description: 'Use this before spending cloud tokens on a Viento Norte (VN) task: delegate it first to the local OpenCode + Ollama agent on the W11 tower (via the W11 bot), and only go to cloud if local can''t do it.'
---
# Agente VN local (W11 · OpenCode + Ollama)

## Cuándo
- Tareas VN de lectura, búsqueda en repo/vault, código pequeño, borradores, revisión de texto.
- Antes de gastar tokens cloud, o cuando el uso de Grok Bot se agotó.

## Qué NO va local
- Aritmética o cifras (modelos 7B no sirven para eso).
- Arquitectura, cambios multiarchivo, merges, todo lo que se envía, publica o despliega: queda en cloud y con OK explícito del usuario.
- Un proyecto de investigación de campo y los datos personales nunca van a modelos cloud (minimax-m3:cloud prohibido).

## Pasos
1. Revisar la ficha SSOT de máquinas y modelos (Obsidian `<VAULT>/00-sistema/MAQUINAS-Y-MODELOS.md`) para saber el modelo vigente en W11 (hoy `qwen2.5-coder:7b`, contexto 16k, un modelo a la vez, Ollama solo en localhost).
2. Pedir la tarea al bot W11 · Windows con SendToAgent: objetivo, repo/carpeta, criterio de éxito y que responda con resultado + archivos tocados. Nunca exponer Ollama a la red.
3. W11 la corre con OpenCode apuntando a Ollama local, en solo lectura salvo que la tarea diga lo contrario.
4. Revisar el resultado (QA): si es débil o la tarea excede lo local, escalar a cloud y decir por qué.
5. Cualquier send, publish, push a main o deploy: pedir OK del usuario en chat antes. Deploys del worker solo `npm ci && npx --no-install wrangler deploy --keep-vars` por orden de TL.
6. Registrar en el journal qué se resolvió local y qué no, para afinar el ruteo.
