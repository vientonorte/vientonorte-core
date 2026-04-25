import * as react_jsx_runtime from 'react/jsx-runtime';
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
declare function Table({ children, style, ...props }: DivProps): react_jsx_runtime.JSX.Element;
declare function TableHeader({ children, ...props }: DivProps): react_jsx_runtime.JSX.Element;
declare function TableBody({ children, ...props }: DivProps): react_jsx_runtime.JSX.Element;
declare function TableRow({ children, style, ...props }: TrProps): react_jsx_runtime.JSX.Element;
declare function TableHead({ children, style, ...props }: ThProps): react_jsx_runtime.JSX.Element;
declare function TableCell({ children, style, ...props }: TdProps): react_jsx_runtime.JSX.Element;

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
