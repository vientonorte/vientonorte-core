---
name: design-sprint-vn
description: >
  Marco de trabajo Design Sprint (GV) para Viento Norte / Rö + Grok.
  Carga el ciclo activo, fuerza Map→Sketch→Decide→Prototype→Test,
  prohíbe saltar a GA/features sin storyboard, y cierra con DoD de Test.
  Use when: design sprint, DS VN, "marco design sprint", /design-sprint-vn,
  o el usuario pide trabajar con Design Sprint en vez de Scrum/ticket caótico.
---

# Design Sprint VN · skill

Padre: `/vn-agent`. Paths/live: `~/.grok/skills/vn-agent/references/canon.md`.

## Canon (leer siempre)

1. Vault **Ro**: `…/Ro/Viento Norte/Resources/Design Sprint VN - marco de trabajo.md`
2. Sprint activo: `…/Sprints/DS-*.md` con `status: active` (verificar en vault; no asumir fecha)

## Al invocar

1. **Anunciar el día:** Map | Sketch | Decide | Prototype | Test  
2. **Leer** long-term goal + sprint questions del DS activo  
3. **Solo** trabajo que responde una sprint question  
4. Si el usuario pide features fuera del storyboard → parking lot + preguntar si re-Map  
5. Ciclo completo orquestado (LLM + MCP, no reimplementar): `/workflow vn-design-ops`  

```text
/workflow vn-design-ops {"surface":"https://vientonorte.io/servicios/","day":"full"}
```

`day`: `map` · `sketch` · `decide` · `prototype` · `test` · `full`. Prototype solo con `apply=true` tras Decider.  

## Reglas duras

| Día | Hacer | No hacer |
|-----|--------|----------|
| Map | Goal, questions, journey, HMW | Codear la solución “obvia” |
| Sketch | 2–4 opciones en tabla | Implementar las 4 |
| Decide | 1 apuesta + storyboard | Dual CTAs sin Decider |
| Prototype | Build del storyboard | GA, Ads, refactor cosmético extra |
| Test | Criterios pass/fail + smoke + **Informes Google** | Declarar done solo en local |

**GA / Tag Manager / SEM / IG spend:** solo si el DS es de instrumentación **o** el Test del embudo ya pasó. Hasta entonces: $0. Producto UI interno (QA) = `/#/consultoria`. Final URL paid = `https://vientonorte.io/servicios/` (+UTM); no usar `/s/`, `/#/` ni `/servicios/<slug>/` en salida a clientes. Orgánico = `/servicios/*`. IA de sitio completo (`/industrias` `/blog` `/recursos` + Ads) **fuera de storyboard** → parking + ¿re-Map? **No 301** `/servicios/*` live. **No** `/consultoria/` HTTP. WCAG en copy = **2.2 AA**. Lead magnet PDF no entra a Prototype sin `codeá`.

## Informes Google (Día Test)

Al cerrar Test (o al pedir “informes Google”), leer UI/curl/sheet y escribir snapshot en el `DS-*.md` + `Sprints/Informes Google YYYY-MM-DD.md`. Sin CPC ni rankings inventados.

| Informe | Qué anotar |
|---------|------------|
| GA4 Tiempo real | `page_view` · `book_call` · `generate_lead` · eventos clave |
| GA4 Admin Eventos | estrellas; no marcar `page_view`/`scroll`/`session_start`/`first_visit`/`purchase` |
| Etiqueta de Google | cobertura `/servicios/` (GTM-PM5LBQRP, sin `G-` suelto) |
| Search Console | sitemap enviado · clics/imp. (sheet si hay) |
| PageSpeed | lab vs CrUX; solo si la sprint question es perf |

Último snapshot: vault `Sprints/Informes Google 2026-08-16.md`.

## Roles

- **Decider:** Rö  
- **Facilitator + Maker:** este agente  
- Ship prod: solo con ok del Decider tras Test  

## Outputs

- Actualizar el `DS-*.md` (día, resultados Test, learnings)  
- Código en workdir canon: iCloud `Documents/GitHub/mi-portafolio`  
- Log día: Sessions vía `/cierre-sesion-vn` al cerrar  
- Cierre de día + Session: `/cierre-vn-hoy`  
- Tras Test: `/workflow vn-improve` (facts `$`/MCP) antes del cierre. Nunca wrangler en el workflow.  

## Formato de respuesta al usuario

```markdown
## DS · [nombre] · Día [N] [Map|…]
**Sprint question de hoy:** …
**Hoy hacemos:** …
**No hacemos:** … (parking)
```

## Slash

`/design-sprint-vn` — entrar en el marco y retomar el DS activo.
