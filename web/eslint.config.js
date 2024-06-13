import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsEslint from "typescript-eslint";

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
