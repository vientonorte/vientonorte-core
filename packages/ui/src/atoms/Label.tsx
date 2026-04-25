import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

export function Label({ required, children, style, ...props }: LabelProps) {
  return (
    <label
      {...props}
      style={{
        display: 'block',
        fontFamily: 'var(--vn-font-ui)',
        fontSize: 'var(--vn-text-sm)',
        fontWeight: 500,
        color: 'var(--vn-color-on-surface)',
        marginBottom: 'var(--vn-space-1)',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
      {required && (
        <span aria-hidden="true" style={{ color: 'var(--vn-color-accent)', marginLeft: 2 }}>
          *
        </span>
      )}
    </label>
  );
}

export default Label;
