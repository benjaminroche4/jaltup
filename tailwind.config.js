/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
  ],
  theme: {
    extend: {
      colors: {
        'main':'#0F0049',
        'second':'#714EFF',
        'light': '#FFF5F1',
        'pastel-jaltup': '#FED6B0',
      }
    },
  },
  plugins: [],
}

