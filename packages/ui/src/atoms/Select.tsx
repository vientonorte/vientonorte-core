import React, { createContext, useContext, useState, useRef, useId } from 'react';

interface SelectCtx { value: string; onChange: (v: string) => void; open: boolean; setOpen: (v: boolean) => void; triggerId: string; }
const Ctx = createContext<SelectCtx | null>(null);
const useCtx = () => { const c = useContext(Ctx); if (!c) throw new Error('Select context'); return c; };

export interface SelectProps { value?: string; defaultValue?: string; onValueChange?: (v: string) => void; disabled?: boolean; children: React.ReactNode; }
export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { children: React.ReactNode; }
export interface SelectValueProps { placeholder?: string; }
export interface SelectContentProps { children: React.ReactNode; }
export interface SelectItemProps { value: string; children: React.ReactNode; }

export function Select({ value: controlled, defaultValue = '', onValueChange, disabled, children }: SelectProps) {
  const [internal, setInternal] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const value = controlled ?? internal;
  const triggerId = useId();
  const onChange = (v: string) => { setInternal(v); onValueChange?.(v); setOpen(false); };
  return (
    <Ctx.Provider value={{ value, onChange, open, setOpen, triggerId }}>
      <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>{children}</div>
    </Ctx.Provider>
  );
}

export function SelectTrigger({ children, style, ...props }: SelectTriggerProps) {
  const { open, setOpen, triggerId } = useCtx();
  return (
    <button
      id={triggerId}
      aria-haspopup="listbox"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      {...props}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', padding: 'var(--vn-space-2) var(--vn-space-3)',
        fontFamily: 'var(--vn-font-ui)', fontSize: 'var(--vn-text-base)',
        color: 'var(--vn-color-on-surface)', background: 'var(--vn-color-surface)',
        border: '1px solid var(--vn-border-medium)', borderRadius: 'var(--vn-radius-md)',
        cursor: 'pointer', minHeight: 'var(--vn-touch-min)', outline: 'none', ...style,
      }}
    >
      {children}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }}>
        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function SelectValue({ placeholder = 'Seleccionar…' }: SelectValueProps) {
  const { value } = useCtx();
  return <span style={{ color: value ? 'inherit' : 'var(--vn-color-muted)' }}>{value || placeholder}</span>;
}

export function SelectContent({ children }: SelectContentProps) {
  const { open, triggerId } = useCtx();
  if (!open) return null;
  return (
    <ul
      role="listbox"
      aria-labelledby={triggerId}
      style={{
        position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
        background: 'var(--vn-color-surface)', border: '1px solid var(--vn-border-medium)',
        borderRadius: 'var(--vn-radius-md)', boxShadow: 'var(--vn-shadow-md)',
        zIndex: 'var(--vn-z-dropdown)' as unknown as number,
        listStyle: 'none', margin: 0, padding: 'var(--vn-space-1)', maxHeight: 240, overflowY: 'auto',
      }}
    >
      {children}
    </ul>
  );
}

export function SelectItem({ value, children }: SelectItemProps) {
  const { value: selected, onChange } = useCtx();
  const isSelected = selected === value;
  return (
    <li
      role="option"
      aria-selected={isSelected}
      onClick={() => onChange(value)}
      style={{
        padding: 'var(--vn-space-2) var(--vn-space-3)', borderRadius: 'var(--vn-radius-sm)',
        cursor: 'pointer', fontFamily: 'var(--vn-font-ui)', fontSize: 'var(--vn-text-sm)',
        color: isSelected ? 'var(--vn-color-brand)' : 'var(--vn-color-on-surface)',
        background: isSelected ? 'rgba(26,143,220,0.08)' : 'transparent',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(26,143,220,0.06)')}
      onMouseLeave={e => (e.currentTarget.style.background = isSelected ? 'rgba(26,143,220,0.08)' : 'transparent')}
    >
      {children}
    </li>
  );
}
