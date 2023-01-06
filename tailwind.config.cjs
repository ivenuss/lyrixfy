const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', ...fontFamily.sans]
      },
      colors: {
        accent: '#31efb8', // #2dbe5f
        'accent-dark': '#00c1a2',
        'accent-hover': '#4DE7A8',
        primary: {
          100: '#F4F4F5',
          200: '#D1E2E2',
          300: '#92ADAD',
          600: '#272D34',
          700: '#21262C',
          800: '#1B1F24',
          900: '#121418'
        }
      },
      screens: {
        xs: '600px',
        sm: '620px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      },
      boxShadow: {
        '3xl': '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
      },
      backgroundSize: {
        landing: '120rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      keyframes: {
        'arrow-pulse': {
          '0%, to': {
            transform: 'translateZ(0)'
          },
          '50%': {
            transform: 'translate3d(4px, 0, 0)'
          }
        },
        'rotating-word': {
          '0%': {
            transform: 'translateY(-75%)'
          },
          '33%': {
            transform: 'translateY(-50%)'
          },
          '67%': {
            transform: 'translateY(-25%)'
          },
          to: {
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        'arrow-pulse': 'arrow-pulse 0.82s ease-in-out infinite',
        'rotating-word': 'rotating-word 6s infinite'
      }
    }
  },
  variants: {
    typography: ['dark']
  },
  plugins: []
};
