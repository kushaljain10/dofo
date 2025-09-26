/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#4F46E5", // Indigo
          600: "#4338ca",
          700: "#3730a3",
        },
        secondary: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          500: "#0D9488", // Teal
          600: "#0d9488",
          700: "#0f766e",
        },
      },
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};
