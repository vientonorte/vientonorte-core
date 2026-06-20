import React from 'react';

/**
 * @module types
 * Tipos y naming convention para analytics del colectivo vientonorte.
 *
 * Naming convention: {proyecto}_{feature}_{step}_{result}
 * Ejemplo: dashfin_import_csv_success
 *          mi-portafolio_contact_form_error
 *          uxtools_export_pdf_start
 */
/** Proyectos del colectivo vientonorte */
type VNProject = 'mi-portafolio' | 'dashfin' | 'table-ro' | 'uxtools' | 'contra-archivo';
/** Resultados posibles de un evento */
type VNResult = 'start' | 'success' | 'error' | 'cancel' | 'view';
/**
 * Evento de analytics normalizado.
 * El nombre final en GTM/GA4 será: `{project}_{feature}_{step}_{result}`
 * con guiones reemplazados por underscores.
 */
interface VNEvent {
    project: VNProject;
    /** Feature o módulo en snake_case (p.ej. "import", "auth", "report") */
    feature: string;
    /** Paso específico en snake_case (p.ej. "csv", "password", "monthly") */
    step: string;
    result: VNResult;
    /** Propiedades adicionales (dimensiones custom en GA4) */
    properties?: Record<string, string | number | boolean>;
}
/** Configuración del tracker */
interface AnalyticsConfig {
    /** ID de Google Tag Manager (GTM-XXXXXXX) */
    gtmId?: string;
    /** ID de Google Analytics 4 (G-XXXXXXXXXX) */
    ga4Id?: string;
    project: VNProject;
    /** true = loguea eventos en consola sin enviar a GTM/GA4 */
    debug?: boolean;
    /**
     * false = no envía eventos (útil en desarrollo).
     * Default: false en dev (NODE_ENV !== 'production'), true en prod.
     */
    enabled?: boolean;
}

/**
 * @module tracker
 * VNTracker — clase principal de analytics para proyectos vientonorte.
 *
 * Naming convention aplicada automáticamente:
 * {project}_{feature}_{step}_{result}
 * Ejemplo: dashfin_import_csv_success
 */

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}
/**
 * Tracker principal del colectivo vientonorte.
 * Unifica GTM dataLayer y GA4 gtag bajo una API tipada con naming convention.
 *
 * @example
 * const tracker = new VNTracker({
 *   gtmId: 'GTM-ABC1234',
 *   ga4Id: 'G-XXXXXXXXXX',
 *   project: 'dashfin',
 *   debug: process.env.NODE_ENV !== 'production',
 *   enabled: process.env.NODE_ENV === 'production',
 * });
 *
 * tracker.track({ feature: 'import', step: 'csv', result: 'success' });
 * // Envía evento: "dashfin_import_csv_success"
 */
declare class VNTracker {
    private readonly config;
    constructor(config: AnalyticsConfig);
    /**
     * Convierte un VNEvent en nombre de evento siguiendo la naming convention.
     * Reemplaza guiones por underscores para compatibilidad con GA4.
     */
    private toEventName;
    /**
     * Envía un evento a GTM dataLayer y GA4 gtag.
     *
     * @param event - Datos del evento (sin `project`, que se toma de la config)
     *
     * @example
     * tracker.track({ feature: 'auth', step: 'password', result: 'error' });
     * // → "dashfin_auth_password_error"
     */
    track(event: Omit<VNEvent, 'project'>): void;
    /**
     * Envía un evento de page_view a GA4.
     *
     * @param path - Path de la página (p.ej. "/dashboard/inversiones")
     * @param title - Título de la página
     *
     * @example
     * tracker.page('/dashboard', 'Dashboard — DashFin');
     */
    page(path: string, title: string): void;
    /**
     * Shortcut para eventos de interacción de UI.
     *
     * @example
     * tracker.ui('sidebar', 'toggle', 'success');
     * // → "dashfin_sidebar_toggle_success"
     */
    ui(feature: string, step: string, result: VNResult, props?: Record<string, string | number | boolean>): void;
    /**
     * Shortcut para eventos de navegación entre vistas.
     *
     * @example
     * tracker.navigation('/login', '/dashboard');
     * // → "dashfin_navigation_route_view" con from/to como properties
     */
    navigation(from: string, to: string): void;
    /**
     * Shortcut para eventos de formulario.
     *
     * @example
     * tracker.form('contacto', 'submit', 'success');
     * // → "mi-portafolio_contacto_submit_success"
     */
    form(formName: string, step: string, result: VNResult): void;
    /**
     * Log de debug — muestra eventos en consola sin enviar a GTM/GA4.
     * Solo activo si `debug: true` en la config.
     */
    private log;
}

/**
 * @module gtm
 * Helpers para inicializar Google Tag Manager y manipular el dataLayer.
 */
declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
        gtag?: (...args: unknown[]) => void;
    }
}
/**
 * Inyecta el script de GTM en el `<head>` del documento.
 * Llama una sola vez en el entry point de la app.
 *
 * @param gtmId - ID del contenedor GTM (GTM-XXXXXXX)
 *
 * @example
 * import { initGTM } from '@vientonorte/analytics';
 * initGTM('GTM-ABC1234');
 */
declare function initGTM(gtmId: string): void;
/**
 * Empuja un objeto al dataLayer de GTM.
 * Seguro de llamar antes de que GTM esté inicializado — los eventos se encolan.
 *
 * @param data - Objeto a enviar al dataLayer
 *
 * @example
 * pushDataLayer({ event: 'dashfin_import_csv_success', value: 42 });
 */
declare function pushDataLayer(data: Record<string, unknown>): void;

/**
 * @module react
 * Hook y Provider React para VNTracker.
 * Tree-shakeable — solo se importa si el proyecto usa React.
 */

/**
 * Provider que inicializa un VNTracker y lo hace disponible via contexto.
 * Colocar en el root del árbol de componentes (App.tsx o layout raíz).
 *
 * @example
 * // En App.tsx:
 * import { AnalyticsProvider } from '@vientonorte/analytics';
 *
 * <AnalyticsProvider config={{ project: 'dashfin', ga4Id: 'G-XXX', enabled: true }}>
 *   <Router />
 * </AnalyticsProvider>
 */
declare function AnalyticsProvider({ config, children, }: {
    config: AnalyticsConfig;
    children: React.ReactNode;
}): React.JSX.Element;
/**
 * Hook para acceder al VNTracker desde cualquier componente.
 * Debe usarse dentro de un AnalyticsProvider.
 *
 * @returns VNTracker instancia configurada
 * @throws Error si se usa fuera del AnalyticsProvider
 *
 * @example
 * function ContactForm() {
 *   const tracker = useAnalytics();
 *
 *   const handleSubmit = async () => {
 *     tracker.form('contact', 'submit', 'start');
 *     try {
 *       await submitForm();
 *       tracker.form('contact', 'submit', 'success');
 *     } catch {
 *       tracker.form('contact', 'submit', 'error');
 *     }
 *   };
 *
 *   return <form onSubmit={handleSubmit}>…</form>;
 * }
 */
declare function useAnalytics(): VNTracker;

export { type AnalyticsConfig, AnalyticsProvider, type VNEvent, type VNProject, type VNResult, VNTracker, initGTM, pushDataLayer, useAnalytics };
