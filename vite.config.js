import { defineConfig } from 'vite';

export default defineConfig({
  base: '/e-plantShopping/',
  esbuild: { jsx: 'automatic' },
  test: { environment: 'jsdom', setupFiles: './src/test-setup.js' },
});
