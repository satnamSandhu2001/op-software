/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      keyframes: {
        moving: {
          '0%': { transform: 'translatey(0px)' },
          '20%': { transform: 'translatex(-50px)' },
          '50%': { transform: 'translatey(-40px)' },
          '100%': { transform: 'translatey(0px)' },
        },
        movingSpin: {
          '0%': { transform: 'translatey(0px) rotate(-50deg)' },
          '20%': { transform: 'translatex(-50px)' },
          '50%': { transform: 'translatey(-40px) rotate(180deg)' },
          '100%': { transform: 'translatey(0px) rotate(-50deg)' },
        },
        moving2: {
          '0%': { transform: 'translate(0px)' },
          '40%': { transform: 'translate(50px,-50px)' },
          '75%': { transform: 'translatex(-200px) scale(0.5)' },
          '100%': { transform: 'translate(0px)' },
        },
        movingX: {
          '50%': { transform: 'translateX(10px)' },
        },
        movingXlarge: {
          '50%': { transform: 'translateX(-100%)' },
        },
        movingY: {
          '100%': { transform: 'translateY(-20px)' },
        },
        scale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      colors: {
        blue: '#600EE4',
      },
      transitionProperty: {
        height: 'height',
        border: 'border',
      },
      boxShadow: {
        'inner-2': 'inset 0px 0px 10px rgb(0 0 0 / 0.3);',
        'outer-2': '2px 2px 10px rgb(0 0 0 / 0.4);',
        'outer-left': '-5px 5px 10px rgb(0 0 0 / 0.4);',
        'bottom-nav': '0px 2px 10px rgb(0 0 0 / 0.1);',
        'soft-xl': '2px 5px 10px rgb(0 0 0 / 0.10);',
        'soft-sm': '1px 2px 3px rgb(0 0 0 / 0.10);',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
        Urbanist: ['Urbanist', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '750px',
          },
          '@screen lg': {
            maxWidth: '970px',
          },
          '@screen xl': {
            maxWidth: '1170px',
          },
        },
      });
    },
  ],
};
