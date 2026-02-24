import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        arya: ["var(--font-arya)", "sans-serif"],
        noto: ["var(--font-noto)", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      }
    },
  },
  plugins: [],
};

export default config;
