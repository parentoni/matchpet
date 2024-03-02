/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        "primary": "#FA8128",
        "loading": "#e5e7eb",
        "text": "#202020",
        "neutral": "#fafafa",
        "border": "#e6e6e6",
        "neutral-text": "#5f5f5f"
      },
    },
  },
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["[data-theme=light]"],
        "primary": "FFA1F5",
        "hover": "rgb(0, 0, 0, 0.05)"
      }
    }]
  },
 plugins: [require("daisyui")],
}
