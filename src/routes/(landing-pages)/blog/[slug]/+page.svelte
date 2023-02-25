<script lang="ts">
  import ComingSoon from "$lib/subpages/studio/coming-soon.svelte";

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
</script>

<ComingSoon
  results="{results}"
  title="{content}"
  subtitle="{Subtitle}"
  summary="{Summary}"
/>
