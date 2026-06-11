import React from 'react';

interface TooltipProviderProps {
    children: React.ReactNode;
}
interface TooltipProps {
    children: React.ReactNode;
}
interface TooltipTriggerProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    asChild?: boolean;
}
interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    side?: 'top' | 'bottom' | 'left' | 'right';
}
declare function TooltipProvider({ children }: TooltipProviderProps): React.JSX.Element;
declare function Tooltip({ children }: TooltipProps): React.JSX.Element;
declare function TooltipTrigger({ children, asChild, ...props }: TooltipTriggerProps): React.JSX.Element;
declare function TooltipContent({ children, side, style, ...props }: TooltipContentProps): React.JSX.Element | null;

export { Tooltip, TooltipContent, type TooltipContentProps, type TooltipProps, TooltipProvider, type TooltipProviderProps, TooltipTrigger, type TooltipTriggerProps };
