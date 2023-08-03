/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        textColor: '#2E3271',
        secondaryColor: '#7C8DB5B8'
      },
      borderRadius: {
        borderLarge: '40px'
      }
    },
  },
  plugins: [],
}
