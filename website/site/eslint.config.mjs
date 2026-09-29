import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Flat config. `next lint` was removed in Next 16, so `npm run lint` calls eslint directly.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "playwright-report/**", "test-results/**", ".open-next/**", ".wrangler/**", "cloudflare-env.d.ts"]),
]);

export default eslintConfig;
