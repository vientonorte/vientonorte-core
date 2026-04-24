/**
 * @module SkipLink
 * Enlace de salto al contenido principal — WCAG 2.2 AA Bypass Blocks (2.4.1)
 *
 * Aparece solo al recibir foco (visible para usuarios de teclado).
 * Usa la clase `.vn-skip-link` que debe definirse en tokens/globals.css.
 */

import React from 'react';

export interface SkipLinkProps {
  /** ID o hash del elemento de destino, p.ej. "#main" o "#contenido-principal" */
  href?: string;
  /** Texto del enlace. Default: "Saltar al contenido principal" */
  label?: string;
}

/**
 * Enlace de salto visible solo al recibir foco.
 * Posicionar como primer elemento del <body> para máxima compatibilidad.
 *
 * @example
 * // En el layout raíz:
 * <SkipLink href="#main" />
 * <header>…</header>
 * <main id="main">…</main>
 *
 * @example
 * // Con label personalizado:
 * <SkipLink href="#nav-principal" label="Saltar al menú" />
 */
export function SkipLink({
  href = '#main',
  label = 'Saltar al contenido principal',
}: SkipLinkProps): React.JSX.Element {
  return (
    <a
      href={href}
      className="vn-skip-link"
      /**
       * Los estilos base deben estar en tokens/globals:
       *
       * .vn-skip-link {
       *   position: absolute;
       *   top: -9999px;
       *   left: 1rem;
       *   z-index: 9999;
       *   padding: var(--vn-space-2) var(--vn-space-4);
       *   background: var(--vn-azul-noche);
       *   color: var(--vn-marfil);
       *   font-weight: 600;
       *   text-decoration: none;
       *   border-radius: var(--vn-radius-sm);
       * }
       * .vn-skip-link:focus {
       *   top: 1rem;
       *   outline: 3px solid var(--vn-azul-evo);
       *   outline-offset: 2px;
       * }
       */
    >
      {label}
    </a>
  );
}

export default SkipLink;
