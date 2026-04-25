// src/molecules/Separator.tsx
import { jsx } from "react/jsx-runtime";
function Separator({ orientation = "horizontal", style, ...props }) {
  return /* @__PURE__ */ jsx(
    "hr",
    {
      role: "separator",
      "aria-orientation": orientation,
      ...props,
      style: {
        border: "none",
        background: "var(--vn-border-subtle)",
        ...orientation === "horizontal" ? { width: "100%", height: 1, margin: "var(--vn-space-4) 0" } : { width: 1, height: "100%", margin: "0 var(--vn-space-4)", display: "inline-block" },
        ...style
      }
    }
  );
}
var Separator_default = Separator;
export {
  Separator,
  Separator_default as default
};
