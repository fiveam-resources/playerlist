/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7285cf",
        background: "#11131c",
        muted: "#1c202e",
        tooltip: "#2a3042",
      },
    },
  },
  plugins: [],
};
