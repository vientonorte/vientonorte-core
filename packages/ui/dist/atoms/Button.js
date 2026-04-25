// src/atoms/Button.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var BASE_STYLES = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--vn-space-2)",
  fontFamily: "var(--vn-font-ui, Inter, sans-serif)",
  fontWeight: 600,
  borderRadius: "var(--vn-radius-md, 6px)",
  border: "2px solid transparent",
  cursor: "pointer",
  textDecoration: "none",
  transition: "background 150ms ease, border-color 150ms ease, color 150ms ease, opacity 150ms ease",
  // Touch target mínimo WCAG 2.2 — 2.5.5 Target Size
  minHeight: "var(--vn-touch-min, 44px)",
  minWidth: "var(--vn-touch-min, 44px)",
  userSelect: "none",
  WebkitUserSelect: "none"
};
var VARIANT_STYLES = {
  primary: {
    background: "var(--vn-azul-evo, #1A8FDC)",
    color: "var(--vn-marfil, #f7f2e7)",
    borderColor: "var(--vn-azul-evo, #1A8FDC)"
  },
  secondary: {
    background: "transparent",
    color: "var(--vn-azul-evo, #1A8FDC)",
    borderColor: "var(--vn-azul-evo, #1A8FDC)"
  },
  ghost: {
    background: "transparent",
    color: "var(--vn-pizarra, #4a5568)",
    borderColor: "transparent"
  },
  danger: {
    background: "var(--vn-rojo, #E8401C)",
    color: "var(--vn-marfil, #f7f2e7)",
    borderColor: "var(--vn-rojo, #E8401C)"
  }
};
var SIZE_STYLES = {
  sm: {
    padding: "var(--vn-space-1, 4px) var(--vn-space-3, 12px)",
    fontSize: "var(--vn-text-sm, 0.875rem)"
  },
  md: {
    padding: "var(--vn-space-2, 8px) var(--vn-space-4, 16px)",
    fontSize: "var(--vn-text-base, 1rem)"
  },
  lg: {
    padding: "var(--vn-space-3, 12px) var(--vn-space-6, 24px)",
    fontSize: "var(--vn-text-lg, 1.125rem)"
  }
};
function Spinner() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": "true",
      style: {
        animation: "vn-spin 0.75s linear infinite"
      },
      children: [
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: "8",
            cy: "8",
            r: "6",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeDasharray: "25 75",
            strokeDashoffset: "0"
          }
        ),
        /* @__PURE__ */ jsx("style", { children: `@keyframes vn-spin { to { transform: rotate(360deg); } }` })
      ]
    }
  );
}
function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  children,
  style,
  ...props
}) {
  const isDisabled = disabled || loading;
  const computedStyle = {
    ...BASE_STYLES,
    ...VARIANT_STYLES[variant],
    ...SIZE_STYLES[size],
    ...isDisabled ? { opacity: 0.5, cursor: "not-allowed" } : {},
    ...style
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ...props,
      disabled: isDisabled,
      "aria-disabled": isDisabled,
      "aria-busy": loading,
      style: computedStyle,
      children: [
        loading && /* @__PURE__ */ jsx(Spinner, {}),
        children
      ]
    }
  );
}
function createButton(el, options = {}) {
  const { variant = "primary", loading = false, disabled = false } = options;
  Object.assign(el.style, BASE_STYLES, VARIANT_STYLES[variant], SIZE_STYLES["md"]);
  const update = (opts) => {
    const isDisabled = (opts.disabled ?? false) || (opts.loading ?? false);
    el.setAttribute("aria-disabled", String(isDisabled));
    el.setAttribute("aria-busy", String(opts.loading ?? false));
    el.disabled = isDisabled;
    el.style.opacity = isDisabled ? "0.5" : "1";
    el.style.cursor = isDisabled ? "not-allowed" : "pointer";
  };
  update({ loading, disabled });
  return {
    setLoading: (value) => update({ loading: value, disabled }),
    setDisabled: (value) => update({ loading, disabled: value })
  };
}
var Button_default = Button;
export {
  Button,
  createButton,
  Button_default as default
};
