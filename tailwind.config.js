/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#35beb2",
        button: "#bceb21",
        buttondark: "#aad422",
      },
      fontFamily: {
        title: ["Big Shoulders Text", "sans-serif"],
        main: ["Rajdhani", "sans-serif"],
        bubble: ["Rubik Bubbles", "sans-serif"],
        dirt: ["Rubik Dirt", "sans-serif"],
      },
    },
    animation: {},
  },
  plugins: [],
};
