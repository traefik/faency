// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import pluginJs from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  eslintReact.configs['recommended-typescript'],
  {
    plugins: {
      'jsx-a11y': eslintPluginJsxA11y,
      prettier: eslintPluginPrettier,
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
  },
  {
    rules: {
      '@eslint-react/no-array-index-key': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^@?\\w'],
            // Shared dirs before components keeps the previous import order, which sets the CSS output order.
            ['^@/(colors|styles|utils)(/|$)'],
            ['^@/components(/|$)'],
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: [
      'components/**/*.vanilla.{ts,tsx}',
      'components/**/*.vanilla.test.tsx',
      'components/**/*.css.ts',
      'components/**/*.theme.ts',
      'styles/**/*.{ts,tsx}',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message: 'Use a prefixed absolute import (`@/components/...`, `@/styles/...`).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.test.tsx', '**/*.test.ts'],
    rules: {
      '@eslint-react/no-create-ref': 'off',
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
  },
  ...storybook.configs['flat/recommended'],
];
