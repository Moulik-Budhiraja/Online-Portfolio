import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      display: ["var(--font-poiret-one)", "sans-serif"],
      sans: ["var(--font-manrope)", "sans-serif"],
    },
    extend: {
      backgroundColor: {
        "neutral-850": "#222",
      },
      borderColor: {
        "neutral-850": "#222",
      },
      aspectRatio: {
        unset: "unset",
      },
      spacing: {
        160: "40rem",
        200: "50rem",
      },
      gridTemplateColumns: {
        "minmax-15-1fr": "repeat(auto-fill, minmax(15rem, 1fr))",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("vocus", ["&:focus", "&:valid"]);
      addVariant("peer-vocus", [".peer:focus ~ &", ".peer:valid ~ &"]);
    }),
  ],
};

export default config;
