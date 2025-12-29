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
          DEFAULT: "#2563EB", /* כחול חי ומזמין */
          light: "#3B82F6",
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#64748B", /* אפור עדין - מקצועיות */
          light: "#94A3B8",
          dark: "#475569",
        },
        accent: {
          DEFAULT: "#06B6D4", /* תכלת חי וצבעוני */
          light: "#22D3EE",
          dark: "#0891B2",
          sky: "#0EA5E9",
          lavender: "#A78BFA", /* סגול עדין - יוקרה */
          pink: "#EC4899", /* ורוד עדין - חמימות */
          warm: "#F59E0B", /* כתום חם - אנרגיה */
        },
        background: {
          white: "#FFFFFF",
          cream: "#FEFEFE",
          warm: "#FFFBF5", /* רקע חם יותר */
        },
        text: {
          dark: "#1F2937",
          medium: "#475569",
          light: "#64748B",
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

