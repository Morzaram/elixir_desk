<script lang="ts">
  import { Tags, Types } from "../pages/resources/data/tags";
  // get params
  const params = new URLSearchParams(window.location.search);

  let tags = (params.get("tags")?.split(",") as Tags[]) || ([] as Tags[]);
  let name = params.get("name") || "";
  let url = params.get("url") || "https://";
  let description = params.get("description") || "";
  let type = params.get("type") || Types.Article;
  let createdAt = params.get("createdAt") || new Date().toISOString();

  window.addEventListener("load", function () {
    // Code to be executed when the window has finished loading
  });
  let isComplete = false;
  let validSubmission = false;

  const validateUrl = (inputUrl: string) => {
    // append if inputUrl doesn't have https
    if (!inputUrl.startsWith("https://")) {
      inputUrl = "https://" + inputUrl;
    }
    // set url to inputUrl to make sure that https isn't removed
    url = inputUrl;

    const res = inputUrl.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  };

  const handleCopyClick = () => {
    isComplete = true;

    setTimeout(() => {
      if (document.querySelectorAll(".error").length > 0) {
        return;
      } else {
        navigator.clipboard.writeText(generateJson);
        validSubmission = true;
      }
    }, 100);
  };

  const handleCreateIssueClick = async () => {
    isComplete = true;

    setTimeout(() => {
      if (document.querySelectorAll(".error").length > 0) {
        return;
      } else {
        open(generateIssueUrl());

        validSubmission = true;
      }
    }, 100);
  };

  const generateComebackUrl = () => {
    let comebackUrl = new URL("http://127.0.0.1:3000/resources/add-a-source");
    let params = new URLSearchParams(comebackUrl.search);
    params.set("type", type);
    params.set("name", name);
    params.set("url", url);
    params.set("description", description);
    params.set("createdAt", createdAt);
    params.set("tags", tags.join(","));
    return comebackUrl + "?" + params;
  };
  const generateIssueUrl = () => {
    const title = `New ${type} addition request for ${name}`;
    const body =
      `
New **${type}** addition request for:
**Name:** ${name}
**URL:** ${url}
**Description:** ${description}
`.trim() +
      ` ` +
      `
\`\`\`json
${generateJson}
\`\`\`

Link to modify the JSON: [here](${generateComebackUrl()}))
      `;

    const encodedTitle = title;
    const encodedBody = body;
    let githubUrl = new URL(
      `https://github.com/Morzaram/elixir_desk/issues/new`
    );
    githubUrl.searchParams.set("title", encodedTitle);
    githubUrl.searchParams.set("body", encodedBody);
    return githubUrl;
  };

  $: generateJson = JSON.stringify(
    { name, url, description, createdAt, tags },
    null,
    "  "
  );
</script>

<form>
  <label for="type">Type</label>
  <select
    name="type"
    id="type"
    bind:value={type}
    class={type.length == 0 && isComplete ? "error" : ""}
  >
    {#each Object.values(Types) as oType}
      <option value={oType}>{oType}</option>
    {/each}
  </select>
  <label for="name">Name</label>
  <input
    type="text"
    name="name"
    id="name"
    bind:value={name}
    class={name.length < 5 && isComplete ? "error" : ""}
  />

  <label for="url">URL</label>
  <input
    type="url"
    name="url"
    id="url"
    bind:value={url}
    class={!validateUrl(url) && isComplete ? "error" : ""}
  />

  <label for="description">Description</label>
  <textarea
    name="description"
    id="description"
    bind:value={description}
    class={description.length < 5 && isComplete ? "error" : ""}
  />
  <label for="createdAt">Created At</label>
  <input
    type="date"
    name="createdAt"
    id="createdAt"
    bind:value={createdAt}
    class={createdAt.length < 5 && isComplete ? "error" : ""}
  />

  <label for="tags">Tags</label>
  <div id="tags" class={isComplete && tags.length == 0 ? "error" : ""}>
    {#each Object.values(Tags) as tag}
      <label>
        <input type="checkbox" bind:group={tags} value={tag} />
        {tag}
      </label>
    {/each}
  </div>
  <button on:click|preventDefault={handleCopyClick}>Copy</button>
  <button on:click|preventDefault={handleCreateIssueClick}>Open an issue</button
  >
</form>

<pre class="bg-white border border-lg p-6 grid place-items-center">
<code>{generateJson}</code>
</pre>

<style lang="scss">
  @import "../css/breakpoints.scss";
  @mixin single-column() {
    grid-template-columns: repeat(1, 1fr) !important;
  }
  form {
    margin: auto;
    max-width: 60ch;
    padding: 1.5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    @include media("<=tablet") {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  label {
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
  }

  input,
  textarea,
  select {
    /* span 2 */
    grid-column: span 2;
    border: 1px solid slategray;
    border-radius: 0.4rem;
    background-color: white;
    padding: 0.5rem;
    @include media("<=tablet") {
      grid-template-columns: repeat(1, 1fr);
      grid-column: span 1;
    }
  }

  button {
    background: var(--accent-gradient);
    border: none;
    border-radius: 0.4rem;
    color: white;
    font-size: 1rem;
    font-weight: 800;
    padding: 0.75rem;
    cursor: pointer;
  }

  div#tags {
    grid-column: span 3;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;

    @include media("<=tablet") {
      grid-template-columns: repeat(1, 1fr);
      grid-column: span 1;
    }
    label {
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
    }
  }

  .error {
    border: 1px solid red;
    background-color: rgb(255, 217, 217);
  }

  input[type="checkbox"] {
    margin-right: 0.5rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    display: inline-block;
    height: 16px;
    position: relative;
    vertical-align: middle;
    width: 16px;
  }

  input[type="checkbox"]:checked::after {
    content: "✓";
    position: absolute;
    top: -0.3em;
    left: 0.07em;
    font-size: 1em;
    color: var(--accent);
  }
</style>
