import React, { useState, useRef, useId } from 'react';

export interface TooltipProviderProps { children: React.ReactNode; }
export interface TooltipProps { children: React.ReactNode; }
export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLSpanElement> { children: React.ReactNode; asChild?: boolean; }
export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; side?: 'top' | 'bottom' | 'left' | 'right'; }

interface TooltipCtx { open: boolean; setOpen: (v: boolean) => void; id: string; }
const TooltipContext = React.createContext<TooltipCtx | null>(null);

export function TooltipProvider({ children }: TooltipProviderProps) { return <>{children}</>; }

export function Tooltip({ children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return <TooltipContext.Provider value={{ open, setOpen, id }}>{children}</TooltipContext.Provider>;
}

export function TooltipTrigger({ children, asChild, ...props }: TooltipTriggerProps) {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) return <span {...props}>{children}</span>;
  return (
    <span
      {...props}
      aria-describedby={ctx.open ? ctx.id : undefined}
      onMouseEnter={() => ctx.setOpen(true)}
      onMouseLeave={() => ctx.setOpen(false)}
      onFocus={() => ctx.setOpen(true)}
      onBlur={() => ctx.setOpen(false)}
      style={{ display: 'inline-flex', ...props.style }}
    >
      {children}
    </span>
  );
}

export function TooltipContent({ children, side = 'top', style, ...props }: TooltipContentProps) {
  const ctx = React.useContext(TooltipContext);
  if (!ctx?.open) return null;

  const POSITION: Record<string, React.CSSProperties> = {
    top:    { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' },
    bottom: { top:    'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' },
    left:   { right:  'calc(100% + 8px)', top:  '50%', transform: 'translateY(-50%)' },
    right:  { left:   'calc(100% + 8px)', top:  '50%', transform: 'translateY(-50%)' },
  };

  return (
    <div
      role="tooltip"
      id={ctx.id}
      {...props}
      style={{
        position: 'absolute',
        ...POSITION[side],
        background: 'var(--vn-color-brand-dark)',
        color: 'var(--vn-primitive-marfil)',
        padding: 'var(--vn-space-1) var(--vn-space-3)',
        borderRadius: 'var(--vn-radius-sm)',
        fontSize: 'var(--vn-text-xs)',
        fontFamily: 'var(--vn-font-ui)',
        whiteSpace: 'nowrap',
        zIndex: 'var(--vn-z-tooltip, 50)' as unknown as number,
        pointerEvents: 'none',
        boxShadow: 'var(--vn-shadow-md)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
