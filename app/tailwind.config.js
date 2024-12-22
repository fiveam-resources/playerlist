/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#151618",
        muted: "#212224",
        tooltip: "#313236",
      },
    },
  },
  plugins: [],
};
