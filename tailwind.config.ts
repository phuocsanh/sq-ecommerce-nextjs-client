import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-sans)", ...fontFamily.sans] },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        soft_cyan: {
          DEFAULT: "var(--soft-cyan)",
        },
        strong_cyan: {
          DEFAULT: "var(--strong-cyan)",
        },
        drak_blue: {
          DEFAULT: "var(--drak-blue)",
        },
        very_drak_blue: {
          DEFAULT: "var(--very-drak-blue)",
        },
        border: "var(--border)",
        input: "var(--input)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
