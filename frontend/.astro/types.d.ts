declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"recipies": {
"ecto/adding-behavior-to-ecto-associations.md": {
  id: "ecto/adding-behavior-to-ecto-associations.md",
  slug: "ecto/adding-behavior-to-ecto-associations",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/advanced/constraining-queries-with-ecto.md": {
  id: "ecto/advanced/constraining-queries-with-ecto.md",
  slug: "ecto/advanced/constraining-queries-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/advanced/creating-and-using-ecto-associations-in-raw-sql.md": {
  id: "ecto/advanced/creating-and-using-ecto-associations-in-raw-sql.md",
  slug: "ecto/advanced/creating-and-using-ecto-associations-in-raw-sql",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/advanced/creating-and-using-embedded-schemas-with-ecto.md": {
  id: "ecto/advanced/creating-and-using-embedded-schemas-with-ecto.md",
  slug: "ecto/advanced/creating-and-using-embedded-schemas-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/advanced/creating-custom-ecto-types.md": {
  id: "ecto/advanced/creating-custom-ecto-types.md",
  slug: "ecto/advanced/creating-custom-ecto-types",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/advanced/creating-custom-repositories-with-ecto.md": {
  id: "ecto/advanced/creating-custom-repositories-with-ecto.md",
  slug: "ecto/advanced/creating-custom-repositories-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/advanced/creating-ecto-schemas-from-existing-databases.md": {
  id: "ecto/advanced/creating-ecto-schemas-from-existing-databases.md",
  slug: "ecto/advanced/creating-ecto-schemas-from-existing-databases",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/advanced/monitoring-and-optimizing-ecto-performance.md": {
  id: "ecto/advanced/monitoring-and-optimizing-ecto-performance.md",
  slug: "ecto/advanced/monitoring-and-optimizing-ecto-performance",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/advanced/using-ecto-changesets.md": {
  id: "ecto/advanced/using-ecto-changesets.md",
  slug: "ecto/advanced/using-ecto-changesets",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/advanced/using-ecto-enums.md": {
  id: "ecto/advanced/using-ecto-enums.md",
  slug: "ecto/advanced/using-ecto-enums",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/advanced/using-ecto-multi.md": {
  id: "ecto/advanced/using-ecto-multi.md",
  slug: "ecto/advanced/using-ecto-multi",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/avoiding-dangling-database-dependencies-with-ecto.md": {
  id: "ecto/avoiding-dangling-database-dependencies-with-ecto.md",
  slug: "ecto/avoiding-dangling-database-dependencies-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/connecting-to-multiple-databases-with-ecto.md": {
  id: "ecto/connecting-to-multiple-databases-with-ecto.md",
  slug: "ecto/connecting-to-multiple-databases-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/creating-a-custom-model-validator-with-ecto.md": {
  id: "ecto/creating-a-custom-model-validator-with-ecto.md",
  slug: "ecto/creating-a-custom-model-validator-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/creating-polymorphic-associations-with-ecto.md": {
  id: "ecto/creating-polymorphic-associations-with-ecto.md",
  slug: "ecto/creating-polymorphic-associations-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/creating-self-referential-many-to-many-relationships-with-ecto.md": {
  id: "ecto/creating-self-referential-many-to-many-relationships-with-ecto.md",
  slug: "ecto/creating-self-referential-many-to-many-relationships-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/declarative-named-queries-with-ecto.md": {
  id: "ecto/declarative-named-queries-with-ecto.md",
  slug: "ecto/declarative-named-queries-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/dry-configuration-with-ecto.md": {
  id: "ecto/dry-configuration-with-ecto.md",
  slug: "ecto/dry-configuration-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/many-to-many-relationships-with-ecto.md": {
  id: "ecto/many-to-many-relationships-with-ecto.md",
  slug: "ecto/many-to-many-relationships-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/nesting-ecto-associations.md": {
  id: "ecto/nesting-ecto-associations.md",
  slug: "ecto/nesting-ecto-associations",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/performing-calculations-on-model-data-with-ecto.md": {
  id: "ecto/performing-calculations-on-model-data-with-ecto.md",
  slug: "ecto/performing-calculations-on-model-data-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/protecting-data-from-accidental-mass-update-with-ecto.md": {
  id: "ecto/protecting-data-from-accidental-mass-update-with-ecto.md",
  slug: "ecto/protecting-data-from-accidental-mass-update-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/seeding-your-database-with-starting-data-with-ecto.md": {
  id: "ecto/seeding-your-database-with-starting-data-with-ecto.md",
  slug: "ecto/seeding-your-database-with-starting-data-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/setting-default-criteria-for-model-operations-with-ecto.md": {
  id: "ecto/setting-default-criteria-for-model-operations-with-ecto.md",
  slug: "ecto/setting-default-criteria-for-model-operations-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/using-helpers-in-models-with-ecto.md": {
  id: "ecto/using-helpers-in-models-with-ecto.md",
  slug: "ecto/using-helpers-in-models-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/using-models-safely-in-migrations-with-ecto.md": {
  id: "ecto/using-models-safely-in-migrations-with-ecto.md",
  slug: "ecto/using-models-safely-in-migrations-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"ecto/versioning-your-models-with-ecto.md": {
  id: "ecto/versioning-your-models-with-ecto.md",
  slug: "ecto/versioning-your-models-with-ecto",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
"phoenix/test.md": {
  id: "phoenix/test.md",
  slug: "phoenix/test",
  body: string,
  collection: "recipies",
  data: InferEntrySchema<"recipies">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
