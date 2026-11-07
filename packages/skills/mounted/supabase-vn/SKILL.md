---
name: supabase-vn
description: 'Use when working with Viento Norte''s Supabase (org vientonorte): checking connected apps / OAuth grants, listing projects, or running safe read-only queries.'
---
# Supabase · Viento Norte

## Reglas
- Nunca imprimir, pegar ni guardar keys (anon, service_role, JWT secret, DB password, access tokens). Referirlas por nombre de variable.
- Solo lectura por defecto. Cualquier escritura (INSERT/UPDATE/DELETE, DDL, migraciones, RLS, revocar apps, rotar keys, borrar proyectos) requiere OK explícito del usuario en el chat.
- No exponer PII de clientes/leads fuera de Supabase; reportar conteos, no filas.

## Apps conectadas / OAuth grants
1. Dashboard: Organization settings → OAuth Apps / Authorized apps (`https://supabase.com/dashboard/org/<org-slug>/apps`).
2. Listar app, fecha de autorización y scopes. Comparar con apps conocidas (ej. «Grok», autorizada por el usuario el 14-oct-2026).
3. App desconocida → avisar al usuario con nombre, fecha y scopes; no revocar sin su OK.

## Proyectos
- CLI: `supabase projects list` (requiere login ya hecho; no crear tokens nuevos). O Dashboard → org → Projects.
- Reportar: nombre, ref, región, estado (active/paused).

## Consultas seguras (read-only)
- Usar SQL editor o `psql` con rol de solo lectura; envolver en `BEGIN READ ONLY; … ROLLBACK;`.
- Ejemplos: `select count(*) from <tabla>;`, inventario `select table_schema, table_name from information_schema.tables where table_schema='public';`, RLS `select tablename, rowsecurity from pg_tables where schemaname='public';`.
- Siempre `limit`; nunca `select *` sobre tablas con datos personales.

## Cuándo preguntar al usuario
- Antes de cualquier escritura, cambio de permisos, revocar/autorizar apps, pausar/restaurar proyectos, o gastos (plan/billing).
- Si aparece una app, miembro o key que no reconocés.
