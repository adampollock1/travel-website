/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette
        ocean: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99',
          800: '#0A1628',
          900: '#050B14',
        },
        coral: {
          50: '#FFF0EE',
          100: '#FFE1DD',
          200: '#FFC3BB',
          300: '#FFA599',
          400: '#FF8777',
          500: '#FF6B5B',
          600: '#CC5649',
          700: '#994037',
          800: '#662B25',
          900: '#331512',
        },
        sand: {
          50: '#FDFBF7',
          100: '#FAF6EF',
          200: '#F5E6D3',
          300: '#E8D4BC',
          400: '#D4BC9A',
          500: '#C0A478',
          600: '#9A8360',
          700: '#736248',
          800: '#4D4130',
          900: '#262118',
        },
      },
      fontFamily: {
        heading: ['Cabinet Grotesk', 'system-ui', 'sans-serif'],
        body: ['Satoshi', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(10, 22, 40, 0.1)',
        'card-hover': '0 20px 40px -8px rgba(10, 22, 40, 0.2)',
        'dropdown': '0 10px 40px -4px rgba(10, 22, 40, 0.15)',
      },
    },
  },
  plugins: [],
}
