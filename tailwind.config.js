/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul': '#0a192f',
        'dourado': '#cda434',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}