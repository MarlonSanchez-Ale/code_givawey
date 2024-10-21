/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        sm: "320px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    corePlugins: {
      preflight: false, // Si no quieres que Tailwind aplique su reset CSS predeterminado.
    },
  },
  plugins: [],
};
