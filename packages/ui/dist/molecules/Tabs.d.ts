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
declare function Tabs({ defaultValue, value, onValueChange, children, style, ...props }: TabsProps): React.JSX.Element;
declare function TabsList({ children, style, ...props }: TabsListProps): React.JSX.Element;
declare function TabsTrigger({ value, children, style, ...props }: TabsTriggerProps): React.JSX.Element;
declare function TabsContent({ value, children, style, ...props }: TabsContentProps): React.JSX.Element;

export { Tabs, TabsContent, type TabsContentProps, TabsList, type TabsListProps, type TabsProps, TabsTrigger, type TabsTriggerProps };
