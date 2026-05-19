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
        background: "#090909",
        foreground: "#f5f5f5",
        primary: "#E6FF00",
        secondary: "#1a1a1a",
        card: "rgba(255, 255, 255, 0.02)",
        "card-hover": "rgba(255, 255, 255, 0.05)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(to right, #050505, #111)',
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 0, 51, 0.5)",
      }
    },
  },
  plugins: [],
};
export default config;
