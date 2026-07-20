import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rp: {
          peach: {
            50: "#FFF9F6",
            100: "#FCEADF",
            200: "#F6D5C3",
            300: "#EDBFA9",
          },
          cream: {
            50: "#FFFCF9",
            100: "#FFF8F2",
            200: "#F8EFE7",
          },
          cocoa: {
            500: "#8A6252",
            700: "#684131",
            800: "#572F20",
            900: "#452317",
          },
          blush: {
            100: "#FBE1DA",
            200: "#F5C8BC",
            300: "#EDAFA3",
          },
          sage: {
            100: "#EEF0E4",
            200: "#D8DDC8",
            300: "#BBC5A5",
            600: "#7B8868",
          },
          butter: {
            100: "#FFF2D7",
            200: "#F7DDA7",
            300: "#EBC77F",
          },
          line: "#E8C8B7",
          "line-strong": "#CFA993",
        },
      },
      fontFamily: {
        "rp-display": [
          "Cormorant Garamond",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        "rp-body": [
          "Libre Baskerville",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
      },
      borderRadius: {
        "rp-sm": "0.875rem",
        "rp-md": "1.375rem",
        "rp-lg": "1.875rem",
      },
      boxShadow: {
        "rp-card":
          "0 1px 0 rgba(255,255,255,.72) inset, 0 14px 34px rgba(87,47,32,.10)",
        "rp-phone": "0 40px 90px rgba(69,35,23,.24)",
      },
    },
  },
  plugins: [],
} satisfies Config;
