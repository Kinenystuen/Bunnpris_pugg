import globals from "globals";
import pluginJs from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";

export default [
  // Base configuration for all JS files
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      js: pluginJs,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },
  // Configuration for test files
  {
    files: ["**/*.test.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        jest: true,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      "jest/prefer-expect-assertions": "off",
    },
  },
];
