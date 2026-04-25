import React, { createContext, useContext, useState } from 'react';
import { Dialog } from './Dialog';

interface AlertDialogCtx { open: boolean; setOpen: (v: boolean) => void; }
const Ctx = createContext<AlertDialogCtx | null>(null);
const useCtx = () => { const c = useContext(Ctx); if (!c) throw new Error('AlertDialog context missing'); return c; };

export interface AlertDialogProps { children: React.ReactNode; open?: boolean; onOpenChange?: (v: boolean) => void; }
export function AlertDialog({ children, open: controlledOpen, onOpenChange }: AlertDialogProps) {
  const [internal, setInternal] = useState(false);
  const open = controlledOpen ?? internal;
  const setOpen = (v: boolean) => { setInternal(v); onOpenChange?.(v); };
  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>;
}

export interface AlertDialogTriggerProps { children: React.ReactNode; asChild?: boolean; }
export function AlertDialogTrigger({ children }: AlertDialogTriggerProps) {
  const { setOpen } = useCtx();
  return <span onClick={() => setOpen(true)} style={{ display: 'contents' }}>{children}</span>;
}

export interface AlertDialogContentProps { children: React.ReactNode; }
export function AlertDialogContent({ children }: AlertDialogContentProps) {
  const { open, setOpen } = useCtx();
  return <Dialog open={open} onClose={() => setOpen(false)} title="" description="">{children}</Dialog>;
}

export function AlertDialogHeader({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return <div {...props} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--vn-space-2)', marginBottom: 'var(--vn-space-4)' }}>{children}</div>;
}
export function AlertDialogTitle({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }) {
  return <h2 {...props} style={{ margin: 0, fontFamily: 'var(--vn-font-display)', fontSize: 'var(--vn-text-xl)', fontWeight: 700, color: 'var(--vn-color-on-surface)' }}>{children}</h2>;
}
export function AlertDialogDescription({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { children: React.ReactNode }) {
  return <p {...props} style={{ margin: 0, fontSize: 'var(--vn-text-sm)', color: 'var(--vn-color-muted)' }}>{children}</p>;
}
export function AlertDialogAction({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  const { setOpen } = useCtx();
  return <button {...props} onClick={(e) => { setOpen(false); props.onClick?.(e); }} style={{ display: 'inline-flex', alignItems: 'center', padding: 'var(--vn-space-2) var(--vn-space-4)', background: 'var(--vn-color-brand)', color: 'var(--vn-primitive-marfil)', border: 'none', borderRadius: 'var(--vn-radius-md)', fontFamily: 'var(--vn-font-ui)', fontWeight: 600, cursor: 'pointer', minHeight: 'var(--vn-touch-min)', ...props.style }}>{children}</button>;
}
export function AlertDialogFooter({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return <div {...props} style={{ display: 'flex', gap: 'var(--vn-space-3)', justifyContent: 'flex-end', marginTop: 'var(--vn-space-4)', ...props.style }}>{children}</div>;
}
export function AlertDialogCancel({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  const { setOpen } = useCtx();
  return <button {...props} onClick={(e) => { setOpen(false); props.onClick?.(e); }} style={{ display: 'inline-flex', alignItems: 'center', padding: 'var(--vn-space-2) var(--vn-space-4)', background: 'transparent', color: 'var(--vn-color-muted)', border: '1px solid var(--vn-border-medium)', borderRadius: 'var(--vn-radius-md)', fontFamily: 'var(--vn-font-ui)', fontWeight: 500, cursor: 'pointer', minHeight: 'var(--vn-touch-min)', ...props.style }}>{children}</button>;
}
