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
        PageTitle: "./src/components/starlight/PageTitle.astro",
      },
      // Technically not required, but to avoid having the next/prev buttons at the bottom of other pages
      sidebar: [
        {
          label: "React",
          autogenerate: { directory: "posts/React" },
        },
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

  // Add redirects for old URLs (before the creation of the React section)
  redirects: {
    "/posts/other/responsive-design-in-react":
      "/posts/react/responsive-design-in-react",
    "/posts/other/react-refs-and-dom-references":
      "/posts/react/react-refs-and-dom-references",
    "/posts/other/migrating-class-components-to-hooks-rules":
      "/posts/react/migrating-class-components-to-hooks-rules",
    "/posts/other/migrating-class-components-to-hooks":
      "/posts/react/migrating-class-components-to-hooks",
  },
});
