// src/atoms/Textarea.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Textarea({ label, error, hint, id, style, ...props }) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const errorId = error ? `${inputId}-error` : void 0;
  const hintId = hint ? `${inputId}-hint` : void 0;
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "var(--vn-space-1)" }, children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: inputId, style: { fontFamily: "var(--vn-font-ui)", fontSize: "var(--vn-text-sm)", fontWeight: 500, color: "var(--vn-color-on-surface)" }, children: label }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        id: inputId,
        "aria-invalid": !!error,
        "aria-describedby": [errorId, hintId].filter(Boolean).join(" ") || void 0,
        ...props,
        style: {
          width: "100%",
          minHeight: "96px",
          padding: "var(--vn-space-2) var(--vn-space-3)",
          fontFamily: "var(--vn-font-ui)",
          fontSize: "var(--vn-text-base)",
          color: "var(--vn-color-on-surface)",
          background: "var(--vn-color-surface)",
          border: `1px solid ${error ? "var(--vn-color-accent)" : "var(--vn-border-medium)"}`,
          borderRadius: "var(--vn-radius-md)",
          resize: "vertical",
          outline: "none",
          transition: "border-color var(--vn-duration-fast) var(--vn-ease-out)",
          boxSizing: "border-box",
          ...style
        }
      }
    ),
    hint && !error && /* @__PURE__ */ jsx("p", { id: hintId, style: { margin: 0, fontSize: "var(--vn-text-xs)", color: "var(--vn-color-muted)" }, children: hint }),
    error && /* @__PURE__ */ jsx("p", { id: errorId, role: "alert", style: { margin: 0, fontSize: "var(--vn-text-xs)", color: "var(--vn-color-accent)" }, children: error })
  ] });
}
var Textarea_default = Textarea;
export {
  Textarea,
  Textarea_default as default
};
