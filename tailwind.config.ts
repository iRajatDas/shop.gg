import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: {
            DEFAULT: "#FFFFFF",
          },
          text: {
            DEFAULT: "#00000060",
            primary: "#000000",
            secondary: "#00000030",
          },
          label: {
            DEFAULT: "#FF333310",
            text: "#FF3333",
          },
          chip: {
            bg: {
              DEFAULT: "#F0F0F0",
              selected: "#000000",
            },
            text: {
              DEFAULT: "#00000060",
              selected: "#ffffff",
            },
          },
        },
      },
      fontFamily: {
        sans: ["Satoshi-Variable", ...defaultTheme.fontFamily.sans],
        heading: ["IntegralCF-Bold", ...defaultTheme.fontFamily.sans],
      },
      borderColor: {
        DEFAULT: "#00000010",
      },
      fontSize: {
        primary: [
          "var(--primary-font-size)",
          {
            fontWeight: "700",
            lineHeight: "1",
          },
        ],
        secondary: [
          "var(--secondary-font-size)",
          {
            fontWeight: "700",
          },
        ],
        tertiary: [
          "var(--tertiary-font-size)",
          {
            fontWeight: "700",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
