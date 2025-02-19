import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import pluginJest from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...pluginJest.environments.globals, // Agregar soporte para Jest
      },
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
      jest: pluginJest, // Agregar Jest como plugin
    },
    rules: {
      'prettier/prettier': ['error'], // Aplicar reglas de Prettier
      'no-undef': 'error',
      'no-unused-vars': 'warn',
    },
  },
  pluginJs.configs.recommended,
  pluginJest.configs.recommended, // Agregar configuración recomendada de Jest
  prettierConfig, // Desactiva conflictos entre ESLint y Prettier
];
