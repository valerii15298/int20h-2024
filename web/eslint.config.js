import js from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  // eslint.configs.all,
  // ...tsEslint.configs.all,
  js.configs.recommended,
  ...tsEslint.configs.recommended,
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
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      // ...reactHooks.configs.recommended.rules,
      // "capitalized-comments": "off",
      // "multiline-comment-style": "off",
      // "no-warning-comments": "off",

      // Sort imports https://github.com/lydell/eslint-plugin-simple-import-sort?tab=readme-ov-file#usage
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      // "sort-imports": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
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
