# ADR 0002 — GitHub Packages (privado) como registry

**Estado:** Aceptado
**Fecha:** 2026-04-23
**Autores:** Rodrigo Gaete Gaona, Claude Code

---

## Contexto

Los paquetes del core necesitan ser consumidos por los proyectos LIVE del colectivo. Se necesita decidir dónde publicarlos.

## Decisión

Publicar en **GitHub Packages** con `access: restricted` bajo el scope `@vientonorte`.

Configuración en cada `package.json`:
```json
"publishConfig": {
  "registry": "https://npm.pkg.github.com",
  "access": "restricted"
}
```

Consumidores necesitan `.npmrc` en la raíz del proyecto:
```
@vientonorte:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Durante la Fase 1 (piloto), los tokens se consumen como archivo local copiado hasta que el paquete se publique.

## Alternativas descartadas

**A) npm público**: expone la estructura interna del colectivo. No todos los proyectos son open-source por defecto. El código de cliente SURA referenciado en los tokens o en el security package podría filtrarse.

**B) npm privado (cuenta de pago)**: costo adicional innecesario; GitHub Packages es gratis para repos de la organización `vientonorte`.

**C) Git submodules**: válido para el monorepo, pero complica la CI de cada proyecto consumidor (requiere acceso SSH al submodule).

## Consecuencias

✅ Código privado dentro del ecosistema GitHub (mismo lugar que los repos).
✅ CI de GitHub Actions tiene acceso automático via `GITHUB_TOKEN`.
✅ Gratis para repos privados de la org.
⚠️ Consumidores externos al colectivo necesitan un PAT con permisos `read:packages`.
⚠️ Durante la migración (Fases 1-2), los paquetes se consume como path local hasta publicación.
