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

import React, { useRef, useEffect, useId, useCallback } from 'react';
import { useFocusTrap } from '@vientonorte/a11y';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DialogProps {
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

// ─── Styles ──────────────────────────────────────────────────────────────────

const OVERLAY_STYLES: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(13, 27, 61, 0.7)', // --vn-azul-noche con alpha
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 'var(--vn-z-modal, 1000)' as unknown as number,
  padding: 'var(--vn-space-4, 16px)',
  backdropFilter: 'blur(2px)',
  WebkitBackdropFilter: 'blur(2px)',
};

const DIALOG_STYLES: React.CSSProperties = {
  background: 'var(--vn-marfil, #f7f2e7)',
  borderRadius: 'var(--vn-radius-lg, 12px)',
  padding: 'var(--vn-space-6, 24px)',
  width: '100%',
  maxWidth: '480px',
  maxHeight: '90vh',
  overflowY: 'auto',
  boxShadow: '0 20px 60px rgba(13, 27, 61, 0.4)',
  position: 'relative',
  fontFamily: 'var(--vn-font-ui, Inter, sans-serif)',
};

const TITLE_STYLES: React.CSSProperties = {
  margin: '0 0 var(--vn-space-2, 8px)',
  fontSize: 'var(--vn-text-xl, 1.25rem)',
  fontFamily: 'var(--vn-font-display, "DM Serif Display", serif)',
  color: 'var(--vn-azul-noche, #0d1b3d)',
  fontWeight: 700,
};

const DESCRIPTION_STYLES: React.CSSProperties = {
  margin: '0 0 var(--vn-space-4, 16px)',
  fontSize: 'var(--vn-text-base, 1rem)',
  color: 'var(--vn-pizarra, #4a5568)',
  lineHeight: 1.5,
};

const CLOSE_BTN_STYLES: React.CSSProperties = {
  position: 'absolute',
  top: 'var(--vn-space-4, 16px)',
  right: 'var(--vn-space-4, 16px)',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 'var(--vn-space-1, 4px)',
  borderRadius: 'var(--vn-radius-sm, 4px)',
  color: 'var(--vn-pizarra, #4a5568)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 'var(--vn-touch-min, 44px)',
  minHeight: 'var(--vn-touch-min, 44px)',
};

const ACTIONS_STYLES: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--vn-space-3, 12px)',
  marginTop: 'var(--vn-space-4, 16px)',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Dialog modal accesible del sistema de diseño vientonorte.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
}: DialogProps): React.JSX.Element | null {
  const dialogRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;

  // Focus trap activo cuando el dialog está abierto
  useFocusTrap(dialogRef, open);

  // Cerrar con Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    // Prevenir scroll del body mientras el dialog está abierto
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  // Click en overlay cierra el dialog (no propagado si click es en el panel)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      style={OVERLAY_STYLES}
      onClick={handleOverlayClick}
      // aria-hidden en overlay para que SR enfoque el dialog
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        style={DIALOG_STYLES}
        // Prevenir que el click en el panel cierre el overlay
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar diálogo"
          style={CLOSE_BTN_STYLES}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M15 5L5 15M5 5l10 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Título */}
        <h2 id={titleId} style={TITLE_STYLES}>
          {title}
        </h2>

        {/* Descripción */}
        {description && (
          <p id={descId} style={DESCRIPTION_STYLES}>
            {description}
          </p>
        )}

        {/* Contenido y acciones */}
        {children && <div style={ACTIONS_STYLES}>{children}</div>}
      </div>
    </div>
  );
}

export default Dialog;
