<script>
  import TextMacro from "./text-macro.svelte";

  import { fade } from "svelte/transition";
  let container;

  export let results;
  export let title;
  export let subtitle;
  export let summary;

  function back() {
    history.back();
  }
</script>

<div
  class="h-[100%] min-h-[100vh] bg-black px-4 sm:px-10 py-10 tracking-wide text-white [&_*]:text-inherit"
  in:fade="{{ duration: 500 }}"
  out:fade="{{ duration: 500 }}"
  bind:this="{container}"
>
  <h1 class="mb-2 text-5xl md:text-7xl text-white">
    {title}
  </h1>
  <p class="mb-[1em] max-w-[30ch] text-2xl md:text-4xl">
    <TextMacro type="{subtitle}" />
  </p>
  <hr class="my-10 mx-10 opacity-50" />
  <p>
    <em class="mr-4 text-white font-medium">tl;dr</em>
    <TextMacro type="{summary}" />
  </p>
  <hr class="my-10 mx-10 opacity-50" />
  <div
    class="max-w-[60ch] text-xl lg:text-2xl [&_p]:mb-[1em] [&_*]:text-inherit"
  >
    <slot name="text" />
    {#each results as result}
      {#if result.type == "paragraph"}
        {#if result.paragraph.rich_text.length > 0}
          <p>
            <TextMacro type="{result.paragraph}" />
          </p>
        {:else}
          <br />
        {/if}
      {:else if result.type == "heading_2"}
        <h2
          class="mt-[2.5em]"
          id="{result.heading_2.rich_text[0].text.content}"
        >
          <TextMacro type="{result.heading_2}" />
        </h2>
      {:else if result.type == "numbered_list_item"}
        <li class="list-decimal ml-[1em]">
          <TextMacro type="{result.numbered_list_item}" />
        </li>
      {:else if result.type == "bulleted_list_item"}
        <li class="list-disc ml-[1em]">
          <TextMacro type="{result.bulleted_list_item}" />
        </li>
      {:else if result.type == "callout"}
        <callout
          class="mt-10 mb-6 flex gap-x-4 px-4 md:gap-x-10 md:px-20 items-start"
        >
          <p class="text-2xl md:text-4xl">💡</p>
          <p class="text-lg md:text-xl">
            <TextMacro type="{result.callout}" />
          </p>
        </callout>
      {/if}
    {/each}
  </div>
  <p class="text-right text-4xl md:text-6xl">
    <a
      on:click|preventDefault="{back}"
      href="/"
      class="inline-block text-white p-6">back.</a
    >
  </p>
</div>

<style lang="scss">
  * {
    color: #e1e1e1;
  }
</style>
