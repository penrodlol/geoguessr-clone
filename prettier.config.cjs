/** @type {import('prettier').Config} */
module.exports = {
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "proseWrap": "always",
  plugins: [require("prettier-plugin-tailwindcss")],
};
