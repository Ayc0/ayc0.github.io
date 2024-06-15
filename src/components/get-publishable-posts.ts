import { getCollection } from "astro:content";

export const getPublishablePosts = async () => {
  const posts = await getCollection("docs");
  return posts
    .filter(
      (post) =>
        post.data.lastUpdated &&
        post.data.lastUpdated instanceof Date &&
        !post.data.sidebar?.hidden &&
        !post.data.draft &&
        post.data.pagefind
    )
    .sort(
      (postA, postB) =>
        (postB.data.lastUpdated as Date).getTime() -
        (postA.data.lastUpdated as Date).getTime()
    );
};
