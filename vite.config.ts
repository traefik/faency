import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';
import { createRequire } from 'module';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  optimizeDeps: {
    exclude: ['@vanilla-extract/recipes/createRuntimeFn'],
  },
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
      afterBuild: (emittedFiles) => {
        // CJS consumers resolve the entry's types from index.d.cts.
        const [entryTypes] = Array.from(emittedFiles.keys())
          .filter((path) => path.endsWith('/index.d.ts'))
          .sort((a, b) => a.split('/').length - b.split('/').length);
        if (!entryTypes) throw new Error('index.d.ts was not emitted; cannot write index.d.cts');
        writeFileSync(entryTypes.replace(/\.d\.ts$/, '.d.cts'), emittedFiles.get(entryTypes)!);
      },
    }),
  ],
  build: {
    lib: {
      entry: './index.ts',
      name: 'Faency',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
      cssFileName: 'faency',
    },
    rolldownOptions: {
      external: (id: string) => {
        const externals = [
          /^@vanilla-extract\//,
          'react/jsx-runtime',
          ...Object.keys(pkg.dependencies || {}),
          ...Object.keys(pkg.peerDependencies || {}),
        ];
        return externals.some((dep) => id === dep || id.startsWith(dep + '/'));
      },
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
