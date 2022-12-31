import { Tags } from "./tags";

export const articles = [
  {
    name: "Build a Roles and Permissions System for Phoenix - Part 2",
    url: "https://www.peterullrich.com/build-a-rap-for-phoenix-part-2",
    description:
      "In this post, we'll build a roles and permissions system for Phoenix.",
    createdAt: new Date(2022, 12, 5),
    tags: [Tags.Phoenix, Tags.Ecto],
  },
  {
    name: "One-to-Many LiveView Form",
    description: "In this post, we'll build a one-to-many LiveView form.",
    createdAt: new Date(2022, 12, 15),
    url: "https://kobrakai.de/kolumne/one-to-many-liveview-form",
    tags: [Tags.Phoenix, Tags.PhoenixLiveView],
  },
  {
    name: "Use Neural Networks in Livebook",
    url: "https://www.peterullrich.com/use-neural-networks-in-livebook",
    description: "In this post, we'll use neural networks in Livebook.",
    createdAt: new Date(2022, 12, 10),
  },
] as Article[];
export type Article = {
  name: string;
  url: string;
  description: string;
  createdAt: Date;
  tags: Tags[];
};

// get data from this site https://www.peterullrich.com/build-a-rap-for-phoenix-part-2
