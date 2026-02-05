/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: "#401404", // Seu --cor-fundo
          light: "#f2a649", // Seu --cor-principal (laranja)
          cream: "#ffd3c3", // Seu --cor-texto
          card: "#672913", // Seu --cor-card
          bg: "#2b0e03", // Um marrom ainda mais escuro para fundo de página
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Quicksand", "sans-serif"], // Instale essa fonte no index.html ou use a padrão
      },
    },
  },
  plugins: [],
};
