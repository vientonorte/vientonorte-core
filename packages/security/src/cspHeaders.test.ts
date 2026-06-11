/**
 * Tests de cspHeaders — buildCSP / injectCSPMeta / vientonorteCSP.
 * STRIDE: Tampering (XSS via CSP), Spoofing (frame-src).
 */
import { afterEach, describe, expect, it } from 'vitest';
import { buildCSP, injectCSPMeta, vientonorteCSP } from './cspHeaders';

afterEach(() => {
  document.head.innerHTML = '';
});

describe('buildCSP', () => {
  it('construye directivas separadas por "; " con fuentes por espacio', () => {
    const csp = buildCSP({
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    });
    expect(csp).toBe(
      "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data: https:"
    );
  });

  it('omite directivas vacías o ausentes', () => {
    expect(buildCSP({ defaultSrc: ["'self'"], scriptSrc: [] })).toBe("default-src 'self'");
  });

  it('incluye report-uri solo si está configurado', () => {
    const csp = buildCSP({ defaultSrc: ["'self'"], reportUri: 'https://example.com/report' });
    expect(csp).toContain('report-uri https://example.com/report');
  });
});

describe('injectCSPMeta', () => {
  it('inyecta el meta CSP como primer hijo de <head>', () => {
    document.head.appendChild(document.createElement('title'));
    injectCSPMeta({ defaultSrc: ["'self'"] });

    const meta = document.head.firstElementChild as HTMLMetaElement;
    expect(meta.tagName).toBe('META');
    expect(meta.getAttribute('http-equiv')).toBe('Content-Security-Policy');
    expect(meta.getAttribute('content')).toBe("default-src 'self'");
  });

  it('reemplaza un meta CSP existente (no duplica)', () => {
    injectCSPMeta({ defaultSrc: ["'self'"] });
    injectCSPMeta({ defaultSrc: ["'none'"] });

    const metas = document.querySelectorAll('meta[http-equiv="Content-Security-Policy"]');
    expect(metas).toHaveLength(1);
    expect(metas[0]?.getAttribute('content')).toBe("default-src 'none'");
  });
});

describe('vientonorteCSP (preset GitHub Pages)', () => {
  it('bloquea iframes y restringe default-src a self', () => {
    expect(vientonorteCSP.frameSrc).toEqual(["'none'"]);
    expect(vientonorteCSP.defaultSrc).toEqual(["'self'"]);
  });

  it('no permite unsafe-inline en scripts (solo en estilos)', () => {
    expect(vientonorteCSP.scriptSrc).not.toContain("'unsafe-inline'");
    expect(vientonorteCSP.styleSrc).toContain("'unsafe-inline'");
  });
});
