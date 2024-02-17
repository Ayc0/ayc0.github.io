import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://ayc0.github.io",
  base: "/projects",
  integrations: [
    react({
      exclude: ["**/page-react-timings/*"],
    }),
  ],
});
