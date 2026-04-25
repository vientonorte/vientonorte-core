// src/molecules/Tabs.tsx
import { createContext, useContext, useState, useId } from "react";
import { jsx } from "react/jsx-runtime";
var TabsContext = createContext(null);
function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs subcomponents must be used inside <Tabs>");
  return ctx;
}
function Tabs({ defaultValue, value, onValueChange, children, style, ...props }) {
  const [internal, setInternal] = useState(defaultValue);
  const active = value ?? internal;
  const baseId = useId();
  const setActive = (v) => {
    setInternal(v);
    onValueChange?.(v);
  };
  return /* @__PURE__ */ jsx(TabsContext.Provider, { value: { active, setActive, baseId }, children: /* @__PURE__ */ jsx("div", { ...props, style: { display: "flex", flexDirection: "column", gap: 0, ...style }, children }) });
}
function TabsList({ children, style, ...props }) {
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
};
