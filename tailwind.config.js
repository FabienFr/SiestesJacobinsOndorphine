/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // si vous utilisez Next.js 13+ avec le dossier /app
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
