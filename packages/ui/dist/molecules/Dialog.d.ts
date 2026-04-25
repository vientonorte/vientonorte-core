import React from 'react';

/**
 * @module Dialog
 * Molécula de dialog modal del sistema de diseño vientonorte.
 * WCAG 2.2 AA — Dialog (ARIA), Focus Management (2.4.3), Name Role Value (4.1.2)
 *
 * Implementa:
 * - role="dialog" + aria-modal
 * - aria-labelledby (título) + aria-describedby (descripción)
 * - Focus trap al abrir (via @vientonorte/a11y useFocusTrap)
 * - Retorno de foco al elemento que abrió el dialog al cerrar
 * - Cierre con tecla Escape
 * - Cierre al hacer click en el overlay
 *
 * @example
 * const [open, setOpen] = useState(false);
 *
 * <button onClick={() => setOpen(true)}>Abrir</button>
 * <Dialog
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirmar acción"
 *   description="Esta acción no se puede deshacer."
 * >
 *   <Button variant="danger" onClick={handleConfirm}>Confirmar</Button>
 *   <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
 * </Dialog>
 */

interface DialogProps {
    /** Controla la visibilidad del dialog */
    open: boolean;
    /** Callback al cerrar (Escape, overlay click, botón X) */
    onClose: () => void;
    /** Título del dialog — siempre requerido para a11y */
    title: string;
    /** Descripción breve del propósito del dialog */
    description?: string;
    /** Contenido (botones de acción, formularios, etc.) */
    children?: React.ReactNode;
}
/**
 * Dialog modal accesible del sistema de diseño vientonorte.
 */
declare function Dialog({ open, onClose, title, description, children, }: DialogProps): React.JSX.Element | null;

export { Dialog, type DialogProps, Dialog as default };
