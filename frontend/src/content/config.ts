// 1. Import utilities from `astro:content`

import { z, defineCollection } from "astro:content";

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"

export const collections = {
  recipies: defineCollection({
    schema: z.object({
      title: z.string(),
    }),
  }),
};

export const tableOfContentsMap = {
  ecto: "Ecto",
  "ecto/advanced": "Advanced Ecto",
  elixir: "Elixir",
  phoenix: "Phoenix",
};
