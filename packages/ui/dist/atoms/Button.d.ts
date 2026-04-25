import React from 'react';

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

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
/**
 * Botón de acción del sistema de diseño vientonorte.
 * Soporta variantes, tamaños, estado de carga y accesibilidad completa.
 */
declare function Button({ variant, size, loading, disabled, children, style, ...props }: ButtonProps): React.JSX.Element;
interface ButtonVanillaOptions {
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
declare function createButton(el: HTMLElement, options?: ButtonVanillaOptions): {
    setLoading(value: boolean): void;
    setDisabled(value: boolean): void;
};

export { Button, type ButtonProps, type ButtonSize, type ButtonVanillaOptions, type ButtonVariant, createButton, Button as default };
