/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  jit: true,
  theme: {
    extend: {
      backgroundImage: (theme) => ({
       "hero-pattern": "url('pattern-bg.png')",
      })
    },
  },
  plugins: [],
}
