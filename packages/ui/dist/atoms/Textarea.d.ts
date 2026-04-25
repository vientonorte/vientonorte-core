import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}
declare function Textarea({ label, error, hint, id, style, ...props }: TextareaProps): react_jsx_runtime.JSX.Element;

export { Textarea, type TextareaProps, Textarea as default };
