/** @type {import('tailwindcss').Config} */
<<<<<<< HEAD
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@aceternity/ui/**/*.{js,ts,jsx,tsx}", // Add this line for Aceternity components
  ],
  theme: {
    extend: {},
=======
export default{
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    // your existing config
    extend: {
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
    },
>>>>>>> ffceaa522611f7c6aed36909b0f40577eb138b55
  },
  plugins: [],
}

