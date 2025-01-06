import type { APIRoute } from "astro";

import rss from "@astrojs/rss";

import { getPublishablePosts } from "@components/get-posts";
import { getImagePath } from "@components/images";

export const GET: APIRoute = async (context) => {
  const posts = await getPublishablePosts();

  return rss({
    title: "Projects by Ayc0",
    description:
      "Various personal projects (finished or not), and all the blog posts I wrote",
    site: "https://ayc0.github.io/",
    trailingSlash: false, // For RSS
    items: await Promise.all(
      posts.map(async (post) => {
        let image: string | undefined;
        if (post.data.image) {
          image = await getImagePath(post.data.image);
        }
        return {
          title: post.data.title,
          link: `${post.slug}?utm_source=rss`,
          pubDate: post.data.createdAt,
          description: post.data.description,
          categories: post.data.tags,
          enclosure: image
            ? {
                url: new URL(image, context.url).href,
                length: 0, // no need to pass a real one, but potentially it could be better? nerdy.dev uses 0 too
                type: `image/${image.split(".").at(-1)}`,
              }
            : undefined,
        };
      }),
    ),
  });
};
