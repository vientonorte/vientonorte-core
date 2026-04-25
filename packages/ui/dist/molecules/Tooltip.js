// src/molecules/Tooltip.tsx
import React, { useState, useId } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
var TooltipContext = React.createContext(null);
function TooltipProvider({ children }) {
  return /* @__PURE__ */ jsx(Fragment, { children });
}
function Tooltip({ children }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return /* @__PURE__ */ jsx(TooltipContext.Provider, { value: { open, setOpen, id }, children });
}
function TooltipTrigger({ children, asChild, ...props }) {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) return /* @__PURE__ */ jsx("span", { ...props, children });
  return /* @__PURE__ */ jsx(
    "span",
    {
      ...props,
      "aria-describedby": ctx.open ? ctx.id : void 0,
      onMouseEnter: () => ctx.setOpen(true),
      onMouseLeave: () => ctx.setOpen(false),
      onFocus: () => ctx.setOpen(true),
      onBlur: () => ctx.setOpen(false),
      style: { display: "inline-flex", ...props.style },
      children
    }
  );
}
function TooltipContent({ children, side = "top", style, ...props }) {
  const ctx = React.useContext(TooltipContext);
  if (!ctx?.open) return null;
  const POSITION = {
    top: { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "tooltip",
      id: ctx.id,
      ...props,
      style: {
        position: "absolute",
        ...POSITION[side],
        background: "var(--vn-color-brand-dark)",
        color: "var(--vn-primitive-marfil)",
        padding: "var(--vn-space-1) var(--vn-space-3)",
        borderRadius: "var(--vn-radius-sm)",
        fontSize: "var(--vn-text-xs)",
        fontFamily: "var(--vn-font-ui)",
        whiteSpace: "nowrap",
        zIndex: "var(--vn-z-tooltip, 50)",
        pointerEvents: "none",
        boxShadow: "var(--vn-shadow-md)",
        ...style
      },
      children
    }
  );
}
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
};
