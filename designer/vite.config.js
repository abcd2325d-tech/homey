import { defineConfig } from 'vite';

// base: './' lets the built app be opened from any folder or static host.
export default defineConfig({
  base: './',
  server: { port: 5174 },
  build: { chunkSizeWarningLimit: 1000 },
});
