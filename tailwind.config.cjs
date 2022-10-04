/* eslint-disable @typescript-eslint/no-var-requires */
const { rose, neutral } = require('tailwindcss/colors');
const fluidTypography = require('tailwind-fluid-typography');
const themer = require('tailwindcss-themer');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    fontFamily: { serif: ["'Nunito', system-ui"] },
    extend: {
      maxWidth: { prose: '50ch' },
      borderColor: ({ theme }) => ({ DEFAULT: theme('colors.brand.3') }),
    },
  },
  plugins: [
    fluidTypography,
    themer({
      themes: [
        {
          name: 'light',
          extend: {
            textColor: { 1: neutral[800], 2: neutral[900] },
            backgroundColor: { 1: neutral[100], 2: neutral[200] },
            colors: { brand: { 1: rose[400], 2: rose[500], 3: rose[600] } },
          },
        },
        {
          name: 'dark',
          extend: {
            textColor: { 1: neutral[100], 2: neutral[200] },
            backgroundColor: { 1: neutral[900], 2: neutral[800] },
            colors: { brand: { 1: rose[400], 2: rose[300], 3: rose[200] } },
          },
        },
      ],
    }),
    ({ addBase, addComponents, theme }) => {
      addBase({
        body: {
          color: theme('textColor.1'),
          backgroundColor: theme('backgroundColor.1'),
        },
        'a, button': {
          borderRadius: theme('borderRadius.md'),
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: theme('colors.brand.1'),
            outlineOffset: theme('outlineOffset.4'),
          },
        },
      });

      addComponents({
        '.text-gradient': {
          backgroundClip: 'text',
          color: theme('colors.transparent'),
          backgroundImage:
            `linear-gradient(45deg,` +
            `${theme('colors.brand.1')},` +
            `${theme('colors.brand.2')})`,
        },
      });
    },
  ],
};
