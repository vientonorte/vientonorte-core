import React from 'react';

interface AlertDialogProps {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (v: boolean) => void;
}
declare function AlertDialog({ children, open: controlledOpen, onOpenChange }: AlertDialogProps): React.JSX.Element;
interface AlertDialogTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
}
declare function AlertDialogTrigger({ children }: AlertDialogTriggerProps): React.JSX.Element;
interface AlertDialogContentProps {
    children: React.ReactNode;
}
declare function AlertDialogContent({ children }: AlertDialogContentProps): React.JSX.Element;
declare function AlertDialogHeader({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
}): React.JSX.Element;
declare function AlertDialogTitle({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement> & {
    children: React.ReactNode;
}): React.JSX.Element;
declare function AlertDialogDescription({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & {
    children: React.ReactNode;
}): React.JSX.Element;
declare function AlertDialogAction({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
}): React.JSX.Element;
declare function AlertDialogFooter({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
}): React.JSX.Element;
declare function AlertDialogCancel({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
}): React.JSX.Element;

export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, type AlertDialogContentProps, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, type AlertDialogProps, AlertDialogTitle, AlertDialogTrigger, type AlertDialogTriggerProps };
