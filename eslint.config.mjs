import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/generated/**',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
          modules: true,
          experimentalObjectRestSpread: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'ban-ts-comment': 'off',
      indent: ['off'],
      'arrow-spacing': ['warn', { before: true, after: true }],
      'brace-style': ['off'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': 'error',
      'comma-style': 'error',
      curly: ['error', 'multi-line', 'consistent'],
      'dot-location': ['error', 'property'],
      'handle-callback-err': 'off',
      'keyword-spacing': 'error',
      'max-nested-callbacks': ['error', { max: 4 }],
      'max-statements-per-line': ['error', { max: 2 }],
      'no-console': 'off',
      'no-empty-function': 'error',
      'no-floating-decimal': 'error',
      'no-inline-comments': 'error',
      'no-lonely-if': 'error',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-trailing-spaces': ['off'],
      'no-var': 'error',
      'object-curly-spacing': ['error', 'always'],
      'prefer-const': 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'space-before-blocks': 'error',
      'space-before-function-paren': [
        'error',
        { anonymous: 'never', named: 'never', asyncArrow: 'always' },
      ],
      'space-in-parens': 'error',
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'spaced-comment': 'error',
      yoda: 'error',
    },
  },
  prettierRecommended,
];

