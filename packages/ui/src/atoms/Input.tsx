/**
 * @module Input
 * Átomo de input de texto del sistema de diseño vientonorte.
 * WCAG 2.2 AA — Labels (1.3.1, 1.3.5), Error Identification (3.3.1, 3.3.2)
 *
 * @example
 * // Básico:
 * <Input label="Email" type="email" placeholder="tu@email.com" />
 *
 * @example
 * // Con error:
 * <Input label="Email" type="email" error="Email inválido" required />
 *
 * @example
 * // Con hint:
 * <Input label="Contraseña" type="password" hint="Mínimo 8 caracteres" />
 */

import React, { useId } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  /** Label visible. Siempre asociada al input — nunca omitir */
  label: string;
  /** Mensaje de error. Establece aria-invalid y aria-describedby */
  error?: string;
  /** Texto de ayuda visible bajo el input */
  hint?: string;
  /** Marca el campo como requerido con indicador visual */
  required?: boolean;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const LABEL_STYLES: React.CSSProperties = {
  display: 'block',
  fontSize: 'var(--vn-text-sm, 0.875rem)',
  fontWeight: 600,
  color: 'var(--vn-azul-noche, #0d1b3d)',
  marginBottom: 'var(--vn-space-1, 4px)',
  fontFamily: 'var(--vn-font-ui, Inter, sans-serif)',
};

const INPUT_BASE_STYLES: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: 'var(--vn-space-2, 8px) var(--vn-space-3, 12px)',
  fontFamily: 'var(--vn-font-ui, Inter, sans-serif)',
  fontSize: 'var(--vn-text-base, 1rem)',
  color: 'var(--vn-azul-noche, #0d1b3d)',
  background: 'var(--vn-marfil, #f7f2e7)',
  border: '2px solid var(--vn-pizarra, #4a5568)',
  borderRadius: 'var(--vn-radius-md, 6px)',
  minHeight: 'var(--vn-touch-min, 44px)',
  boxSizing: 'border-box',
  transition: 'border-color 150ms ease, box-shadow 150ms ease',
  outline: 'none',
};

const INPUT_ERROR_STYLES: React.CSSProperties = {
  borderColor: 'var(--vn-rojo, #E8401C)',
};

const HELPER_STYLES: React.CSSProperties = {
  display: 'block',
  fontSize: 'var(--vn-text-xs, 0.75rem)',
  marginTop: 'var(--vn-space-1, 4px)',
  fontFamily: 'var(--vn-font-ui, Inter, sans-serif)',
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Campo de texto accesible del sistema de diseño vientonorte.
 * Genera IDs únicos automáticamente para vincular label, error y hint.
 */
export function Input({
  label,
  error,
  hint,
  required = false,
  style,
  ...props
}: InputProps): React.JSX.Element {
  // useId genera IDs estables y únicos para SSR y cliente
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const errorId = `${baseId}-error`;
  const hintId = `${baseId}-hint`;

  // aria-describedby lista los IDs de error y hint que existen
  const describedBy = [
    error ? errorId : null,
    hint ? hintId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  const inputStyle: React.CSSProperties = {
    ...INPUT_BASE_STYLES,
    ...(error ? INPUT_ERROR_STYLES : {}),
    ...style,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Label siempre visible y asociada via htmlFor */}
      <label htmlFor={inputId} style={LABEL_STYLES}>
        {label}
        {required && (
          <span
            aria-hidden="true"
            style={{ color: 'var(--vn-rojo, #E8401C)', marginLeft: '4px' }}
          >
            *
          </span>
        )}
      </label>

      <input
        {...props}
        id={inputId}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        style={inputStyle}
      />

      {/* Mensaje de error — role="alert" para anuncio inmediato */}
      {error && (
        <span
          id={errorId}
          role="alert"
          style={{
            ...HELPER_STYLES,
            color: 'var(--vn-rojo, #E8401C)',
          }}
        >
          {error}
        </span>
      )}

      {/* Hint — solo informativo */}
      {hint && !error && (
        <span
          id={hintId}
          style={{
            ...HELPER_STYLES,
            color: 'var(--vn-pizarra, #4a5568)',
          }}
        >
          {hint}
        </span>
      )}
    </div>
  );
}

export default Input;
