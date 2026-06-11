import React from 'react';

interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
    id?: string;
}
declare function Checkbox({ checked, defaultChecked, onCheckedChange, disabled, label, id }: CheckboxProps): React.JSX.Element;

export { Checkbox, type CheckboxProps, Checkbox as default };
