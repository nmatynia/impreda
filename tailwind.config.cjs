/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlack: "#171717",
        primaryWhite: "#FFFFFF",
      },
      fontFamily: {
        primary: "Roboto Condensed, sans-serif",
      },
      letterSpacing: {
        paragraph: "0.02em",
      },
    },
  },
  plugins: [],
};
