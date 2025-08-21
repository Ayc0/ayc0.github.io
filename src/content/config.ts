import { defineCollection, z } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";

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

const series = ["Light/dark"] as const;

export const collections = {
  docs: defineCollection({
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
        })
        .and(
          // Draft pages don’t have any requirements
          z
            .object({
              wip: z.literal(true), // Custom key to drive all the changes, better DX

              pagefind: z.literal(false),
            })

            // Splash don’t need requirements
            .or(
              z.object({
                wip: z.literal(false).optional(), // Proper disjoint union with draft posts

                template: z.literal("splash"),
                pagefind: z.literal(true).optional(), // Making sure that all public posts are searchable
              }),
            )

            // For regular blog posts
            .or(
              z.object({
                wip: z.literal(false).optional(), // Proper disjoint union with draft posts

                template: z.literal("doc").optional(),
                createdAt: z.date(),
                lastUpdated: z.date().optional(),

                // Required for published posts to have those defined
                description: z.string(),
                tags: z.array(z.enum(tags)),
                pagefind: z.literal(true).optional(), // Making sure that all public posts are searchable
              }),
            ),
        ),
    }),
  }),
};
