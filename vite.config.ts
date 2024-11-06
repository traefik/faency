import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['storybook'],
  },
  plugins: [react()],
});
