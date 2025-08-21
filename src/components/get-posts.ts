import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"docs">;

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

export const getPublishablePostsByYear = async (): Promise<
  Record<number, Post[]>
> => {
  const posts = await getPublishablePosts();

  const groups: Record<number, Post[]> = {};
  for (const post of posts) {
    if (!post.data.createdAt) {
      throw new Error(`Post "${post.id}" has no createdAt`);
    }
    const year = post.data.createdAt.getUTCFullYear();
    groups[year] ??= [];
    groups[year].push(post);
  }

  // in JS, number-keys in objects are auto sorted as-per the spec (from low to high)
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

export const getCreatedDate = ({ data }: Pick<Post, "data">): string => {
  if (!data.createdAt) {
    return "";
  }

  let full = `Posted on ${data.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;

  if (data.lastUpdated instanceof Date) {
    if (
      data.createdAt.toLocaleDateString("en-US") !==
      data.lastUpdated.toLocaleDateString("en-US")
    ) {
      full += ` (Edited on ${data.lastUpdated.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })})`;
    }
  }

  return full;
};

export const getTagsHtml = ({
  data: { tags },
}: Pick<Post, "data">): string | null => {
  if (!tags?.length) {
    return null;
  }
  // TODO: turn those into links & better styling, but links to where?
  return tags.map((tag) => `<code data-tag=${tag}>#${tag}</code>`).join(" ");
};

export const getSeriesData = ({
  data: { series },
}: Pick<Post, "data">): { name: string; order: number } | undefined => {
  let name: string;
  let order = 0;
  if (!series) {
    return;
  }
  if (typeof series === "string") {
    name = series;
  } else {
    name = series.name;
    if (series.order != null) {
      order = series.order;
    }
  }

  return { name: name, order };
};

export const getSeriesHtml = (post: Pick<Post, "data">) => {
  const seriesData = getSeriesData(post);
  if (!seriesData) {
    return null;
  }
  // TODO: turn those into links, but links to where?
  return `<span data-series=${seriesData.name}>${seriesData.name}</span>`;
};

export const getPublishablePostsMatchingSeries = async (
  series: string,
): Promise<Post[]> => {
  const posts = await getPublishablePosts();
  const postsInSameSeries = posts.filter((post) => {
    const postSeriesData = getSeriesData(post);
    if (!postSeriesData) {
      return false;
    }
    return postSeriesData.name === series;
  });

  postsInSameSeries.sort((postA, postB) => {
    if (!postA.data.createdAt && !postB.data.createdAt) {
      return 0;
    }
    if (!postA.data.createdAt) {
      return -1;
    }
    if (!postB.data.createdAt) {
      return 1;
    }
    if (postA.data.createdAt.getTime() !== postB.data.createdAt.getTime()) {
      return postA.data.createdAt.getTime() - postB.data.createdAt.getTime();
    }

    const postASeriesData = getSeriesData(postA)!;
    const postBSeriesData = getSeriesData(postB)!;
    return postASeriesData.order - postBSeriesData.order;
  });

  return postsInSameSeries;
};
