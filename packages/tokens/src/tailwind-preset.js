/**
 * @vientonorte/tokens — Tailwind CSS preset
 * Uso: import vnPreset from '@vientonorte/tokens/tailwind'
 *
 * En tailwind.config.ts:
 *   import vnPreset from '@vientonorte/tokens/tailwind';
 *   export default { presets: [vnPreset], ... }
 *
 * En Tailwind v4 (CSS-based config):
 *   @import "@vientonorte/tokens/css";
 *   @theme inline {
 *     --color-vn-azul-noche: var(--vn-primitive-azul-noche);
 *     --color-vn-marfil:     var(--vn-primitive-marfil);
 *     -- etc.
 *   }
 */

/** @type {import('tailwindcss').Config} */
const vnPreset = {
  theme: {
    extend: {
      colors: {
        'vn-azul-noche': 'var(--vn-primitive-azul-noche)',   // #0d1b3d
        'vn-marfil':     'var(--vn-primitive-marfil)',        // #f7f2e7
        'vn-pizarra':    'var(--vn-primitive-pizarra)',       // #4a5568
        'vn-rojo':       'var(--vn-primitive-rojo)',          // #E8401C
        'vn-azul-evo':   'var(--vn-primitive-azul-evo)',      // #1A8FDC
        'vn-amarillo':   'var(--vn-primitive-amarillo)',      // #F5B945
        'vn-success':    'var(--vn-primitive-success)',       // #2d9a5a
        // Semánticos
        'vn-brand':      'var(--vn-color-brand)',
        'vn-accent':     'var(--vn-color-accent)',
        'vn-surface':    'var(--vn-color-surface)',
        'vn-on-surface': 'var(--vn-color-on-surface)',
        'vn-muted':      'var(--vn-color-muted)',
      },
      fontFamily: {
        'vn-display': 'var(--vn-font-display)',
        'vn-ui':      'var(--vn-font-ui)',
        'vn-mono':    'var(--vn-font-mono)',
      },
      spacing: {
        'vn-1':  'var(--vn-space-1)',    // 4px
        'vn-2':  'var(--vn-space-2)',    // 8px
        'vn-3':  'var(--vn-space-3)',    // 12px
        'vn-4':  'var(--vn-space-4)',    // 16px
        'vn-5':  'var(--vn-space-5)',    // 20px
        'vn-6':  'var(--vn-space-6)',    // 24px
        'vn-7':  'var(--vn-space-7)',    // 32px
        'vn-8':  'var(--vn-space-8)',    // 40px
        'vn-9':  'var(--vn-space-9)',    // 48px
        'vn-10': 'var(--vn-space-10)',   // 64px
        'vn-11': 'var(--vn-space-11)',   // 80px
        'vn-12': 'var(--vn-space-12)',   // 96px
        'vn-touch': 'var(--vn-touch-min)',  // 44px
      },
      borderRadius: {
        'vn-xs':   'var(--vn-radius-xs)',    // 4px
        'vn-sm':   'var(--vn-radius-sm)',    // 8px
        'vn-md':   'var(--vn-radius-md)',    // 12px
        'vn-lg':   'var(--vn-radius-lg)',    // 16px
        'vn-xl':   'var(--vn-radius-xl)',    // 20px
        'vn-pill': 'var(--vn-radius-pill)',  // 100px
      },
      boxShadow: {
        'vn-sm':   'var(--vn-shadow-sm)',
        'vn-md':   'var(--vn-shadow-md)',
        'vn-lg':   'var(--vn-shadow-lg)',
        'vn-glow': 'var(--vn-shadow-glow)',
      },
      transitionDuration: {
        'vn-fast': 'var(--vn-duration-fast)',  // 150ms
        'vn-base': 'var(--vn-duration-base)',  // 250ms
        'vn-slow': 'var(--vn-duration-slow)',  // 400ms
      },
      transitionTimingFunction: {
        'vn-out':    'var(--vn-ease-out)',
        'vn-in':     'var(--vn-ease-in)',
        'vn-spring': 'var(--vn-ease-spring)',
      },
      zIndex: {
        'vn-dropdown': 'var(--vn-z-dropdown)', // 10
        'vn-sticky':   'var(--vn-z-sticky)',    // 20
        'vn-overlay':  'var(--vn-z-overlay)',   // 80
        'vn-drawer':   'var(--vn-z-drawer)',    // 90
        'vn-nav':      'var(--vn-z-nav)',       // 100
        'vn-toast':    'var(--vn-z-toast)',     // 110
        'vn-modal':    'var(--vn-z-modal)',     // 120
      },
      minHeight: {
        'vn-touch': 'var(--vn-touch-min)', // 44px WCAG 2.2
      },
      minWidth: {
        'vn-touch': 'var(--vn-touch-min)', // 44px WCAG 2.2
      },
    },
  },
  plugins: [],
};

module.exports = vnPreset;
