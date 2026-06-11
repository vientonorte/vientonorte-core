import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    children: React.ReactNode;
}
declare function Label({ required, children, style, ...props }: LabelProps): React.JSX.Element;

export { Label, type LabelProps, Label as default };
