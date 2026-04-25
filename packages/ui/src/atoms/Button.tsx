/**
 * @module Button
 * Átomo de botón del sistema de diseño vientonorte.
 * WCAG 2.2 AA — Touch Target (2.5.5), Name Role Value (4.1.2)
 *
 * @example
 * // Uso básico:
 * <Button variant="primary" onClick={handleSave}>Guardar</Button>
 *
 * @example
 * // Estado de carga:
 * <Button variant="primary" loading>Guardando…</Button>
 *
 * @example
 * // Peligroso:
 * <Button variant="danger" size="sm" onClick={handleDelete}>Eliminar</Button>
 *
 * @example
 * // Vanilla JS adapter:
 * const btn = document.querySelector('#my-btn');
 * createButton(btn, { variant: 'primary', loading: true });
 */

import React from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | 'primary' | 'secondary' | 'ghost' | 'danger'
  | 'default' | 'destructive' | 'outline' | 'link'; // shadcn aliases
export type ButtonSize = 'sm' | 'md' | 'lg' | 'default' | 'icon'; // shadcn aliases

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual del botón */
  variant?: ButtonVariant;
  /** Tamaño del botón */
  size?: ButtonSize;
  /** Muestra spinner y bloquea interacción. Establece aria-busy */
  loading?: boolean;
  /** Deshabilita el botón. Establece aria-disabled */
  disabled?: boolean;
  /** Contenido del botón */
  children: React.ReactNode;
}

// ─── Styles via CSS vars ──────────────────────────────────────────────────────

const BASE_STYLES: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--vn-space-2)',
  fontFamily: 'var(--vn-font-ui, Inter, sans-serif)',
  fontWeight: 600,
  borderRadius: 'var(--vn-radius-md, 6px)',
  border: '2px solid transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background 150ms ease, border-color 150ms ease, color 150ms ease, opacity 150ms ease',
  // Touch target mínimo WCAG 2.2 — 2.5.5 Target Size
  minHeight: 'var(--vn-touch-min, 44px)',
  minWidth: 'var(--vn-touch-min, 44px)',
  userSelect: 'none',
  WebkitUserSelect: 'none',
};

const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary:     { background: 'var(--vn-azul-evo, #1A8FDC)', color: 'var(--vn-marfil, #f7f2e7)', borderColor: 'var(--vn-azul-evo, #1A8FDC)' },
  default:     { background: 'var(--vn-azul-evo, #1A8FDC)', color: 'var(--vn-marfil, #f7f2e7)', borderColor: 'var(--vn-azul-evo, #1A8FDC)' },
  secondary:   { background: 'transparent', color: 'var(--vn-azul-evo, #1A8FDC)', borderColor: 'var(--vn-azul-evo, #1A8FDC)' },
  outline:     { background: 'transparent', color: 'var(--vn-azul-evo, #1A8FDC)', borderColor: 'var(--vn-azul-evo, #1A8FDC)' },
  ghost:       { background: 'transparent', color: 'var(--vn-pizarra, #4a5568)', borderColor: 'transparent' },
  link:        { background: 'transparent', color: 'var(--vn-azul-evo, #1A8FDC)', borderColor: 'transparent', textDecoration: 'underline', textUnderlineOffset: '3px' },
  danger:      { background: 'var(--vn-rojo, #E8401C)', color: 'var(--vn-marfil, #f7f2e7)', borderColor: 'var(--vn-rojo, #E8401C)' },
  destructive: { background: 'var(--vn-rojo, #E8401C)', color: 'var(--vn-marfil, #f7f2e7)', borderColor: 'var(--vn-rojo, #E8401C)' },
};

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm:      { padding: 'var(--vn-space-1, 4px) var(--vn-space-3, 12px)', fontSize: 'var(--vn-text-sm, 0.875rem)' },
  md:      { padding: 'var(--vn-space-2, 8px) var(--vn-space-4, 16px)', fontSize: 'var(--vn-text-base, 1rem)' },
  default: { padding: 'var(--vn-space-2, 8px) var(--vn-space-4, 16px)', fontSize: 'var(--vn-text-base, 1rem)' },
  lg:      { padding: 'var(--vn-space-3, 12px) var(--vn-space-6, 24px)', fontSize: 'var(--vn-text-lg, 1.125rem)' },
  icon:    { padding: 0, width: 'var(--vn-touch-min, 44px)', height: 'var(--vn-touch-min, 44px)', fontSize: 'var(--vn-text-base, 1rem)' },
};

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner(): React.JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{
        animation: 'vn-spin 0.75s linear infinite',
      }}
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="25 75"
        strokeDashoffset="0"
      />
      <style>{`@keyframes vn-spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Botón de acción del sistema de diseño vientonorte.
 * Soporta variantes, tamaños, estado de carga y accesibilidad completa.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  style,
  ...props
}: ButtonProps): React.JSX.Element {
  const isDisabled = disabled || loading;

  const computedStyle: React.CSSProperties = {
    ...BASE_STYLES,
    ...VARIANT_STYLES[variant],
    ...SIZE_STYLES[size],
    ...(isDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
    ...style,
  };

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      style={computedStyle}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

// ─── Vanilla JS adapter ───────────────────────────────────────────────────────

export interface ButtonVanillaOptions {
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
}

/**
 * Adapter vanilla JS para proyectos sin React.
 * Aplica los estilos y atributos ARIA a un botón existente en el DOM.
 *
 * @param el - Elemento `<button>` del DOM
 * @param options - Opciones de variante y estado
 *
 * @example
 * const btn = document.querySelector('#save-btn');
 * createButton(btn, { variant: 'primary' });
 *
 * // Poner en loading:
 * createButton(btn, { variant: 'primary', loading: true });
 */
export function createButton(
  el: HTMLElement,
  options: ButtonVanillaOptions = {}
): { setLoading(value: boolean): void; setDisabled(value: boolean): void } {
  const { variant = 'primary', loading = false, disabled = false } = options;

  // Aplicar estilos base
  Object.assign(el.style, BASE_STYLES, VARIANT_STYLES[variant], SIZE_STYLES['md']);

  const update = (opts: ButtonVanillaOptions): void => {
    const isDisabled = (opts.disabled ?? false) || (opts.loading ?? false);
    el.setAttribute('aria-disabled', String(isDisabled));
    el.setAttribute('aria-busy', String(opts.loading ?? false));
    (el as HTMLButtonElement).disabled = isDisabled;
    el.style.opacity = isDisabled ? '0.5' : '1';
    el.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
  };

  update({ loading, disabled });

  return {
    setLoading: (value: boolean) => update({ loading: value, disabled }),
    setDisabled: (value: boolean) => update({ loading, disabled: value }),
  };
}

export default Button;
