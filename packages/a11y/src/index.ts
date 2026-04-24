/**
 * @vientonorte/a11y — Helpers de accesibilidad WCAG 2.2 AA
 *
 * Exports:
 * - useFocusTrap   — React hook + createFocusTrap vanilla
 * - useLiveRegion  — aria-live region dinámico
 * - useAnnouncer   — anunciador de estado simplificado
 * - SkipLink       — componente React de enlace de salto
 * - getFocusableElements / isFocusable — utilidades DOM
 */

export { useFocusTrap, createFocusTrap } from './useFocusTrap';
export type { FocusTrap } from './useFocusTrap';

export { useLiveRegion } from './useLiveRegion';

export { useAnnouncer } from './useAnnouncer';
export type { AnnouncerControls } from './useAnnouncer';

export { SkipLink } from './SkipLink';
export type { SkipLinkProps } from './SkipLink';

export { getFocusableElements, isFocusable } from './focusable';
