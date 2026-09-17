/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          accent: "var(--brand-accent)",
        },
        bg: {
          main: "var(--bg-main)",
          card: "var(--bg-card)",
          sidebar: "var(--bg-sidebar)",
        }
      },
    },
  },
  plugins: [],
}
