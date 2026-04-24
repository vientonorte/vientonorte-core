/**
 * @vientonorte/analytics — Analytics wrapper GTM+GA4
 *
 * Naming convention: {proyecto}_{feature}_{step}_{result}
 *
 * Exports:
 * - Types: VNProject, VNResult, VNEvent, AnalyticsConfig
 * - VNTracker  — clase principal
 * - initGTM / pushDataLayer — helpers GTM
 * - AnalyticsProvider / useAnalytics — bindings React
 */

export type { VNProject, VNResult, VNEvent, AnalyticsConfig } from './types';
export { VNTracker } from './tracker';
export { initGTM, pushDataLayer } from './gtm';
export { AnalyticsProvider, useAnalytics } from './react';
