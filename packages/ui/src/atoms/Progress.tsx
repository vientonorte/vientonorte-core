import React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

export function Progress({ value = 0, max = 100, style, ...props }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...props}
      style={{
        width: '100%',
        height: 8,
        background: 'var(--vn-border-subtle)',
        borderRadius: 'var(--vn-radius-pill)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{
        height: '100%',
        width: `${pct}%`,
        background: 'var(--vn-color-brand)',
        borderRadius: 'var(--vn-radius-pill)',
        transition: 'width var(--vn-duration-base) var(--vn-ease-out)',
      }} />
    </div>
  );
}

export default Progress;
