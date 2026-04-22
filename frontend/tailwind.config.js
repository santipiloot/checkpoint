/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066FF',
          dark: '#0052CC',
          DEFAULT: '#004ac6',
          container: '#2563eb',
        },
        secondary: '#6B7280',
        accent: '#F59E0B',
        surface: {
          DEFAULT: '#f7f9fb',
          'container-lowest': '#ffffff',
          'container-low': '#f2f4f6',
          'container-high': '#e6e8ea',
          'container-highest': '#e0e3e5',
        },
        'on-surface': {
          DEFAULT: '#191c1e',
          variant: '#434655',
        },
        'outline-variant': '#c3c6d7',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        'lg': '0.5rem',
      },
      boxShadow: {
        'ambient': '0 10px 40px rgba(25, 28, 30, 0.06)',
      }
    },
  },
  plugins: [],
}
