/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 asegúrate que incluye tsx/jsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class", // si quieres modo oscuro controlado por clase
};
