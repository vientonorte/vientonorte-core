import React, { createContext, useContext, useState, useId } from 'react';

// ─── Context ─────────────────────────────────────────────────────────────────

interface TabsCtx {
  active: string;
  setActive: (v: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsCtx | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs subcomponents must be used inside <Tabs>');
  return ctx;
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

// ─── Components ──────────────────────────────────────────────────────────────

export function Tabs({ defaultValue, value, onValueChange, children, style, ...props }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const active = value ?? internal;
  const baseId = useId();

  const setActive = (v: string) => {
    setInternal(v);
    onValueChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ active, setActive, baseId }}>
      <div {...props} style={{ display: 'flex', flexDirection: 'column', gap: 0, ...style }}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, style, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      {...props}
      style={{
        display: 'flex',
        gap: 'var(--vn-space-1)',
        borderBottom: '1px solid var(--vn-border-subtle)',
        marginBottom: 'var(--vn-space-4)',
        overflowX: 'auto',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, style, ...props }: TabsTriggerProps) {
  const { active, setActive, baseId } = useTabsContext();
  const isActive = active === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      id={`${baseId}-tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActive(value)}
      {...props}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: 'var(--vn-space-2) var(--vn-space-4)',
        fontFamily: 'var(--vn-font-ui)',
        fontSize: 'var(--vn-text-sm)',
        fontWeight: isActive ? 600 : 400,
        color: isActive ? 'var(--vn-color-brand)' : 'var(--vn-color-muted)',
        background: 'transparent',
        border: 'none',
        borderBottom: isActive ? '2px solid var(--vn-color-brand)' : '2px solid transparent',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        minHeight: 'var(--vn-touch-min)',
        transition: 'color var(--vn-duration-fast) var(--vn-ease-out)',
        outline: 'none',
        ...style,
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setActive(value);
        props.onKeyDown?.(e);
      }}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, style, ...props }: TabsContentProps) {
  const { active, baseId } = useTabsContext();
  const isActive = active === value;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={!isActive}
      tabIndex={0}
      {...props}
      style={{ outline: 'none', ...style }}
    >
      {isActive ? children : null}
    </div>
  );
}
