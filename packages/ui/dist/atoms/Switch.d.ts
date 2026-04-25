import * as react_jsx_runtime from 'react/jsx-runtime';

interface SwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
    id?: string;
}
declare function Switch({ checked, defaultChecked, onCheckedChange, disabled, label, id }: SwitchProps): react_jsx_runtime.JSX.Element;

export { Switch, type SwitchProps, Switch as default };
