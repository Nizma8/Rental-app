/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        "customPink":"#DE3163"
      },
      fontFamily:{
        "customheading":'Noto Sans Japanese ,sans-serif'
      }
    },
  },
  plugins: [],
}

