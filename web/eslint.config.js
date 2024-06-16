import tsEslint from "typescript-eslint";
import baseConfig from "@vpetryniak/eslint-config-base";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tsEslint.config(
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "error",
      "max-lines-per-function": "off", // ! FIX this
      "max-statements": "off", // ! FIX this
    },
  },
  {
    ignores: [
      "dist",
      "tailwind.config.ts",
      "vite.config.ts",
      "postcss.config.js",
      "eslint.config.js",
      "src/routeTree.gen.ts",
    ],
  },
);
