import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultValue: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
}
interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    children: React.ReactNode;
}
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    children: React.ReactNode;
}
declare function Tabs({ defaultValue, value, onValueChange, children, style, ...props }: TabsProps): react_jsx_runtime.JSX.Element;
declare function TabsList({ children, style, ...props }: TabsListProps): react_jsx_runtime.JSX.Element;
declare function TabsTrigger({ value, children, style, ...props }: TabsTriggerProps): react_jsx_runtime.JSX.Element;
declare function TabsContent({ value, children, style, ...props }: TabsContentProps): react_jsx_runtime.JSX.Element;

export { Tabs, TabsContent, type TabsContentProps, TabsList, type TabsListProps, type TabsProps, TabsTrigger, type TabsTriggerProps };
