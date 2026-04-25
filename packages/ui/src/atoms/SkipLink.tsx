import React from 'react';

export interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
}

export function SkipLink({ href = '#main', children = 'Saltar al contenido principal' }: SkipLinkProps) {
  return (
    <a href={href} className="vn-skip-link">
      {children}
    </a>
  );
}

export default SkipLink;
