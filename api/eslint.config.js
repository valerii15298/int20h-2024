// @ts-check

import * as tsEslint from "typescript-eslint";
// @ts-expect-error eslint does not have types yet
import eslint from "@eslint/js";
// @ts-expect-error eslint-config-prettier does not have correct types yet
import eslintConfigPrettier from "eslint-config-prettier";

export default tsEslint.config(
  {
    // TODO fix and add these files to eslint
    ignores: ["dist"],
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
    rules: {
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
