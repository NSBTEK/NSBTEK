export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A1A44",     // deep navy
        accent: "#246BFD",      // electric blue
        light: "#F8FAFF",       // page background
        card: "#FFFFFF",        // card background
        outline: "#E2E8F0"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}