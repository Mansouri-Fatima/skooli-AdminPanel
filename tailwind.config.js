/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Chemins corrects
  theme: {
    extend: {
      colors: {
        primary: "#52BD94",
        secondary: "#FCC068",
        dark: "#0E2B34",
        transparentPrimary: "#52BD944D",
      },
    },
  },
  plugins: [],
};