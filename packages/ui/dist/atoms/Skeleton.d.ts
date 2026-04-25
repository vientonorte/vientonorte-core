import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string | number;
    height?: string | number;
    radius?: string;
}
declare function Skeleton({ width, height, radius, style, ...props }: SkeletonProps): react_jsx_runtime.JSX.Element;

export { Skeleton, type SkeletonProps, Skeleton as default };
