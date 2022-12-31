import type { Tags } from "./tags";

export const videos = [
  {
    name: "The 1975",
    url: "https://www.youtube.com/watch?v=4gXkCjJLZyQ",
    description: "The 1975 are an English rock band from Manchester. ",
    createdAt: "2016-03-01T00:00:00.000Z",
    tags: ["rock", "alternative", "indie"],
  },
] as Video[];

export type Video = {
  url: string;
  name: string;
  description: string;
  createdAt: string;
  tags: Tags[];
};
