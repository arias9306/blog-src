const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const nxEslintPlugin = require('@nx/eslint-plugin');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    ignores: ['**/dist'],
  },
  { plugins: { '@nx': nxEslintPlugin } },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  ...compat
    .config({
      extends: ['plugin:@nx/typescript'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
      rules: {
        ...config.rules,
      },
    })),
  ...compat
    .config({
      extends: ['plugin:@nx/javascript'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
      rules: {
        ...config.rules,
      },
    })),
  ...compat
    .config({
      env: {
        jest: true,
      },
    })
    .map((config) => ({
      ...config,
      files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
      rules: {
        ...config.rules,
      },
    })),
  ...compat
    .config({
      extends: ['plugin:@ngrx/all'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts'],
      rules: {
        ...config.rules,
      },
    })),
  {
    ignores: ['node_modules\r'],
  },
];
