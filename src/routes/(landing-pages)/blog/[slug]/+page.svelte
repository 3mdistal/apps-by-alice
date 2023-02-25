<script lang="ts">
  import BlogContent from "$lib/subpages/studio/blog-content.svelte";
  import { onMount } from "svelte";

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
                    text: { content },
                  },
                ],
              },
              Subtitle,
              Summary,
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

<BlogContent
  results="{results}"
  title="{content}"
  subtitle="{Subtitle}"
  summary="{Summary}"
/>
