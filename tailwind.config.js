/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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