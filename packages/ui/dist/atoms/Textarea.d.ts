import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}
declare function Textarea({ label, error, hint, id, style, ...props }: TextareaProps): React.JSX.Element;

export { Textarea, type TextareaProps, Textarea as default };
