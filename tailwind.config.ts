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
          DEFAULT: "#1E3A8A", /* כחול כהה מקצועי - אמון */
          light: "#3B82F6", /* כחול בינוני */
          dark: "#1E40AF", /* כחול כהה מאוד */
          bright: "#2563EB", /* כחול בוהק */
          pale: "#DBEAFE", /* כחול בהיר מאוד */
        },
        secondary: {
          DEFAULT: "#64748B", /* אפור עדין - מקצועיות */
          light: "#94A3B8",
          dark: "#475569",
        },
        accent: {
          DEFAULT: "#1E90FF", /* כחול בהיר - הדגשה */
          light: "#4A9EFF",
          dark: "#0066CC",
          sky: "#0EA5E9",
        },
        success: "#10B981", /* ירוק להצלחה */
        warning: "#F59E0B", /* צהוב לאזהרה */
        error: "#EF4444", /* אדום לשגיאות */
        background: {
          white: "#FFFFFF",
          cream: "#F8FAFC", /* לבן כחלחל עדין */
          light: "#F1F5F9", /* אפור כחלחל בהיר */
          blue: "#EFF6FF", /* כחול בהיר מאוד */
        },
        text: {
          dark: "#0F172A", /* כחול כהה כמעט שחור */
          medium: "#475569", /* אפור כהה */
          light: "#64748B", /* אפור בינוני */
          blue: "#1E3A8A", /* כחול טקסט */
          white: "#FFFFFF",
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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

