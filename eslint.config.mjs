import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,

  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "prettier"
  ),

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      import: importPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        node: {},
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "jsx-a11y/alt-text": "off",
      "react/display-name": "off",
      "react/no-children-prop": "off",
      "@next/next/no-img-element": "off",
      "@next/next/no-page-custom-font": "off",

      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-non-null-assertion": "off",

      "lines-around-comment": [
        "error",
        {
          beforeBlockComment: true,
          beforeLineComment: true,
          allowBlockStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
        },
      ],

      "padding-line-between-statements": [
        "error",
        { blankLine: "any", prev: "export", next: "export" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
        {
          blankLine: "always",
          prev: "*",
          next: ["function", "multiline-const", "multiline-block-like"],
        },
        {
          blankLine: "always",
          prev: ["function", "multiline-const", "multiline-block-like"],
          next: "*",
        },
      ],

      "newline-before-return": "error",

      "import/newline-after-import": ["error", { count: 1 }],

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            ["internal", "parent", "sibling", "index"],
            ["object", "unknown"],
          ],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "next/**", group: "external", position: "before" },
            { pattern: "~/**", group: "external", position: "before" },
            { pattern: "@/**", group: "internal" },
          ],
          pathGroupsExcludedImportTypes: ["react", "type"],
          "newlines-between": "always-and-inside-groups",
        },
      ],

      "@typescript-eslint/ban-types": [
        "error",
        {
          extendDefaults: true,
          types: {
            Function: "Use a specific function type instead",
            Object: "Use object instead",
            Boolean: "Use boolean instead",
            Number: "Use number instead",
            String: "Use string instead",
            Symbol: "Use symbol instead",
            any: false,
            "{}": false,
          },
        },
      ],

      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  prettierPlugin,
];
