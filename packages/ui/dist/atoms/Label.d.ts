import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    children: React.ReactNode;
}
declare function Label({ required, children, style, ...props }: LabelProps): react_jsx_runtime.JSX.Element;

export { Label, type LabelProps, Label as default };
