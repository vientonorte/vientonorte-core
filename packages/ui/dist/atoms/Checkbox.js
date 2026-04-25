// src/atoms/Checkbox.tsx
import React, { useId } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Checkbox({ checked, defaultChecked, onCheckedChange, disabled, label, id }) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isChecked = checked ?? internal;
  const generatedId = useId();
  const checkId = id ?? generatedId;
  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setInternal(next);
    onCheckedChange?.(next);
  };
  return /* @__PURE__ */ jsxs("div", { style: { display: "inline-flex", alignItems: "center", gap: "var(--vn-space-2)" }, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        role: "checkbox",
        id: checkId,
        "aria-checked": isChecked,
        disabled,
        onClick: toggle,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        },
        style: {
          width: 20,
          height: 20,
          minWidth: 20,
          borderRadius: "var(--vn-radius-xs)",
          border: `2px solid ${isChecked ? "var(--vn-color-brand)" : "var(--vn-border-medium)"}`,
          background: isChecked ? "var(--vn-color-brand)" : "transparent",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          outline: "none",
          transition: "background var(--vn-duration-fast), border-color var(--vn-duration-fast)",
          flexShrink: 0
        },
        children: isChecked && /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M2 6l3 3 5-5", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
      }
    ),
    label && /* @__PURE__ */ jsx("label", { htmlFor: checkId, style: { fontFamily: "var(--vn-font-ui)", fontSize: "var(--vn-text-sm)", color: "var(--vn-color-on-surface)", cursor: disabled ? "not-allowed" : "pointer" }, children: label })
  ] });
}
var Checkbox_default = Checkbox;
export {
  Checkbox,
  Checkbox_default as default
};
