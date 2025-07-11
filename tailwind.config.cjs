module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        fontFamily: {
          display: ["Inter", "sans-serif"],
          body: ["Inter", "sans-serif"]
        },
        keyframes: {
          pop: {
            "0%":   { opacity: 0, transform: "scale(0.2)" },
            "50%":  { opacity: 0.25, transform: "scale(1)" },
            "100%": { opacity: 0, transform: "scale(1.6)" },
          },
        },
        animation: {
          "pop-once": "pop 600ms ease-out forwards",
        },
      },
    },
  };