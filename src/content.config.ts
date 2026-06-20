import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { z } from "astro/zod";

// TODO: add dark-mode
const tags = [
  "bundler",
  "css",
  "deep-dive",
  "dom",
  "fundamentals",
  "html",
  "javascript",
  "news",
  "npm",
  "parcel",
  "react",
  "tip",
  "typescript",
  "unicode",
  "versioning",
  "webdev",
  "websocket",
  "yarn",
] as const;

// Used by `src/content/docs/posts/series.mdx`
export const series = ["Light/dark", "@blocz/react-responsive"] as const;

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z
        .object({
          // All of those params are here so that they can be available on all types (for the RSS)
          image: z
            .string()
            .regex(/^\/src\/assets\/[^.]+.(png|jpeg)$/)
            .optional(),
          createdAt: z.date().optional(),
          tags: z.array(z.enum(tags)).optional(),
          series: z
            .union([
              z.enum(series),
              z.object({ name: z.enum(series), order: z.number() }),
            ])
            .optional(),
          atUri: z.string().optional(), // needs to be defined for the `Head.astro` component
          blueskyPostUri: z.string().optional(),
        })
        .and(
          // Draft pages don’t have any requirements
          z
            .object({
              wip: z.literal(true), // Custom key to drive all the changes, better DX
              hiddenFromSequoia: z.literal(true), // force removing from Sequoia
              pagefind: z.literal(false),
            })

            // Splash don’t need requirements
            .or(
              z.object({
                wip: z.literal(false).optional(), // Proper disjoint union with draft posts
                hiddenFromSequoia: z.literal(true), // force removing from Sequoia
                template: z.literal("splash"),
              }),
            )

            // For regular blog posts
            .or(
              z.object({
                wip: z.literal(false).optional(), // Proper disjoint union with draft posts
                atUri: z.string(), // Force all published to sequoia. Run `pnpm sequoia publish` to generate

                template: z.literal("doc").optional(),
                createdAt: z.date(),
                lastUpdated: z.date().optional(),

                // Required for published posts to have those defined
                description: z.string(),
                pagefind: z.literal(true).optional(), // Making sure that all public posts are searchable
              }),
            ),
        ),
    }),
  }),
};
