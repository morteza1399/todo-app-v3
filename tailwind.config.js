/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // Background Images
      backgroundImage: {
        "desktop-dark": "url('@/assets/images/bg-desktop-dark.jpg')",
        "mobile-dark": "url('@/assets/images/bg-mobile-dark.jpg')",
        "desktop-light": "url('@/assets/images/bg-desktop-light.jpg')",
        "mobile-light": "url('@/assets/images/bg-mobile-light.jpg')",
      },

      // Fonts
      fontFamily: {
        josefin: ["Josefin", "Arial"],
      },

      // Colors
      colors: {
        dark: {
          100: "hsl(235, 24%, 19%)",
          200: "hsl(235, 21%, 11%)",
        },
        white: {
          100: "hsl(234, 39%, 85%)",
          200: "hsl(236, 33%, 96%)",
          300: "hsl(233, 11%, 84%)",
          400: "hsl(0, 0%, 98%)",
        },
        gray: {
          100: "hsl(234, 11%, 52%)",
          200: "hsl(233, 14%, 35%)",
          300: "hsl(237, 14%, 26%)",
          400: "hsl(236, 9%, 61%)",
        },
        blue: {
          100: "hsl(192, 100%, 67%)",
          200: "hsl(220, 98%, 61%)",
          300: "hsl(235, 19%, 35%)",
          400: "hsl(235, 19%, 30%)",
        },
        purple: "hsl(280, 87%, 65%)",
      },
    },
  },
  plugins: [],
};
