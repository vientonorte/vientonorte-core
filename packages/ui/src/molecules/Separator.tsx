import React from 'react';

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

export function Separator({ orientation = 'horizontal', style, ...props }: SeparatorProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      {...props}
      style={{
        border: 'none',
        background: 'var(--vn-border-subtle)',
        ...(orientation === 'horizontal'
          ? { width: '100%', height: 1, margin: 'var(--vn-space-4) 0' }
          : { width: 1, height: '100%', margin: '0 var(--vn-space-4)', display: 'inline-block' }),
        ...style,
      }}
    />
  );
}

export default Separator;
