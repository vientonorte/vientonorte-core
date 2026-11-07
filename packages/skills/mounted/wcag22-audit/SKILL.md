---
name: wcag22-audit
description: Aplica auditoría WCAG 2.2 nivel AA con criterios numerados, técnicas verificables y plan de remediación. Activar cuando el usuario pida audit de accesibilidad, revisión WCAG, checklist a11y, evaluación accesible, o entregue pantalla/componente para validación.
---

# Skill — WCAG 2.2 Audit

## Cuándo activar
- el usuario menciona: "WCAG", "a11y", "accesibilidad", "audit accesible", "contraste", "lector pantalla".
- Pantalla, componente o flujo en revisión final.
- Pre-release de un cliente o cualquier proyecto con compliance de accesibilidad.

## Nivel de cumplimiento
- **Default: AA**.
- AAA cuando la BU lo solicite explícitamente y sea viable sin sacrificar otros criterios.

## Estructura del audit

```markdown
## WCAG 2.2 Audit — [Componente / pantalla]

**Versión revisada:** [URL / archivo / commit]
**Fecha audit:** [DD-MM-YYYY]
**Auditor:** el usuario
**Nivel objetivo:** AA
**Herramientas usadas:** [axe DevTools / Lighthouse / WAVE / lector pantalla X]

### Resumen ejecutivo
- 🟢 Cumple: X criterios
- 🟡 Parcial: Y criterios
- 🔴 No cumple: Z criterios
- ⚪ N/A: W criterios

**Bloqueadores release:** [lista de criterios A/AA no cumplidos]
```

## Checklist completo WCAG 2.2 AA

### Principio 1 — Perceptible

```markdown
**1.1 Alternativas textuales**
- [ ] 1.1.1 Contenido no textual (A) — toda imagen, ícono, gráfico tiene alt apropiado

**1.2 Multimedia (si aplica)**
- [ ] 1.2.1 Solo audio / solo video (A)
- [ ] 1.2.2 Subtítulos (A)
- [ ] 1.2.3 Audiodescripción o transcripción (A)
- [ ] 1.2.4 Subtítulos en vivo (AA)
- [ ] 1.2.5 Audiodescripción (AA)

**1.3 Adaptable**
- [ ] 1.3.1 Info y relaciones (A) — semántica HTML correcta, ARIA cuando necesario
- [ ] 1.3.2 Secuencia significativa (A) — orden DOM coherente con orden visual
- [ ] 1.3.3 Características sensoriales (A) — no depender solo de forma/color/sonido
- [ ] 1.3.4 Orientación (AA) — funciona en portrait y landscape
- [ ] 1.3.5 Identificar propósito del input (AA) — autocomplete attribute

**1.4 Distinguible**
- [ ] 1.4.1 Uso del color (A) — info no depende solo de color
- [ ] 1.4.2 Control de audio (A)
- [ ] 1.4.3 Contraste mínimo (AA) — texto ≥4.5:1, texto grande ≥3:1
- [ ] 1.4.4 Redimensionar texto (AA) — 200% sin pérdida funcional
- [ ] 1.4.5 Imágenes de texto (AA) — usar texto real
- [ ] 1.4.10 Reflujo (AA) — sin scroll horizontal a 320px ancho
- [ ] 1.4.11 Contraste no textual (AA) — UI components y gráficos ≥3:1
- [ ] 1.4.12 Espaciado de texto (AA) — ajustable sin romper layout
- [ ] 1.4.13 Contenido en hover/focus (AA) — descartable, hover persistente, no oculta contenido
```

### Principio 2 — Operable

```markdown
**2.1 Accesible por teclado**
- [ ] 2.1.1 Teclado (A) — toda funcionalidad disponible por teclado
- [ ] 2.1.2 Sin trampa para teclado (A)
- [ ] 2.1.4 Atajos de teclado (A) — desactivables o reasignables

**2.2 Tiempo suficiente**
- [ ] 2.2.1 Ajustable (A) — usuario puede extender / desactivar timeouts
- [ ] 2.2.2 Pausar/detener/ocultar (A) — para movimiento >5s

**2.3 Convulsiones**
- [ ] 2.3.1 Tres destellos o menos (A)

**2.4 Navegable**
- [ ] 2.4.1 Saltar bloques (A) — skip link
- [ ] 2.4.2 Título de página (A)
- [ ] 2.4.3 Orden de foco (A) — coherente con flujo lógico
- [ ] 2.4.4 Propósito del enlace (A) — claro por contexto
- [ ] 2.4.5 Múltiples vías (AA) — nav, search, breadcrumb
- [ ] 2.4.6 Encabezados y etiquetas (AA) — descriptivos
- [ ] 2.4.7 Foco visible (AA) — indicador claro
- [ ] 2.4.11 Foco no oscurecido mínimo (AA) — WCAG 2.2 nuevo
- [ ] 2.4.12 Foco no oscurecido mejorado (AAA)
- [ ] 2.4.13 Apariencia del foco (AAA)

**2.5 Modalidades de entrada**
- [ ] 2.5.1 Gestos del puntero (A) — alternativas single-pointer
- [ ] 2.5.2 Cancelación del puntero (A) — abort/undo posible
- [ ] 2.5.3 Etiqueta en el nombre (A) — visible label == accessible name
- [ ] 2.5.4 Activación por movimiento (A) — alternativa disponible
- [ ] 2.5.7 Movimientos de arrastre (AA) — WCAG 2.2 nuevo · alternativa sin drag
- [ ] 2.5.8 Tamaño del objetivo mínimo (AA) — WCAG 2.2 nuevo · ≥24×24 CSS px
```

### Principio 3 — Comprensible

```markdown
**3.1 Legible**
- [ ] 3.1.1 Idioma de la página (A) — `lang` attribute
- [ ] 3.1.2 Idioma de las partes (AA) — cambios de idioma marcados

**3.2 Predecible**
- [ ] 3.2.1 En foco (A) — sin cambio de contexto al recibir foco
- [ ] 3.2.2 En entrada (A) — sin cambio de contexto al introducir datos
- [ ] 3.2.3 Navegación coherente (AA)
- [ ] 3.2.4 Identificación coherente (AA)
- [ ] 3.2.6 Ayuda coherente (A) — WCAG 2.2 nuevo · mecanismos de ayuda en mismo lugar relativo

**3.3 Asistencia con entrada de datos**
- [ ] 3.3.1 Identificación del error (A) — mensaje describe el error
- [ ] 3.3.2 Etiquetas o instrucciones (A)
- [ ] 3.3.3 Sugerencia ante error (AA) — cómo corregir
- [ ] 3.3.4 Prevención de errores legales/financieros/datos (AA)
- [ ] 3.3.7 Entrada redundante (A) — WCAG 2.2 nuevo · no pedir info ya provista en mismo proceso
- [ ] 3.3.8 Autenticación accesible mínimo (AA) — WCAG 2.2 nuevo · alternativas a pruebas cognitivas
- [ ] 3.3.9 Autenticación accesible mejorado (AAA)
```

### Principio 4 — Robusto

```markdown
**4.1 Compatible**
- [ ] 4.1.1 Parsing (A) — DEPRECADO en WCAG 2.2 pero validar HTML igual
- [ ] 4.1.2 Nombre, función, valor (A) — ARIA correcto, estados expuestos
- [ ] 4.1.3 Mensajes de estado (AA) — aria-live para feedback
```

## Plan de remediación

Para cada criterio 🔴 o 🟡:

```markdown
### [Criterio X.Y.Z] — [Nombre]

**Hallazgo:** [descripción concreta con selector CSS o screenshot]

**Impacto:**
- Usuarios afectados: [tipo discapacidad]
- Severidad: [crítico / mayor / menor]
- Bloqueador release: [Sí / No]

**Remediación propuesta:**
[código / cambio de diseño / cambio semántico]

**Esfuerzo estimado:** [S/M/L · horas-persona]

**Owner:** [dev / diseño / QA]

**Verificación post-fix:**
- Herramienta: [axe / lector pantalla X / keyboard test]
- Criterio aprobación: [comportamiento esperado verificable]
```

## Reglas duras
1. **Foco visible siempre** — indicador con contraste ≥3:1 contra fondo adyacente.
2. **Tamaño target ≥24×24 px** (WCAG 2.2 SC 2.5.8) — excepciones tasadas (inline, agentes user-controlled).
3. **No drag-only** — siempre alternativa de un solo punto (SC 2.5.7).
4. **Foco no oscurecido** por elementos sticky/modal (SC 2.4.11).
5. **Autenticación accesible** — no exigir resolución de puzzles cognitivos sin alternativa (SC 3.3.8).

## Herramientas recomendadas
- **axe DevTools** (browser extension) — escaneo automatizado.
- **Lighthouse a11y** (Chrome DevTools) — score y issues.
- **WAVE** — análisis visual de estructura.
- **NVDA** (Windows) o **VoiceOver** (Mac) — lectores pantalla.
- **Keyboard only** — desconectar mouse y navegar pantalla completa.
- **Color contrast analyzer** — verificación de contraste.

## Anti-patterns
- ❌ Solo correr axe y dar por hecho que está completo (cubre ~30–40% de criterios).
- ❌ Marcar criterio como cumplido sin verificación manual.
- ❌ "Lo arreglamos en la siguiente release" para bloqueadores A/AA.
- ❌ Suponer que el design system ya cumple todo — auditar igual.
