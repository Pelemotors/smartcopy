import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A8A", /* כחול מקצועי - אמון וסמכות */
          light: "#3B82F6",
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#64748B", /* אפור עדין - מקצועיות */
          light: "#94A3B8",
          dark: "#475569",
        },
        accent: {
          DEFAULT: "#0EA5E9", /* תכלת בהיר - נקיון וחדשנות */
          light: "#38BDF8",
          dark: "#0284C7",
        },
        background: {
          white: "#FFFFFF",
          cream: "#F8FAFC",
        },
        text: {
          dark: "#1F2937",
          medium: "#475569",
          light: "#64748B",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        heading: ["Heebo", "Assistant", "sans-serif"],
        body: ["Rubik", "Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

