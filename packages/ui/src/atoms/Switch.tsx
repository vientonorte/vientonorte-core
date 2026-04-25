import React, { useId } from 'react';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  id?: string;
}

export function Switch({ checked, defaultChecked, onCheckedChange, disabled, label, id }: SwitchProps) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isChecked = checked ?? internal;
  const generatedId = useId();
  const switchId = id ?? generatedId;

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--vn-space-2)', cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <button
        role="switch"
        id={switchId}
        aria-checked={isChecked}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={toggle}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          width: 44,
          height: 24,
          borderRadius: 'var(--vn-radius-pill)',
          border: 'none',
          background: isChecked ? 'var(--vn-color-brand)' : 'var(--vn-border-medium)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'background var(--vn-duration-fast) var(--vn-ease-out)',
          outline: 'none',
          padding: 0,
          flexShrink: 0,
        }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
      >
        <span style={{
          position: 'absolute',
          left: isChecked ? 22 : 2,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: 'white',
          boxShadow: 'var(--vn-shadow-sm)',
          transition: 'left var(--vn-duration-fast) var(--vn-ease-spring)',
        }} />
      </button>
      {label && (
        <label htmlFor={switchId} style={{ fontFamily: 'var(--vn-font-ui)', fontSize: 'var(--vn-text-sm)', color: 'var(--vn-color-on-surface)', cursor: disabled ? 'not-allowed' : 'pointer' }}>
          {label}
        </label>
      )}
    </div>
  );
}

export default Switch;
