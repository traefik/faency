import typescript from 'rollup-plugin-typescript2';
import url from '@rollup/plugin-url';
import pkg from './package.json';

export default {
  input: './index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    url({
      include: ['**/*.woff', '**/*.woff2'],
      destDir: 'dist/fonts',
    }),
    typescript({
      clean: true,
      tsconfig: 'tsconfig-rollup.json',
      typescript: require('typescript'),
    }),
  ],
};
