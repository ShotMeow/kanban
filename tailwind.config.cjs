/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#5A54D6',
        warning: '#D03838',
        success: '#52C41A',
        gray: '#707088',
        'gray-stroke': '#3D3D4E',
        'gray-dark': '#22222B',
        dark: '#191921',
        black: '#13131A',
      },
      boxShadow: {
        base: '0px 0px 40px 4px rgba(0, 0, 0, 0.04)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
