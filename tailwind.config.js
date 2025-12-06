/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        holiday: {
          red: '#DC2626',
          green: '#16A34A',
          gold: '#CA8A04',
        }
      }
    },
  },
  plugins: [],
}
