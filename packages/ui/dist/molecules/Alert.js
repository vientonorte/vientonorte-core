// src/molecules/Alert.tsx
import { jsx } from "react/jsx-runtime";
var VARIANT_STYLES = {
  info: {
    background: "rgba(26, 143, 220, 0.08)",
    borderColor: "var(--vn-color-brand)",
    color: "var(--vn-color-brand-dark)"
  },
  success: {
    background: "rgba(45, 154, 90, 0.08)",
    borderColor: "var(--vn-color-success)",
    color: "var(--vn-color-success)"
  },
  warning: {
    background: "rgba(245, 185, 69, 0.12)",
    borderColor: "var(--vn-color-warning)",
    color: "var(--vn-color-brand-dark)"
  },
  danger: {
    background: "rgba(232, 64, 28, 0.08)",
    borderColor: "var(--vn-color-accent)",
    color: "var(--vn-color-accent)"
  }
};
var ROLE_MAP = {
  info: "status",
  success: "status",
  warning: "alert",
  danger: "alert"
};
function Alert({ variant = "info", children, style, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: ROLE_MAP[variant],
      ...props,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--vn-space-1)",
        borderRadius: "var(--vn-radius-md)",
        border: "1px solid",
        padding: "var(--vn-space-4)",
        fontFamily: "var(--vn-font-ui)",
        ...VARIANT_STYLES[variant],
        ...style
      },
      children
    }
  );
}
function AlertTitle({ children, style, ...props }) {
  return /* @__PURE__ */ jsx(
    "h5",
    {
      ...props,
      style: {
        margin: 0,
        fontSize: "var(--vn-text-sm)",
        fontWeight: 600,
        lineHeight: "var(--vn-leading-tight)",
        ...style
      },
      children
    }
  );
}
function AlertDescription({ children, style, ...props }) {
  return /* @__PURE__ */ jsx(
    "p",
    {
      ...props,
      style: {
        margin: 0,
        fontSize: "var(--vn-text-sm)",
        lineHeight: "var(--vn-leading-normal)",
        opacity: 0.9,
        ...style
      },
      children
    }
  );
}
export {
  Alert,
  AlertDescription,
  AlertTitle
};
