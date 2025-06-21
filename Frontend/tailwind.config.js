/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",              // include the main HTML
    "./src/**/*.{js,jsx,ts,tsx}" // include all React files
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#6366F1', // indigo-500
        secondary: '#EC4899', // pink-500
      },
    },
  },
  darkMode: 'class', // use 'media' or false if you don’t want to support dark mode
  plugins: [],
}
