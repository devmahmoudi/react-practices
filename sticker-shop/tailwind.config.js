/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      extend: {
          height: (theme) => ({
              112: "28rem",
              120: "30rem",
          }),
          minHeight: (theme) => ({
              80: "20rem",
          }),
          colors: {
              palette: {
                  lighter: "#F5F3FF",
                  light: "#DDD6FE",
                  primary: "#5B21B6",
                  dark: "#4C1D95",
              },
          },
          fontFamily: {
              primary: ['"tanha"'],
          },
      },
  },
  plugins: [],
};
