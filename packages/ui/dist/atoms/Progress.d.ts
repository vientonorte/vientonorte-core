import React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
}
declare function Progress({ value, max, style, ...props }: ProgressProps): React.JSX.Element;

export { Progress, type ProgressProps, Progress as default };
