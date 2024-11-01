import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import daisyui from "https://esm.sh/daisyui@2.15.2"

export default defineConfig({
  plugins: [tailwind(), daisyui],

});
