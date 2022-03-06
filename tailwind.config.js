module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: []
  },
  mode: "jit",
  plugins: [require("daisyui")],
}