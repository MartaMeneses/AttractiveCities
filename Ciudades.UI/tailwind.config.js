/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'thuas-groen-base': '#9ea700',
        'thuas-groen-light': '#adb426',
        'thuas-groen-lighter': '#bbc14d',
        'thuas-groen-lighter': '#cfd380',
        'thuas-groen-dark': '#969f00',
        'thuas-groen-darker': '#8c9600',
        'thuas-groen-darkest': '#828c00',
        'TALENT-GRIS-FONDO': '#484f57',
        'thuas-grijs-base': '#223343',
        'thuas-grijs-light': '#43525f',
        'thuas-grijs-lighter': '#64707b',
        'thuas-grijs-lighter': '#9199a1',
        'thuas-grijs-dark': '#1e2e3d',
        'thuas-grijs-darker': '#192734',
        'thuas-grijs-darkest': '#14202c',
        'thuas-rood-base': '#ca433c',
        'thuas-rood-light': '#d25f59',
        'thuas-rood-dark': '#c53d36'
      },
    },
  },
  plugins: [],
}
