import React from 'react';

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    children: React.ReactNode;
}
declare function Badge({ variant, children, style, ...props }: BadgeProps): React.JSX.Element;

export { Badge, type BadgeProps, type BadgeVariant, Badge as default };
