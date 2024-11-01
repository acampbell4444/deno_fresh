import { type Config } from "tailwindcss";
import daisyui from "https://esm.sh/daisyui@2.15.2"

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
} satisfies Config;
