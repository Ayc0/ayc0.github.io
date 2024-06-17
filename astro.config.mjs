import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://ayc0.github.io",
  base: "/", // We need the trailing / here otherwise links in the site will be broken
  integrations: [
    react({
      exclude: ["**/page-react-timings/*"],
    }),
    starlight({
      title: "Ayc0",
      lastUpdated: true,
      favicon: "/images/favicon.png",
      components: {
        Head: "./src/components/starlight/Head.astro",
        PageFrame: "./src/components/starlight/PageFrame.astro",
      },
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
