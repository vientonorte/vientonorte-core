import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, id, style, ...props }: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--vn-space-1)' }}>
      {label && (
        <label htmlFor={inputId} style={{ fontFamily: 'var(--vn-font-ui)', fontSize: 'var(--vn-text-sm)', fontWeight: 500, color: 'var(--vn-color-on-surface)' }}>
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
        {...props}
        style={{
          width: '100%',
          minHeight: '96px',
          padding: 'var(--vn-space-2) var(--vn-space-3)',
          fontFamily: 'var(--vn-font-ui)',
          fontSize: 'var(--vn-text-base)',
          color: 'var(--vn-color-on-surface)',
          background: 'var(--vn-color-surface)',
          border: `1px solid ${error ? 'var(--vn-color-accent)' : 'var(--vn-border-medium)'}`,
          borderRadius: 'var(--vn-radius-md)',
          resize: 'vertical',
          outline: 'none',
          transition: 'border-color var(--vn-duration-fast) var(--vn-ease-out)',
          boxSizing: 'border-box',
          ...style,
        }}
      />
      {hint && !error && <p id={hintId} style={{ margin: 0, fontSize: 'var(--vn-text-xs)', color: 'var(--vn-color-muted)' }}>{hint}</p>}
      {error && <p id={errorId} role="alert" style={{ margin: 0, fontSize: 'var(--vn-text-xs)', color: 'var(--vn-color-accent)' }}>{error}</p>}
    </div>
  );
}

export default Textarea;
