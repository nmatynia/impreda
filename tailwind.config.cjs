/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
      }
    }
  },
  plugins: []
};
