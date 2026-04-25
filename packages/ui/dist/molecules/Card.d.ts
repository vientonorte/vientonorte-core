import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
declare function Card({ children, style, ...props }: CardProps): react_jsx_runtime.JSX.Element;
declare function CardHeader({ children, style, ...props }: CardProps): react_jsx_runtime.JSX.Element;
declare function CardTitle({ children, style, ...props }: React.HTMLAttributes<HTMLHeadingElement> & {
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function CardDescription({ children, style, ...props }: React.HTMLAttributes<HTMLParagraphElement> & {
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function CardContent({ children, style, ...props }: CardProps): react_jsx_runtime.JSX.Element;
declare function CardFooter({ children, style, ...props }: CardProps): react_jsx_runtime.JSX.Element;

export { Card, CardContent, CardDescription, CardFooter, CardHeader, type CardProps, CardTitle };
