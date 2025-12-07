/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        billiard: {
          dark: '#0f0f23',
          green: '#1a3c34',
          gold: '#d4af37',
          neon: '#00ff88'
        }
      }
    },
  },
  plugins: [],
}
