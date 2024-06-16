import js from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import tsEslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tsEslint.config(
  js.configs.all,
  ...tsEslint.configs.all,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "@typescript-eslint": tsEslint.plugin,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "id-length": ["error", { exceptions: ["_"] }],
      "no-undefined": "off",
      "no-void": "off",
      "no-warning-comments": "off",
      "no-duplicate-imports": "off",
      "one-var": "off",
      "no-inline-comments": "off",
      "no-ternary": "off",
      "sort-imports": "off",
      "func-style": ["error", "declaration"],
      "sort-keys": "off",
      "no-await-in-loop": "off",
      camelcase: ["error", { properties: "never" }],

      // Sort imports https://github.com/lydell/eslint-plugin-simple-import-sort?tab=readme-ov-file#usage
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // https://typescript-eslint.io/
      "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  {
    ignores: ["dist", "eslint.config.js"],
  },
  configPrettier,
);
