import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import daisyui from "daisyui";

export default defineConfig({
  plugins: [tailwind(), daisyui],

});
