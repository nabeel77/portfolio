/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  daisyui: {
    themes: [
      {
        luxury: {
          ...require('daisyui/src/colors/themes')['[data-theme=luxury]'],
          accent: '#dca54c',
          'primary-focus': 'mediumblue',
        },
      },
    ],
  },
  theme: {
    extend: {
      screens: {
        small: '320px',
      },
      colors: {
        blue: {
          cadet: '#004445',
          sea: '#20948b',
          rain: '#2c7873',
          electric: '#42C6CC',
          greenishBlue: '#00BBC4',
          darker: '#001f2b',
        },
        gray: {
          lighter: '#d3d3d3',
          loadingBg: 'rgba(211, 211, 211, 0.1)',
        },
        orange: {
          html: '#e34f26',
        },
        black: {
          opac: 'rgba(35, 36, 35, .1)',
        },
      },
      width: {
        30: '30%',
      },
      maxWidth: {
        '1/2': '50%',
      },
      height: {
        '50vh': '50vh',
      },
      boxShadow: {
        light: '0 20px 25px -5px rgba(106, 177, 135, 0.4)',
        '3xl': '0 35px 60px -15px rgba(33, 245, 255, 0.4)',
        '5xl': '0 36px 100px 5px rgba(33, 245, 255, 0.5)',
      },
      keyframes: {
        fullspin: {
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
      },
      animation: {
        fullSpin: 'fullSpin 3s linear infinite',
      },
      daisyui: {
        themes: [
          'light',
          'dark',
          'cupcake',
          'bumblebee',
          'emerald',
          'corporate',
          'synthwave',
          'retro',
          'cyberpunk',
          'valentine',
          'halloween',
          'garden',
          'forest',
          'aqua',
          'lofi',
          'pastel',
          'fantasy',
          'wireframe',
          'black',
          'luxury',
          'dracula',
          'cmyk',
          'autumn',
          'business',
          'acid',
          'lemonade',
          'night',
          'coffee',
          'winter',
        ],
      },
      zIndex: {
        99999999: '99999999',
      },
      gridColumn: {
        'span-5': '2 / span 5',
      },
    },
  },
  plugins: [require('daisyui')],
};
