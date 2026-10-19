---
name: lead-a11y-vn
description: >
  Pipeline freemium accesibilidad Viento Norte: lead free a11y → Gmail label/draft,
  Drive carpeta entregable, Calendar hold, Tasks P0. Orquesta conectores Google.
  Use when: lead gratis a11y, freemium pipeline, Transvip-style deliverable handoff,
  /lead-a11y-vn, or "pipeline free a11y".
---

# Lead free a11y · pipeline Google

Padre: `/vn-agent`. Paths/live/APIs: `~/.grok/skills/vn-agent/references/canon.md`.

Canon del PDF automaciones (P2 comercial). Leads viven en KV (`contact.vientonorte.io`) y se ven en `#/admin`. Ley 21.719: no inventar retención; ser honesto sobre qué se guarda.

## Flujo (idempotente)

```
Form `https://vientonorte.io/servicios/#revision-gratis` primero (sitio + nombre + tel + mail + consentimiento)
  → Worker persiste lead (KV · `#/admin`)
  → Informe WCAG 2.2 AA de UN flujo (no heurístico pago)
  → Calendar ≥48 h (Appointment; humano: min lead time en Google)
  → Cita = walkthrough del informe + venta Herramientas Digitales
  → Gmail: label Lead/A11y + draft (NO send automático)
  → Drive: VN-Entregables/A11y-Gratis/{fecha}-{Cliente}/
  → Tasks: hallazgo P0 listo antes de la call
```

## Prefill producto

- Intent: consulting
- Mensaje: revisión gratis de accesibilidad de un flujo (WCAG 2.2 AA)
- **Nunca** mandar a `/#/auditoria` mentoría

## Gmail

1. Asegurar labels: `VN/Lead-A11y`, `VN/Followup-48h`
2. Draft (no send) con:
   - Subject: `Revisión gratis de accesibilidad · {Cliente}`
   - Body: agenda 15–30 min + qué necesitas (URL/flujo) + `https://vientonorte.io/servicios/#revision-gratis`
3. Si el lead llegó por mail, aplicar label `VN/Lead-A11y`

## Drive

1. Carpeta raíz: `VN-Entregables`
2. Sub: `A11y-Gratis`
3. Por cliente: `{YYYY-MM-DD}-{Cliente}`
4. Nombre PDF: `VN-A11y-Gratis-{Cliente}-{fecha}.pdf`
5. Plantilla comercial: copiar desde Desktop o `docs/entregables/` del portafolio

## Calendar

- Evento: `VN · revisión a11y · {Cliente}`
- Duración: 30 min · slot **≥48 h** después del form (informe listo)
- Descripción: link Drive + checklist P0 WCAG
- `send_updates: none` salvo que Rö pida invitar cliente
- No abrir Calendar desde el CTA gratis **antes** del form

## Tasks (Grok scheduled)

- Prompt de cierre: verificar draft enviado, PDF en Drive, follow-up 48 h

## Output

```markdown
## Lead a11y pipeline
- Cliente:
- Gmail draft id / label:
- Drive folder link:
- Calendar event:
- Task:
- Next: human send draft + call
```

## Slash

`/lead-a11y-vn` — montar pipeline para un lead concreto (nombre + email + URL).
