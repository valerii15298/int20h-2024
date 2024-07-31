// @ts-check

import tsEslint from "typescript-eslint";
import baseConfig from "@vpetryniak/eslint-config-base";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tsEslint.config(
  ...baseConfig,
  { languageOptions: { parserOptions: { projectService: true } } },
  {
    plugins: {
      // @ts-ignore
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    // @ts-ignore
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "error",
      "max-lines-per-function": "off", // ! FIX this
      "max-statements": "off", // ! FIX this
    },
    files: ["web/**/*.{ts,tsx}"],
  },
);
