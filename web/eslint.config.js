import js from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  js.configs.all,
  ...tsEslint.configs.all,
  {
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      "@typescript-eslint": tsEslint.plugin,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        fetch: "readonly",
        process: "readonly",
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "max-statements": "off", // ! TODO fix this
      "max-lines-per-function": "off", // ! TODO fix this
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
      // Sort imports https://github.com/lydell/eslint-plugin-simple-import-sort?tab=readme-ov-file#usage
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
    },
    files: ["src/**/*.{ts,tsx}"],
  },
  {
    // TODO fix and add these files to eslint
    ignores: [
      "dist",
      "tailwind.config.ts",
      "vite.config.ts",
      "postcss.config.js",
      "eslint.config.js",
      "src/routeTree.gen.ts",
      "src/components/*",
    ],
  },
  configPrettier,
);
