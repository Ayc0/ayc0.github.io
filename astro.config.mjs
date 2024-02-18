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
      sidebar: [
        {
          label: "Dark mode",
          autogenerate: { directory: "posts/Dark mode" },
        },
        {
          label: "CSS",
          autogenerate: { directory: "posts/CSS" },
        },
        {
          label: "TypeScript",
          autogenerate: { directory: "posts/TypeScript" },
        },
        {
          label: "Yarn",
          autogenerate: { directory: "posts/Yarn" },
        },
        {
          label: "Others",
          autogenerate: { directory: "posts/Others" },
        },
      ],
    }),
  ],
});
