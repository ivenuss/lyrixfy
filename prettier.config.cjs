/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: 'always',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  plugins: [require.resolve('prettier-plugin-tailwindcss')]
};
