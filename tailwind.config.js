/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
  safelist: [
    {
      pattern: /bg-sky-(100|200|700)/,
    },
    {
      pattern: /text-sky-(100|200|700)/,
    },
  ],
};
