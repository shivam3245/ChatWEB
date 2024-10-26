/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'scrollbar-track': '#4b5563', 
        'scrollbar-thumb': '#8b5cf6',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), 
  ],
}
