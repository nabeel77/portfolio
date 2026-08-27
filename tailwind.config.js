/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        surface2: 'rgb(var(--surface-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        brand: {
          pink: '#ff5c8a',
          coral: '#ff8a5c',
          orange: '#ffa14a',
          violet: '#8b5cf6',
          purple: '#a855f7',
        },
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
      },
      boxShadow: {
        glow: '0 20px 60px -20px rgba(139, 92, 246, 0.45)',
        card: '0 10px 40px -18px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '33%': { transform: 'translateY(-30px) translateX(20px) scale(1.05)' },
          '66%': { transform: 'translateY(20px) translateX(-20px) scale(0.97)' },
        },
        wave: {
          '0%, 60%, 100%': { transform: 'rotate(0deg)' },
          '10%, 30%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        'floaty-slow': 'floaty 16s ease-in-out infinite',
        'floaty-mid': 'floaty 12s ease-in-out infinite',
        wave: 'wave 2.4s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};
