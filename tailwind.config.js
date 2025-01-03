/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        grass: {
          100: "#d3f3df",
          200: "#a7e8bf",
          300: "#7adc9e",
          400: "#4ed17e",
          500: "#22c55e",
          600: "#1b9e4b",
          700: "#147638",
          800: "#0e4f26",
          900: "#072713",
        },
        fire: {
          100: "#fcdada",
          200: "#f9b4b4",
          300: "#f58f8f",
          400: "#f26969",
          500: "#ef4444",
          600: "#bf3636",
          700: "#8f2929",
          800: "#601b1b",
          900: "#300e0e",
        },
        water: {
          100: "#d8e6fd",
          200: "#b1cdfb",
          300: "#89b4fa",
          400: "#629bf8",
          500: "#3b82f6",
          600: "#2f68c5",
          700: "#234e94",
          800: "#183462",
          900: "#0c1a31",
        },
        lightning: {
          100: "#fbf0ce",
          200: "#f7e19c",
          300: "#f2d16b",
          400: "#eec239",
          500: "#eab308",
          600: "#bb8f06",
          700: "#8c6b05",
          800: "#5e4803",
          900: "#2f2402",
        },
        psychic: {
          100: "#eeddfd",
          200: "#dcbbfc",
          300: "#cb99fa",
          400: "#b977f9",
          500: "#a855f7",
          600: "#8644c6",
          700: "#653394",
          800: "#432263",
          900: "#221131",
        },
        fighting: {
          100: "#fee3d0",
          200: "#fdc7a2",
          300: "#fbab73",
          400: "#fa8f45",
          500: "#f97316",
          600: "#c75c12",
          700: "#95450d",
          800: "#642e09",
          900: "#321704",
        },
        darkness: {
          100: "#cdf0f6",
          200: "#9be2ee",
          300: "#6ad3e5",
          400: "#38c5dd",
          500: "#06b6d4",
          600: "#0592aa",
          700: "#046d7f",
          800: "#024955",
          900: "#01242a",
        },
        metal: {
          100: "#e3e3e4",
          200: "#c6c6ca",
          300: "#aaaaaf",
          400: "#8d8d95",
          500: "#71717a",
          600: "#5a5a62",
          700: "#444449",
          800: "#2d2d31",
          900: "#171718",
        },
        fairy: {
          100: "#fbdaeb",
          200: "#f7b6d6",
          300: "#f491c2",
          400: "#f06dad",
          500: "#ec4899",
          600: "#bd3a7a",
          700: "#8e2b5c",
          800: "#5e1d3d",
          900: "#2f0e1f",
        },
        colorless: {
          100: "#e3e3e3",
          200: "#c7c7c7",
          300: "#ababab",
          400: "#8f8f8f",
          500: "#737373",
          600: "#5c5c5c",
          700: "#454545",
          800: "#2e2e2e",
          900: "#171717",
        },
        dragon: {
          100: "#fdecce",
          200: "#fbd89d",
          300: "#f9c56d",
          400: "#f7b13c",
          500: "#f59e0b",
          600: "#c47e09",
          700: "#935f07",
          800: "#623f04",
          900: "#312002",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
  safelist: [
    {
      pattern:
        /(bg|text|border|ring)-(grass|fire|water|lightning|psychic|fighting|darkness|metal|fairy|colorless|dragon)-(100|200|700)/,
    },
  ],
};
