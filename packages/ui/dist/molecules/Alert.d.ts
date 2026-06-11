import React from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: AlertVariant;
    children: React.ReactNode;
}
declare function Alert({ variant, children, style, ...props }: AlertProps): React.JSX.Element;
declare function AlertTitle({ children, style, ...props }: React.HTMLAttributes<HTMLHeadingElement> & {
    children: React.ReactNode;
}): React.JSX.Element;
declare function AlertDescription({ children, style, ...props }: React.HTMLAttributes<HTMLParagraphElement> & {
    children: React.ReactNode;
}): React.JSX.Element;

export { Alert, AlertDescription, type AlertProps, AlertTitle, type AlertVariant };
