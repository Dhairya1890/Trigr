/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./onboarding/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary":                  "hsl(var(--primary) / <alpha-value>)",
        "primary-container":        "hsl(var(--primary-container) / <alpha-value>)",
        "on-primary":               "hsl(var(--on-primary) / <alpha-value>)",
        "on-primary-container":     "hsl(var(--on-primary-container) / <alpha-value>)",
        "on-primary-fixed":         "hsl(var(--on-primary-fixed) / <alpha-value>)",
        "on-primary-fixed-variant": "hsl(var(--on-primary-fixed-variant) / <alpha-value>)",
        "primary-fixed":            "hsl(var(--primary-fixed) / <alpha-value>)",
        "primary-fixed-dim":        "hsl(var(--primary-fixed-dim) / <alpha-value>)",
        "inverse-primary":          "hsl(var(--inverse-primary) / <alpha-value>)",

        "secondary":                "hsl(var(--secondary) / <alpha-value>)",
        "on-secondary":             "hsl(var(--on-secondary) / <alpha-value>)",
        "secondary-container":      "hsl(var(--secondary-container) / <alpha-value>)",
        "on-secondary-container":   "hsl(var(--on-secondary-container) / <alpha-value>)",
        "on-secondary-fixed":       "hsl(var(--on-secondary-fixed) / <alpha-value>)",
        "secondary-fixed":          "hsl(var(--secondary-fixed) / <alpha-value>)",
        "secondary-fixed-dim":      "hsl(var(--secondary-fixed-dim) / <alpha-value>)",
        "on-secondary-fixed-variant": "hsl(var(--on-secondary-fixed-variant) / <alpha-value>)",

        "tertiary":                 "hsl(var(--tertiary) / <alpha-value>)",
        "tertiary-container":       "hsl(var(--tertiary-container) / <alpha-value>)",
        "on-tertiary":              "hsl(var(--on-tertiary) / <alpha-value>)",
        "on-tertiary-container":    "hsl(var(--on-tertiary-container) / <alpha-value>)",
        "tertiary-fixed":           "hsl(var(--tertiary-fixed) / <alpha-value>)",
        "tertiary-fixed-dim":       "hsl(var(--tertiary-fixed-dim) / <alpha-value>)",
        "on-tertiary-fixed":        "hsl(var(--on-tertiary-fixed) / <alpha-value>)",
        "on-tertiary-fixed-variant":"hsl(var(--on-tertiary-fixed-variant) / <alpha-value>)",

        "error":                    "hsl(var(--error) / <alpha-value>)",
        "on-error":                 "hsl(var(--on-error) / <alpha-value>)",
        "error-container":          "hsl(var(--error-container) / <alpha-value>)",
        "on-error-container":       "hsl(var(--on-error-container) / <alpha-value>)",

        "surface":                  "hsl(var(--surface) / <alpha-value>)",
        "surface-dim":              "hsl(var(--surface-dim) / <alpha-value>)",
        "surface-bright":           "hsl(var(--surface-bright) / <alpha-value>)",
        "surface-variant":          "hsl(var(--surface-variant) / <alpha-value>)",
        "surface-tint":             "hsl(var(--surface-tint) / <alpha-value>)",
        "surface-container":        "hsl(var(--surface-container) / <alpha-value>)",
        "surface-container-low":    "hsl(var(--surface-container-low) / <alpha-value>)",
        "surface-container-high":   "hsl(var(--surface-container-high) / <alpha-value>)",
        "surface-container-highest":"hsl(var(--surface-container-highest) / <alpha-value>)",
        "surface-container-lowest": "hsl(var(--surface-container-lowest) / <alpha-value>)",

        "on-surface":               "hsl(var(--on-surface) / <alpha-value>)",
        "on-surface-variant":       "hsl(var(--on-surface-variant) / <alpha-value>)",
        "inverse-surface":          "hsl(var(--inverse-surface) / <alpha-value>)",
        "inverse-on-surface":       "hsl(var(--inverse-on-surface) / <alpha-value>)",
        "background":               "hsl(var(--surface) / <alpha-value>)",
        "on-background":            "hsl(var(--on-surface) / <alpha-value>)",

        "outline":                  "hsl(var(--outline) / <alpha-value>)",
        "outline-variant":          "hsl(var(--outline-variant) / <alpha-value>)",

        /* ── Semantic shortcuts ── */
        "success":                  "hsl(var(--success) / <alpha-value>)",
        "warning":                  "hsl(var(--warning) / <alpha-value>)",
        "danger":                   "hsl(var(--danger) / <alpha-value>)",
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
        card:     "0 2px 4px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.03)",
        elevated: "0 10px 15px -3px rgba(0,0,0,0.04), 0 4px 6px -2px rgba(0,0,0,0.02)",
        feature:  "0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)",
        cta:      "0 20px 40px -10px rgba(14,165,233,0.3)",
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
