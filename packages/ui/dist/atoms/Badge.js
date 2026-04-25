// src/atoms/Badge.tsx
import { jsx } from "react/jsx-runtime";
var VARIANT_STYLES = {
  default: {
    background: "var(--vn-color-brand)",
    color: "var(--vn-primitive-marfil)"
  },
  secondary: {
    background: "var(--vn-color-brand-dark)",
    color: "var(--vn-primitive-marfil)"
  },
  success: {
    background: "var(--vn-color-success)",
    color: "var(--vn-primitive-marfil)"
  },
  warning: {
    background: "var(--vn-color-warning)",
    color: "var(--vn-color-brand-dark)"
  },
  danger: {
    background: "var(--vn-color-accent)",
    color: "var(--vn-primitive-marfil)"
  },
  outline: {
    background: "transparent",
    color: "var(--vn-color-brand)",
    border: "1px solid var(--vn-color-brand)"
  }
};
function Badge({ variant = "default", children, style, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      ...props,
      style: {
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "var(--vn-radius-pill)",
        padding: "2px var(--vn-space-3)",
        fontSize: "var(--vn-text-xs)",
        fontFamily: "var(--vn-font-ui)",
        fontWeight: 600,
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        ...VARIANT_STYLES[variant],
        ...style
      },
      children
    }
  );
}
var Badge_default = Badge;
export {
  Badge,
  Badge_default as default
};
