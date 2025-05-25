import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";

import remarkBreaks from "remark-breaks";
import { remarkReadingTime } from "./tools/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://ayc0.github.io",
  base: "/", // We need the trailing / here otherwise links in the site will be broken

  // Build source maps
  vite: {
    build: {
      sourcemap: true,
    },
  },

  markdown: {
    remarkPlugins: [remarkBreaks, remarkReadingTime],
  },

  integrations: [
    react({
      exclude: ["**/page-react-timings/*", "**/page-react-extension/**"],
    }),

    starlight({
      title: "Ayc0",
      lastUpdated: true,
      favicon: "/images/favicon.png",

      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Ayc0",
        },
        {
          icon: "blueSky",
          label: "Bluesky",
          href: "https://bsky.app/profile/ayc0.github.io",
        },
        {
          icon: "rss",
          label: "RSS",
          href: "https://ayc0.github.io/rss.xml",
        },
      ],

      head: [
        {
          tag: "link",
          attrs: {
            rel: "alternate",
            type: "application/rss+xml",
            title: "RSS Feed for ayc0.github.io",
            href: "https://ayc0.github.io/rss.xml",
          },
        },
      ],

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

    // Starlight comes with its own sitemap, but it makes all private pages public (and in general all pages public)
    sitemap({
      lastmod: new Date("2025-01-02"), // Update every time we want to website to be re-crawled
      filter: (page) => {
        // No slides should be exposed
        if (page.startsWith("https://ayc0.github.io/slides/")) {
          return false;
        }
        // No experiments should be exposed
        if (page.startsWith("https://ayc0.github.io/experiments/")) {
          return false;
        }
        // Same for the listing of draft posts
        if (page.startsWith("https://ayc0.github.io/posts/drafts/")) {
          return false;
        }

        return true;
      },
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
