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
        'text-main': "#1A1F36",
        'text-soft': "#4A5568",
        outline: "#E2E8F0"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(10,26,68,0.10)',
      },
      borderRadius: {
        'xl': '1rem'
      }
    },
  },
  plugins: [],
}
