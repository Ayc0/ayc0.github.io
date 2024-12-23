import type { APIRoute } from "astro";

import rss from "@astrojs/rss";

import { getPublishablePosts } from "@components/get-posts";

export const GET: APIRoute = async (context) => {
  const posts = await getPublishablePosts();
  console.log(context);
  return rss({
    title: "Projects by Ayc0",
    description:
      "Various personal projects (finished or not), and all the blog posts I wrote",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      // TODO: add the pubDate
      // pubDate: post.data.pubDate,
      description: post.data.description,
      link: post.slug,
    })),
  });
};
