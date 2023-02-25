<script lang="ts">
  import { onMount } from "svelte";

  export let accent: string;
  export let data;

  let {
    post: { results },
  } = data;

  onMount(() => {
    fetch("/blog", {
      headers: {
        Accept: "application/json",
        "x-prerender-revalidate": "JKmtY3BJXXbqQNvcGTUCEkPrrScrd5fs",
      },
    });
  });
</script>

<div
  class="py-20 mx-auto w-[90%] md:w-[60%] [&>div]:flex [&>div]:flex-col lg:[&>div]:flex-row [&>div]:mb-6 [&>div]:justify-between md:[&>div]:gap-x-[2vw] [&_p]:text-white [&_a]:font-medium"
>
  <h3
    class="mb-[1em] text-2xl md:text-3xl lg:text-4xl font-medium"
    style="color: {accent}"
  >
    Posts
  </h3>
  {#each results as { properties: { Slug: { url }, Name: { title: [{ text: { content: title } }] }, FormattedPublicationDate: { formula: { string: date } } } }}
    <div>
      <p>
        <a
          data-sveltekit-preload-code="viewport"
          data-sveltekit-preload-data="hover"
          class="hover:underline active:text-gray-400"
          href="blog/{url}">{title}</a
        >
      </p>
      <p>
        {date}
      </p>
    </div>
  {/each}
</div>
