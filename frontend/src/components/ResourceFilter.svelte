<script lang="ts">
  import type {
    ArticlesRecord,
    ArticlesResponse,
    BaseSystemFields,
    TagsRecord,
    TagsResponse,
    VideosRecord,
    VideosResponse,
  } from "../../pocketbase-types";
  import ResourceCard from "./ResourceCard.svelte";

  export let mediaList:
    | ArticlesResponse<{ tags: TagsResponse[] }>[]
    | VideosResponse<{ tags: TagsResponse[] }>[];

  export let tags: TagsResponse[] = [];
  let selectedTags = tags.map((tag) => tag.id);

  const getMedia = () => {
    mediaList = mediaList.filter((media) => {
      return (
        media.expand?.tags.some((tag) => selectedTags.includes(tag.id)) !=
        undefined
      );
    });
  };
</script>

<div>
  <div class="px-2">
    <input type="text" placeholder="Search" />
    {#each tags as tag}
      <label class="flex items-center">
        <input
          type="checkbox"
          bind:group={selectedTags}
          value={selectedTags.find((t) => t === tag.id) !== undefined}
        />
        <span class="ml-2">{tag.name}</span>
      </label>
    {/each}
  </div>
  <ul class="link-card-grid">
    {#each mediaList as media}
      <ResourceCard
        href={media.url}
        title={media.title}
        body={media.description}
        createdAt={media.published}
      />
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
