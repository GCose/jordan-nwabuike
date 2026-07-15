import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "prefer-arrow-callback": "error",
      "object-shorthand": "error",
      eqeqeq: ["error", "always"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-alert": "error",
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-else-return": "error",
      "no-lonely-if": "error",
      "no-nested-ternary": "warn",
      "no-param-reassign": ["error", { props: false }],
      "no-return-assign": "error",
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-unneeded-ternary": "error",
      "no-useless-concat": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      radix: "error",
      yoda: "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@next/next/no-img-element": "error",
      "react/self-closing-comp": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
