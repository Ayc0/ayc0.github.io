import type { APIRoute } from "astro";

import rss from "@astrojs/rss";

import { getPublishablePosts } from "@components/get-posts";

import { type CollectionEntry } from "astro:content";

// TODO: use the `createdAt` instead of `lastUpdated`
const getPubDate = (post: CollectionEntry<"docs">): Date | undefined => {
  if (post.data.lastUpdated instanceof Date) {
    return post.data.lastUpdated;
  }

  if (typeof post.data.lastUpdated === "number") {
    return new Date(post.data.lastUpdated);
  }

  return undefined;
};

export const GET: APIRoute = async (context) => {
  const posts = await getPublishablePosts();

  return rss({
    title: "Projects by Ayc0",
    description:
      "Various personal projects (finished or not), and all the blog posts I wrote",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      link: post.slug,
      pubDate: getPubDate(post),
      // TODO: add description to all posts (and make it required + add it to preview to LinkToPost)
      // description: post.data.description,
    })),
  });
};
