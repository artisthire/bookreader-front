/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
    colors: {
      gray: {
        100: "#F6F7FB",
        200: "#F5F7FA",
        250: "#E0E5EB",
        300: "#B1B5C2",
        400: "#A6ABB9",
        450: "#6D7A8D",
        500: "#898F9F",
        600: "#242A37",
      },
      white: "#FFFFFF",
      black: "#000000",
      blue: "#091E3F",
      orange: "#FF6B08",
      "dark-orange": "#D15807",
      red: "#BE3232",
      transparent: "transparent",
      current: "currentColor",
    },
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1280px",
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        md: "2rem",
        lg: "1rem",
      },
    },
  },
  plugins: [],
};
