import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface SelectProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (v: string) => void;
    disabled?: boolean;
    children: React.ReactNode;
}
interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}
interface SelectValueProps {
    placeholder?: string;
}
interface SelectContentProps {
    children: React.ReactNode;
}
interface SelectItemProps {
    value: string;
    children: React.ReactNode;
}
declare function Select({ value: controlled, defaultValue, onValueChange, disabled, children }: SelectProps): react_jsx_runtime.JSX.Element;
declare function SelectTrigger({ children, style, ...props }: SelectTriggerProps): react_jsx_runtime.JSX.Element;
declare function SelectValue({ placeholder }: SelectValueProps): react_jsx_runtime.JSX.Element;
declare function SelectContent({ children }: SelectContentProps): react_jsx_runtime.JSX.Element | null;
declare function SelectItem({ value, children }: SelectItemProps): react_jsx_runtime.JSX.Element;

export { Select, SelectContent, type SelectContentProps, SelectItem, type SelectItemProps, type SelectProps, SelectTrigger, type SelectTriggerProps, SelectValue, type SelectValueProps };
