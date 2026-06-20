// src/gtm.ts
function initGTM(gtmId) {
  if (typeof window === "undefined") return;
  if (document.querySelector(`script[data-gtm-id="${gtmId}"]`)) return;
  window.dataLayer = window.dataLayer ?? [];
  const script = document.createElement("script");
  script.setAttribute("data-gtm-id", gtmId);
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  const inlineScript = document.createElement("script");
  inlineScript.textContent = `
    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    })(window,document,'script','dataLayer','${gtmId}');
  `;
  document.head.insertBefore(inlineScript, document.head.firstChild);
  document.head.appendChild(script);
  if (document.body) {
    const noscript = document.createElement("noscript");
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }
}
function pushDataLayer(data) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(data);
}

// src/tracker.ts
var VNTracker = class {
  constructor(config) {
    this.config = {
      gtmId: config.gtmId ?? "",
      ga4Id: config.ga4Id ?? "",
      project: config.project,
      debug: config.debug ?? false,
      enabled: config.enabled ?? false
    };
  }
  /**
   * Convierte un VNEvent en nombre de evento siguiendo la naming convention.
   * Reemplaza guiones por underscores para compatibilidad con GA4.
   */
  toEventName(event) {
    const project = this.config.project.replace(/-/g, "_");
    const feature = event.feature.replace(/-/g, "_");
    const step = event.step.replace(/-/g, "_");
    return `${project}_${feature}_${step}_${event.result}`;
  }
  /**
   * Envía un evento a GTM dataLayer y GA4 gtag.
   *
   * @param event - Datos del evento (sin `project`, que se toma de la config)
   *
   * @example
   * tracker.track({ feature: 'auth', step: 'password', result: 'error' });
   * // → "dashfin_auth_password_error"
   */
  track(event) {
    const eventName = this.toEventName(event);
    const data = {
      event: eventName,
      vn_project: this.config.project,
      vn_feature: event.feature,
      vn_step: event.step,
      vn_result: event.result,
      ...event.properties
    };
    this.log(eventName, data);
    if (!this.config.enabled) return;
    pushDataLayer(data);
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        vn_project: this.config.project,
        ...event.properties
      });
    }
  }
  /**
   * Envía un evento de page_view a GA4.
   *
   * @param path - Path de la página (p.ej. "/dashboard/inversiones")
   * @param title - Título de la página
   *
   * @example
   * tracker.page('/dashboard', 'Dashboard — DashFin');
   */
  page(path, title) {
    const data = {
      event: "page_view",
      page_path: path,
      page_title: title,
      vn_project: this.config.project
    };
    this.log("page_view", data);
    if (!this.config.enabled) return;
    pushDataLayer(data);
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: path,
        page_title: title
      });
    }
  }
  /**
   * Shortcut para eventos de interacción de UI.
   *
   * @example
   * tracker.ui('sidebar', 'toggle', 'success');
   * // → "dashfin_sidebar_toggle_success"
   */
  ui(feature, step, result, props) {
    this.track({ feature, step, result, ...props !== void 0 && { properties: props } });
  }
  /**
   * Shortcut para eventos de navegación entre vistas.
   *
   * @example
   * tracker.navigation('/login', '/dashboard');
   * // → "dashfin_navigation_route_view" con from/to como properties
   */
  navigation(from, to) {
    this.track({
      feature: "navigation",
      step: "route",
      result: "view",
      properties: { from, to }
    });
  }
  /**
   * Shortcut para eventos de formulario.
   *
   * @example
   * tracker.form('contacto', 'submit', 'success');
   * // → "mi-portafolio_contacto_submit_success"
   */
  form(formName, step, result) {
    this.track({ feature: formName, step, result });
  }
  /**
   * Log de debug — muestra eventos en consola sin enviar a GTM/GA4.
   * Solo activo si `debug: true` en la config.
   */
  log(eventName, data) {
    if (!this.config.debug) return;
    console.group(`[VNTracker] ${eventName}`);
    console.table(data);
    console.groupEnd();
  }
};

// src/react.tsx
import { createContext, useContext, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
var AnalyticsContext = createContext(null);
function AnalyticsProvider({
  config,
  children
}) {
  const tracker = useMemo(() => new VNTracker(config), [
    config.project,
    config.gtmId,
    config.ga4Id,
    config.debug,
    config.enabled
  ]);
  return /* @__PURE__ */ jsx(AnalyticsContext.Provider, { value: tracker, children });
}
function useAnalytics() {
  const tracker = useContext(AnalyticsContext);
  if (!tracker) {
    throw new Error(
      "useAnalytics() debe usarse dentro de un <AnalyticsProvider>. Aseg\xFArate de envolver tu app con <AnalyticsProvider config={\u2026}>."
    );
  }
  return tracker;
}
export {
  AnalyticsProvider,
  VNTracker,
  initGTM,
  pushDataLayer,
  useAnalytics
};
