module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      extends: [
        "react-app",
        "react-app/jest",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:prettier/recommended",
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint", "import"],
      rules: {
        "no-console": ["warn"],
        "spaced-comment": [
          "error",
          "always",
          {
            markers: ["/"],
          },
        ],
        "comma-dangle": ["error", "always-multiline"],
        "no-shadow": ["off"],
        "sort-imports": [
          "error",
          {
            ignoreDeclarationSort: true,
          },
        ],
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              "unknown",
              "parent",
              "sibling",
              "index",
              "object",
            ],
            alphabetize: {
              order: "asc",
            },
          },
        ],
        "@typescript-eslint/no-shadow": ["warn"],
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
        "@typescript-eslint/no-unused-vars": [
          "warn",
          { args: "all", argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/prefer-regexp-exec": ["off"],
        "react-hooks/exhaustive-deps": [
          "warn",
          {
            additionalHooks: "useRecoilCallback",
          },
        ],
      },
    },
  ],
};
