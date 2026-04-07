import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Allow empty interfaces for type extension patterns
      "@typescript-eslint/no-empty-object-type": "off",
      // Allow setState in effects for data fetching patterns
      "react-hooks/set-state-in-effect": "off",
      // Allow manual memoization with React Compiler
      "react-hooks/preserve-manual-memoization": "off",
      // Allow any types for Convex client patterns
      "@typescript-eslint/no-explicit-any": "off",
      // Allow img elements in specific contexts
      "@next/next/no-img-element": "off",
      // Allow useCallback with non-inline functions
      "react-hooks/use-memo": "off",
    },
  },
]);

export default eslintConfig;
