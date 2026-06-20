import type { Preview } from '@storybook/react';
import '@vientonorte/tokens/css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'azul-noche',
      values: [
        { name: 'azul-noche', value: '#0d1b3d' },
        { name: 'marfil', value: '#f7f2e7' },
        { name: 'blanco', value: '#ffffff' },
      ],
    },
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: true }] } },
  },
};

export default preview;
