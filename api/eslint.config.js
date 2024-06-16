import tsEslint from "typescript-eslint";
import baseConfig from "@vpetryniak/eslint-config-base";

export default tsEslint.config(...baseConfig, {
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
