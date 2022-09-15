module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange:"#e17038",
        white:"#ebebeb",
        lightgrey:"#c0c0c0",
        turquoise:"#6ebca1",
        green:"#30aa6d",
        grey:"#606060",
        darkgrey:"#373737",
      }
    },
  },
  plugins: [
    require("daisyui")
  ]
}
