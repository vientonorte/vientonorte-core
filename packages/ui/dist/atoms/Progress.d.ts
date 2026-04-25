import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
}
declare function Progress({ value, max, style, ...props }: ProgressProps): react_jsx_runtime.JSX.Element;

export { Progress, type ProgressProps, Progress as default };
