import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  {
    ignores: ["dist", "eslint.config.js"],
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
  ...tsEslint.configs.recommended,
  {
    rules: {
      "capitalized-comments": "off",
      "multiline-comment-style": "off",
      "no-warning-comments": "off",
      "one-var": "off",
      "sort-imports": "off",
      "sort-keys": "off",
      "no-await-in-loop": "off",
      "id-length": "off",
      "no-shadow": "off",
      "func-style": "off",
      camelcase: "off",
      "no-magic-numbers": [
        "error",
        {
          ignoreArrayIndexes: true,
          ignore: [-1],
        },
      ],
      "@typescript-eslint/no-namespace": [
        "error",
        {
          allowDeclarations: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  eslintConfigPrettier,
);
