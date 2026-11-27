import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';
import { createRequire } from 'module';
import { posix } from 'path';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

// Lib mode strips CSS imports from the JS. Put them back in the ESM build only (require('x.css') breaks Node),
// and rebuild faency.css from the per-module files in ESM evaluation order.
const injectCss = () => {
  let isLib = false;

  return {
    name: 'faency:inject-css',
    apply: 'build',
    enforce: 'post',
    // Storybook builds with this config too; only touch the library build.
    configResolved(config) {
      isLib = Boolean(config.build.lib);
    },
    generateBundle(this: any, { format }, bundle) {
      if (!isLib || format !== 'es') return;

      for (const chunk of Object.values<any>(bundle)) {
        if (chunk.type !== 'chunk' || !chunk.viteMetadata?.importedCss.size) continue;
        const imports = Array.from<string>(chunk.viteMetadata.importedCss)
          .map((css) => {
            const path = posix.relative(posix.dirname(chunk.fileName), css);
            return `import '${path.startsWith('.') ? path : `./${path}`}';`;
          })
          .join('');
        // Vite leaves one `/* empty css */` placeholder per stripped import.
        let injected = false;
        chunk.code = chunk.code.replace(/\/\* empty css +\*\//g, () => {
          if (injected) return '';
          injected = true;
          return imports;
        });
        if (!injected) chunk.code = imports + chunk.code;
      }

      const order: string[] = [];
      const visited = new Set<string>();
      const visit = (fileName: string) => {
        const chunk = bundle[fileName];
        if (visited.has(fileName) || chunk?.type !== 'chunk') return;
        visited.add(fileName);
        order.push(...chunk.viteMetadata.importedCss);
        chunk.imports.forEach(visit);
      };
      Object.values<any>(bundle)
        .filter((chunk) => chunk.type === 'chunk' && chunk.isEntry)
        .forEach((chunk) => visit(chunk.fileName));

      this.emitFile({
        type: 'asset',
        fileName: 'faency.css',
        source: Array.from(new Set(order))
          .map((css) => bundle[css].source)
          .join('\n'),
      });
    },
  };
};

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
    injectCss(),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: './index.ts',
      name: 'Faency',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
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
