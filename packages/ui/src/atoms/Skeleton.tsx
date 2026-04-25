import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  radius?: string;
}

export function Skeleton({ width, height, radius, style, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      {...props}
      style={{
        width: width ?? '100%',
        height: height ?? 'var(--vn-space-4)',
        borderRadius: radius ?? 'var(--vn-radius-sm)',
        background: 'var(--vn-border-subtle)',
        backgroundImage:
          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
        backgroundSize: '200% 100%',
        animation: 'vn-shimmer 1.4s ease infinite',
        ...style,
      }}
    >
      <style>{`@keyframes vn-shimmer { to { background-position: -200% 0; } }`}</style>
    </div>
  );
}

export default Skeleton;
