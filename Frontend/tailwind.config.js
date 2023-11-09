/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "home-background": "url('./src/assets/img/signupBackground.png')",
        "footer-texture": "url('/img/footer-texture.png')",
      }),
    },
    colors: {
      primary: "#D2EDF0",
      secondary: {
        100: "#0891B2",
        200: "#0782a0",
        300: "#06748e",
      },
      white: "#FFFFFF",
      red: "#FF1C1C",
      gray: "#B0B0B0",
      black: "#001217",
      darkgray: "#6A6A6A",
      lightgray: "#F5F5F5",
    },
    fontFamily: {
      body: ["Poppins"],
    },
  },
  plugins: [],
};
