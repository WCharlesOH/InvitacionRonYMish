import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use a relative base so the built site can be hosted from any static
  // sub-path (GitHub Pages, Netlify subfolders, etc.).
  base: './',
});
