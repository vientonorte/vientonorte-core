import * as react_jsx_runtime from 'react/jsx-runtime';

interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
    id?: string;
}
declare function Checkbox({ checked, defaultChecked, onCheckedChange, disabled, label, id }: CheckboxProps): react_jsx_runtime.JSX.Element;

export { Checkbox, type CheckboxProps, Checkbox as default };
