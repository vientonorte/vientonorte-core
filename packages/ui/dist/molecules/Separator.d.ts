import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
    orientation?: 'horizontal' | 'vertical';
}
declare function Separator({ orientation, style, ...props }: SeparatorProps): react_jsx_runtime.JSX.Element;

export { Separator, type SeparatorProps, Separator as default };
