import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
   {
      files: ["**/*.{js,mjs,cjs,ts,tsx}"],
      ignores: ["node_modules", "dist"]
   },
   pluginJs.configs.recommended,
   ...tseslint.configs.recommended,
   {
      rules: {
         "no-console": "warn",
         "@typescript-eslint/no-unused-vars": ["error"],
         "@typescript-eslint/no-explicit-any": "off",
      }
   },
   {
      rules: {
         ...eslintConfigPrettier.rules // ✅ Only use eslint-config-prettier
      }
   }
];
