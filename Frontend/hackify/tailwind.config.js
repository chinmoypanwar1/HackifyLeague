/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@aceternity/ui/**/*.{js,ts,jsx,tsx}", // Add this line for Aceternity components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

