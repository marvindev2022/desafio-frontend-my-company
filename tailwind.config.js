/** @type {import('tailwindcss').Config} */
export default {
  content: ["/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px", // Exemplo de breakpoint para telas pequenas
        md: "768px", // Exemplo de breakpoint para telas médias
        lg: "1024px", // Exemplo de breakpoint para telas grandes
        xl: "1280px", // Exemplo de breakpoint para telas extra grandes
        "2xl": "1536px", // Exemplo de breakpoint para telas extra, extra grandes
      },
      colors: {
        primary: "#123456",
        secondary: "#789abc",
      },
      fontFamily: {
        jost: ["jost", "sans"],
      },
      spacing: {
        39: "39px",
      },
      borderRadius: {
        50: "50%",
      },
      inset: {
        1: "1px",
        5: "5px",
      },
      borderWidth: {
        2: "2px",
      },
      colors: {
        "custom-black": "#000000",
      },
    },
  },
  plugins: [],
};
