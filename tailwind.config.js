/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/*/*.ejs", "./controllers/svg.js"],
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