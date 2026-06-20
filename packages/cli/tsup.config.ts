import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { 'index': 'src/index.ts' },
  format: ['cjs'],
  dts: false,
  splitting: false,
  clean: true,
});
