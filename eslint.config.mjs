import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser"; // 추가
import next from "eslint-plugin-next"; // Next.js 전용 플러그인

const eslintConfig = [
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["dist", ".next"], // Next.js의 빌드 폴더 무시
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslintParser, // TypeScript 파서 추가
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslint,
      next: next, // Next.js 플러그인 추가
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-explicit-any": "off",

      // Next.js 권장 규칙 추가
      ...next.configs.recommended.rules,
    },
  },
];

export default eslintConfig;