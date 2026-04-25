// src/atoms/Input.tsx
import { useId } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var LABEL_STYLES = {
  display: "block",
  fontSize: "var(--vn-text-sm, 0.875rem)",
  fontWeight: 600,
  color: "var(--vn-azul-noche, #0d1b3d)",
  marginBottom: "var(--vn-space-1, 4px)",
  fontFamily: "var(--vn-font-ui, Inter, sans-serif)"
};
var INPUT_BASE_STYLES = {
  display: "block",
  width: "100%",
  padding: "var(--vn-space-2, 8px) var(--vn-space-3, 12px)",
  fontFamily: "var(--vn-font-ui, Inter, sans-serif)",
  fontSize: "var(--vn-text-base, 1rem)",
  color: "var(--vn-azul-noche, #0d1b3d)",
  background: "var(--vn-marfil, #f7f2e7)",
  border: "2px solid var(--vn-pizarra, #4a5568)",
  borderRadius: "var(--vn-radius-md, 6px)",
  minHeight: "var(--vn-touch-min, 44px)",
  boxSizing: "border-box",
  transition: "border-color 150ms ease, box-shadow 150ms ease",
  outline: "none"
};
var INPUT_ERROR_STYLES = {
  borderColor: "var(--vn-rojo, #E8401C)"
};
var HELPER_STYLES = {
  display: "block",
  fontSize: "var(--vn-text-xs, 0.75rem)",
  marginTop: "var(--vn-space-1, 4px)",
  fontFamily: "var(--vn-font-ui, Inter, sans-serif)"
};
function Input({
  label,
  error,
  hint,
  required = false,
  style,
  ...props
}) {
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const errorId = `${baseId}-error`;
  const hintId = `${baseId}-hint`;
  const describedBy = [
    error ? errorId : null,
    hint ? hintId : null
  ].filter(Boolean).join(" ") || void 0;
  const inputStyle = {
    ...INPUT_BASE_STYLES,
    ...error ? INPUT_ERROR_STYLES : {},
    ...style
  };
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxs("label", { htmlFor: inputId, style: LABEL_STYLES, children: [
      label,
      required && /* @__PURE__ */ jsx(
        "span",
        {
          "aria-hidden": "true",
          style: { color: "var(--vn-rojo, #E8401C)", marginLeft: "4px" },
          children: "*"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ...props,
        id: inputId,
        required,
        "aria-required": required,
        "aria-invalid": error ? true : void 0,
        "aria-describedby": describedBy,
        style: inputStyle
      }
    ),
    error && /* @__PURE__ */ jsx(
      "span",
      {
        id: errorId,
        role: "alert",
        style: {
          ...HELPER_STYLES,
          color: "var(--vn-rojo, #E8401C)"
        },
        children: error
      }
    ),
    hint && !error && /* @__PURE__ */ jsx(
      "span",
      {
        id: hintId,
        style: {
          ...HELPER_STYLES,
          color: "var(--vn-pizarra, #4a5568)"
        },
        children: hint
      }
    )
  ] });
}
var Input_default = Input;
export {
  Input,
  Input_default as default
};
