module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "google",
    "eslint:recommended",
    //"prettier",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "object-curly-spacing": 0, // google: Prettier me formatea import { from } from "rxjs"; pero se obliga a import {from} from "rxjs";
    "quotes": 0, // google: No se desea obligar a que solo se use comilla simple, quiero poder escribir 'Esto "es" fácil', en vez de "Esto \"es\" fácil".
  },
};
