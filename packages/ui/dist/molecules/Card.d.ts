import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
declare function Card({ children, style, ...props }: CardProps): React.JSX.Element;
declare function CardHeader({ children, style, ...props }: CardProps): React.JSX.Element;
declare function CardTitle({ children, style, ...props }: React.HTMLAttributes<HTMLHeadingElement> & {
    children: React.ReactNode;
}): React.JSX.Element;
declare function CardDescription({ children, style, ...props }: React.HTMLAttributes<HTMLParagraphElement> & {
    children: React.ReactNode;
}): React.JSX.Element;
declare function CardContent({ children, style, ...props }: CardProps): React.JSX.Element;
declare function CardFooter({ children, style, ...props }: CardProps): React.JSX.Element;

export { Card, CardContent, CardDescription, CardFooter, CardHeader, type CardProps, CardTitle };
