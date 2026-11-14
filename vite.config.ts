import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// The site lives at https://dkbyte-studios.github.io/Codeling/ so builds need that base path.
// Both `vite build` and `vite preview` run in production mode, so the preview matches the real site.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Codeling/' : '/',
  plugins: [svelte()],
  worker: { format: 'es' },
}));
