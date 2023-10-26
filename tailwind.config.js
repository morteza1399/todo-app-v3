/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxs: '320px',
      xs: '375px',
      sm: '425px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    colors: {
      'dark': {
        100: 'hsl(235, 24%, 19%)',
        200: 'hsl(235, 21%, 11%)'
      },
      'white': {
        100: 'hsl(234, 39%, 85%)',
        200: 'hsl(236, 33%, 92%)'
      },
      'gray': {
        100: 'hsl(234, 11%, 52%)',
        200: 'hsl(233, 14%, 35%)',
        300: 'hsl(237, 14%, 26%)'
      },
      blue: '#60a5fa',
      purple: '#a855f7'
    },
    fontFamily: {
      josefin: 'Josefin'
    },
    extend: {},
  },
  plugins: [],
};