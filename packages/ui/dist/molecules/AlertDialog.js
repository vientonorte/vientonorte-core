// src/molecules/AlertDialog.tsx
import { createContext, useContext, useState } from "react";

// src/molecules/Dialog.tsx
import { useRef, useEffect, useId, useCallback } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const baseId = useId();
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: OVERLAY_STYLES,
      onClick: handleOverlayClick,
      "aria-hidden": false,
      children: /* @__PURE__ */ jsxs(
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
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "aria-label": "Cerrar di\xE1logo",
                style: CLOSE_BTN_STYLES,
                children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
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
            /* @__PURE__ */ jsx("h2", { id: titleId, style: TITLE_STYLES, children: title }),
            description && /* @__PURE__ */ jsx("p", { id: descId, style: DESCRIPTION_STYLES, children: description }),
            children && /* @__PURE__ */ jsx("div", { style: ACTIONS_STYLES, children })
          ]
        }
      )
    }
  );
}

// src/molecules/AlertDialog.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var Ctx = createContext(null);
var useCtx = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("AlertDialog context missing");
  return c;
};
function AlertDialog({ children, open: controlledOpen, onOpenChange }) {
  const [internal, setInternal] = useState(false);
  const open = controlledOpen ?? internal;
  const setOpen = (v) => {
    setInternal(v);
    onOpenChange?.(v);
  };
  return /* @__PURE__ */ jsx2(Ctx.Provider, { value: { open, setOpen }, children });
}
function AlertDialogTrigger({ children }) {
  const { setOpen } = useCtx();
  return /* @__PURE__ */ jsx2("span", { onClick: () => setOpen(true), style: { display: "contents" }, children });
}
function AlertDialogContent({ children }) {
  const { open, setOpen } = useCtx();
  return /* @__PURE__ */ jsx2(Dialog, { open, onClose: () => setOpen(false), title: "", description: "", children });
}
function AlertDialogHeader({ children, ...props }) {
  return /* @__PURE__ */ jsx2("div", { ...props, style: { display: "flex", flexDirection: "column", gap: "var(--vn-space-2)", marginBottom: "var(--vn-space-4)" }, children });
}
function AlertDialogTitle({ children, ...props }) {
  return /* @__PURE__ */ jsx2("h2", { ...props, style: { margin: 0, fontFamily: "var(--vn-font-display)", fontSize: "var(--vn-text-xl)", fontWeight: 700, color: "var(--vn-color-on-surface)" }, children });
}
function AlertDialogDescription({ children, ...props }) {
  return /* @__PURE__ */ jsx2("p", { ...props, style: { margin: 0, fontSize: "var(--vn-text-sm)", color: "var(--vn-color-muted)" }, children });
}
function AlertDialogAction({ children, ...props }) {
  const { setOpen } = useCtx();
  return /* @__PURE__ */ jsx2("button", { ...props, onClick: (e) => {
    setOpen(false);
    props.onClick?.(e);
  }, style: { display: "inline-flex", alignItems: "center", padding: "var(--vn-space-2) var(--vn-space-4)", background: "var(--vn-color-brand)", color: "var(--vn-primitive-marfil)", border: "none", borderRadius: "var(--vn-radius-md)", fontFamily: "var(--vn-font-ui)", fontWeight: 600, cursor: "pointer", minHeight: "var(--vn-touch-min)", ...props.style }, children });
}
function AlertDialogFooter({ children, ...props }) {
  return /* @__PURE__ */ jsx2("div", { ...props, style: { display: "flex", gap: "var(--vn-space-3)", justifyContent: "flex-end", marginTop: "var(--vn-space-4)", ...props.style }, children });
}
function AlertDialogCancel({ children, ...props }) {
  const { setOpen } = useCtx();
  return /* @__PURE__ */ jsx2("button", { ...props, onClick: (e) => {
    setOpen(false);
    props.onClick?.(e);
  }, style: { display: "inline-flex", alignItems: "center", padding: "var(--vn-space-2) var(--vn-space-4)", background: "transparent", color: "var(--vn-color-muted)", border: "1px solid var(--vn-border-medium)", borderRadius: "var(--vn-radius-md)", fontFamily: "var(--vn-font-ui)", fontWeight: 500, cursor: "pointer", minHeight: "var(--vn-touch-min)", ...props.style }, children });
}
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
};
