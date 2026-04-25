import * as react_jsx_runtime from 'react/jsx-runtime';
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
declare function TooltipProvider({ children }: TooltipProviderProps): react_jsx_runtime.JSX.Element;
declare function Tooltip({ children }: TooltipProps): react_jsx_runtime.JSX.Element;
declare function TooltipTrigger({ children, asChild, ...props }: TooltipTriggerProps): react_jsx_runtime.JSX.Element;
declare function TooltipContent({ children, side, style, ...props }: TooltipContentProps): react_jsx_runtime.JSX.Element | null;

export { Tooltip, TooltipContent, type TooltipContentProps, type TooltipProps, TooltipProvider, type TooltipProviderProps, TooltipTrigger, type TooltipTriggerProps };
