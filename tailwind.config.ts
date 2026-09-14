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
        brutal: {
          yellow: "#FFE925",
          red: "#FF5C5C",
          blue: "#4D96FF",
          green: "#6BCB77",
          pink: "#FF6B9D",
          orange: "#FF8C42",
          purple: "#B388FF",
          black: "#1A1A2E",
          white: "#FAFAF9",
          cream: "#FFF8E7",
        },
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px #1A1A2E",
        "brutal-sm": "2px 2px 0px 0px #1A1A2E",
        "brutal-lg": "6px 6px 0px 0px #1A1A2E",
        "brutal-xl": "8px 8px 0px 0px #1A1A2E",
        "brutal-yellow": "4px 4px 0px 0px #FFE925",
        "brutal-red": "4px 4px 0px 0px #FF5C5C",
        "brutal-blue": "4px 4px 0px 0px #4D96FF",
        "brutal-green": "4px 4px 0px 0px #6BCB77",
        "brutal-pink": "4px 4px 0px 0px #FF6B9D",
        none: "none",
      },
      borderWidth: {
        "3": "3px",
        "4": "4px",
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        "spin-slow": "spin 4s linear infinite",
        marquee: "marquee 20s linear infinite",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
