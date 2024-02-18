import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://ayc0.github.io",
  base: "/projects",
  integrations: [
    react({
      exclude: ["**/page-react-timings/*"],
    }),
    starlight({
      title: "Ayc0's Projects",
      lastUpdated: true,
    }),
  ],
});
