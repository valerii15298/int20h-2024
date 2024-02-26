// @ts-check

// @ts-expect-error eslint does not have types yet
import eslint from "@eslint/js";
// @ts-expect-error eslint-config-prettier does not have correct types yet
import eslintConfigPrettier from "eslint-config-prettier";
// @ts-expect-error tsEslint does not have correct types yet
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  {
    ignores: ["dist"],
  },

  {
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint.plugin,
    },
  },

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
