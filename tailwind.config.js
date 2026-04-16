/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slateSoft: '#f8fafc',
        primary: '#4f46e5',
      },
    },
  },
  plugins: [],
}

