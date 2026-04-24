/**
 * @module cspHeaders
 * Content Security Policy helpers para proyectos vientonorte.
 * Optimizado para GitHub Pages (sin servidor, solo meta tag CSP).
 *
 * NOTA: meta tag CSP no soporta `frame-ancestors` ni `report-uri` — usar
 * solo en SPAs donde no hay control del servidor de origen.
 */

export interface CSPConfig {
  defaultSrc?: string[];
  scriptSrc?: string[];
  styleSrc?: string[];
  imgSrc?: string[];
  connectSrc?: string[];
  fontSrc?: string[];
  frameSrc?: string[];
  /** Solo efectivo en CSP entregado via header HTTP, no meta tag */
  reportUri?: string;
}

/**
 * Construye un string CSP a partir de la configuración.
 * Los arrays de fuentes se unen con espacios; las directivas se separan con `;`.
 *
 * @param config - Directivas CSP
 * @returns String listo para usar en Content-Security-Policy header o meta tag
 *
 * @example
 * const csp = buildCSP({
 *   defaultSrc: ["'self'"],
 *   scriptSrc: ["'self'", "'unsafe-inline'"],
 *   imgSrc: ["'self'", 'data:', 'https:'],
 * });
 * // "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data: https:"
 */
export function buildCSP(config: CSPConfig): string {
  const directives: string[] = [];

  const add = (key: string, values?: string[]): void => {
    if (values && values.length > 0) {
      directives.push(`${key} ${values.join(' ')}`);
    }
  };

  add('default-src', config.defaultSrc);
  add('script-src', config.scriptSrc);
  add('style-src', config.styleSrc);
  add('img-src', config.imgSrc);
  add('connect-src', config.connectSrc);
  add('font-src', config.fontSrc);
  add('frame-src', config.frameSrc);

  if (config.reportUri) {
    directives.push(`report-uri ${config.reportUri}`);
  }

  return directives.join('; ');
}

/**
 * Inyecta un meta tag CSP en el `<head>` del documento.
 * Útil en SPAs sin control del servidor (GitHub Pages, Netlify redirects, etc.).
 *
 * Limitaciones del meta tag CSP:
 * - No soporta `frame-ancestors`
 * - No soporta `report-uri` / `report-to`
 * - Debe ser el primer elemento de `<head>` para ser efectivo
 *
 * @param config - Configuración CSP
 *
 * @example
 * // En el entry point de la SPA, antes de cualquier renderizado:
 * import { injectCSPMeta, vientonorteCSP } from '@vientonorte/security';
 * injectCSPMeta(vientonorteCSP);
 */
export function injectCSPMeta(config: CSPConfig): void {
  if (typeof document === 'undefined') return;

  // Eliminar meta CSP existente para evitar duplicados
  const existing = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  existing?.remove();

  const meta = document.createElement('meta');
  meta.setAttribute('http-equiv', 'Content-Security-Policy');
  meta.setAttribute('content', buildCSP(config));

  // Insertar como primer hijo del head
  const head = document.head;
  if (head.firstChild) {
    head.insertBefore(meta, head.firstChild);
  } else {
    head.appendChild(meta);
  }
}

/**
 * Preset CSP seguro para proyectos vientonorte desplegados en GitHub Pages.
 *
 * Permite:
 * - Scripts propios + GitHub Pages CDN
 * - Estilos propios + inline (necesario para CSS-in-JS / tokens CSS vars)
 * - Imágenes: self, data URIs, HTTPS (avatares externos, shields.io, etc.)
 * - Conexiones: self + Supabase (configurar URL real en producción)
 * - Fuentes: self + Google Fonts
 *
 * Ajustar `connectSrc` con la URL de Supabase del proyecto antes de usar.
 *
 * @example
 * import { injectCSPMeta, vientonorteCSP } from '@vientonorte/security';
 *
 * injectCSPMeta({
 *   ...vientonorteCSP,
 *   connectSrc: [
 *     ...vientonorteCSP.connectSrc!,
 *     'https://tu-proyecto.supabase.co',
 *   ],
 * });
 */
export const vientonorteCSP: CSPConfig = {
  defaultSrc: ["'self'"],
  scriptSrc: [
    "'self'",
    // Hashes de scripts inline (preferible a 'unsafe-inline')
    // Agregar hashes específicos en producción
  ],
  styleSrc: [
    "'self'",
    "'unsafe-inline'", // Necesario para CSS vars / tokens en runtime
    'https://fonts.googleapis.com',
  ],
  imgSrc: [
    "'self'",
    'data:',
    'https:',
    'blob:',
  ],
  connectSrc: [
    "'self'",
    // Agregar URL de Supabase del proyecto:
    // 'https://tu-proyecto.supabase.co',
  ],
  fontSrc: [
    "'self'",
    'https://fonts.gstatic.com',
  ],
  frameSrc: ["'none'"],
};
