import { getCollection, type CollectionEntry } from "astro:content";

export const getPublishablePosts = async () => {
  const posts = await getCollection(
    "docs",
    (post) =>
      post.data.lastUpdated &&
      post.data.lastUpdated instanceof Date &&
      !post.data.draft &&
      post.data.pagefind
  );
  return posts.sort(
    (postA, postB) =>
      (postB.data.lastUpdated as Date).getTime() -
      (postA.data.lastUpdated as Date).getTime()
  );
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
