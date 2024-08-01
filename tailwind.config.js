/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.handlebars", "./controllers/svg.js"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter']
      }
    },
  },
  plugins: [],
}