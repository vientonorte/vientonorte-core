// src/molecules/Table.tsx
import { jsx } from "react/jsx-runtime";
function Table({ children, style, ...props }) {
  return /* @__PURE__ */ jsx("div", { style: { width: "100%", overflowX: "auto", ...style }, children: /* @__PURE__ */ jsx("table", { ...props, style: { width: "100%", borderCollapse: "collapse", fontFamily: "var(--vn-font-ui)", fontSize: "var(--vn-text-sm)" }, children }) });
}
function TableHeader({ children, ...props }) {
  return /* @__PURE__ */ jsx("thead", { ...props, children });
}
function TableBody({ children, ...props }) {
  return /* @__PURE__ */ jsx("tbody", { ...props, children });
}
function TableRow({ children, style, ...props }) {
  return /* @__PURE__ */ jsx("tr", { ...props, style: { borderBottom: "1px solid var(--vn-border-subtle)", ...style }, children });
}
function TableHead({ children, style, ...props }) {
  return /* @__PURE__ */ jsx("th", { ...props, style: { padding: "var(--vn-space-3) var(--vn-space-4)", textAlign: "left", fontWeight: 600, color: "var(--vn-color-muted)", whiteSpace: "nowrap", ...style }, children });
}
function TableCell({ children, style, ...props }) {
  return /* @__PURE__ */ jsx("td", { ...props, style: { padding: "var(--vn-space-3) var(--vn-space-4)", color: "var(--vn-color-on-surface)", verticalAlign: "middle", ...style }, children });
}
export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
};
