// src/molecules/Card.tsx
import { jsx } from "react/jsx-runtime";
function Card({ children, style, ...props }) {
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
};
