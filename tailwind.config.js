/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,css,scss}',
  ],
  darkMode: 'class', // 'media' is the default, change to 'class' if you want to use dark mode in with class names
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          xs: '570px',
          sm: '640px',
          md: '768px',
          lg: '960px',
          xl: '1200px',
        },
      },
      colors: {
        primary: '#02264d',
        secondary: {
          800: '#010f27',
          700: '#00162f',
          600: '#051a33db'
        },
      },
    },
  },
  plugins: [
  ],
}
