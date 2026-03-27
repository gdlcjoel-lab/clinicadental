/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: '#A8DADC', // Soft Mint Green (Adjusted for better aesthetic)
        pearl: '#F8F9FA', // Pearl White
        slate: '#1D3557', // Deep Slate Gray (Adjusted for better aesthetic)
      },
    },
  },
  plugins: [],
}
