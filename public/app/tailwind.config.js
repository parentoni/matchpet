/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        "primary": "#FA8128",
        "loading": "#e5e7eb"
      },
    },
  },
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["[data-theme=light]"],
        "primary": "FFA1F5",
        
      }
    }]
  },
 plugins: [require("daisyui")],
}