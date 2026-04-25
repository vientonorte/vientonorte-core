// src/atoms/Label.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Label({ required, children, style, ...props }) {
  return /* @__PURE__ */ jsxs(
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
        required && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: { color: "var(--vn-color-accent)", marginLeft: 2 }, children: "*" })
      ]
    }
  );
}
var Label_default = Label;
export {
  Label,
  Label_default as default
};
