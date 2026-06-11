import React from 'react';

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
    orientation?: 'horizontal' | 'vertical';
}
declare function Separator({ orientation, style, ...props }: SeparatorProps): React.JSX.Element;

export { Separator, type SeparatorProps, Separator as default };
