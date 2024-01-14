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
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

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
		"recipies": {
"ecto/adding-behavior-to-ecto-associations.md": {
	id: "ecto/adding-behavior-to-ecto-associations.md";
  slug: "ecto/adding-behavior-to-ecto-associations";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/advanced/constraining-queries-with-ecto.md": {
	id: "ecto/advanced/constraining-queries-with-ecto.md";
  slug: "ecto/advanced/constraining-queries-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/advanced/creating-and-using-ecto-associations-in-raw-sql.md": {
	id: "ecto/advanced/creating-and-using-ecto-associations-in-raw-sql.md";
  slug: "ecto/advanced/creating-and-using-ecto-associations-in-raw-sql";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/advanced/creating-and-using-embedded-schemas-with-ecto.md": {
	id: "ecto/advanced/creating-and-using-embedded-schemas-with-ecto.md";
  slug: "ecto/advanced/creating-and-using-embedded-schemas-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/advanced/creating-custom-ecto-types.md": {
	id: "ecto/advanced/creating-custom-ecto-types.md";
  slug: "ecto/advanced/creating-custom-ecto-types";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/advanced/creating-custom-repositories-with-ecto.md": {
	id: "ecto/advanced/creating-custom-repositories-with-ecto.md";
  slug: "ecto/advanced/creating-custom-repositories-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/advanced/creating-ecto-schemas-from-existing-databases.md": {
	id: "ecto/advanced/creating-ecto-schemas-from-existing-databases.md";
  slug: "ecto/advanced/creating-ecto-schemas-from-existing-databases";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/advanced/monitoring-and-optimizing-ecto-performance.md": {
	id: "ecto/advanced/monitoring-and-optimizing-ecto-performance.md";
  slug: "ecto/advanced/monitoring-and-optimizing-ecto-performance";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/advanced/using-ecto-changesets.md": {
	id: "ecto/advanced/using-ecto-changesets.md";
  slug: "ecto/advanced/using-ecto-changesets";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/advanced/using-ecto-enums.md": {
	id: "ecto/advanced/using-ecto-enums.md";
  slug: "ecto/advanced/using-ecto-enums";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/advanced/using-ecto-multi.md": {
	id: "ecto/advanced/using-ecto-multi.md";
  slug: "ecto/advanced/using-ecto-multi";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/avoiding-dangling-database-dependencies-with-ecto.md": {
	id: "ecto/avoiding-dangling-database-dependencies-with-ecto.md";
  slug: "ecto/avoiding-dangling-database-dependencies-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/connecting-to-multiple-databases-with-ecto.md": {
	id: "ecto/connecting-to-multiple-databases-with-ecto.md";
  slug: "ecto/connecting-to-multiple-databases-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/creating-a-custom-model-validator-with-ecto.md": {
	id: "ecto/creating-a-custom-model-validator-with-ecto.md";
  slug: "ecto/creating-a-custom-model-validator-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/creating-polymorphic-associations-with-ecto.md": {
	id: "ecto/creating-polymorphic-associations-with-ecto.md";
  slug: "ecto/creating-polymorphic-associations-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/creating-self-referential-many-to-many-relationships-with-ecto.md": {
	id: "ecto/creating-self-referential-many-to-many-relationships-with-ecto.md";
  slug: "ecto/creating-self-referential-many-to-many-relationships-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/declarative-named-queries-with-ecto.md": {
	id: "ecto/declarative-named-queries-with-ecto.md";
  slug: "ecto/declarative-named-queries-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/dry-configuration-with-ecto.md": {
	id: "ecto/dry-configuration-with-ecto.md";
  slug: "ecto/dry-configuration-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/many-to-many-relationships-with-ecto.md": {
	id: "ecto/many-to-many-relationships-with-ecto.md";
  slug: "ecto/many-to-many-relationships-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/nesting-ecto-associations.md": {
	id: "ecto/nesting-ecto-associations.md";
  slug: "ecto/nesting-ecto-associations";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/performing-calculations-on-model-data-with-ecto.md": {
	id: "ecto/performing-calculations-on-model-data-with-ecto.md";
  slug: "ecto/performing-calculations-on-model-data-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/protecting-data-from-accidental-mass-update-with-ecto.md": {
	id: "ecto/protecting-data-from-accidental-mass-update-with-ecto.md";
  slug: "ecto/protecting-data-from-accidental-mass-update-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/seeding-your-database-with-starting-data-with-ecto.md": {
	id: "ecto/seeding-your-database-with-starting-data-with-ecto.md";
  slug: "ecto/seeding-your-database-with-starting-data-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/setting-default-criteria-for-model-operations-with-ecto.md": {
	id: "ecto/setting-default-criteria-for-model-operations-with-ecto.md";
  slug: "ecto/setting-default-criteria-for-model-operations-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/using-helpers-in-models-with-ecto.md": {
	id: "ecto/using-helpers-in-models-with-ecto.md";
  slug: "ecto/using-helpers-in-models-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/using-models-safely-in-migrations-with-ecto.md": {
	id: "ecto/using-models-safely-in-migrations-with-ecto.md";
  slug: "ecto/using-models-safely-in-migrations-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"ecto/versioning-your-models-with-ecto.md": {
	id: "ecto/versioning-your-models-with-ecto.md";
  slug: "ecto/versioning-your-models-with-ecto";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
"phoenix/test.md": {
	id: "phoenix/test.md";
  slug: "phoenix/test";
  body: string;
  collection: "recipies";
  data: InferEntrySchema<"recipies">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
