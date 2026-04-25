import React from 'react';

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

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
    /** Label visible. Siempre asociada al input — nunca omitir */
    label: string;
    /** Mensaje de error. Establece aria-invalid y aria-describedby */
    error?: string;
    /** Texto de ayuda visible bajo el input */
    hint?: string;
    /** Marca el campo como requerido con indicador visual */
    required?: boolean;
}
/**
 * Campo de texto accesible del sistema de diseño vientonorte.
 * Genera IDs únicos automáticamente para vincular label, error y hint.
 */
declare function Input({ label, error, hint, required, style, ...props }: InputProps): React.JSX.Element;

export { Input, type InputProps, Input as default };
