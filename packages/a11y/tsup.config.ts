import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['esm'],
  dts: true,
  external: ['react', 'react-dom'],
  splitting: false,
  clean: true,
  jsx: 'react-jsx',
});
