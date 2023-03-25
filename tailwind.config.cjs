/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        primaryBlack: '#171717',
        primaryWhite: '#FFFFFF'
      },
      fontFamily: {
        primary: 'Roboto Condensed, sans-serif'
      },
      letterSpacing: {
        paragraph: '0.02em'
      },
      keyframes: {
        rotate: {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
            transform: 'rotate(180deg)'
          }
        }
      },
      animation: {
        rotate: 'rotate 2s linear;'
      },
      spacing: {
        screenWithoutHeader: 'calc(100vh - 109px)'
      },
      minHeight: {
        screenWithoutHeader: 'calc(100vh - 109px)'
      },
      boxShadow: {
        outline: '0 0 0 1px #000000'
      }
    }
  },
  plugins: []
};
