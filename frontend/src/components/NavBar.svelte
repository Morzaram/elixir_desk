<script>
  import { Navbar, NavBrand, NavHamburger, NavUl } from "flowbite-svelte";
  const urls = new Map([
    ["Home", "/"],
    ["Communities", "/community"],
    ["Recipies", "/recipies"],
  ]);
</script>

<nav
  class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900"
>
  <div class="container flex flex-wrap items-center justify-between mx-auto">
    <NavBrand href="/">
      <span
        class="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-gradient"
      >
        Elixir Desk
      </span>
    </NavBrand>
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        /></svg
      >
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul
        class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
      >
        {#each [...urls] as [name, url]}
          <li class="py-1"><a class="md:bg-white" href={url}>{name}</a></li>
        {/each}
      </ul>
    </div>
  </div>
</nav>

<style>
  a {
    padding: 0.5em;
  }
  /* hover turns accent */
  a:hover {
    color: rgb(var(--accent));
  }

  nav {
    border: 1px solid rgba(var(--accent), 25%);
    border-radius: 0.5em;
  }
</style>
