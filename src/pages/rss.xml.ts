import type { APIRoute } from "astro";

import rss from "@astrojs/rss";

import { getPublishablePosts } from "@components/get-posts";

export const GET: APIRoute = async (_context) => {
  const posts = await getPublishablePosts();

  return rss({
    title: "Projects by Ayc0",
    description:
      "Various personal projects (finished or not), and all the blog posts I wrote",
    site: "https://ayc0.github.io/",
    items: posts.map((post) => ({
      title: post.data.title,
      link: post.slug,
      pubDate: post.data.createdAt,
      description: post.data.description,
      enclosure: post.data.image
        ? {
            url: `https://ayc0.github.io${post.data.image}`,
            length: 0, // no need to pass a real one, but potentially it could be better? nerdy.dev uses 0 too
            type: `image/${post.data.image.split(".").at(-1)}`,
          }
        : undefined,
    })),
  });
};
