module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
     // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "@typescript-eslint/adjacent-overload-signatures": 2,
    "@typescript-eslint/ban-ts-comment": 2,
    "@typescript-eslint/ban-types": 2,
    "@typescript-eslint/explicit-module-boundary-types": 2,
    "@typescript-eslint/no-empty-interface": 2,
    "@typescript-eslint/no-explicit-any": 1,
  },
};
