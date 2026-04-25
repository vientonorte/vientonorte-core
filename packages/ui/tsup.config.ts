import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index':            'src/index.ts',
    'atoms/Button':     'src/atoms/Button.tsx',
    'atoms/Input':      'src/atoms/Input.tsx',
    'atoms/Badge':      'src/atoms/Badge.tsx',
    'atoms/Label':      'src/atoms/Label.tsx',
    'atoms/Skeleton':   'src/atoms/Skeleton.tsx',
    'molecules/Card':   'src/molecules/Card.tsx',
    'molecules/Alert':  'src/molecules/Alert.tsx',
    'molecules/Tabs':   'src/molecules/Tabs.tsx',
    'molecules/Dialog': 'src/molecules/Dialog.tsx',
  },
  format: ['esm'],
  dts: true,
  external: ['react', 'react-dom', '@vientonorte/a11y'],
  splitting: false,
  clean: true,
  jsx: 'react-jsx',
});
