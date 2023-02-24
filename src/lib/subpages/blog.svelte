<script lang="ts">
  import { onMount } from "svelte";

  export let accent: string;
  export let data;

  onMount(() => {
    console.dir(data.post.results[0].properties.Name.title[0].text);
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
  {#each data.post.results as result}
    <div>
      <p>
        <a
          data-sveltekit-preload-code="eager"
          class="hover:underline"
          href="/blog/on-launching"
          >{result.properties.Name.title[0].text.content}</a
        >
      </p>
      <p>21 Feb 2023</p>
    </div>
  {/each}
  <!-- <div>
    <p>
      <a
        data-sveltekit-preload-code="eager"
        class="hover:underline"
        href="/blog/coming-soon">Blog Coming Soon!</a
      >
    </p>
    <p>01 Feb 2023</p>
  </div> -->
</div>
