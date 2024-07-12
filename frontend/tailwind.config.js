/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        LakesNeueRegular :['LakesNeueRegular'],
        TypewcondRegular : ['Typewcond-Regular'],
        CinzelRegular : ['Cinzel-Regular']
      }
    },
  },
  plugins: [],
}

