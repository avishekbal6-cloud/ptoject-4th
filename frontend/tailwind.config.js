/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './public/**/*.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        surface: {
          DEFAULT: '#111317',
          muted: '#191c22',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        ui: '0 1px 2px 0 rgb(0 0 0 / 0.35), 0 1px 3px 0 rgb(0 0 0 / 0.25)',
        'ui-md': '0 10px 20px -8px rgb(0 0 0 / 0.45), 0 4px 8px -4px rgb(0 0 0 / 0.25)',
        'ui-lg': '0 24px 48px -16px rgb(0 0 0 / 0.6), 0 8px 16px -8px rgb(0 0 0 / 0.3)',
      },
    },
  },
  plugins: [],
};
