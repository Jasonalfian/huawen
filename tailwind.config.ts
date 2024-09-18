import { yellow } from "@mui/material/colors";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        theme: {
          red: "#c50d2a",
          yellow: "#fbab08",
          cream: "#fefcf6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
