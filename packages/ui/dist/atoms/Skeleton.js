// src/atoms/Skeleton.tsx
import { jsx } from "react/jsx-runtime";
function Skeleton({ width, height, radius, style, ...props }) {
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx("style", { children: `@keyframes vn-shimmer { to { background-position: -200% 0; } }` })
    }
  );
}
var Skeleton_default = Skeleton;
export {
  Skeleton,
  Skeleton_default as default
};
