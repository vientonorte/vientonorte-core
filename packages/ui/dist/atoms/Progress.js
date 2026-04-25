// src/atoms/Progress.tsx
import { jsx } from "react/jsx-runtime";
function Progress({ value = 0, max = 100, style, ...props }) {
  const pct = Math.min(100, Math.max(0, value / max * 100));
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "progressbar",
      "aria-valuenow": value,
      "aria-valuemin": 0,
      "aria-valuemax": max,
      ...props,
      style: {
        width: "100%",
        height: 8,
        background: "var(--vn-border-subtle)",
        borderRadius: "var(--vn-radius-pill)",
        overflow: "hidden",
        ...style
      },
      children: /* @__PURE__ */ jsx("div", { style: {
        height: "100%",
        width: `${pct}%`,
        background: "var(--vn-color-brand)",
        borderRadius: "var(--vn-radius-pill)",
        transition: "width var(--vn-duration-base) var(--vn-ease-out)"
      } })
    }
  );
}
var Progress_default = Progress;
export {
  Progress,
  Progress_default as default
};
