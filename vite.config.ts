import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    dts({
      tsconfigPath: 'tsconfig-build.json',
      outDir: 'dist',
      rollupTypes: true,
      insertTypesEntry: true,
      cleanVueFileName: true,
      exclude: [
        '**/*.stories.tsx',
        '**/*.stories.ts',
        '**/*.test.tsx',
        '**/*.test.ts',
        'stories/**',
      ],
    }),
  ],
  build: {
    lib: {
      entry: './index.ts',
      name: 'Faency',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        preserveModules: true,
        preserveModulesRoot: '.',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
  },
});
