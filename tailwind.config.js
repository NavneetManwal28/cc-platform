/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cc: {
          red:     '#D0202A',
          crimson: '#A8181F',
          dark:    '#111111',
          charcoal:'#2A2A2A',
          grey:    '#4A4A4A',
          silver:  '#8A8A8A',
          light:   '#F5F5F5',
          white:   '#FFFFFF',
          gold:    '#C9A84C',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
