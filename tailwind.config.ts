import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0f172a", // Slate 900 - لون المؤسسات والثقة
          green: "#10b981", // Emerald 500 - لون السيولة والنمو
          light: "#f8fafc", // Slate 50 - لون الخلفيات المريح
        },
      },
    },
  },
  plugins: [],
};
export default config;