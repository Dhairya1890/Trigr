/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#6C3DFF",
        accent: "#00C896",
        warning: "#F59E0B",
        danger: "#EF4444",
        surface: "#F8F7FF",
        ink: "#0F0A1E",
        muted: "#6B7280",
        darkbg: "#0D0B1A",
        darksurface: "#1A1730"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

