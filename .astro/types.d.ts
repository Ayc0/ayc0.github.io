declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"posts/CSS/css-before-vs-before.mdx": {
	id: "posts/CSS/css-before-vs-before.mdx";
  slug: "posts/css/css-before-vs-before";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/CSS/how-does-css-work-the-specificity.mdx": {
	id: "posts/CSS/how-does-css-work-the-specificity.mdx";
  slug: "posts/css/how-does-css-work-the-specificity";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/CSS/how-to-learn-css-with-games.mdx": {
	id: "posts/CSS/how-to-learn-css-with-games.mdx";
  slug: "posts/css/how-to-learn-css-with-games";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/CSS/proper-cross-fade-in-css.mdx": {
	id: "posts/CSS/proper-cross-fade-in-css.mdx";
  slug: "posts/css/proper-cross-fade-in-css";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/Dark mode/light-dark-mode-avoid-flickering-on-reload.mdx": {
	id: "posts/Dark mode/light-dark-mode-avoid-flickering-on-reload.mdx";
  slug: "posts/dark-mode/light-dark-mode-avoid-flickering-on-reload";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/Dark mode/light-dark-mode-corrections.mdx": {
	id: "posts/Dark mode/light-dark-mode-corrections.mdx";
  slug: "posts/dark-mode/light-dark-mode-corrections";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/Dark mode/light-dark-mode-react-implementation.mdx": {
	id: "posts/Dark mode/light-dark-mode-react-implementation.mdx";
  slug: "posts/dark-mode/light-dark-mode-react-implementation";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/Dark mode/light-dark-mode-system-mode-user-preferences.mdx": {
	id: "posts/Dark mode/light-dark-mode-system-mode-user-preferences.mdx";
  slug: "posts/dark-mode/light-dark-mode-system-mode-user-preferences";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/Dark mode/light-dark-mode-the-lazy-way.mdx": {
	id: "posts/Dark mode/light-dark-mode-the-lazy-way.mdx";
  slug: "posts/dark-mode/light-dark-mode-the-lazy-way";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/Dark mode/light-dark-mode-the-simple-way.mdx": {
	id: "posts/Dark mode/light-dark-mode-the-simple-way.mdx";
  slug: "posts/dark-mode/light-dark-mode-the-simple-way";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/Dark mode/light-dark-mode-user-input.mdx": {
	id: "posts/Dark mode/light-dark-mode-user-input.mdx";
  slug: "posts/dark-mode/light-dark-mode-user-input";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/Others/cra-vs-parcel.mdx": {
	id: "posts/Others/cra-vs-parcel.mdx";
  slug: "posts/others/cra-vs-parcel";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/Others/intlsegmenter-dont-use-stringsplit-nor-stringlength.mdx": {
	id: "posts/Others/intlsegmenter-dont-use-stringsplit-nor-stringlength.mdx";
  slug: "posts/others/intlsegmenter-dont-use-stringsplit-nor-stringlength";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/Others/semver-the-unknown-parts.mdx": {
	id: "posts/Others/semver-the-unknown-parts.mdx";
  slug: "posts/others/semver-the-unknown-parts";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/TypeScript/typescript-49-satisfies-operator.mdx": {
	id: "posts/TypeScript/typescript-49-satisfies-operator.mdx";
  slug: "posts/typescript/typescript-49-satisfies-operator";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/TypeScript/typescript-50-new-mode-bundler-esm.mdx": {
	id: "posts/TypeScript/typescript-50-new-mode-bundler-esm.mdx";
  slug: "posts/typescript/typescript-50-new-mode-bundler-esm";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/Yarn/yarn-lock-how-to-read-it.mdx": {
	id: "posts/Yarn/yarn-lock-how-to-read-it.mdx";
  slug: "posts/yarn/yarn-lock-how-to-read-it";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/Yarn/yarn-lock-how-to-update-it.mdx": {
	id: "posts/Yarn/yarn-lock-how-to-update-it.mdx";
  slug: "posts/yarn/yarn-lock-how-to-update-it";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"posts/index.md": {
	id: "posts/index.md";
  slug: "posts";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
