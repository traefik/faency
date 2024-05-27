import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';

import pkg from './package.json';

export default {
  input: './index.ts',
  output: [
    {
      file: pkg.exports['.'].require,
      format: 'cjs',
    },
    {
      preserveModules: true,
      dir: pkg.modulesDir,
      format: 'es',
    },
  ],
  external: [
    'react/jsx-runtime',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      clean: true,
      tsconfig: 'tsconfig-rollup.json',
      typescript: require('typescript'),
    }),
    babel({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      babelHelpers: 'bundled',
    }),
  ],
};
