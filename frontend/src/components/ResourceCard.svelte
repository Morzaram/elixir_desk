<script lang="ts">
  import type {
    ArticlesResponse,
    AuthorsResponse,
    TagsResponse,
    VideosResponse,
  } from "../../pocketbase-types";

  import type { AuthorsRecord } from "../../pocketbase-types";
  import { dateStringOpts } from "../config";

  export let media:
    | ArticlesResponse<{ tags: TagsResponse[]; author: AuthorsResponse }>
    | VideosResponse<{ tags: TagsResponse[]; author: AuthorsResponse }>;
  const author = media.expand?.author;
</script>

<li class="link-card">
  <a href={media.url} target="_blank" rel="noreferrer">
    <div class="flex flex-row justify-between">
      <h2>
        {media.title}
        <span>&rarr;</span>
      </h2>
      <div class="flex flex-col justify-between space-y-1">
        {#if media.publishedAt}
          <span class="ml-2 text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-GB", dateStringOpts).format(
              new Date(media.publishedAt)
            )}
          </span>
        {/if}
        {#if author}
          <span class="ml-2 text-sm text-gray-500">by {author.name}</span>
        {/if}
        <div id="tags">
          {#if media.expand?.tags}
            {#each media.expand?.tags as tag}
              <span class="p-1 ml-2 text-sm text-white bg-gray-700 rounded-sm"
                >{tag.name}</span
              >
            {/each}
          {/if}
        </div>
      </div>
    </div>

    <p>{@html media.description}</p>
  </a>
</li>

<style>
  .link-card {
    list-style: none;
    display: flex;
    padding: 0.15rem;
    background-color: white;

    border-radius: 0.5rem;
    background-position: 100%;
    transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }
  .link-card:hover {
    background-image: var(--accent-gradient);
  }

  .link-card > a {
    width: 100%;
    text-decoration: none;
    line-height: 1.4;
    padding: 1rem 1.3rem;
    border-radius: 0.35rem;
    color: #111;
    background-color: white;
    opacity: 0.8;
  }
  h2 {
    margin: 0;
    font-size: 1.25rem;
    transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  p {
    margin-top: 0.5rem;
    margin-bottom: 0;
    color: #444;
  }
  .link-card:is(:hover, :focus-within) {
    background-position: 0;
  }
  .link-card:is(:hover, :focus-within) h2 {
    color: rgb(var(--accent));
  }
</style>
