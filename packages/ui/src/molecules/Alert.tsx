import React from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  children: React.ReactNode;
}

const VARIANT_STYLES: Record<AlertVariant, React.CSSProperties> = {
  info: {
    background: 'rgba(26, 143, 220, 0.08)',
    borderColor: 'var(--vn-color-brand)',
    color: 'var(--vn-color-brand-dark)',
  },
  success: {
    background: 'rgba(45, 154, 90, 0.08)',
    borderColor: 'var(--vn-color-success)',
    color: 'var(--vn-color-success)',
  },
  warning: {
    background: 'rgba(245, 185, 69, 0.12)',
    borderColor: 'var(--vn-color-warning)',
    color: 'var(--vn-color-brand-dark)',
  },
  danger: {
    background: 'rgba(232, 64, 28, 0.08)',
    borderColor: 'var(--vn-color-accent)',
    color: 'var(--vn-color-accent)',
  },
};

const ROLE_MAP: Record<AlertVariant, string> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  danger: 'alert',
};

export function Alert({ variant = 'info', children, style, ...props }: AlertProps) {
  return (
    <div
      role={ROLE_MAP[variant]}
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--vn-space-1)',
        borderRadius: 'var(--vn-radius-md)',
        border: '1px solid',
        padding: 'var(--vn-space-4)',
        fontFamily: 'var(--vn-font-ui)',
        ...VARIANT_STYLES[variant],
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function AlertTitle({ children, style, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }) {
  return (
    <h5
      {...props}
      style={{
        margin: 0,
        fontSize: 'var(--vn-text-sm)',
        fontWeight: 600,
        lineHeight: 'var(--vn-leading-tight)',
        ...style,
      }}
    >
      {children}
    </h5>
  );
}

export function AlertDescription({ children, style, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { children: React.ReactNode }) {
  return (
    <p
      {...props}
      style={{
        margin: 0,
        fontSize: 'var(--vn-text-sm)',
        lineHeight: 'var(--vn-leading-normal)',
        opacity: 0.9,
        ...style,
      }}
    >
      {children}
    </p>
  );
}
