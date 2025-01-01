/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        background: 'var(--background)',
      },
      colors: {
        primary: {
          navy: '#0F1C2E',
          gold: '#957F5A',
        },
        background: 'var(--background)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.5', transform: 'scale(0.9)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spin: 'spin 1s linear infinite',
        ripple: 'ripple 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      borderRadius: theme => ({
        DEFAULT: '5px',
        'none': '0',
        'sm': '5px',
        'md': '5px',
        'lg': '5px',
        'xl': '5px',
        '2xl': '5px',
        'full': '9999px',
      }),
    },
  },
  plugins: [],
};