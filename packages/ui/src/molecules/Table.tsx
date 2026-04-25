import React from 'react';

type DivProps = React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode };
type TrProps  = React.HTMLAttributes<HTMLTableRowElement> & { children?: React.ReactNode };
type ThProps  = React.ThHTMLAttributes<HTMLTableCellElement> & { children?: React.ReactNode };
type TdProps  = React.TdHTMLAttributes<HTMLTableCellElement> & { children?: React.ReactNode };

export function Table({ children, style, ...props }: DivProps) {
  return (
    <div style={{ width: '100%', overflowX: 'auto', ...style }}>
      <table {...props} style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--vn-font-ui)', fontSize: 'var(--vn-text-sm)' }}>
        {children}
      </table>
    </div>
  );
}
export function TableHeader({ children, ...props }: DivProps) { return <thead {...props}>{children}</thead>; }
export function TableBody({ children, ...props }: DivProps)   { return <tbody {...props}>{children}</tbody>; }
export function TableRow({ children, style, ...props }: TrProps) {
  return <tr {...props} style={{ borderBottom: '1px solid var(--vn-border-subtle)', ...style }}>{children}</tr>;
}
export function TableHead({ children, style, ...props }: ThProps) {
  return <th {...props} style={{ padding: 'var(--vn-space-3) var(--vn-space-4)', textAlign: 'left', fontWeight: 600, color: 'var(--vn-color-muted)', whiteSpace: 'nowrap', ...style }}>{children}</th>;
}
export function TableCell({ children, style, ...props }: TdProps) {
  return <td {...props} style={{ padding: 'var(--vn-space-3) var(--vn-space-4)', color: 'var(--vn-color-on-surface)', verticalAlign: 'middle', ...style }}>{children}</td>;
}
