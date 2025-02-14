import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error'], // Configuración correcta con severidad "error"
      'no-undef': 'error',
      'no-unused-vars': 'warn',
    },
  },
  pluginJs.configs.recommended,
  prettierConfig, // Desactiva conflictos entre ESLint y Prettier
];
