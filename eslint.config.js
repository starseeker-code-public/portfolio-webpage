import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'dist-ssr']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    /* Build-time only: Node renders this to a string in scripts/prerender.mjs and it is
       never loaded by the dev server, so there is no fast-refresh boundary to protect. */
    files: ['src/entry-server.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    /* Re-export barrels. The rule says outright it can't see through `export *`, and these files
       hold no component of their own, so they are never a fast-refresh boundary. */
    files: ['src/**/index.{ts,tsx}'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
])
