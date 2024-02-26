// @ts-check

import * as tsEslint from "typescript-eslint";
// @ts-expect-error eslint does not have types yet
import eslint from "@eslint/js";
// @ts-expect-error eslint-config-prettier does not have correct types yet
import eslintConfigPrettier from "eslint-config-prettier";
// @ts-expect-error eslint-plugin-react-hooks does not have types yet
import reactHooks from "eslint-plugin-react-hooks";
// @ts-expect-error eslint-plugin-react-refresh does not have types yet
import reactRefresh from "eslint-plugin-react-refresh";

export default tsEslint.config(
  {
    // TODO fix and add these files to eslint
    ignores: [
      "dist",
      "tailwind.config.ts",
      "vite.config.ts",
      "postcss.config.js",
    ],
  },

  // {
  //     plugins: {
  //         '@typescript-eslint': tseslint.plugin,
  //     },
  //     languageOptions: {
  //         parser: tseslint.parser,
  //         parserOptions: {
  //             project: true,
  //         },
  //     },
  // },

  eslint.configs.all,
  // ...tsEslint.configs.all,
  {
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "capitalized-comments": "off",
      "multiline-comment-style": "off",
      "no-warning-comments": "off",
      // "@typescript-eslint/no-unused-vars": [
      //     "warn",
      //     { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      // ],
    },
  },
  eslintConfigPrettier,
);
