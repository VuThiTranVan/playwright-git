import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import playwrightPlugin from "eslint-plugin-playwright";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      playwright: playwrightPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...playwrightPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-console": "warn",
    },
  },
  {
    ignores: ["node_modules/", "test-results/", "playwright-report/", "dist/"],
  },
];
