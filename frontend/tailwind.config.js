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
        "primary":                  "hsl(var(--primary))",
        "primary-container":        "hsl(var(--primary-container))",
        "on-primary":               "hsl(var(--on-primary))",
        "on-primary-container":     "hsl(var(--on-primary-container))",
        "on-primary-fixed":         "hsl(var(--on-primary-fixed))",
        "on-primary-fixed-variant": "hsl(var(--on-primary-fixed-variant))",
        "primary-fixed":            "hsl(var(--primary-fixed))",
        "primary-fixed-dim":        "hsl(var(--primary-fixed-dim))",
        "inverse-primary":          "hsl(var(--inverse-primary))",

        "secondary":                "hsl(var(--secondary))",
        "on-secondary":             "hsl(var(--on-secondary))",
        "secondary-container":      "hsl(var(--secondary-container))",
        "on-secondary-container":   "hsl(var(--on-secondary-container))",
        "on-secondary-fixed":       "hsl(var(--on-secondary-fixed))",
        "secondary-fixed":          "hsl(var(--secondary-fixed))",
        "secondary-fixed-dim":      "hsl(var(--secondary-fixed-dim))",
        "on-secondary-fixed-variant": "hsl(var(--on-secondary-fixed-variant))",

        "tertiary":                 "hsl(var(--tertiary))",
        "tertiary-container":       "hsl(var(--tertiary-container))",
        "on-tertiary":              "hsl(var(--on-tertiary))",
        "on-tertiary-container":    "hsl(var(--on-tertiary-container))",
        "tertiary-fixed":           "hsl(var(--tertiary-fixed))",
        "tertiary-fixed-dim":       "hsl(var(--tertiary-fixed-dim))",
        "on-tertiary-fixed":        "hsl(var(--on-tertiary-fixed))",
        "on-tertiary-fixed-variant":"hsl(var(--on-tertiary-fixed-variant))",

        "error":                    "hsl(var(--error))",
        "on-error":                 "hsl(var(--on-error))",
        "error-container":          "hsl(var(--error-container))",
        "on-error-container":       "hsl(var(--on-error-container))",

        "surface":                  "hsl(var(--surface))",
        "surface-dim":              "hsl(var(--surface-dim))",
        "surface-bright":           "hsl(var(--surface-bright))",
        "surface-variant":          "hsl(var(--surface-variant))",
        "surface-tint":             "hsl(var(--surface-tint))",
        "surface-container":        "hsl(var(--surface-container))",
        "surface-container-low":    "hsl(var(--surface-container-low))",
        "surface-container-high":   "hsl(var(--surface-container-high))",
        "surface-container-highest":"hsl(var(--surface-container-highest))",
        "surface-container-lowest": "hsl(var(--surface-container-lowest))",

        "on-surface":               "hsl(var(--on-surface))",
        "on-surface-variant":       "hsl(var(--on-surface-variant))",
        "inverse-surface":          "hsl(var(--inverse-surface))",
        "inverse-on-surface":       "hsl(var(--inverse-on-surface))",
        "background":               "hsl(var(--surface))",
        "on-background":            "hsl(var(--on-surface))",

        "outline":                  "hsl(var(--outline))",
        "outline-variant":          "hsl(var(--outline-variant))",

        /* ── Semantic shortcuts ── */
        "success":                  "hsl(var(--success))",
        "warning":                  "hsl(var(--warning))",
        "danger":                   "hsl(var(--danger))",
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
