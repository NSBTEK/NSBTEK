/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d9488',   // teal color for headings, buttons, etc.
        secondary: '#334155', // dark gray for text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // set default font
      },
    },
  },
  plugins: [],
}
