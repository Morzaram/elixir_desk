<script lang="ts">
  import { orderBy } from "lodash";
  import type {
    ArticlesResponse,
    AuthorsResponse,
    TagsResponse,
    VideosResponse,
  } from "../../pocketbase-types";
  import ResourceCard from "./ResourceCard.svelte";

  type MediaList = Media[];

  type Media =
    | ArticlesResponse<{ tags: TagsResponse[]; author: AuthorsResponse }>
    | VideosResponse<{ tags: TagsResponse[]; author: AuthorsResponse }>;

  export let mediaList: MediaList;

  export let tags: TagsResponse[] = [];
  let filteredMedia: MediaList = mediaList;

  let selectedTags = tags.map((tag) => tag.id);
  let searchText = "";

  const getMedia = async (searchText: string, selectedTags: string[]) => {
    filteredMedia = [
      ...mediaList
        .filter(
          (media) => isInText(media, searchText) && isInTag(media, selectedTags)
        )
        .map((m) => ({ ...m })),
    ];
  };
  const isInText = (media: Media, searchText: string): boolean => {
    return (
      media.title.toLowerCase().includes(searchText.toLowerCase()) ||
      media.description.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  const isInTag = (media: Media, selectedTags: string[]): boolean => {
    return (
      media.expand?.tags.some((tag) => selectedTags.includes(tag.id)) || false
    );
  };

  $: getMedia(searchText, selectedTags);
</script>

<div>
  <div class="px-2 space-y-2">
    <input type="text" placeholder="Search" bind:value={searchText} />
    <div id="tag-filter" class="grid grid-cols-3">
      {#each tags as tag}
        <label class="flex items-center">
          <input
            type="checkbox"
            name="selectedTags"
            bind:group={selectedTags}
            value={tag.id}
          />
          <span class="ml-2">{tag.name}</span>
        </label>
      {/each}
    </div>
  </div>
  <ul class="flex flex-col space-y-2">
    {#each filteredMedia as media}
      <ResourceCard {media} />
    {/each}
  </ul>
</div>

<style>
  input {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input[type="checkbox"] {
    /* change stlye of checkbox */
    accent-color: white;

    border-radius: 0.25rem;
  }
  input[type="checkbox"]:checked {
    background-color: rgb(var(--accent));
  }
  input[type="checkbox"]:checked:after {
    content: "\2713";
    color: white;
  }
  input[type="text"] {
    width: 100%;
  }
</style>
