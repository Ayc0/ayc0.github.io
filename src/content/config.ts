import { defineCollection, z } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";

// TODO: clean those a bit
const tags = [
  "css", // Used 12 times
  "webdev", // Used 10 times
  "javascript", // Used 10 times
  "react", // Used 8 times
  "responsive", // Used 3 times
  "typescript", // Used 3 times
  "yarn", // Used 3 times
  "tip", // Used 2 times
  "package", // Used 2 times
  "hooks", // Used 2 times
  "migration", // Used 2 times
  "config", // Used 2 times
  "lockfile", // Used 2 times
  "html", // Used 1 times
  "fundamentals", // Used 1 times
  "learn", // Used 1 times
  "tutorial", // Used 1 times
  "parcel", // Used 1 times
  "bundler", // Used 1 times
  "intl", // Used 1 times
  "encoding", // Used 1 times
  "unicode", // Used 1 times
  "monitoring", // Used 1 times
  "websocket", // Used 1 times
  "discuss", // Used 1 times
  "npm", // Used 1 times
  "semver", // Used 1 times
  "versioning", // Used 1 times
  "lifecycle", // Used 1 times
  "task", // Used 1 times
  "async", // Used 1 times
  "refs", // Used 1 times
  "dom", // Used 1 times
  "breakpoints", // Used 1 times
  "operator", // Used 1 times
  "berry", // Used 1 times
] as const;

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
          tags: z.array(z.string()).optional(),
        })
        .and(
          // Draft pages don’t have any requirements
          z
            .object({
              wip: z.literal(true), // Custom key to drive all the changes, better DX

              pagefind: z.literal(false),
              sidebar: z.object({
                hidden: z.literal(true),
              }),
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
