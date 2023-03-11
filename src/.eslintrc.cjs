module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ['@typescript-eslint'],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "indent": ["error", 2],
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-explicit-any": ["off"],
    "no-console": 0,
    "semi": 1
  }
};
