import { getCollection, type CollectionEntry } from "astro:content";

type Post = CollectionEntry<"docs">;

const getTime = (post: Post): number => {
  if (post.data.createdAt) {
    return post.data.createdAt.getTime();
  }

  return 0;
};

export const getPublishablePosts = async (): Promise<Post[]> => {
  const posts = await getCollection(
    "docs",
    (post) =>
      // Some of those fields aren't required as already checked in the config, but it's fine
      post.data.createdAt &&
      !post.data.draft &&
      post.data.pagefind &&
      !post.data.wip,
  );

  posts.forEach((post) => {
    if (post.slug.startsWith("posts/drafts/")) {
      throw new Error(
        `Public post "${post.id}" cannot be in the drafts folder`,
      );
    }
  });

  return posts.sort((postA, postB) => getTime(postB) - getTime(postA));
};

const sections = ["React", "Dark mode", "CSS", "TypeScript", "Yarn", "Others"];

export const getPublishablePostsBySection = async (): Promise<
  Record<string, Post[]>
> => {
  const posts = await getPublishablePosts();

  const groups: Record<string, Post[]> = Object.fromEntries(
    sections.map((section) => [section, []]),
  );
  for (const post of posts) {
    const group = post.id.split("/")[1];
    if (!group) {
      throw new Error(`Post "${post.id}" has no section`);
    }
    groups[group]!.push(post);
  }

  return groups;
};

export const getPostsByTags = async (): Promise<Record<string, Post[]>> => {
  const posts = await getCollection("docs");
  const tagGroups: Record<string, Post[]> = {};
  for (const post of posts) {
    for (const tag of post.data.tags || []) {
      tagGroups[tag] ??= [];
      tagGroups[tag].push(post);
    }
  }

  return Object.fromEntries(
    Object.entries(tagGroups).sort((a, b) => a[0].localeCompare(b[0])),
  );
};

export const getDraftPosts = async () => {
  const posts = await getCollection("docs", (post) => post.data.wip);

  posts.forEach((post) => {
    if (!post.slug.startsWith("posts/drafts/")) {
      throw new Error(
        `Draft post "${post.id}" is not in the drafts folder.\nYou can use for instance "posts/drafts/${crypto.randomUUID()}`,
      );
    }

    if (
      !post.slug.match(
        /^posts\/drafts\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
      )
    ) {
      throw new Error(
        `Please use a stable UUID for the post "${post.id}".\nYou can use for instance "posts/drafts/${crypto.randomUUID()}`,
      );
    }
  });

  return posts.sort((postA, postB) => getTime(postB) - getTime(postA));
};

export const getCreatedDate = (post: Pick<Post, "data">): string => {
  if (!post.data.createdAt) {
    return "";
  }

  let full = `Posted on ${post.data.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;

  if (post.data.lastUpdated instanceof Date) {
    if (
      post.data.createdAt.toLocaleDateString("en-US") !==
      post.data.lastUpdated.toLocaleDateString("en-US")
    ) {
      full += ` (Edited on ${post.data.lastUpdated.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })})`;
    }
  }

  return full;
};
