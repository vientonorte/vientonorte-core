import React from 'react';

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};
type TrProps = React.HTMLAttributes<HTMLTableRowElement> & {
    children?: React.ReactNode;
};
type ThProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
    children?: React.ReactNode;
};
type TdProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
    children?: React.ReactNode;
};
declare function Table({ children, style, ...props }: DivProps): React.JSX.Element;
declare function TableHeader({ children, ...props }: DivProps): React.JSX.Element;
declare function TableBody({ children, ...props }: DivProps): React.JSX.Element;
declare function TableRow({ children, style, ...props }: TrProps): React.JSX.Element;
declare function TableHead({ children, style, ...props }: ThProps): React.JSX.Element;
declare function TableCell({ children, style, ...props }: TdProps): React.JSX.Element;

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
