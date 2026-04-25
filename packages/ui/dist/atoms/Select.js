// src/atoms/Select.tsx
import { createContext, useContext, useState, useId } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Ctx = createContext(null);
var useCtx = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("Select context");
  return c;
};
function Select({ value: controlled, defaultValue = "", onValueChange, disabled, children }) {
  const [internal, setInternal] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const value = controlled ?? internal;
  const triggerId = useId();
  const onChange = (v) => {
    setInternal(v);
    onValueChange?.(v);
    setOpen(false);
  };
  return /* @__PURE__ */ jsx(Ctx.Provider, { value: { value, onChange, open, setOpen, triggerId }, children: /* @__PURE__ */ jsx("div", { style: { position: "relative", display: "inline-block", width: "100%" }, children }) });
}
function SelectTrigger({ children, style, ...props }) {
  const { open, setOpen, triggerId } = useCtx();
  return /* @__PURE__ */ jsxs(
    "button",
    {
      id: triggerId,
      "aria-haspopup": "listbox",
      "aria-expanded": open,
      onClick: () => setOpen(!open),
      ...props,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "var(--vn-space-2) var(--vn-space-3)",
        fontFamily: "var(--vn-font-ui)",
        fontSize: "var(--vn-text-base)",
        color: "var(--vn-color-on-surface)",
        background: "var(--vn-color-surface)",
        border: "1px solid var(--vn-border-medium)",
        borderRadius: "var(--vn-radius-md)",
        cursor: "pointer",
        minHeight: "var(--vn-touch-min)",
        outline: "none",
        ...style
      },
      children: [
        children,
        /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", style: { transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms" }, children: /* @__PURE__ */ jsx("path", { d: "M2 4l4 4 4-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
      ]
    }
  );
}
function SelectValue({ placeholder = "Seleccionar\u2026" }) {
  const { value } = useCtx();
  return /* @__PURE__ */ jsx("span", { style: { color: value ? "inherit" : "var(--vn-color-muted)" }, children: value || placeholder });
}
function SelectContent({ children }) {
  const { open, triggerId } = useCtx();
  if (!open) return null;
  return /* @__PURE__ */ jsx(
    "ul",
    {
      role: "listbox",
      "aria-labelledby": triggerId,
      style: {
        position: "absolute",
        top: "calc(100% + 4px)",
        left: 0,
        right: 0,
        background: "var(--vn-color-surface)",
        border: "1px solid var(--vn-border-medium)",
        borderRadius: "var(--vn-radius-md)",
        boxShadow: "var(--vn-shadow-md)",
        zIndex: "var(--vn-z-dropdown)",
        listStyle: "none",
        margin: 0,
        padding: "var(--vn-space-1)",
        maxHeight: 240,
        overflowY: "auto"
      },
      children
    }
  );
}
function SelectItem({ value, children }) {
  const { value: selected, onChange } = useCtx();
  const isSelected = selected === value;
  return /* @__PURE__ */ jsx(
    "li",
    {
      role: "option",
      "aria-selected": isSelected,
      onClick: () => onChange(value),
      style: {
        padding: "var(--vn-space-2) var(--vn-space-3)",
        borderRadius: "var(--vn-radius-sm)",
        cursor: "pointer",
        fontFamily: "var(--vn-font-ui)",
        fontSize: "var(--vn-text-sm)",
        color: isSelected ? "var(--vn-color-brand)" : "var(--vn-color-on-surface)",
        background: isSelected ? "rgba(26,143,220,0.08)" : "transparent"
      },
      onMouseEnter: (e) => e.currentTarget.style.background = "rgba(26,143,220,0.06)",
      onMouseLeave: (e) => e.currentTarget.style.background = isSelected ? "rgba(26,143,220,0.08)" : "transparent",
      children
    }
  );
}
export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
};
