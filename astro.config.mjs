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

      pagination: false,

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
    }),

    // Starlight comes with its own sitemap, but it makes all private pages public (and in general all pages public)
    sitemap({
      lastmod: new Date("2025-08-21"), // Update every time we want to website to be re-crawled
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
        // Same for the listing of tags posts
        if (page.startsWith("https://ayc0.github.io/posts/tags/")) {
          return false;
        }

        return true;
      },
    }),
  ],

  redirects: {
    // Add redirects for URLs before the creation of the React section
    "/posts/other/responsive-design-in-react":
      "/posts/react/responsive-design-in-react",
    "/posts/other/react-refs-and-dom-references":
      "/posts/react/react-refs-and-dom-references",
    "/posts/other/migrating-class-components-to-hooks-rules":
      "/posts/react/migrating-class-components-to-hooks-rules",
    "/posts/other/migrating-class-components-to-hooks":
      "/posts/react/migrating-class-components-to-hooks",

    // Add redirects for URLs before the removal of sections
    "/posts/css/css-before-vs-before": "/posts/css-before-vs-before",
    "/posts/css/how-does-css-work-the-specificity":
      "/posts/how-does-css-work-the-specificity",
    "/posts/css/how-to-learn-css-with-games":
      "/posts/how-to-learn-css-with-games",
    "/posts/css/proper-cross-fade-in-css": "/posts/proper-cross-fade-in-css",
    "/posts/dark-mode/light-dark-mode-avoid-flickering-on-reload":
      "/posts/light-dark-mode-avoid-flickering-on-reload",
    "/posts/dark-mode/light-dark-mode-corrections":
      "/posts/light-dark-mode-corrections",
    "/posts/dark-mode/light-dark-mode-react-implementation":
      "/posts/light-dark-mode-react-implementation",
    "/posts/dark-mode/light-dark-mode-system-mode-user-preferences":
      "/posts/light-dark-mode-system-mode-user-preferences",
    "/posts/dark-mode/light-dark-mode-the-lazy-way":
      "/posts/light-dark-mode-the-lazy-way",
    "/posts/dark-mode/light-dark-mode-the-simple-way":
      "/posts/light-dark-mode-the-simple-way",
    "/posts/dark-mode/light-dark-mode-user-input":
      "/posts/light-dark-mode-user-input",
    "/posts/others/blocz-react-responsive-v3-is-out":
      "/posts/blocz-react-responsive-v3-is-out",
    "/posts/others/blocz-react-responsive-v4":
      "/posts/blocz-react-responsive-v4",
    "/posts/others/cra-vs-parcel": "/posts/cra-vs-parcel",
    "/posts/others/intlsegmenter-dont-use-stringsplit-nor-stringlength":
      "/posts/intlsegmenter-dont-use-stringsplit-nor-stringlength",
    "/posts/others/monitoring-websockets": "/posts/monitoring-websockets",
    "/posts/others/semver-the-unknown-parts": "/posts/semver-the-unknown-parts",
    "/posts/react/migrating-class-components-to-hooks-rules":
      "/posts/migrating-class-components-to-hooks-rules",
    "/posts/react/migrating-class-components-to-hooks":
      "/posts/migrating-class-components-to-hooks",
    "/posts/react/react-refs-and-dom-references":
      "/posts/react-refs-and-dom-references",
    "/posts/react/responsive-design-in-react":
      "/posts/responsive-design-in-react",
    "/posts/typescript/typescript-49-satisfies-operator":
      "/posts/typescript-49-satisfies-operator",
    "/posts/typescript/typescript-50-new-mode-bundler-esm":
      "/posts/typescript-50-new-mode-bundler-esm",
    "/posts/yarn/yarn-lock-how-to-read-it": "/posts/yarn-lock-how-to-read-it",
    "/posts/yarn/yarn-lock-how-to-update-it":
      "/posts/yarn-lock-how-to-update-it",
  },
});
