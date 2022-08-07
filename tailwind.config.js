/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        display: ["group-hover"],
        hot: {
          900: "#fbcccc",
          800: "#f9a7a7",
          700: "#f79595",
          600: "#f57171",
          500: "#f24c4c",//Main
          400: "#f13a3a",
          300: "#ef2727",
          200: "#ee1515",
          100: "#df1010",
      },

        back: {
          900: "#5a6dba",
          800: "#4659a7",
          700: "#405199",
          600: "#35437e",
          500: "#293462",//Main
          400: "#232d54",
          300: "#1d2546",
          200: "#181e39",
          100: "#12172b",
        },

        col: {
            900: "",//Building
            800: "#F7D71650",
            700: "#8f8200",
            600: "#2d2900",
            500: "#ff5463",//Error
            400: "#f24c9f",
            300: "#EC9B3B",
            200: "#4cf29f",
            100: "#F7D716",//City
        },

    },
    
    fontFamily: {
      ps: ['"Bungee Inline"'],
      lex: ['"Lexend Deca"'],
    },
    
      container: {
        center: true,
        screens: {
          'xl': '1920px',
          'qhd': '2560px',
          'uhd': '3840px',
        },
    },

    },
  },
  plugins: [],
}