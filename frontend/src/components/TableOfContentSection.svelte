<script lang="ts">
  export let name = "";
  export let children: string | String[] | Record<string, String[]> = [];
  export let indent = 0;
  if (Array.isArray(children)) {
    children.forEach((child) => {
      console.log(`${child} - ${child[0]} - ${child[1]} -> ${typeof child}]}`);
    });
  }
</script>

<h3 style="padding-left: {indent}px">
  {name}
  {#if Array.isArray(children)}
    {#if children.length > 2}
      {#each children as child}
        {#if typeof child === "string"}
          <svelte:self name={child} children={[]} indent={indent + 24} />
        {:else}
          <svelte:self
            name={child[0]}
            children={child[1] || []}
            indent={indent + 24}
          />
        {/if}
      {/each}
    {/if}
  {/if}
</h3>

<style>
  h3 {
    cursor: pointer;
    user-select: none;
  }
</style>
