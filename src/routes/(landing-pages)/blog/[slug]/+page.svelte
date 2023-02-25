<script lang="ts">
  import ComingSoon from "$lib/subpages/studio/coming-soon.svelte";
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

<ComingSoon
  results="{results}"
  title="{content}"
  subtitle="{Subtitle}"
  summary="{Summary}"
/>
