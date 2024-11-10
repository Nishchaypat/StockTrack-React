// frontend/tailwind.config.js
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          gray: {
            900: '#1a202c',
            800: '#2d3748',
            700: '#4a5568',
          },
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };