import { getCollection, type CollectionEntry } from "astro:content";

const getTime = (post: CollectionEntry<"docs">): number => {
  if (post.data.lastUpdated instanceof Date) {
    return post.data.lastUpdated.getTime();
  }

  if (typeof post.data.lastUpdated === "number") {
    return post.data.lastUpdated;
  }

  return 0;
};

export const getPublishablePosts = async () => {
  const posts = await getCollection(
    "docs",
    (post) =>
      post.data.lastUpdated &&
      post.data.lastUpdated instanceof Date &&
      !post.data.draft &&
      post.data.pagefind
  );

  return posts.sort((postA, postB) => getTime(postB) - getTime(postA));
};

const sections = ["React", "Dark mode", "CSS", "TypeScript", "Yarn", "Others"];

export const getPublishablePostsBySection = async () => {
  const posts = await getPublishablePosts();
  // console.log(posts);
  const groups: Record<string, CollectionEntry<"docs">[]> = Object.fromEntries(
    sections.map((section) => [section, []])
  );
  for (const post of posts) {
    const group = post.id.split("/")[1];
    if (!group) {
      throw new Error(`Post ${post.id} has no section`);
    }
    groups[group]!.push(post);
  }

  return groups;
};

export const getDraftPosts = async () => {
  const posts = await getCollection(
    "docs",
    (post) => post.data.draft || !post.data.pagefind
  );

  return posts.sort((postA, postB) => getTime(postB) - getTime(postA));
};
