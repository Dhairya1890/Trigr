/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        /* ── Material 3 tokens from code.html ── */
        "primary":                  "#006591",
        "primary-container":        "#0ea5e9",
        "on-primary":               "#ffffff",
        "on-primary-container":     "#003751",
        "on-primary-fixed":         "#001e2f",
        "on-primary-fixed-variant": "#004c6e",
        "primary-fixed":            "#c9e6ff",
        "primary-fixed-dim":        "#89ceff",
        "inverse-primary":          "#89ceff",

        "secondary":                "#505e80",
        "on-secondary":             "#ffffff",
        "secondary-container":      "#c8d7fe",
        "on-secondary-container":   "#4e5d7e",
        "on-secondary-fixed":       "#0a1b39",
        "secondary-fixed":          "#d8e2ff",
        "secondary-fixed-dim":      "#b7c6ed",
        "on-secondary-fixed-variant": "#384667",

        "tertiary":                 "#855300",
        "tertiary-container":       "#d88a00",
        "on-tertiary":              "#ffffff",
        "on-tertiary-container":    "#4a2c00",
        "tertiary-fixed":           "#ffddb8",
        "tertiary-fixed-dim":       "#ffb95f",
        "on-tertiary-fixed":        "#2a1700",
        "on-tertiary-fixed-variant":"#653e00",

        "error":                    "#ba1a1a",
        "on-error":                 "#ffffff",
        "error-container":          "#ffdad6",
        "on-error-container":       "#93000a",

        "surface":                  "#f9f9f9",
        "surface-dim":              "#dadada",
        "surface-bright":           "#f9f9f9",
        "surface-variant":          "#e2e2e2",
        "surface-tint":             "#006591",
        "surface-container":        "#eeeeee",
        "surface-container-low":    "#f3f3f3",
        "surface-container-high":   "#e8e8e8",
        "surface-container-highest":"#e2e2e2",
        "surface-container-lowest": "#ffffff",

        "on-surface":               "#1a1c1c",
        "on-surface-variant":       "#3e4850",
        "inverse-surface":          "#2f3131",
        "inverse-on-surface":       "#f0f1f1",
        "background":               "#f9f9f9",
        "on-background":            "#1a1c1c",

        "outline":                  "#6e7881",
        "outline-variant":          "#bec8d2",

        /* ── Semantic shortcuts ── */
        "success":                  "#16a34a",
        "warning":                  "#d88a00",
        "danger":                   "#ba1a1a",
      },
      fontFamily: {
        headline: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        body:     ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        label:    ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono:     ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        shell: "1200px",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg:  "0.5rem",
        xl:  "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      boxShadow: {
        card:     "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        elevated: "0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.04)",
        feature:  "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)",
        cta:      "0 10px 30px -5px rgba(14,165,233,0.2)",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee:         "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "fade-up":       "fade-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
