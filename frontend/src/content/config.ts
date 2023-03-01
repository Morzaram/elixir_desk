// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";
import { recipiesCollection } from "./recipies/recipies.config";

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  recipies: recipiesCollection,
};
