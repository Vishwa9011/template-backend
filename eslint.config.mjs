import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
   {
      files: ["**/*.{js,mjs,cjs,ts,tsx}"],
      ignores: ["node_modules", "dist"]
   },
   {
      languageOptions: {
         parser: tseslint.parser,
         parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            project: "./tsconfig.json"
         },
         globals: globals.node
      }
   },
   pluginJs.configs.recommended,
   ...tseslint.configs.recommended,
   {
      rules: {
         "no-console": "warn",
         "no-unused-vars": "off",
         "@typescript-eslint/no-unused-vars": ["error"],
         "@typescript-eslint/no-explicit-any": "off",
         "@typescript-eslint/explicit-function-return-type": "off",
         "@typescript-eslint/no-var-requires": "off"
      }
   },
   {
      plugins: { prettier: prettierPlugin },
      rules: {
         ...eslintConfigPrettier.rules,
         "prettier/prettier": "warn"
      }
   }
];
