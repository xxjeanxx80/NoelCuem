module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        christmasRed: "#D7263D",
        christmasGreen: "#2A9D8F",
        gold: "#F4D35E",
        night: "#0B1026",
        primary: "#ee2b6c",
        "primary-dark": "#c21b50",
        "background-light": "#f8f6f6",
        "background-dark": "#221016",
        "surface-dark": "#2d1b22"
      },
      backgroundImage: {
        shimmer: "radial-gradient(ellipse at top, rgba(255,255,255,0.08), transparent 60%)"
      },
      animation: {
        snow: "snow 12s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      },
      keyframes: {
        snow: {
          "0%": {
            transform: "translateY(-100vh) translateX(0) rotate(0deg)",
            opacity: "0",
          },
          "10%": {
            opacity: "1",
          },
          "50%": {
            transform: "translateY(50vh) translateX(var(--sway, 20px)) rotate(180deg)",
          },
          "100%": {
            transform: "translateY(100vh) translateX(calc(var(--sway, 20px) * 2)) rotate(360deg)",
            opacity: "0.3",
          },
        },
        float: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
}
