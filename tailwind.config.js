/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
