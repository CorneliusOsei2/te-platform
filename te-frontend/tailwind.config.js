/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,ts,jsx,tsx,html}",],
  purge: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),],
}
