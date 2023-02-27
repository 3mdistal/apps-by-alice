<script lang="ts">
  import NotionPageParser from "$lib/subpages/studio/notion-page-parser.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import TextMacro from "$lib/notion/text-macro.svelte";

  export let data;

  let {
    post: [
      {
        results: [
          {
            properties: {
              Name: {
                title: [
                  {
                    text: { content: title },
                  },
                ],
              },
              Subtitle: subtitle,
              Summary: summary,
            },
          },
        ],
      },
    ],
    post: [, { results }],
  } = data;

  onMount(() => {
    fetch(window.location.href, {
      headers: {
        Accept: "application/json",
        "x-prerender-revalidate": "JKmtY3BJXXbqQNvcGTUCEkPrrScrd5fs",
      },
    });
  });
</script>

<div
  class="blog-container"
  in:fade="{{ duration: 500 }}"
  out:fade="{{ duration: 500 }}"
>
  <h1>
    {title}
  </h1>
  <p class="subtitle">
    <TextMacro type="{subtitle}" />
  </p>
  <hr />
  <p class="summary">
    <em>tl;dr</em>
    <TextMacro type="{summary}" />
  </p>
  <hr />
  <div class="notion-container">
    <NotionPageParser results="{results}" />
  </div>
  <p class="text-right text-4xl md:text-6xl">
    <a href="/blog" class="inline-block text-white p-6">back.</a>
  </p>
</div>
