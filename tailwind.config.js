/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  daisyui: {
    themes: [
      {
        luxury: {
          ...require('daisyui/src/colors/themes')['[data-theme=luxury]'],
          accent: '#dca54c',
          'primary-focus': 'mediumblue',
        },
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          'primary-focus': 'mediumblue',
        },
        night: {
          ...require('daisyui/src/colors/themes')['[data-theme=night]'],
          accent: '#b4c6ef',
          'primary-focus': 'mediumblue',
        },
        forest: {
          ...require('daisyui/src/colors/themes')['[data-theme=forest]'],
          accent: '#d6cbcb',
          'primary-focus': 'mediumblue',
        },
        autumn: {
          ...require('daisyui/src/colors/themes')['[data-theme=autumn]'],
          'primary-focus': 'mediumblue',
        },
        halloween: {
          ...require('daisyui/src/colors/themes')['[data-theme=halloween]'],
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
        60: '60%',
      },
      maxWidth: {
        '1/2': '50%',
      },
      height: {
        '50vh': '50vh',
        90: '90px',
      },
      boxShadow: {
        light: '0 20px 25px -5px rgba(106, 177, 135, 0.4)',
        '3xl': '0 20px 30px -20px rgba(220, 165, 76, 0.3)',
        '5xl': '0 36px 100px 5px rgba(220, 165, 76, 0.5)',
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
        9999: '9999',
      },
      gridColumn: {
        'span-5': '2 / span 5',
      },
      fontFamily: {
        OrbitronBold: ['Orbitron-bold', 'Arial', 'sans-serif'],
        RalewayMedium: ['Raleway-Medium', 'Arial', 'sans-serif'],
        RalewayBold: ['Raleway-Bold', 'Arial', 'sans-serif'],
      },
      gridTemplateColumns: {
        lg: 'repeat(auto-fill, minmax(200px, 1fr))',
        md: 'repeat(auto-fill, minmax(100px, 1fr))',
        accordionLg: '50% 45% auto',
        accordionMd: '35% 60% auto',
        accordionSm: '90% auto',
        accordionPop: '85% auto',
      },
      gridTemplateRows: {
        lg: 'repeat(auto-fill, minmax(200px, 1fr))',
        md: 'repeat(auto-fill, minmax(100px, 1fr))',
        accordionLg: '90% auto',
        accordionMd: '35% 60% auto',
        accordionSm: 'auto auto',
      },
      flex: {
        0.5: '0.5',
      },
    },
  },
  plugins: [require('daisyui')],
};
