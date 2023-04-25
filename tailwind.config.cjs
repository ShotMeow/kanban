const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
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
  darkMode: ['class'],
  plugins: [
    plugin(({addVariant, e}) => {
      addVariant('gdark', ({container, separator}) => {
        container.walkRules((rule) => {
          const className = rule.selector.slice(1);
          rule.selector = `:global(.dark) .${e(`gdark${separator}${className}`)}`;
        })
      })
    })
  ],
}

