import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import tailwindcssPlugin from '@poupe/eslint-plugin-tailwindcss';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Add tailwindcss plugin and config
  {
    plugins: {
      tailwindcss: tailwindcssPlugin,
    },
    rules: {
      ...tailwindcssPlugin.configs.recommended.rules,
    },
  },
  prettierConfig, // Always put prettier last to override conflicting rules
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
