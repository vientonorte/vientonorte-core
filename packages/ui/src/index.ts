/**
 * @vientonorte/ui — Componentes UI del colectivo vientonorte
 * Atomic Design: atoms → molecules → organisms
 *
 * Atoms:
 * - Button    — variantes primary/secondary/ghost/danger, tamaños sm/md/lg, loading/disabled
 * - Input     — label, error, hint, required con a11y completa
 * - SkipLink  — re-export de @vientonorte/a11y
 *
 * Molecules:
 * - Dialog    — modal accesible con focus trap, Escape, overlay click
 */

// Atoms
export { Button, createButton } from './atoms/Button';
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonVanillaOptions } from './atoms/Button';

export { Input } from './atoms/Input';
export type { InputProps } from './atoms/Input';

export { SkipLink } from './atoms/SkipLink';
export type { SkipLinkProps } from './atoms/SkipLink';

// Molecules
export { Dialog } from './molecules/Dialog';
export type { DialogProps } from './molecules/Dialog';
