import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, style, ...props }: CardProps) {
  return (
    <div
      {...props}
      style={{
        background: 'var(--vn-color-surface)',
        borderRadius: 'var(--vn-radius-lg)',
        border: '1px solid var(--vn-border-subtle)',
        boxShadow: 'var(--vn-shadow-sm)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, style, ...props }: CardProps) {
  return (
    <div
      {...props}
      style={{
        padding: 'var(--vn-space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--vn-space-1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, style, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }) {
  return (
    <h3
      {...props}
      style={{
        fontFamily: 'var(--vn-font-display)',
        fontSize: 'var(--vn-text-xl)',
        fontWeight: 700,
        color: 'var(--vn-color-on-surface)',
        margin: 0,
        lineHeight: 'var(--vn-leading-tight)',
        ...style,
      }}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, style, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { children: React.ReactNode }) {
  return (
    <p
      {...props}
      style={{
        fontFamily: 'var(--vn-font-ui)',
        fontSize: 'var(--vn-text-sm)',
        color: 'var(--vn-color-muted)',
        margin: 0,
        lineHeight: 'var(--vn-leading-normal)',
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, style, ...props }: CardProps) {
  return (
    <div
      {...props}
      style={{
        padding: 'var(--vn-space-6)',
        paddingTop: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, style, ...props }: CardProps) {
  return (
    <div
      {...props}
      style={{
        padding: 'var(--vn-space-6)',
        paddingTop: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--vn-space-3)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
