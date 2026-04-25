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

// src/atoms/Input.tsx
import { useId } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxs2("label", { htmlFor: inputId, style: LABEL_STYLES, children: [
      label,
      required && /* @__PURE__ */ jsx2(
        "span",
        {
          "aria-hidden": "true",
          style: { color: "var(--vn-rojo, #E8401C)", marginLeft: "4px" },
          children: "*"
        }
      )
    ] }),
    /* @__PURE__ */ jsx2(
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
    error && /* @__PURE__ */ jsx2(
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
    hint && !error && /* @__PURE__ */ jsx2(
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

// src/atoms/Badge.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var VARIANT_STYLES2 = {
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
  return /* @__PURE__ */ jsx3(
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
        ...VARIANT_STYLES2[variant],
        ...style
      },
      children
    }
  );
}

// src/atoms/Label.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function Label({ required, children, style, ...props }) {
  return /* @__PURE__ */ jsxs3(
    "label",
    {
      ...props,
      style: {
        display: "block",
        fontFamily: "var(--vn-font-ui)",
        fontSize: "var(--vn-text-sm)",
        fontWeight: 500,
        color: "var(--vn-color-on-surface)",
        marginBottom: "var(--vn-space-1)",
        cursor: "pointer",
        ...style
      },
      children: [
        children,
        required && /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", style: { color: "var(--vn-color-accent)", marginLeft: 2 }, children: "*" })
      ]
    }
  );
}

// src/atoms/Skeleton.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function Skeleton({ width, height, radius, style, ...props }) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      "aria-hidden": "true",
      ...props,
      style: {
        width: width ?? "100%",
        height: height ?? "var(--vn-space-4)",
        borderRadius: radius ?? "var(--vn-radius-sm)",
        background: "var(--vn-border-subtle)",
        backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        animation: "vn-shimmer 1.4s ease infinite",
        ...style
      },
      children: /* @__PURE__ */ jsx5("style", { children: `@keyframes vn-shimmer { to { background-position: -200% 0; } }` })
    }
  );
}

// src/atoms/SkipLink.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
function SkipLink({ href = "#main", children = "Saltar al contenido principal" }) {
  return /* @__PURE__ */ jsx6("a", { href, className: "vn-skip-link", children });
}

// src/molecules/Card.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
function Card({ children, style, ...props }) {
  return /* @__PURE__ */ jsx7(
    "div",
    {
      ...props,
      style: {
        background: "var(--vn-color-surface)",
        borderRadius: "var(--vn-radius-lg)",
        border: "1px solid var(--vn-border-subtle)",
        boxShadow: "var(--vn-shadow-sm)",
        overflow: "hidden",
        ...style
      },
      children
    }
  );
}
function CardHeader({ children, style, ...props }) {
  return /* @__PURE__ */ jsx7(
    "div",
    {
      ...props,
      style: {
        padding: "var(--vn-space-6)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--vn-space-1)",
        ...style
      },
      children
    }
  );
}
function CardTitle({ children, style, ...props }) {
  return /* @__PURE__ */ jsx7(
    "h3",
    {
      ...props,
      style: {
        fontFamily: "var(--vn-font-display)",
        fontSize: "var(--vn-text-xl)",
        fontWeight: 700,
        color: "var(--vn-color-on-surface)",
        margin: 0,
        lineHeight: "var(--vn-leading-tight)",
        ...style
      },
      children
    }
  );
}
function CardDescription({ children, style, ...props }) {
  return /* @__PURE__ */ jsx7(
    "p",
    {
      ...props,
      style: {
        fontFamily: "var(--vn-font-ui)",
        fontSize: "var(--vn-text-sm)",
        color: "var(--vn-color-muted)",
        margin: 0,
        lineHeight: "var(--vn-leading-normal)",
        ...style
      },
      children
    }
  );
}
function CardContent({ children, style, ...props }) {
  return /* @__PURE__ */ jsx7(
    "div",
    {
      ...props,
      style: {
        padding: "var(--vn-space-6)",
        paddingTop: 0,
        ...style
      },
      children
    }
  );
}
function CardFooter({ children, style, ...props }) {
  return /* @__PURE__ */ jsx7(
    "div",
    {
      ...props,
      style: {
        padding: "var(--vn-space-6)",
        paddingTop: 0,
        display: "flex",
        alignItems: "center",
        gap: "var(--vn-space-3)",
        ...style
      },
      children
    }
  );
}

// src/molecules/Alert.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
var VARIANT_STYLES3 = {
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
  return /* @__PURE__ */ jsx8(
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
        ...VARIANT_STYLES3[variant],
        ...style
      },
      children
    }
  );
}
function AlertTitle({ children, style, ...props }) {
  return /* @__PURE__ */ jsx8(
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
  return /* @__PURE__ */ jsx8(
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

// src/molecules/Tabs.tsx
import { createContext, useContext, useState, useId as useId2 } from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
var TabsContext = createContext(null);
function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs subcomponents must be used inside <Tabs>");
  return ctx;
}
function Tabs({ defaultValue, value, onValueChange, children, style, ...props }) {
  const [internal, setInternal] = useState(defaultValue);
  const active = value ?? internal;
  const baseId = useId2();
  const setActive = (v) => {
    setInternal(v);
    onValueChange?.(v);
  };
  return /* @__PURE__ */ jsx9(TabsContext.Provider, { value: { active, setActive, baseId }, children: /* @__PURE__ */ jsx9("div", { ...props, style: { display: "flex", flexDirection: "column", gap: 0, ...style }, children }) });
}
function TabsList({ children, style, ...props }) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      role: "tablist",
      ...props,
      style: {
        display: "flex",
        gap: "var(--vn-space-1)",
        borderBottom: "1px solid var(--vn-border-subtle)",
        marginBottom: "var(--vn-space-4)",
        overflowX: "auto",
        ...style
      },
      children
    }
  );
}
function TabsTrigger({ value, children, style, ...props }) {
  const { active, setActive, baseId } = useTabsContext();
  const isActive = active === value;
  return /* @__PURE__ */ jsx9(
    "button",
    {
      role: "tab",
      "aria-selected": isActive,
      "aria-controls": `${baseId}-panel-${value}`,
      id: `${baseId}-tab-${value}`,
      tabIndex: isActive ? 0 : -1,
      onClick: () => setActive(value),
      ...props,
      style: {
        display: "inline-flex",
        alignItems: "center",
        padding: "var(--vn-space-2) var(--vn-space-4)",
        fontFamily: "var(--vn-font-ui)",
        fontSize: "var(--vn-text-sm)",
        fontWeight: isActive ? 600 : 400,
        color: isActive ? "var(--vn-color-brand)" : "var(--vn-color-muted)",
        background: "transparent",
        border: "none",
        borderBottom: isActive ? "2px solid var(--vn-color-brand)" : "2px solid transparent",
        cursor: "pointer",
        whiteSpace: "nowrap",
        minHeight: "var(--vn-touch-min)",
        transition: "color var(--vn-duration-fast) var(--vn-ease-out)",
        outline: "none",
        ...style
      },
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") setActive(value);
        props.onKeyDown?.(e);
      },
      children
    }
  );
}
function TabsContent({ value, children, style, ...props }) {
  const { active, baseId } = useTabsContext();
  const isActive = active === value;
  return /* @__PURE__ */ jsx9(
    "div",
    {
      role: "tabpanel",
      id: `${baseId}-panel-${value}`,
      "aria-labelledby": `${baseId}-tab-${value}`,
      hidden: !isActive,
      tabIndex: 0,
      ...props,
      style: { outline: "none", ...style },
      children: isActive ? children : null
    }
  );
}

// src/molecules/Dialog.tsx
import { useRef, useEffect, useId as useId3, useCallback } from "react";
import { jsx as jsx10, jsxs as jsxs4 } from "react/jsx-runtime";
function getFocusable(el) {
  return Array.from(
    el.querySelectorAll(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
    )
  ).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true");
}
function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const prev = document.activeElement;
    getFocusable(ref.current)[0]?.focus();
    const onKey = (e) => {
      if (e.key !== "Tab" || !ref.current) return;
      const els = getFocusable(ref.current);
      if (!els.length) {
        e.preventDefault();
        return;
      }
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [active, ref]);
}
var OVERLAY_STYLES = {
  position: "fixed",
  inset: 0,
  background: "rgba(13, 27, 61, 0.7)",
  // --vn-azul-noche con alpha
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "var(--vn-z-modal, 1000)",
  padding: "var(--vn-space-4, 16px)",
  backdropFilter: "blur(2px)",
  WebkitBackdropFilter: "blur(2px)"
};
var DIALOG_STYLES = {
  background: "var(--vn-marfil, #f7f2e7)",
  borderRadius: "var(--vn-radius-lg, 12px)",
  padding: "var(--vn-space-6, 24px)",
  width: "100%",
  maxWidth: "480px",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: "0 20px 60px rgba(13, 27, 61, 0.4)",
  position: "relative",
  fontFamily: "var(--vn-font-ui, Inter, sans-serif)"
};
var TITLE_STYLES = {
  margin: "0 0 var(--vn-space-2, 8px)",
  fontSize: "var(--vn-text-xl, 1.25rem)",
  fontFamily: 'var(--vn-font-display, "DM Serif Display", serif)',
  color: "var(--vn-azul-noche, #0d1b3d)",
  fontWeight: 700
};
var DESCRIPTION_STYLES = {
  margin: "0 0 var(--vn-space-4, 16px)",
  fontSize: "var(--vn-text-base, 1rem)",
  color: "var(--vn-pizarra, #4a5568)",
  lineHeight: 1.5
};
var CLOSE_BTN_STYLES = {
  position: "absolute",
  top: "var(--vn-space-4, 16px)",
  right: "var(--vn-space-4, 16px)",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "var(--vn-space-1, 4px)",
  borderRadius: "var(--vn-radius-sm, 4px)",
  color: "var(--vn-pizarra, #4a5568)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "var(--vn-touch-min, 44px)",
  minHeight: "var(--vn-touch-min, 44px)"
};
var ACTIONS_STYLES = {
  display: "flex",
  gap: "var(--vn-space-3, 12px)",
  marginTop: "var(--vn-space-4, 16px)",
  flexWrap: "wrap",
  justifyContent: "flex-end"
};
function Dialog({
  open,
  onClose,
  title,
  description,
  children
}) {
  const dialogRef = useRef(null);
  const baseId = useId3();
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;
  useFocusTrap(dialogRef, open);
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, handleKeyDown]);
  if (!open) return null;
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  return /* @__PURE__ */ jsx10(
    "div",
    {
      style: OVERLAY_STYLES,
      onClick: handleOverlayClick,
      "aria-hidden": false,
      children: /* @__PURE__ */ jsxs4(
        "div",
        {
          ref: dialogRef,
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": titleId,
          "aria-describedby": description ? descId : void 0,
          style: DIALOG_STYLES,
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsx10(
              "button",
              {
                type: "button",
                onClick: onClose,
                "aria-label": "Cerrar di\xE1logo",
                style: CLOSE_BTN_STYLES,
                children: /* @__PURE__ */ jsx10("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx10(
                  "path",
                  {
                    d: "M15 5L5 15M5 5l10 10",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                  }
                ) })
              }
            ),
            /* @__PURE__ */ jsx10("h2", { id: titleId, style: TITLE_STYLES, children: title }),
            description && /* @__PURE__ */ jsx10("p", { id: descId, style: DESCRIPTION_STYLES, children: description }),
            children && /* @__PURE__ */ jsx10("div", { style: ACTIONS_STYLES, children })
          ]
        }
      )
    }
  );
}
export {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  Input,
  Label,
  Skeleton,
  SkipLink,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  createButton
};
