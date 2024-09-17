/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#b3b3b3",
          5: '#ADADAD'
        },
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #3333A3 5.09%, #121212 33.4%)',
      },
    },
  },
  plugins: [],
}