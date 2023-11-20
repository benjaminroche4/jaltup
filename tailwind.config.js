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
        'main-light':'#594893',
        'second':'#714EFF',
        'second-light':'#edeafd',
        'pastel-light': '#FFF5F1',
        'pastel-strong': '#FED6B0',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

