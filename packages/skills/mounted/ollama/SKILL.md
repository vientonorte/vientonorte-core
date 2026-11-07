---
name: ollama
description: >
  Corre el modelo local antes de gastar tokens. En W11 y en el día del M5
  es LM Studio en 127.0.0.1:1234. La noche del M5 sigue en Ollama. SpaceXAI
  u otra nube solo si ese paso no puede correr en local.
  Use when the user runs /ollama, pide una IA local, or any task that can run
  on a local model.
---

# Ollama

La política vive en `~/.grok/rules/ollama-tokens.md` y en el vault configurado `00-sistema/OLLAMA-TOKENS.md`. No la copies.

## Quién lo usa

- **GWin** lo corre en esta torre. **GMac** de día lo corre en LM Studio del M5. La noche de ese Mac sigue en Ollama. **MBot** solo le manda texto que ya está transcrito.
- El iPad no corre Ollama.
- Fotos, visión y una herramienta que el modelo no tiene (MCP) no corren aquí. Todo lo demás, incluido un LLM de producto VN, sí, si esta torre o el M5 pueden correrlo.
- Durante captura Micro1 o proctoring, no cargues el modelo en la GPU.

## Pasos en W11

1. El worker de día es LM Studio (Bionic) en `http://127.0.0.1:1234/v1`, vía `local-llm`. Texto: `qwen2.5-7b-instruct` (Q4_K_M, contexto 8192). Código: `qwen2.5-coder-7b-instruct` (Q4_K_M). Un solo modelo. No inventes los modelos del M5.
2. Si `nvidia-smi` marca más de 4000 MiB, no cargues. No uses el 14B. No cargues Hermes en esta torre.
3. `local-llm` carga con `lms load -c 8192 --gpu max --parallel 1` y al salir corre `lms unload --all`. `lms ps` tiene que quedar vacío.
4. El daemon de Ollama está apagado desde 2026-10-22 y `Ollama.lnk` no está en Inicio. El programa sigue en `%LOCALAPPDATA%\Programs\Ollama`. No lo arranques para `local-llm`.
5. No le pidas al modelo chico datos de las máquinas. Se los inventa. Esos hechos están en la regla.
6. LiteLLM solo si el cliente habla API de OpenAI. No enciendas el 4000. La noche del M5 sigue en Ollama. Esta torre no la agenda.
7. Si el paso no cabe en el modelo local, lo sigue este Grok. No hay caída a OpenRouter.
8. Por la mañana, lee el último archivo de `Viento Norte/90-daily/hermes-loop/`, corre la skill que el borrador nombra, anota una línea de `local-llm report` y deja la pauta para que el usuario la marque. Ese borrador no publica ni manda correo. El 7B no cierra fichas, citas, pesos ni un merge.

## Pasos en el M5 de día

1. El worker de día es LM Studio 0.4.26-4 en `http://127.0.0.1:1234/v1`, vía `~/bin/local-llm`. Texto: `qwen2.5-1.5b-instruct` (MLX 4bit, contexto 8192). Código: `qwen2.5-coder-1.5b-instruct` (MLX 4bit). Un solo modelo.
2. Si `ollama ps` tiene una fila, no cargues LM Studio encima. La noche (`vn-night-local.sh`, `vn-hermes-loop.sh`, `com.ollama.ollama`) sigue en Ollama. No apagues ese LaunchAgent.
3. `local-llm` carga con `lms load -c 8192 --parallel 1 --ttl 600` y al salir corre `lms unload --all`. En el Mac no uses `--gpu max`. `lms ps` tiene que quedar vacío.
4. El servidor queda en `127.0.0.1`. No pongas `0.0.0.0`. LM Studio no es un ítem de inicio.
