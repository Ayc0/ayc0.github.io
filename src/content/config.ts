import { defineCollection, z } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";

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
              pagefind: z.literal(false),
              sidebar: z.object({
                hidden: z.literal(true),
              }),
            })

            // Splash don’t need requirements
            .or(
              z.object({
                template: z.literal("splash"),
                pagefind: z.literal(true).optional(), // To avoid matching with the draft
              }),
            )

            // For regular blog posts
            .or(
              z.object({
                template: z.literal("doc").optional(),
                pagefind: z.literal(true).optional(), // To avoid matching with the draft
                createdAt: z.date(),
                lastUpdated: z.date().optional(),

                // Required for published posts to have those defined
                description: z.string(),
                tags: z.array(z.string()),
              }),
            ),
        ),
    }),
  }),
};
