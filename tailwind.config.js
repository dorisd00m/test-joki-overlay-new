/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'anta': ["Anta", 'sans-serif'],
        'anton': ["Anton", 'sans-serif'],
      },
      backgroundImage: {
        'gif': 'var(--bg-gif)', // Bisa digunakan sebagai `bg-custom-bg`
      },
      backgroundColor: {
        'name-color': 'var(--bg-name-color)'
      },
    },
  },
  plugins: [],
}