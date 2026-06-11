import React from 'react';

interface SwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
    id?: string;
}
declare function Switch({ checked, defaultChecked, onCheckedChange, disabled, label, id }: SwitchProps): React.JSX.Element;

export { Switch, type SwitchProps, Switch as default };
